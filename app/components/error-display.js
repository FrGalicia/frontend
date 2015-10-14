import Ember from 'ember';

const { Component, computed, isPresent } = Ember;

export default Component.extend({
  classNames: ['error-display'],

  content: null,

  revisedContent: computed('content.[]', {
    get() {
      const content = this.get('content');

      return content.map((error) => {
        let errorObject = {};

        errorObject.mainMessage = error.message;
        errorObject.stack = error.stack;

        if (isPresent(error.errors)) {
          errorObject.statusCode = error.errors[0].status;
          errorObject.message = error.errors[0].title;
        }

        return errorObject;
      });
    }
  }).readOnly(),

  showDetails: false,

  showOrHideDetails: computed('showDetails', {
    get() {
      return this.get('showDetails') ? 'Hide Details' : 'Show Details';
    }
  }).readOnly(),

  totalErrors: computed('content.[]', {
    get() {
      const contentLength = this.get('content').length;

      return contentLength > 1 ? `There are ${contentLength} errors` : 'There is 1 error';
    }
  }).readOnly(),

  actions: {
    toggleDetails() {
      this.set('showDetails', !this.get('showDetails'));
    }
  }
});
