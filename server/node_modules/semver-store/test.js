'use strict'

const { test } = require('tap')
const SemVerStore = require('./index')

test('Should create a store', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .set('1.2.4', 2)
    .set('1.3.0', 3)

  t.deepEqual(store.tree, {
    prefix: 0,
    store: null,
    childrenPrefixes: [1],
    children: {
      1: {
        prefix: 1,
        store: null,
        childrenPrefixes: [2, 3],
        children: {
          2: {
            prefix: 2,
            store: null,
            childrenPrefixes: [3, 4],
            children: {
              3: {
                prefix: 3,
                store: 1,
                childrenPrefixes: [],
                children: null
              },
              4: {
                prefix: 4,
                store: 2,
                childrenPrefixes: [],
                children: null
              }
            }
          },
          3: {
            prefix: 3,
            store: null,
            childrenPrefixes: [0],
            children: {
              0: {
                prefix: 0,
                store: 3,
                childrenPrefixes: [],
                children: null
              }
            }
          }
        }
      }
    }
  })
})

test('Should get the leaf', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .set('1.2.4', 2)
    .set('1.3.0', 3)

  t.strictEqual(store.get('1.2.4'), 2)
})

test('Should get the leaf (wildcard) / 1', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .set('1.2.4', 2)
    .set('1.3.0', 3)

  t.strictEqual(store.get('1.2.x'), 2)
})

test('Should get the leaf (wildcard) / 2', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .set('1.2.4', 2)
    .set('1.3.0', 3)

  t.strictEqual(store.get('1.x'), 3)
})

test('Should get the leaf (wildcard) / 3', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .set('1.2.4', 2)
    .set('1.3.0', 3)

  t.strictEqual(store.get('2.2.x'), null)
})

test('Should get the leaf (wildcard) / 4', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .set('1.2.4', 2)
    .set('1.3.0', 3)

  t.strictEqual(store.get('2.x'), null)
})

test('Should get the leaf (wildcard) / 5', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.0.0', 1)
    .set('1.0.1', 2)
    .set('1.0.2', 3)

  t.strictEqual(store.get('*'), 3)
})

test('Should get the leaf (wildcard) / 6', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.0.0', 1)
    .set('1.1.0', 2)
    .set('1.0.2', 3)

  t.strictEqual(store.get('*'), 2)
})

test('Should get the leaf (wildcard) / 7', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('2.0.0', 1)
    .set('1.1.0', 2)
    .set('2.0.2', 3)

  t.strictEqual(store.get('*'), 3)
})

test('Missing patch', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .set('1.2.4', 2)
    .set('1.3.0', 3)

  t.strictEqual(store.get('1.2'), 2)
})

test('Should get the leaf - 404', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .set('1.2.4', 2)
    .set('1.3.0', 3)

  t.strictEqual(store.get('1.2.5'), null)
})

test('Should get the leaf (bad formatted semver) / 1', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .set('1.2.4', 2)
    .set('1.3.0', 3)

  t.strictEqual(store.get('1.2.a'), null)
})

test('Should get the leaf (bad formatted semver) / 2', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .set('1.2.4', 2)
    .set('1.3.0', 3)

  t.strictEqual(store.get('1.a'), null)
})

test('Big numbers', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.22.34', 1)
    .set('2.32.456', 2)
    .set('345.432.34', 3)
    .set('343.432.36', 4)
    .set('343.432.342', 5)
    .set('343.435.367', 6)
    .set('342.435.34', 7)
    .set('341.432.34', 8)

  t.strictEqual(store.get('343.x'), 6)
})

test('Delete a version / 1', t => {
  t.plan(4)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .set('1.2.4', 2)

  t.strictEqual(store.get('1.2.3'), 1)
  t.strictEqual(store.get('1.2.4'), 2)

  store.del('1.2.3')

  t.strictEqual(store.get('1.2.3'), null)
  t.strictEqual(store.get('1.2.4'), 2)
})

