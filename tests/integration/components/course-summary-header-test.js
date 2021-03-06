import Service from '@ember/service';
import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import { resolve } from 'rsvp';

moduleForComponent('course-summary-header', 'Integration | Component | course summary header', {
  integration: true,
  beforeEach(){
    let currentUserMock = Service.extend({
      userIsCourseDirector: true,
    });
    this.register('service:currentUser', currentUserMock);
  }
});

test('it renders', function (assert) {
  let school = EmberObject.create({});
  let permissionCheckerMock = Service.extend({
    canCreateCourse(inSchool) {
      assert.equal(school, inSchool);
      return resolve(true);
    }
  });
  this.register('service:permissionChecker', permissionCheckerMock);
  let course = EmberObject.create({
    title: 'title',
    school: resolve(school),
    startDate: new Date(2020, 4, 6, 12),
    endDate: new Date(2020, 11, 11, 12),
    externalId: 'abc',
    level: 3,
    isPublished: true,
    isSchedule: false,
  });
  this.set('course', course);
  this.render(hbs`{{course-summary-header course=course}}`);
  const title = 'h2';
  const actions = '.course-summary-actions';
  const materialsIcon = `${actions} i:eq(0)`;
  const printIcon = `${actions} i:eq(1)`;
  const rolloverIcon = `${actions} i:eq(2)`;
  const blocks = '.course-summary-content .block';
  const start = `${blocks}:eq(0) span`;
  const externalId = `${blocks}:eq(1) span`;
  const end = `${blocks}:eq(2) span`;
  const level = `${blocks}:eq(3) span`;
  const status = `${blocks}:eq(4) span:eq(0)`;


  assert.equal(this.$(title).text().trim(), 'title');
  assert.ok(this.$(materialsIcon).hasClass('fa-archive'));
  assert.ok(this.$(printIcon).hasClass('fa-print'));
  assert.ok(this.$(rolloverIcon).hasClass('fa-random'));
  assert.equal(this.$(start).text().trim(), moment(course.startDate).format('L'));
  assert.equal(this.$(externalId).text().trim(), 'abc');
  assert.equal(this.$(end).text().trim(), moment(course.endDate).format('L'));
  assert.equal(this.$(level).text().trim(), '3');
  assert.equal(this.$(status).text().trim(), 'Published');


});

test('no link to materials when that is the current route', function (assert) {
  let school = EmberObject.create({});
  let permissionCheckerMock = Service.extend({
    canCreateCourse(inSchool) {
      assert.equal(school, inSchool);
      return resolve(true);
    }
  });
  this.register('service:permissionChecker', permissionCheckerMock);
  let routerMock = Service.extend({
    currentRouteName: 'course-materials',
    generateURL(){},
  });
  this.register('service:-routing', routerMock);

  let course = EmberObject.create({
    title: 'title',
    school: resolve(school),
    startDate: new Date(2020, 4, 6, 12),
    endDate: new Date(2020, 11, 11, 12),
  });
  this.set('course', course);
  this.render(hbs`{{course-summary-header course=course}}`);
  const actions = '.course-summary-actions i';
  const printIcon = `${actions}:eq(0)`;
  const rolloverIcon = `${actions}:eq(1)`;

  assert.ok(this.$(actions).length, 2);
  assert.ok(this.$(printIcon).hasClass('fa-print'));
  assert.ok(this.$(rolloverIcon).hasClass('fa-random'));
});

test('no link to rollover when that is the current route', function(assert) {
  let routerMock = Service.extend({
    currentRouteName: 'course.rollover',
    generateURL(){},
  });
  this.register('service:-routing', routerMock);

  let course = EmberObject.create({
    title: 'title',
    startDate: new Date(2020, 4, 6, 12),
    endDate: new Date(2020, 11, 11, 12),
  });
  this.set('course', course);
  this.render(hbs`{{course-summary-header course=course}}`);
  const actions = '.course-summary-actions i';
  const materialsIcon = `${actions}:eq(0)`;
  const printIcon = `${actions}:eq(1)`;

  assert.ok(this.$(actions).length, 2);
  assert.ok(this.$(printIcon).hasClass('fa-print'));
  assert.ok(this.$(materialsIcon).hasClass('fa-archive'));
});

test('no link to rollover when user cannot edit the course', function (assert) {
  let school = EmberObject.create({});
  let routerMock = Service.extend({
    currentRouteName: 'course.rollover',
    generateURL(){},
  });
  this.register('service:-routing', routerMock);
  let permissionCheckerMock = Service.extend({
    canCreateCourse(inSchool) {
      assert.equal(school, inSchool);
      return resolve(false);
    }
  });
  this.register('service:permissionChecker', permissionCheckerMock);

  let course = EmberObject.create({
    title: 'title',
    school: resolve(school),
    startDate: new Date(2020, 4, 6, 12),
    endDate: new Date(2020, 11, 11, 12),
  });
  this.set('course', course);
  this.render(hbs`{{course-summary-header course=course}}`);
  const actions = '.course-summary-actions i';
  const materialsIcon = `${actions}:eq(0)`;
  const printIcon = `${actions}:eq(1)`;

  assert.ok(this.$(actions).length, 2);
  assert.ok(this.$(printIcon).hasClass('fa-print'));
  assert.ok(this.$(materialsIcon).hasClass('fa-archive'));
});
