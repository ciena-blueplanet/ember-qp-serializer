import Ember from 'ember';
const {Controller, set, run: {debounce}} = Ember
export default Controller.extend({
  queryParams: ['filters'],
  filters: {},
  notify () {
    this.notifyPropertyChange('filters')
  },
  actions: {
    mutate (object, property, value) {
      set(object, property, value)

      debounce(this, this.notify, 500)
    }
  }
});
