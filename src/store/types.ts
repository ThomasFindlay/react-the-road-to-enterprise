export type ZustandDevtoolsOptions =
  | string
  | {
      name?: string | undefined
      serialize?:
        | {
            options:
              | boolean
              | {
                  date?: boolean
                  regex?: boolean
                  undefined?: boolean
                  nan?: boolean
                  infinity?: boolean
                  error?: boolean
                  symbol?: boolean
                  map?: boolean
                  set?: boolean
                }
          }
        | undefined
    }
  | undefined
