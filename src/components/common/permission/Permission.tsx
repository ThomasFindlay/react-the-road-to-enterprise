import { useUserStore, User } from '@/store/userStore'
import { useState, useEffect } from 'react'
import { checkPermission } from './checkPermission'
import { PermissionType, Debug, EntityOwnerId, Roles } from './permission.types'

export type PermissionProps = {
  children: React.ReactNode
  noAccess?:
    | React.ReactNode
    | ((args: { user: User | null; hasAccess: boolean }) => React.ReactNode)
  roles: Roles
  type?: PermissionType
  entityOwnerId?: EntityOwnerId
  debug?: Debug
}

const Permission = (props: PermissionProps) => {
  const {
    children,
    noAccess,
    entityOwnerId,
    roles = [],
    type = 'one-of',
    debug = false,
  } = props

  const user = useUserStore((store) => store.user)

  const [hasAccess, setHasAccess] = useState(
    user
      ? checkPermission(user, roles, {
          type,
          entityOwnerId,
          debug,
        })
      : false
  )

  useEffect(() => {
    if (!user) {
      setHasAccess(false)
      return
    }
    const doesHaveAccess = checkPermission(user, roles, {
      type,
      entityOwnerId,
      debug,
    })
    setHasAccess(doesHaveAccess)
  }, [user?.id, user?.roles, entityOwnerId, roles, type])

  const renderNoAccess = () => {
    if (typeof noAccess === 'function') {
      return noAccess({
        user,
        hasAccess,
      })
    }
    return noAccess
  }

  return hasAccess ? children : renderNoAccess() || null
}

export default Permission
