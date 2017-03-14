import Ember from 'ember'
const {Route} = Ember
// BEGIN-SNIPPET route
import QPSerializerMixin from 'ember-qp-serializer'
export default Route.extend(QPSerializerMixin)
// END-SNIPPET
