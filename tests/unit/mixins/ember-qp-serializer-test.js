/**
 * Unit test for the ember-qp-serializer mixin
 */

import {expect} from 'chai'
import Ember from 'ember'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import EmberQpSerializerMixin from 'ember-qp-serializer/mixins/ember-qp-serializer'

describe('Unit / Mixin / ember-qp-serializer /', function () {
  let sandbox, subject

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    subject = Ember.Object.extend(EmberQpSerializerMixin).create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should exist', function () {
    expect(subject).not.to.equal(undefined)
  })
})
