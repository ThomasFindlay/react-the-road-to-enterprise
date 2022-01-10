# @fastify/ajv-compiler

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
[![Continuous Integration](https://github.com/fastify/ajv-compiler/workflows/Continuous%20Integration/badge.svg)](https://github.com/fastify/ajv-compiler/actions/workflows/ci.yml)

This module manages the [`ajv`](https://www.npmjs.com/package/ajv) instances for the Fastify framework.
It isolates the `ajv` dependency so that the AJV version is not tightly coupled to the Fastify version.
This allows the user to decide which version of AJV to use in their Fastify based application.


## Versions

| `@fastify/ajv-compiler` | `ajv` | Default in `fastify` |
|------------------------:|------:|---------------------:|
|                    v1.x |  v6.x |                ^3.14 |


### AJV Configuration

The Fastify's default [`ajv` options](https://github.com/ajv-validator/ajv/tree/v6#options) are:

```js
{
  coerceTypes: true,
  useDefaults: true,
  removeAdditional: true,
  // Explicitly set allErrors to `false`.
  // When set to `true`, a DoS attack is possible.
  allErrors: false,
  nullable: true
}
```

To customize them, see how in the [Fastify official docs](https://www.fastify.io/docs/latest/Server/#ajv).


## Usage

This module is already used as default by Fastify. 
If you need to provide to your server instance a different version, refer to [the official doc](https://www.fastify.io/docs/latest/Server/#schemacontroller).

### How it works

This module provide a factory function to produce [Validator Compilers](https://www.fastify.io/docs/latest/Server/#validatorcompiler) functions.

The Fastify factory function is just one per server instance and it is called for every encapsulated context created by the application through the `fastify.register()` call.

Every Validator Compiler produced has a dedicated AJV instance, so, this factory will try to produce as less as possible AJV instances to reduce the memory footprint and the startup time.

The variables involved to choose if a Validator Compiler can be reused are:

- the AJV configuration: it is [one per server](https://www.fastify.io/docs/latest/Server/#ajv)
- the external JSON schemas: once a new schema is added to a fastify's context, calling `fastify.addSchema()`, it will cause a new AJV inizialization


## License

Licensed under [MIT](./LICENSE).
