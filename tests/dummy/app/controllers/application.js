// BEGIN-SNIPPET controller
import Ember from 'ember';
const {Controller, set, run} = Ember
export default Controller.extend({
  queryParams: ['filters'],
  filters: {},
  notify () {
    this.notifyPropertyChange('filters')
  },
  actions: {
    mutate (object, property, value) {
      set(object, property, value)

      run.debounce(this, this.notify, 250)
    }
  }
});
// END-SNIPPET
