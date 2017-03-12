import Ember from 'ember';
import EmberQpSerializerMixin from 'ember-qp-serializer/mixins/ember-qp-serializer';
import { module, test } from 'qunit';

module('Unit | Mixin | ember qp serializer');

// Replace this with your real tests.
test('it works', function(assert) {
  let EmberQpSerializerObject = Ember.Object.extend(EmberQpSerializerMixin);
  let subject = EmberQpSerializerObject.create();
  assert.ok(subject);
});
