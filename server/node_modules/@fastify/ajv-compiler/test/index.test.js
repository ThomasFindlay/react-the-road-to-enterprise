'use strict'

const t = require('tap')
const AjvCompiler = require('../index')

const sampleSchema = Object.freeze({
  $id: 'example1',
  type: 'object',
  properties: {
    name: { type: 'string' }
  }
})

const externalSchemas1 = Object.freeze({})
const externalSchemas2 = Object.freeze({
  foo: {
    $id: 'foo',
    type: 'object',
    properties: {
      name: { type: 'string' }
    }
  }
})

const fastifyAjvOptionsDefault = Object.freeze({
  customOptions: {}
})

const fastifyAjvOptionsCustom = Object.freeze({
  customOptions: {
    allErrors: true,
    removeAdditional: false
  },
  plugins: [
    require('ajv-merge-patch'),
    [require('ajv-errors'), { singleError: false }]
  ]
})

t.test('basic usage', t => {
  t.plan(1)
  const factory = AjvCompiler()
  const compiler = factory(externalSchemas1, fastifyAjvOptionsDefault)
  const validatorFunc = compiler({ schema: sampleSchema })
  const result = validatorFunc({ name: 'hello' })
  t.equal(result, true)
})

t.test('plugin loading', t => {
  t.plan(3)
  const factory = AjvCompiler()
  const compiler = factory(externalSchemas1, fastifyAjvOptionsCustom)
  const validatorFunc = compiler({
    schema: {
      $merge: {
        source: {
          type: 'object',
          properties: {
            q: {
              type: 'string'
            }
          },
          errorMessage: 'hello world'
        },
        with: {
          required: ['q']
        }
      }
    }
  })
  const result = validatorFunc({ q: 'hello' })
  t.equal(result, true)

  const resultFail = validatorFunc({ })
  t.equal(resultFail, false)
  t.equal(validatorFunc.errors[0].message, 'hello world')
})

t.test('optimization - cache ajv instance', t => {
  t.plan(5)
  const factory = AjvCompiler()
  const compiler1 = factory(externalSchemas1, fastifyAjvOptionsDefault)
  const compiler2 = factory(externalSchemas1, fastifyAjvOptionsDefault)
  t.equal(compiler1, compiler2, 'same instance')
  t.same(compiler1, compiler2, 'same instance')

  const compiler3 = factory(externalSchemas2, fastifyAjvOptionsDefault)
  t.not(compiler3, compiler1, 'new ajv instance when externa schema change')

  const compiler4 = factory(externalSchemas1, fastifyAjvOptionsCustom)
  t.not(compiler4, compiler1, 'new ajv instance when externa schema change')
  t.not(compiler4, compiler3, 'new ajv instance when externa schema change')
})

// https://github.com/fastify/fastify/pull/2969
t.test('compile same $id when in external schema', t => {
  t.plan(2)
  const factory = AjvCompiler()

  const base = {
    $id: 'urn:schema:base',
    definitions: {
      hello: { type: 'string' }
    },
    type: 'object',
    properties: {
      hello: { $ref: '#/definitions/hello' }
    }
  }

  const refSchema = {
    $id: 'urn:schema:ref',
    type: 'object',
    properties: {
      hello: { $ref: 'urn:schema:base#/definitions/hello' }
    }
  }

  const compiler = factory({
    [base.$id]: base,
    [refSchema.$id]: refSchema

  }, fastifyAjvOptionsDefault)

  const validatorFunc1 = compiler({
    schema: {
      $id: 'urn:schema:ref'
    }
  })

  const validatorFunc2 = compiler({
    schema: {
      $id: 'urn:schema:ref'
    }
  })

  t.pass('the compile does not fail if the schema compiled is already in the external schemas')
  t.equal(validatorFunc1, validatorFunc2, 'the returned function is the same')
})
