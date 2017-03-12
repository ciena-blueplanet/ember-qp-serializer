import Ember from 'ember'
const {Mixin, Logger} = Ember
const TAG_NAME = 'ember-qp-serializer'
const VALID_TYPES = ['object', 'instance']
export default Mixin.create({
  serializeQueryParam (value, urlKey, defaultValueType) {
    if (VALID_TYPES.includes(defaultValueType)) {
      let result = {}
      try {
        result = btoa(JSON.stringify(value))
      } catch (e) {
        Logger.warn(TAG_NAME, e)
      }
      return result
    } else {
      return this._super(...arguments)
    }
  },

  deserializeQueryParam (value, urlKey, defaultValueType) {
    if (VALID_TYPES.includes(defaultValueType)) {
      let result = {}
      try {
        result = JSON.parse(atob(value))
      } catch (e) {
        Logger.warn(TAG_NAME, e)
      }
      return result
    } else {
      return this._super(...arguments)
    }
  }
})
