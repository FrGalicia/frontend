/* eslint ember/order-in-components: 0 */
import Component from '@ember/component';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  classNames: ['new-programyear'],

  year: null,
  availableAcademicYears: null,

  selectedYear: computed('year', 'availableAcademicYears.[]', function () {
    const year = this.get('year');
    const availableAcademicYears = this.get('availableAcademicYears');
    if (!year) {
      return availableAcademicYears.firstObject;
    }

    return availableAcademicYears.findBy('value', parseInt(year, 10));
  }),

  saveNewYear: task(function * (){
    const selectedYear = this.get('selectedYear');
    const startYear = parseInt(selectedYear.value, 10);
    yield this.get('save')(startYear);
  }).drop(),
});
