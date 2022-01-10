'use strict'

const Benchmark = require('benchmark')
const suite = Benchmark.Suite()

const SemVerStore = require('./index')
const store1 = SemVerStore()
const store2 = SemVerStore()

store2
  .set('1.1.1', 1)
  .set('1.1.2', 1)
  .set('1.1.3', 1)
  .set('1.2.1', 1)
  .set('1.2.2', 1)
  .set('1.2.3', 1)
  .set('2.1.1', 1)
  .set('2.1.2', 1)
  .set('2.1.3', 1)
  .set('3.2.1', 1)
  .set('3.2.2', 1)
  .set('3.2.3', 1)

suite
  .add('set', function () {
    store1.set('1.2.3', 1)
  })
  .add('get', function () {
    store1.get('1.2.3')
  })
  .add('get (wildcard)', function () {
    store1.get('*')
  })
  .add('get (minor wildcard)', function () {
    store1.get('1.x')
  })
  .add('get (patch wildcard)', function () {
    store1.get('1.2.x')
  })
  .add('del + set', function () {
    store1.del('1.2.3')
    store1.set('1.2.3', 1)
  })
  .add('del (minor wildcard) + set', function () {
    store1.del('1.x')
    store1.set('1.2.3', 1)
  })
  .add('del (patch wildcard) + set', function () {
    store1.del('1.2.x')
    store1.set('1.2.3', 1)
  })
  .add('set with other keys already present', function () {
    store2.set('1.2.4', 1)
  })
  .add('get with other keys already present', function () {
    store2.get('1.2.4')
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {})
  .run()
