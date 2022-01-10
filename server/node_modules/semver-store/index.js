'use strict'

function SemVerStore () {
  if (!(this instanceof SemVerStore)) {
    return new SemVerStore()
  }
  this.tree = new Node()
}

SemVerStore.prototype.set = function (version, store) {
  if (typeof version !== 'string') {
    throw new TypeError('Version should be a string')
  }
  var currentNode = this.tree
  version = version.split('.')
  while (version.length) {
    currentNode = currentNode.addChild(
      new Node(version.shift())
    )
  }
  currentNode.setStore(store)
  return this
}

SemVerStore.prototype.get = function (version) {
  if (typeof version !== 'string') return null
  if (version === '*') version = 'x.x.x'
  var node = this.tree
  var firstDot = version.indexOf('.')
  var secondDot = version.indexOf('.', firstDot + 1)
  var major = version.slice(0, firstDot)
  var minor = secondDot === -1
    ? version.slice(firstDot + 1)
    : version.slice(firstDot + 1, secondDot)
  var patch = secondDot === -1
    ? 'x'
    : version.slice(secondDot + 1)

  node = node.getChild(major)
  if (node === null) return null
  node = node.getChild(minor)
  if (node === null) return null
  node = node.getChild(patch)
  if (node === null) return null
  return node.store
}

SemVerStore.prototype.del = function (version) {
  if (typeof version !== 'string') {
    throw new TypeError('Version should be a string')
  }
  var firstDot = version.indexOf('.')
  var secondDot = version.indexOf('.', firstDot + 1)
  var major = version.slice(0, firstDot)
  var minor = secondDot === -1
    ? version.slice(firstDot + 1)
    : version.slice(firstDot + 1, secondDot)
  var patch = secondDot === -1
    ? 'x'
    : version.slice(secondDot + 1)

  // check existence of major node
  var majorNode = this.tree.children[major]
  if (majorNode == null) return this

  // if minor is the wildcard, then remove the full major node
  if (minor === 'x') {
    this.tree.removeChild(major)
    return this
  }

  // check existence of minor node
  var minorNode = majorNode.children[minor]
  if (minorNode == null) return this

  // if patch is the wildcard, then remove the full minor node
  // and also the major if there are no more children
  if (patch === 'x') {
    this.tree.children[major].removeChild(minor)
    if (this.tree.children[major].length === 0) {
      this.tree.removeChild(major)
    }
    return this
  }

  // check existence of patch node
  var patchNode = minorNode.children[patch]
  if (patchNode == null) return this

  // Specific delete
  this.tree
    .children[major]
    .children[minor]
    .removeChild(patch)

  // check if the minor node has no more children, if so removes it
  // same for the major node
  if (this.tree.children[major].children[minor].length === 0) {
    this.tree.children[major].removeChild(minor)
    if (this.tree.children[major].length === 0) {
      this.tree.removeChild(major)
    }
  }

  return this
}

SemVerStore.prototype.empty = function () {
  this.tree = new Node()
  return this
}

function getMax (arr) {
  var l = arr.length
  var max = arr[0]
  for (var i = 1; i < l; i++) {
    if (arr[i] > max) {
      max = arr[i]
    }
  }
  return max
}

function Node (prefix, children, store) {
  this.prefix = Number(prefix) || 0
  this.children = children || null
  this.childrenPrefixes = children ? Object.keys(children) : []
  this.store = store || null
}

Node.prototype.getChild = function (prefix) {
  if (this.children === null) return null
  if (prefix === 'x') {
    var max = getMax(this.childrenPrefixes)
    return this.children[max]
  }
  return this.children[prefix] || null
}

Node.prototype.addChild = function (node) {
  this.children = this.children || {}
  var child = this.getChild(node.prefix)
  if (child === null) {
    this.children[node.prefix] = node
    this.childrenPrefixes.push(node.prefix)
  }
  return child || node
}

Node.prototype.removeChild = function (prefix) {
  if (prefix === 'x') {
    this.children = null
    this.childrenPrefixes = []
    return this
  }
  if (this.children[prefix] !== undefined) {
    prefix = Number(prefix)
    delete this.children[prefix]
    this.childrenPrefixes.splice(
      this.childrenPrefixes.indexOf(prefix), 1
    )
  }
  return this
}

Node.prototype.setStore = function (store) {
  this.store = store
  return this
}

Object.defineProperty(Node.prototype, 'length', {
  get: function () {
    return this.childrenPrefixes.length
  }
})

module.exports = SemVerStore
