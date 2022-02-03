export type Roles = string[]
export type EntityOwnerId = string | number
export type PermissionType = 'one-of' | 'all-of'
export type Debug = boolean

export type CheckPermissionConfig = {
  type?: PermissionType
  entityOwnerId?: EntityOwnerId
  debug?: Debug
}
