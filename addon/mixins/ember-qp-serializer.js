import Ember from 'ember'
const {Mixin, Logger} = Ember

const TAG_NAME = '[ember-qp-serializer]'
const VALID_TYPES = ['object', 'instance']

export default Mixin.create({
  /**
   * serializeQueryParam
   * For each `queryParams` specified in controller, it will
   * serialize them, and ship them off to the router.
   * @param  {any} value The value to be serialized
   * @param  {string} urlKey qp key referencing `value`
   * @param  {string} defaultValueType [description]
   * @return {string} serialized query parameter
   */
  serializeQueryParam (value, urlKey, defaultValueType) {
    if (VALID_TYPES.includes(defaultValueType)) {
      let result = ''
      try {
        result = JSON.stringify(value)
      } catch (e) {
        Logger.warn(TAG_NAME, e)
      }
      return result
    } else {
      return this._super(...arguments)
    }
  },
  /**
   * deserializeQueryParam
   * @param  {string} value The value to be deserialized
   * @param  {string} urlKey qp key referencing `value`
   * @param  {string} defaultValueType [description]
   * @return {any} Deserialized query parameters
   */
  deserializeQueryParam (value, urlKey, defaultValueType) {
    if (VALID_TYPES.includes(defaultValueType)) {
      let result = {}
      try {
        result = JSON.parse(value)
      } catch (e) {
        Logger.warn(TAG_NAME, e)
      }
      return result
    } else {
      return this._super(...arguments)
    }
  }
})