test('Delete a version / 2', t => {
  t.plan(2)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .set('1.2.4', 2)

  t.deepEqual(store.tree, {
    prefix: 0,
    store: null,
    childrenPrefixes: [1],
    children: {
      1: {
        prefix: 1,
        store: null,
        childrenPrefixes: [2],
        children: {
          2: {
            prefix: 2,
            store: null,
            childrenPrefixes: [3, 4],
            children: {
              3: {
                prefix: 3,
                store: 1,
                childrenPrefixes: [],
                children: null
              },
              4: {
                prefix: 4,
                store: 2,
                childrenPrefixes: [],
                children: null
              }
            }
          }
        }
      }
    }
  })

  store.del('1.2.3')

  t.deepEqual(store.tree, {
    prefix: 0,
    store: null,
    childrenPrefixes: [1],
    children: {
      1: {
        prefix: 1,
        store: null,
        childrenPrefixes: [2],
        children: {
          2: {
            prefix: 2,
            store: null,
            childrenPrefixes: [4],
            children: {
              4: {
                prefix: 4,
                store: 2,
                childrenPrefixes: [],
                children: null
              }
            }
          }
        }
      }
    }
  })
})

test('Delete a version / 3', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .del('1.2.3')

  t.deepEqual(store.tree, {
    prefix: 0,
    store: null,
    childrenPrefixes: [],
    children: {}
  })
})

test('Delete a version / 4', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .set('2.2.3', 2)
    .del('1.2.3')

  t.deepEqual(store.tree, {
    prefix: 0,
    store: null,
    childrenPrefixes: [2],
    children: {
      2: {
        prefix: 2,
        store: null,
        childrenPrefixes: [2],
        children: {
          2: {
            prefix: 2,
            store: null,
            childrenPrefixes: [3],
            children: {
              3: {
                prefix: 3,
                store: 2,
                childrenPrefixes: [],
                children: null
              }
            }
          }
        }
      }
    }
  })
})

test('Delete a version / 5', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .set('1.3.3', 2)
    .set('2.2.3', 3)
    .del('1.2.x')

  t.deepEqual(store.tree, {
    prefix: 0,
    store: null,
    childrenPrefixes: [1, 2],
    children: {
      1: {
        prefix: 1,
        store: null,
        childrenPrefixes: [3],
        children: {
          3: {
            prefix: 3,
            store: null,
            childrenPrefixes: [3],
            children: {
              3: {
                prefix: 3,
                store: 2,
                childrenPrefixes: [],
                children: null
              }
            }
          }
        }
      },
      2: {
        prefix: 2,
        store: null,
        childrenPrefixes: [2],
        children: {
          2: {
            prefix: 2,
            store: null,
            childrenPrefixes: [3],
            children: {
              3: {
                prefix: 3,
                store: 3,
                childrenPrefixes: [],
                children: null
              }
            }
          }
        }
      }
    }
  })
})

test('Delete a version / 6', t => {
  t.plan(2)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .set('1.3.3', 2)
    .set('2.2.3', 3)
    .del('1.x')

  t.deepEqual(store.tree, {
    prefix: 0,
    store: null,
    childrenPrefixes: [2],
    children: {
      2: {
        prefix: 2,
        store: null,
        childrenPrefixes: [2],
        children: {
          2: {
            prefix: 2,
            store: null,
            childrenPrefixes: [3],
            children: {
              3: {
                prefix: 3,
                store: 3,
                childrenPrefixes: [],
                children: null
              }
            }
          }
        }
      }
    }
  })

  store.del('2.x')

  t.deepEqual(store.tree, {
    prefix: 0,
    store: null,
    childrenPrefixes: [],
    children: {}
  })
})

test('Empty store', t => {
  t.plan(1)

  const store = SemVerStore()

  store
    .set('1.2.3', 1)
    .set('1.3.3', 2)
    .set('2.2.3', 3)
    .empty()

  t.deepEqual(store.tree, {
    prefix: 0,
    store: null,
    childrenPrefixes: [],
    children: null
  })
})

test('get with bad type', t => {
  t.plan(1)

  const store = SemVerStore()

  store.set('1.2.3', 1)

  t.strictEqual(store.get(5), null)
})

test('set with bad type', t => {
  t.plan(1)

  const store = SemVerStore()

  try {
    store.set(1, 1)
    t.fail('Should fail')
  } catch (err) {
    t.is(err.message, 'Version should be a string')
  }
})

test('del with bad type', t => {
  t.plan(1)

  const store = SemVerStore()

  try {
    store.del(1)
    t.fail('Should fail')
  } catch (err) {
    t.is(err.message, 'Version should be a string')
  }
})
