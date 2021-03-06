import EmberObject from '@ember/object';
import Service from '@ember/service';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import initializer from "ilios/instance-initializers/ember-i18n";

moduleForComponent('school-list', 'Integration | Component | school list', {
  integration: true,
  beforeEach(){
    initializer.initialize(this);
  },
});

test('it renders', function(assert) {
  let school1 = EmberObject.create({
    id: 1,
    title: 'school 0'
  });
  let school2 = EmberObject.create({
    id: 2,
    title: 'school 1'
  });

  const schools = [school1, school2].map(obj => EmberObject.create(obj));

  this.set('schools', schools);
  this.render(hbs`{{school-list schools=schools}}`);
  assert.equal(this.$('tr:eq(1) td:eq(0)').text().trim(), 'school 0');
  assert.equal(this.$('tr:eq(2) td:eq(0)').text().trim(), 'school 1');
});

test('create school button is visible to root', function(assert) {
  assert.expect(1);
  const currentUserMock = Service.extend({
    isRoot: true
  });
  this.register('service:current-user', currentUserMock);
  this.set('schools', []);
  this.render(hbs`{{school-list schools=schools}}`);
  assert.equal(this.$('.header .actions .expand-button').length, 1);
});

test('create school button is not visible to non root users', function(assert) {
  assert.expect(1);
  const currentUserMock = Service.extend({
    root: false
  });
  this.register('service:current-user', currentUserMock);
  this.set('schools', []);
  this.render(hbs`{{school-list schools=schools}}`);
  assert.equal(this.$('.header .actions .expand-button').length, 0);
});
