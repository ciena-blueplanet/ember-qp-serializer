import Ember from 'ember';
import _ from 'lodash'
const {set} = Ember
export default Ember.Controller.extend({
  queryParams: ['filters'],
  filters: {},
  selectItems: [
    {label: 'lorem', value: 'ipsum'},
    {label: 'foo', value: 'bar'}
  ],
  actions: {
    mutate (propertyName, event) {
      const filters = this.get('filters')
      set(filters, propertyName, event.target.value)

      this.set('filters', _.cloneDeep(filters))
    },
    mutateSelect (value) {
      const filters = this.get('filters')
      set(filters, 'select', value)

      this.set('filters', _.cloneDeep(filters))
    }
  }
});
