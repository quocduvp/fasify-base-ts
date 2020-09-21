import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.6.2
 * Query Engine version: a70da9750b0dd1eabc6b11c8548c40b856e298db
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$executeRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.permission`: Exposes CRUD operations for the **Permission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Permissions
    * const permissions = await prisma.permission.findMany()
    * ```
    */
  get permission(): PermissionDelegate;

  /**
   * `prisma.userPermission`: Exposes CRUD operations for the **UserPermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserPermissions
    * const userPermissions = await prisma.userPermission.findMany()
    * ```
    */
  get userPermission(): UserPermissionDelegate;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): RoleDelegate;

  /**
   * `prisma.rolePermission`: Exposes CRUD operations for the **RolePermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RolePermissions
    * const rolePermissions = await prisma.rolePermission.findMany()
    * ```
    */
  get rolePermission(): RolePermissionDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const UserDistinctFieldEnum: {
  id: 'id',
  name: 'name'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const PermissionDistinctFieldEnum: {
  action: 'action',
  can: 'can',
  parent: 'parent'
};

export declare type PermissionDistinctFieldEnum = (typeof PermissionDistinctFieldEnum)[keyof typeof PermissionDistinctFieldEnum]


export declare const UserPermissionDistinctFieldEnum: {
  id: 'id',
  userId: 'userId',
  permissionId: 'permissionId'
};

export declare type UserPermissionDistinctFieldEnum = (typeof UserPermissionDistinctFieldEnum)[keyof typeof UserPermissionDistinctFieldEnum]


export declare const RoleDistinctFieldEnum: {
  name: 'name'
};

export declare type RoleDistinctFieldEnum = (typeof RoleDistinctFieldEnum)[keyof typeof RoleDistinctFieldEnum]


export declare const RolePermissionDistinctFieldEnum: {
  id: 'id',
  permissionId: 'permissionId',
  roleName: 'roleName'
};

export declare type RolePermissionDistinctFieldEnum = (typeof RolePermissionDistinctFieldEnum)[keyof typeof RolePermissionDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const CanType: {
  write: 'write',
  read: 'read',
  delete: 'delete',
  all: 'all'
};

export declare type CanType = (typeof CanType)[keyof typeof CanType]



/**
 * Model User
 */

export type User = {
  id: number
  name: string | null
}


export type AggregateUser = {
  count: number
  avg: UserAvgAggregateOutputType | null
  sum: UserSumAggregateOutputType | null
  min: UserMinAggregateOutputType | null
  max: UserMaxAggregateOutputType | null
}

export type UserAvgAggregateOutputType = {
  id: number
}

export type UserSumAggregateOutputType = {
  id: number
}

export type UserMinAggregateOutputType = {
  id: number
}

export type UserMaxAggregateOutputType = {
  id: number
}


export type UserAvgAggregateInputType = {
  id?: true
}

export type UserSumAggregateInputType = {
  id?: true
}

export type UserMinAggregateInputType = {
  id?: true
}

export type UserMaxAggregateInputType = {
  id?: true
}

export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput>
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
  avg?: UserAvgAggregateInputType
  sum?: UserSumAggregateInputType
  min?: UserMinAggregateInputType
  max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
}

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
}
    
    

export type UserSelect = {
  id?: boolean
  name?: boolean
  userPermission?: boolean | FindManyUserPermissionArgs
}

export type UserInclude = {
  userPermission?: boolean | FindManyUserPermissionArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'userPermission'
      ? Array<UserPermissionGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'userPermission'
      ? Array<UserPermissionGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  userPermission<T extends FindManyUserPermissionArgs = {}>(args?: Subset<T, FindManyUserPermissionArgs>): CheckSelect<T, Promise<Array<UserPermission>>, Promise<Array<UserPermissionGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput>
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model Permission
 */

export type Permission = {
  action: string
  can: CanType
  parent: string | null
}


export type AggregatePermission = {
  count: number
}



export type AggregatePermissionArgs = {
  where?: PermissionWhereInput
  orderBy?: Enumerable<PermissionOrderByInput>
  cursor?: PermissionWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PermissionDistinctFieldEnum>
  count?: true
}

export type GetPermissionAggregateType<T extends AggregatePermissionArgs> = {
  [P in keyof T]: P extends 'count' ? number : never
}


    
    

export type PermissionSelect = {
  action?: boolean
  can?: boolean
  parent?: boolean
  permission?: boolean | PermissionArgs
  subPermission?: boolean | FindManyPermissionArgs
  UserPermission?: boolean | FindManyUserPermissionArgs
  RolePermission?: boolean | FindManyRolePermissionArgs
}

export type PermissionInclude = {
  permission?: boolean | PermissionArgs
  subPermission?: boolean | FindManyPermissionArgs
  UserPermission?: boolean | FindManyUserPermissionArgs
  RolePermission?: boolean | FindManyRolePermissionArgs
}

export type PermissionGetPayload<
  S extends boolean | null | undefined | PermissionArgs,
  U = keyof S
> = S extends true
  ? Permission
  : S extends undefined
  ? never
  : S extends PermissionArgs | FindManyPermissionArgs
  ? 'include' extends U
    ? Permission  & {
      [P in TrueKeys<S['include']>]:
      P extends 'permission'
      ? PermissionGetPayload<S['include'][P]> | null :
      P extends 'subPermission'
      ? Array<PermissionGetPayload<S['include'][P]>> :
      P extends 'UserPermission'
      ? Array<UserPermissionGetPayload<S['include'][P]>> :
      P extends 'RolePermission'
      ? Array<RolePermissionGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Permission ? Permission[P]
: 
      P extends 'permission'
      ? PermissionGetPayload<S['select'][P]> | null :
      P extends 'subPermission'
      ? Array<PermissionGetPayload<S['select'][P]>> :
      P extends 'UserPermission'
      ? Array<UserPermissionGetPayload<S['select'][P]>> :
      P extends 'RolePermission'
      ? Array<RolePermissionGetPayload<S['select'][P]>> : never
    }
  : Permission
: Permission


export interface PermissionDelegate {
  /**
   * Find zero or one Permission.
   * @param {FindOnePermissionArgs} args - Arguments to find a Permission
   * @example
   * // Get one Permission
   * const permission = await prisma.permission.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePermissionArgs>(
    args: Subset<T, FindOnePermissionArgs>
  ): CheckSelect<T, Prisma__PermissionClient<Permission | null>, Prisma__PermissionClient<PermissionGetPayload<T> | null>>
  /**
   * Find zero or more Permissions.
   * @param {FindManyPermissionArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Permissions
   * const permissions = await prisma.permission.findMany()
   * 
   * // Get first 10 Permissions
   * const permissions = await prisma.permission.findMany({ take: 10 })
   * 
   * // Only select the `action`
   * const permissionWithActionOnly = await prisma.permission.findMany({ select: { action: true } })
   * 
  **/
  findMany<T extends FindManyPermissionArgs>(
    args?: Subset<T, FindManyPermissionArgs>
  ): CheckSelect<T, Promise<Array<Permission>>, Promise<Array<PermissionGetPayload<T>>>>
  /**
   * Create a Permission.
   * @param {PermissionCreateArgs} args - Arguments to create a Permission.
   * @example
   * // Create one Permission
   * const Permission = await prisma.permission.create({
   *   data: {
   *     // ... data to create a Permission
   *   }
   * })
   * 
  **/
  create<T extends PermissionCreateArgs>(
    args: Subset<T, PermissionCreateArgs>
  ): CheckSelect<T, Prisma__PermissionClient<Permission>, Prisma__PermissionClient<PermissionGetPayload<T>>>
  /**
   * Delete a Permission.
   * @param {PermissionDeleteArgs} args - Arguments to delete one Permission.
   * @example
   * // Delete one Permission
   * const Permission = await prisma.permission.delete({
   *   where: {
   *     // ... filter to delete one Permission
   *   }
   * })
   * 
  **/
  delete<T extends PermissionDeleteArgs>(
    args: Subset<T, PermissionDeleteArgs>
  ): CheckSelect<T, Prisma__PermissionClient<Permission>, Prisma__PermissionClient<PermissionGetPayload<T>>>
  /**
   * Update one Permission.
   * @param {PermissionUpdateArgs} args - Arguments to update one Permission.
   * @example
   * // Update one Permission
   * const permission = await prisma.permission.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends PermissionUpdateArgs>(
    args: Subset<T, PermissionUpdateArgs>
  ): CheckSelect<T, Prisma__PermissionClient<Permission>, Prisma__PermissionClient<PermissionGetPayload<T>>>
  /**
   * Delete zero or more Permissions.
   * @param {PermissionDeleteManyArgs} args - Arguments to filter Permissions to delete.
   * @example
   * // Delete a few Permissions
   * const { count } = await prisma.permission.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PermissionDeleteManyArgs>(
    args: Subset<T, PermissionDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Permissions.
   * @param {PermissionUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Permissions
   * const permission = await prisma.permission.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PermissionUpdateManyArgs>(
    args: Subset<T, PermissionUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Permission.
   * @param {PermissionUpsertArgs} args - Arguments to update or create a Permission.
   * @example
   * // Update or create a Permission
   * const permission = await prisma.permission.upsert({
   *   create: {
   *     // ... data to create a Permission
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Permission we want to update
   *   }
   * })
  **/
  upsert<T extends PermissionUpsertArgs>(
    args: Subset<T, PermissionUpsertArgs>
  ): CheckSelect<T, Prisma__PermissionClient<Permission>, Prisma__PermissionClient<PermissionGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyPermissionArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregatePermissionArgs>(args: Subset<T, AggregatePermissionArgs>): Promise<GetPermissionAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Permission.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__PermissionClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  permission<T extends PermissionArgs = {}>(args?: Subset<T, PermissionArgs>): CheckSelect<T, Prisma__PermissionClient<Permission | null>, Prisma__PermissionClient<PermissionGetPayload<T> | null>>;

  subPermission<T extends FindManyPermissionArgs = {}>(args?: Subset<T, FindManyPermissionArgs>): CheckSelect<T, Promise<Array<Permission>>, Promise<Array<PermissionGetPayload<T>>>>;

  UserPermission<T extends FindManyUserPermissionArgs = {}>(args?: Subset<T, FindManyUserPermissionArgs>): CheckSelect<T, Promise<Array<UserPermission>>, Promise<Array<UserPermissionGetPayload<T>>>>;

  RolePermission<T extends FindManyRolePermissionArgs = {}>(args?: Subset<T, FindManyRolePermissionArgs>): CheckSelect<T, Promise<Array<RolePermission>>, Promise<Array<RolePermissionGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Permission findOne
 */
export type FindOnePermissionArgs = {
  /**
   * Select specific fields to fetch from the Permission
  **/
  select?: PermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PermissionInclude | null
  /**
   * Filter, which Permission to fetch.
  **/
  where: PermissionWhereUniqueInput
}


/**
 * Permission findMany
 */
export type FindManyPermissionArgs = {
  /**
   * Select specific fields to fetch from the Permission
  **/
  select?: PermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PermissionInclude | null
  /**
   * Filter, which Permissions to fetch.
  **/
  where?: PermissionWhereInput
  /**
   * Determine the order of the Permissions to fetch.
  **/
  orderBy?: Enumerable<PermissionOrderByInput>
  /**
   * Sets the position for listing Permissions.
  **/
  cursor?: PermissionWhereUniqueInput
  /**
   * The number of Permissions to fetch. If negative number, it will take Permissions before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Permissions.
  **/
  skip?: number
  distinct?: Enumerable<PermissionDistinctFieldEnum>
}


/**
 * Permission create
 */
export type PermissionCreateArgs = {
  /**
   * Select specific fields to fetch from the Permission
  **/
  select?: PermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PermissionInclude | null
  /**
   * The data needed to create a Permission.
  **/
  data: PermissionCreateInput
}


/**
 * Permission update
 */
export type PermissionUpdateArgs = {
  /**
   * Select specific fields to fetch from the Permission
  **/
  select?: PermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PermissionInclude | null
  /**
   * The data needed to update a Permission.
  **/
  data: PermissionUpdateInput
  /**
   * Choose, which Permission to update.
  **/
  where: PermissionWhereUniqueInput
}


/**
 * Permission updateMany
 */
export type PermissionUpdateManyArgs = {
  data: PermissionUpdateManyMutationInput
  where?: PermissionWhereInput
}


/**
 * Permission upsert
 */
export type PermissionUpsertArgs = {
  /**
   * Select specific fields to fetch from the Permission
  **/
  select?: PermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PermissionInclude | null
  /**
   * The filter to search for the Permission to update in case it exists.
  **/
  where: PermissionWhereUniqueInput
  /**
   * In case the Permission found by the `where` argument doesn't exist, create a new Permission with this data.
  **/
  create: PermissionCreateInput
  /**
   * In case the Permission was found with the provided `where` argument, update it with this data.
  **/
  update: PermissionUpdateInput
}


/**
 * Permission delete
 */
export type PermissionDeleteArgs = {
  /**
   * Select specific fields to fetch from the Permission
  **/
  select?: PermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PermissionInclude | null
  /**
   * Filter which Permission to delete.
  **/
  where: PermissionWhereUniqueInput
}


/**
 * Permission deleteMany
 */
export type PermissionDeleteManyArgs = {
  where?: PermissionWhereInput
}


/**
 * Permission without action
 */
export type PermissionArgs = {
  /**
   * Select specific fields to fetch from the Permission
  **/
  select?: PermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PermissionInclude | null
}



/**
 * Model UserPermission
 */

export type UserPermission = {
  id: number
  userId: number
  permissionId: string
}


export type AggregateUserPermission = {
  count: number
  avg: UserPermissionAvgAggregateOutputType | null
  sum: UserPermissionSumAggregateOutputType | null
  min: UserPermissionMinAggregateOutputType | null
  max: UserPermissionMaxAggregateOutputType | null
}

export type UserPermissionAvgAggregateOutputType = {
  id: number
  userId: number
}

export type UserPermissionSumAggregateOutputType = {
  id: number
  userId: number
}

export type UserPermissionMinAggregateOutputType = {
  id: number
  userId: number
}

export type UserPermissionMaxAggregateOutputType = {
  id: number
  userId: number
}


export type UserPermissionAvgAggregateInputType = {
  id?: true
  userId?: true
}

export type UserPermissionSumAggregateInputType = {
  id?: true
  userId?: true
}

export type UserPermissionMinAggregateInputType = {
  id?: true
  userId?: true
}

export type UserPermissionMaxAggregateInputType = {
  id?: true
  userId?: true
}

export type AggregateUserPermissionArgs = {
  where?: UserPermissionWhereInput
  orderBy?: Enumerable<UserPermissionOrderByInput>
  cursor?: UserPermissionWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserPermissionDistinctFieldEnum>
  count?: true
  avg?: UserPermissionAvgAggregateInputType
  sum?: UserPermissionSumAggregateInputType
  min?: UserPermissionMinAggregateInputType
  max?: UserPermissionMaxAggregateInputType
}

export type GetUserPermissionAggregateType<T extends AggregateUserPermissionArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserPermissionAggregateScalarType<T[P]>
}

export type GetUserPermissionAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserPermissionAvgAggregateOutputType ? UserPermissionAvgAggregateOutputType[P] : never
}
    
    

export type UserPermissionSelect = {
  id?: boolean
  userId?: boolean
  user?: boolean | UserArgs
  permissionId?: boolean
  permission?: boolean | PermissionArgs
}

export type UserPermissionInclude = {
  user?: boolean | UserArgs
  permission?: boolean | PermissionArgs
}

export type UserPermissionGetPayload<
  S extends boolean | null | undefined | UserPermissionArgs,
  U = keyof S
> = S extends true
  ? UserPermission
  : S extends undefined
  ? never
  : S extends UserPermissionArgs | FindManyUserPermissionArgs
  ? 'include' extends U
    ? UserPermission  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? UserGetPayload<S['include'][P]> :
      P extends 'permission'
      ? PermissionGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof UserPermission ? UserPermission[P]
: 
      P extends 'user'
      ? UserGetPayload<S['select'][P]> :
      P extends 'permission'
      ? PermissionGetPayload<S['select'][P]> : never
    }
  : UserPermission
: UserPermission


export interface UserPermissionDelegate {
  /**
   * Find zero or one UserPermission.
   * @param {FindOneUserPermissionArgs} args - Arguments to find a UserPermission
   * @example
   * // Get one UserPermission
   * const userPermission = await prisma.userPermission.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserPermissionArgs>(
    args: Subset<T, FindOneUserPermissionArgs>
  ): CheckSelect<T, Prisma__UserPermissionClient<UserPermission | null>, Prisma__UserPermissionClient<UserPermissionGetPayload<T> | null>>
  /**
   * Find zero or more UserPermissions.
   * @param {FindManyUserPermissionArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all UserPermissions
   * const userPermissions = await prisma.userPermission.findMany()
   * 
   * // Get first 10 UserPermissions
   * const userPermissions = await prisma.userPermission.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userPermissionWithIdOnly = await prisma.userPermission.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserPermissionArgs>(
    args?: Subset<T, FindManyUserPermissionArgs>
  ): CheckSelect<T, Promise<Array<UserPermission>>, Promise<Array<UserPermissionGetPayload<T>>>>
  /**
   * Create a UserPermission.
   * @param {UserPermissionCreateArgs} args - Arguments to create a UserPermission.
   * @example
   * // Create one UserPermission
   * const UserPermission = await prisma.userPermission.create({
   *   data: {
   *     // ... data to create a UserPermission
   *   }
   * })
   * 
  **/
  create<T extends UserPermissionCreateArgs>(
    args: Subset<T, UserPermissionCreateArgs>
  ): CheckSelect<T, Prisma__UserPermissionClient<UserPermission>, Prisma__UserPermissionClient<UserPermissionGetPayload<T>>>
  /**
   * Delete a UserPermission.
   * @param {UserPermissionDeleteArgs} args - Arguments to delete one UserPermission.
   * @example
   * // Delete one UserPermission
   * const UserPermission = await prisma.userPermission.delete({
   *   where: {
   *     // ... filter to delete one UserPermission
   *   }
   * })
   * 
  **/
  delete<T extends UserPermissionDeleteArgs>(
    args: Subset<T, UserPermissionDeleteArgs>
  ): CheckSelect<T, Prisma__UserPermissionClient<UserPermission>, Prisma__UserPermissionClient<UserPermissionGetPayload<T>>>
  /**
   * Update one UserPermission.
   * @param {UserPermissionUpdateArgs} args - Arguments to update one UserPermission.
   * @example
   * // Update one UserPermission
   * const userPermission = await prisma.userPermission.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserPermissionUpdateArgs>(
    args: Subset<T, UserPermissionUpdateArgs>
  ): CheckSelect<T, Prisma__UserPermissionClient<UserPermission>, Prisma__UserPermissionClient<UserPermissionGetPayload<T>>>
  /**
   * Delete zero or more UserPermissions.
   * @param {UserPermissionDeleteManyArgs} args - Arguments to filter UserPermissions to delete.
   * @example
   * // Delete a few UserPermissions
   * const { count } = await prisma.userPermission.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserPermissionDeleteManyArgs>(
    args: Subset<T, UserPermissionDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more UserPermissions.
   * @param {UserPermissionUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many UserPermissions
   * const userPermission = await prisma.userPermission.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserPermissionUpdateManyArgs>(
    args: Subset<T, UserPermissionUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one UserPermission.
   * @param {UserPermissionUpsertArgs} args - Arguments to update or create a UserPermission.
   * @example
   * // Update or create a UserPermission
   * const userPermission = await prisma.userPermission.upsert({
   *   create: {
   *     // ... data to create a UserPermission
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the UserPermission we want to update
   *   }
   * })
  **/
  upsert<T extends UserPermissionUpsertArgs>(
    args: Subset<T, UserPermissionUpsertArgs>
  ): CheckSelect<T, Prisma__UserPermissionClient<UserPermission>, Prisma__UserPermissionClient<UserPermissionGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserPermissionArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserPermissionArgs>(args: Subset<T, AggregateUserPermissionArgs>): Promise<GetUserPermissionAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for UserPermission.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserPermissionClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  permission<T extends PermissionArgs = {}>(args?: Subset<T, PermissionArgs>): CheckSelect<T, Prisma__PermissionClient<Permission | null>, Prisma__PermissionClient<PermissionGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * UserPermission findOne
 */
export type FindOneUserPermissionArgs = {
  /**
   * Select specific fields to fetch from the UserPermission
  **/
  select?: UserPermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserPermissionInclude | null
  /**
   * Filter, which UserPermission to fetch.
  **/
  where: UserPermissionWhereUniqueInput
}


/**
 * UserPermission findMany
 */
export type FindManyUserPermissionArgs = {
  /**
   * Select specific fields to fetch from the UserPermission
  **/
  select?: UserPermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserPermissionInclude | null
  /**
   * Filter, which UserPermissions to fetch.
  **/
  where?: UserPermissionWhereInput
  /**
   * Determine the order of the UserPermissions to fetch.
  **/
  orderBy?: Enumerable<UserPermissionOrderByInput>
  /**
   * Sets the position for listing UserPermissions.
  **/
  cursor?: UserPermissionWhereUniqueInput
  /**
   * The number of UserPermissions to fetch. If negative number, it will take UserPermissions before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` UserPermissions.
  **/
  skip?: number
  distinct?: Enumerable<UserPermissionDistinctFieldEnum>
}


/**
 * UserPermission create
 */
export type UserPermissionCreateArgs = {
  /**
   * Select specific fields to fetch from the UserPermission
  **/
  select?: UserPermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserPermissionInclude | null
  /**
   * The data needed to create a UserPermission.
  **/
  data: UserPermissionCreateInput
}


/**
 * UserPermission update
 */
export type UserPermissionUpdateArgs = {
  /**
   * Select specific fields to fetch from the UserPermission
  **/
  select?: UserPermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserPermissionInclude | null
  /**
   * The data needed to update a UserPermission.
  **/
  data: UserPermissionUpdateInput
  /**
   * Choose, which UserPermission to update.
  **/
  where: UserPermissionWhereUniqueInput
}


/**
 * UserPermission updateMany
 */
export type UserPermissionUpdateManyArgs = {
  data: UserPermissionUpdateManyMutationInput
  where?: UserPermissionWhereInput
}


/**
 * UserPermission upsert
 */
export type UserPermissionUpsertArgs = {
  /**
   * Select specific fields to fetch from the UserPermission
  **/
  select?: UserPermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserPermissionInclude | null
  /**
   * The filter to search for the UserPermission to update in case it exists.
  **/
  where: UserPermissionWhereUniqueInput
  /**
   * In case the UserPermission found by the `where` argument doesn't exist, create a new UserPermission with this data.
  **/
  create: UserPermissionCreateInput
  /**
   * In case the UserPermission was found with the provided `where` argument, update it with this data.
  **/
  update: UserPermissionUpdateInput
}


/**
 * UserPermission delete
 */
export type UserPermissionDeleteArgs = {
  /**
   * Select specific fields to fetch from the UserPermission
  **/
  select?: UserPermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserPermissionInclude | null
  /**
   * Filter which UserPermission to delete.
  **/
  where: UserPermissionWhereUniqueInput
}


/**
 * UserPermission deleteMany
 */
export type UserPermissionDeleteManyArgs = {
  where?: UserPermissionWhereInput
}


/**
 * UserPermission without action
 */
export type UserPermissionArgs = {
  /**
   * Select specific fields to fetch from the UserPermission
  **/
  select?: UserPermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserPermissionInclude | null
}



/**
 * Model Role
 */

export type Role = {
  name: string
}


export type AggregateRole = {
  count: number
}



export type AggregateRoleArgs = {
  where?: RoleWhereInput
  orderBy?: Enumerable<RoleOrderByInput>
  cursor?: RoleWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<RoleDistinctFieldEnum>
  count?: true
}

export type GetRoleAggregateType<T extends AggregateRoleArgs> = {
  [P in keyof T]: P extends 'count' ? number : never
}


    
    

export type RoleSelect = {
  name?: boolean
  rolePermission?: boolean | FindManyRolePermissionArgs
}

export type RoleInclude = {
  rolePermission?: boolean | FindManyRolePermissionArgs
}

export type RoleGetPayload<
  S extends boolean | null | undefined | RoleArgs,
  U = keyof S
> = S extends true
  ? Role
  : S extends undefined
  ? never
  : S extends RoleArgs | FindManyRoleArgs
  ? 'include' extends U
    ? Role  & {
      [P in TrueKeys<S['include']>]:
      P extends 'rolePermission'
      ? Array<RolePermissionGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Role ? Role[P]
: 
      P extends 'rolePermission'
      ? Array<RolePermissionGetPayload<S['select'][P]>> : never
    }
  : Role
: Role


export interface RoleDelegate {
  /**
   * Find zero or one Role.
   * @param {FindOneRoleArgs} args - Arguments to find a Role
   * @example
   * // Get one Role
   * const role = await prisma.role.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneRoleArgs>(
    args: Subset<T, FindOneRoleArgs>
  ): CheckSelect<T, Prisma__RoleClient<Role | null>, Prisma__RoleClient<RoleGetPayload<T> | null>>
  /**
   * Find zero or more Roles.
   * @param {FindManyRoleArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Roles
   * const roles = await prisma.role.findMany()
   * 
   * // Get first 10 Roles
   * const roles = await prisma.role.findMany({ take: 10 })
   * 
   * // Only select the `name`
   * const roleWithNameOnly = await prisma.role.findMany({ select: { name: true } })
   * 
  **/
  findMany<T extends FindManyRoleArgs>(
    args?: Subset<T, FindManyRoleArgs>
  ): CheckSelect<T, Promise<Array<Role>>, Promise<Array<RoleGetPayload<T>>>>
  /**
   * Create a Role.
   * @param {RoleCreateArgs} args - Arguments to create a Role.
   * @example
   * // Create one Role
   * const Role = await prisma.role.create({
   *   data: {
   *     // ... data to create a Role
   *   }
   * })
   * 
  **/
  create<T extends RoleCreateArgs>(
    args: Subset<T, RoleCreateArgs>
  ): CheckSelect<T, Prisma__RoleClient<Role>, Prisma__RoleClient<RoleGetPayload<T>>>
  /**
   * Delete a Role.
   * @param {RoleDeleteArgs} args - Arguments to delete one Role.
   * @example
   * // Delete one Role
   * const Role = await prisma.role.delete({
   *   where: {
   *     // ... filter to delete one Role
   *   }
   * })
   * 
  **/
  delete<T extends RoleDeleteArgs>(
    args: Subset<T, RoleDeleteArgs>
  ): CheckSelect<T, Prisma__RoleClient<Role>, Prisma__RoleClient<RoleGetPayload<T>>>
  /**
   * Update one Role.
   * @param {RoleUpdateArgs} args - Arguments to update one Role.
   * @example
   * // Update one Role
   * const role = await prisma.role.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends RoleUpdateArgs>(
    args: Subset<T, RoleUpdateArgs>
  ): CheckSelect<T, Prisma__RoleClient<Role>, Prisma__RoleClient<RoleGetPayload<T>>>
  /**
   * Delete zero or more Roles.
   * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
   * @example
   * // Delete a few Roles
   * const { count } = await prisma.role.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends RoleDeleteManyArgs>(
    args: Subset<T, RoleDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Roles.
   * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Roles
   * const role = await prisma.role.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends RoleUpdateManyArgs>(
    args: Subset<T, RoleUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Role.
   * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
   * @example
   * // Update or create a Role
   * const role = await prisma.role.upsert({
   *   create: {
   *     // ... data to create a Role
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Role we want to update
   *   }
   * })
  **/
  upsert<T extends RoleUpsertArgs>(
    args: Subset<T, RoleUpsertArgs>
  ): CheckSelect<T, Prisma__RoleClient<Role>, Prisma__RoleClient<RoleGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyRoleArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateRoleArgs>(args: Subset<T, AggregateRoleArgs>): Promise<GetRoleAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Role.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__RoleClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  rolePermission<T extends FindManyRolePermissionArgs = {}>(args?: Subset<T, FindManyRolePermissionArgs>): CheckSelect<T, Promise<Array<RolePermission>>, Promise<Array<RolePermissionGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Role findOne
 */
export type FindOneRoleArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: RoleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RoleInclude | null
  /**
   * Filter, which Role to fetch.
  **/
  where: RoleWhereUniqueInput
}


/**
 * Role findMany
 */
export type FindManyRoleArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: RoleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RoleInclude | null
  /**
   * Filter, which Roles to fetch.
  **/
  where?: RoleWhereInput
  /**
   * Determine the order of the Roles to fetch.
  **/
  orderBy?: Enumerable<RoleOrderByInput>
  /**
   * Sets the position for listing Roles.
  **/
  cursor?: RoleWhereUniqueInput
  /**
   * The number of Roles to fetch. If negative number, it will take Roles before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Roles.
  **/
  skip?: number
  distinct?: Enumerable<RoleDistinctFieldEnum>
}


/**
 * Role create
 */
export type RoleCreateArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: RoleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RoleInclude | null
  /**
   * The data needed to create a Role.
  **/
  data: RoleCreateInput
}


/**
 * Role update
 */
export type RoleUpdateArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: RoleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RoleInclude | null
  /**
   * The data needed to update a Role.
  **/
  data: RoleUpdateInput
  /**
   * Choose, which Role to update.
  **/
  where: RoleWhereUniqueInput
}


/**
 * Role updateMany
 */
export type RoleUpdateManyArgs = {
  data: RoleUpdateManyMutationInput
  where?: RoleWhereInput
}


/**
 * Role upsert
 */
export type RoleUpsertArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: RoleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RoleInclude | null
  /**
   * The filter to search for the Role to update in case it exists.
  **/
  where: RoleWhereUniqueInput
  /**
   * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
  **/
  create: RoleCreateInput
  /**
   * In case the Role was found with the provided `where` argument, update it with this data.
  **/
  update: RoleUpdateInput
}


/**
 * Role delete
 */
export type RoleDeleteArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: RoleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RoleInclude | null
  /**
   * Filter which Role to delete.
  **/
  where: RoleWhereUniqueInput
}


/**
 * Role deleteMany
 */
export type RoleDeleteManyArgs = {
  where?: RoleWhereInput
}


/**
 * Role without action
 */
export type RoleArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: RoleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RoleInclude | null
}



/**
 * Model RolePermission
 */

export type RolePermission = {
  id: number
  permissionId: string
  roleName: string | null
}


export type AggregateRolePermission = {
  count: number
  avg: RolePermissionAvgAggregateOutputType | null
  sum: RolePermissionSumAggregateOutputType | null
  min: RolePermissionMinAggregateOutputType | null
  max: RolePermissionMaxAggregateOutputType | null
}

export type RolePermissionAvgAggregateOutputType = {
  id: number
}

export type RolePermissionSumAggregateOutputType = {
  id: number
}

export type RolePermissionMinAggregateOutputType = {
  id: number
}

export type RolePermissionMaxAggregateOutputType = {
  id: number
}


export type RolePermissionAvgAggregateInputType = {
  id?: true
}

export type RolePermissionSumAggregateInputType = {
  id?: true
}

export type RolePermissionMinAggregateInputType = {
  id?: true
}

export type RolePermissionMaxAggregateInputType = {
  id?: true
}

export type AggregateRolePermissionArgs = {
  where?: RolePermissionWhereInput
  orderBy?: Enumerable<RolePermissionOrderByInput>
  cursor?: RolePermissionWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<RolePermissionDistinctFieldEnum>
  count?: true
  avg?: RolePermissionAvgAggregateInputType
  sum?: RolePermissionSumAggregateInputType
  min?: RolePermissionMinAggregateInputType
  max?: RolePermissionMaxAggregateInputType
}

export type GetRolePermissionAggregateType<T extends AggregateRolePermissionArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetRolePermissionAggregateScalarType<T[P]>
}

export type GetRolePermissionAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof RolePermissionAvgAggregateOutputType ? RolePermissionAvgAggregateOutputType[P] : never
}
    
    

export type RolePermissionSelect = {
  id?: boolean
  permissionId?: boolean
  permission?: boolean | PermissionArgs
  Role?: boolean | RoleArgs
  roleName?: boolean
}

export type RolePermissionInclude = {
  permission?: boolean | PermissionArgs
  Role?: boolean | RoleArgs
}

export type RolePermissionGetPayload<
  S extends boolean | null | undefined | RolePermissionArgs,
  U = keyof S
> = S extends true
  ? RolePermission
  : S extends undefined
  ? never
  : S extends RolePermissionArgs | FindManyRolePermissionArgs
  ? 'include' extends U
    ? RolePermission  & {
      [P in TrueKeys<S['include']>]:
      P extends 'permission'
      ? PermissionGetPayload<S['include'][P]> :
      P extends 'Role'
      ? RoleGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof RolePermission ? RolePermission[P]
: 
      P extends 'permission'
      ? PermissionGetPayload<S['select'][P]> :
      P extends 'Role'
      ? RoleGetPayload<S['select'][P]> | null : never
    }
  : RolePermission
: RolePermission


export interface RolePermissionDelegate {
  /**
   * Find zero or one RolePermission.
   * @param {FindOneRolePermissionArgs} args - Arguments to find a RolePermission
   * @example
   * // Get one RolePermission
   * const rolePermission = await prisma.rolePermission.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneRolePermissionArgs>(
    args: Subset<T, FindOneRolePermissionArgs>
  ): CheckSelect<T, Prisma__RolePermissionClient<RolePermission | null>, Prisma__RolePermissionClient<RolePermissionGetPayload<T> | null>>
  /**
   * Find zero or more RolePermissions.
   * @param {FindManyRolePermissionArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all RolePermissions
   * const rolePermissions = await prisma.rolePermission.findMany()
   * 
   * // Get first 10 RolePermissions
   * const rolePermissions = await prisma.rolePermission.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const rolePermissionWithIdOnly = await prisma.rolePermission.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyRolePermissionArgs>(
    args?: Subset<T, FindManyRolePermissionArgs>
  ): CheckSelect<T, Promise<Array<RolePermission>>, Promise<Array<RolePermissionGetPayload<T>>>>
  /**
   * Create a RolePermission.
   * @param {RolePermissionCreateArgs} args - Arguments to create a RolePermission.
   * @example
   * // Create one RolePermission
   * const RolePermission = await prisma.rolePermission.create({
   *   data: {
   *     // ... data to create a RolePermission
   *   }
   * })
   * 
  **/
  create<T extends RolePermissionCreateArgs>(
    args: Subset<T, RolePermissionCreateArgs>
  ): CheckSelect<T, Prisma__RolePermissionClient<RolePermission>, Prisma__RolePermissionClient<RolePermissionGetPayload<T>>>
  /**
   * Delete a RolePermission.
   * @param {RolePermissionDeleteArgs} args - Arguments to delete one RolePermission.
   * @example
   * // Delete one RolePermission
   * const RolePermission = await prisma.rolePermission.delete({
   *   where: {
   *     // ... filter to delete one RolePermission
   *   }
   * })
   * 
  **/
  delete<T extends RolePermissionDeleteArgs>(
    args: Subset<T, RolePermissionDeleteArgs>
  ): CheckSelect<T, Prisma__RolePermissionClient<RolePermission>, Prisma__RolePermissionClient<RolePermissionGetPayload<T>>>
  /**
   * Update one RolePermission.
   * @param {RolePermissionUpdateArgs} args - Arguments to update one RolePermission.
   * @example
   * // Update one RolePermission
   * const rolePermission = await prisma.rolePermission.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends RolePermissionUpdateArgs>(
    args: Subset<T, RolePermissionUpdateArgs>
  ): CheckSelect<T, Prisma__RolePermissionClient<RolePermission>, Prisma__RolePermissionClient<RolePermissionGetPayload<T>>>
  /**
   * Delete zero or more RolePermissions.
   * @param {RolePermissionDeleteManyArgs} args - Arguments to filter RolePermissions to delete.
   * @example
   * // Delete a few RolePermissions
   * const { count } = await prisma.rolePermission.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends RolePermissionDeleteManyArgs>(
    args: Subset<T, RolePermissionDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more RolePermissions.
   * @param {RolePermissionUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many RolePermissions
   * const rolePermission = await prisma.rolePermission.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends RolePermissionUpdateManyArgs>(
    args: Subset<T, RolePermissionUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one RolePermission.
   * @param {RolePermissionUpsertArgs} args - Arguments to update or create a RolePermission.
   * @example
   * // Update or create a RolePermission
   * const rolePermission = await prisma.rolePermission.upsert({
   *   create: {
   *     // ... data to create a RolePermission
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the RolePermission we want to update
   *   }
   * })
  **/
  upsert<T extends RolePermissionUpsertArgs>(
    args: Subset<T, RolePermissionUpsertArgs>
  ): CheckSelect<T, Prisma__RolePermissionClient<RolePermission>, Prisma__RolePermissionClient<RolePermissionGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyRolePermissionArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateRolePermissionArgs>(args: Subset<T, AggregateRolePermissionArgs>): Promise<GetRolePermissionAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for RolePermission.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__RolePermissionClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  permission<T extends PermissionArgs = {}>(args?: Subset<T, PermissionArgs>): CheckSelect<T, Prisma__PermissionClient<Permission | null>, Prisma__PermissionClient<PermissionGetPayload<T> | null>>;

  Role<T extends RoleArgs = {}>(args?: Subset<T, RoleArgs>): CheckSelect<T, Prisma__RoleClient<Role | null>, Prisma__RoleClient<RoleGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * RolePermission findOne
 */
export type FindOneRolePermissionArgs = {
  /**
   * Select specific fields to fetch from the RolePermission
  **/
  select?: RolePermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RolePermissionInclude | null
  /**
   * Filter, which RolePermission to fetch.
  **/
  where: RolePermissionWhereUniqueInput
}


/**
 * RolePermission findMany
 */
export type FindManyRolePermissionArgs = {
  /**
   * Select specific fields to fetch from the RolePermission
  **/
  select?: RolePermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RolePermissionInclude | null
  /**
   * Filter, which RolePermissions to fetch.
  **/
  where?: RolePermissionWhereInput
  /**
   * Determine the order of the RolePermissions to fetch.
  **/
  orderBy?: Enumerable<RolePermissionOrderByInput>
  /**
   * Sets the position for listing RolePermissions.
  **/
  cursor?: RolePermissionWhereUniqueInput
  /**
   * The number of RolePermissions to fetch. If negative number, it will take RolePermissions before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` RolePermissions.
  **/
  skip?: number
  distinct?: Enumerable<RolePermissionDistinctFieldEnum>
}


/**
 * RolePermission create
 */
export type RolePermissionCreateArgs = {
  /**
   * Select specific fields to fetch from the RolePermission
  **/
  select?: RolePermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RolePermissionInclude | null
  /**
   * The data needed to create a RolePermission.
  **/
  data: RolePermissionCreateInput
}


/**
 * RolePermission update
 */
export type RolePermissionUpdateArgs = {
  /**
   * Select specific fields to fetch from the RolePermission
  **/
  select?: RolePermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RolePermissionInclude | null
  /**
   * The data needed to update a RolePermission.
  **/
  data: RolePermissionUpdateInput
  /**
   * Choose, which RolePermission to update.
  **/
  where: RolePermissionWhereUniqueInput
}


/**
 * RolePermission updateMany
 */
export type RolePermissionUpdateManyArgs = {
  data: RolePermissionUpdateManyMutationInput
  where?: RolePermissionWhereInput
}


/**
 * RolePermission upsert
 */
export type RolePermissionUpsertArgs = {
  /**
   * Select specific fields to fetch from the RolePermission
  **/
  select?: RolePermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RolePermissionInclude | null
  /**
   * The filter to search for the RolePermission to update in case it exists.
  **/
  where: RolePermissionWhereUniqueInput
  /**
   * In case the RolePermission found by the `where` argument doesn't exist, create a new RolePermission with this data.
  **/
  create: RolePermissionCreateInput
  /**
   * In case the RolePermission was found with the provided `where` argument, update it with this data.
  **/
  update: RolePermissionUpdateInput
}


/**
 * RolePermission delete
 */
export type RolePermissionDeleteArgs = {
  /**
   * Select specific fields to fetch from the RolePermission
  **/
  select?: RolePermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RolePermissionInclude | null
  /**
   * Filter which RolePermission to delete.
  **/
  where: RolePermissionWhereUniqueInput
}


/**
 * RolePermission deleteMany
 */
export type RolePermissionDeleteManyArgs = {
  where?: RolePermissionWhereInput
}


/**
 * RolePermission without action
 */
export type RolePermissionArgs = {
  /**
   * Select specific fields to fetch from the RolePermission
  **/
  select?: RolePermissionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RolePermissionInclude | null
}



/**
 * Deep Input Types
 */


export type UserWhereInput = {
  AND?: Enumerable<UserWhereInput>
  OR?: Array<UserWhereInput>
  NOT?: Enumerable<UserWhereInput>
  id?: number | IntFilter
  name?: string | StringNullableFilter | null
  userPermission?: UserPermissionListRelationFilter
}

export type UserOrderByInput = {
  id?: SortOrder
  name?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
}

export type PermissionWhereInput = {
  AND?: Enumerable<PermissionWhereInput>
  OR?: Array<PermissionWhereInput>
  NOT?: Enumerable<PermissionWhereInput>
  action?: string | StringFilter
  can?: CanType | EnumCanTypeFilter
  parent?: string | StringNullableFilter | null
  permission?: PermissionWhereInput | null
  subPermission?: PermissionListRelationFilter
  UserPermission?: UserPermissionListRelationFilter
  RolePermission?: RolePermissionListRelationFilter
}

export type PermissionOrderByInput = {
  action?: SortOrder
  can?: SortOrder
  parent?: SortOrder
}

export type PermissionWhereUniqueInput = {
  action?: string
}

export type UserPermissionWhereInput = {
  AND?: Enumerable<UserPermissionWhereInput>
  OR?: Array<UserPermissionWhereInput>
  NOT?: Enumerable<UserPermissionWhereInput>
  id?: number | IntFilter
  userId?: number | IntFilter
  user?: UserWhereInput | null
  permissionId?: string | StringFilter
  permission?: PermissionWhereInput | null
}

export type UserPermissionOrderByInput = {
  id?: SortOrder
  userId?: SortOrder
  permissionId?: SortOrder
}

export type UserPermissionWhereUniqueInput = {
  id?: number
}

export type RoleWhereInput = {
  AND?: Enumerable<RoleWhereInput>
  OR?: Array<RoleWhereInput>
  NOT?: Enumerable<RoleWhereInput>
  name?: string | StringFilter
  rolePermission?: RolePermissionListRelationFilter
}

export type RoleOrderByInput = {
  name?: SortOrder
}

export type RoleWhereUniqueInput = {
  name?: string
}

export type RolePermissionWhereInput = {
  AND?: Enumerable<RolePermissionWhereInput>
  OR?: Array<RolePermissionWhereInput>
  NOT?: Enumerable<RolePermissionWhereInput>
  id?: number | IntFilter
  permissionId?: string | StringFilter
  permission?: PermissionWhereInput | null
  Role?: RoleWhereInput | null
  roleName?: string | StringNullableFilter | null
}

export type RolePermissionOrderByInput = {
  id?: SortOrder
  permissionId?: SortOrder
  roleName?: SortOrder
}

export type RolePermissionWhereUniqueInput = {
  id?: number
}

export type UserCreateInput = {
  name?: string | null
  userPermission?: UserPermissionCreateManyWithoutUserInput
}

export type UserUpdateInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  userPermission?: UserPermissionUpdateManyWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type PermissionCreateInput = {
  action: string
  can?: CanType
  permission?: PermissionCreateOneWithoutSubPermissionInput
  subPermission?: PermissionCreateManyWithoutPermissionInput
  UserPermission?: UserPermissionCreateManyWithoutPermissionInput
  RolePermission?: RolePermissionCreateManyWithoutPermissionInput
}

export type PermissionUpdateInput = {
  action?: string | StringFieldUpdateOperationsInput
  can?: CanType | EnumCanTypeFieldUpdateOperationsInput
  permission?: PermissionUpdateOneWithoutSubPermissionInput
  subPermission?: PermissionUpdateManyWithoutPermissionInput
  UserPermission?: UserPermissionUpdateManyWithoutPermissionInput
  RolePermission?: RolePermissionUpdateManyWithoutPermissionInput
}

export type PermissionUpdateManyMutationInput = {
  action?: string | StringFieldUpdateOperationsInput
  can?: CanType | EnumCanTypeFieldUpdateOperationsInput
}

export type UserPermissionCreateInput = {
  user: UserCreateOneWithoutUserPermissionInput
  permission: PermissionCreateOneWithoutUserPermissionInput
}

export type UserPermissionUpdateInput = {
  user?: UserUpdateOneRequiredWithoutUserPermissionInput
  permission?: PermissionUpdateOneRequiredWithoutUserPermissionInput
}

export type UserPermissionUpdateManyMutationInput = {

}

export type RoleCreateInput = {
  name: string
  rolePermission?: RolePermissionCreateManyWithoutRoleInput
}

export type RoleUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput
  rolePermission?: RolePermissionUpdateManyWithoutRoleInput
}

export type RoleUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput
}

export type RolePermissionCreateInput = {
  permission: PermissionCreateOneWithoutRolePermissionInput
  Role?: RoleCreateOneWithoutRolePermissionInput
}

export type RolePermissionUpdateInput = {
  permission?: PermissionUpdateOneRequiredWithoutRolePermissionInput
  Role?: RoleUpdateOneWithoutRolePermissionInput
}

export type RolePermissionUpdateManyMutationInput = {

}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type StringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
  not?: string | NestedStringNullableFilter | null
}

export type UserPermissionListRelationFilter = {
  every?: UserPermissionWhereInput
  some?: UserPermissionWhereInput
  none?: UserPermissionWhereInput
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type EnumCanTypeFilter = {
  equals?: CanType
  in?: Enumerable<CanType>
  notIn?: Enumerable<CanType>
  not?: CanType | NestedEnumCanTypeFilter
}

export type PermissionRelationFilter = {
  is?: PermissionWhereInput | null
  isNot?: PermissionWhereInput | null
}

export type PermissionListRelationFilter = {
  every?: PermissionWhereInput
  some?: PermissionWhereInput
  none?: PermissionWhereInput
}

export type RolePermissionListRelationFilter = {
  every?: RolePermissionWhereInput
  some?: RolePermissionWhereInput
  none?: RolePermissionWhereInput
}

export type UserRelationFilter = {
  is?: UserWhereInput | null
  isNot?: UserWhereInput | null
}

export type RoleRelationFilter = {
  is?: RoleWhereInput | null
  isNot?: RoleWhereInput | null
}

export type UserPermissionCreateManyWithoutUserInput = {
  create?: Enumerable<UserPermissionCreateWithoutUserInput>
  connect?: Enumerable<UserPermissionWhereUniqueInput>
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null
}

export type UserPermissionUpdateManyWithoutUserInput = {
  create?: Enumerable<UserPermissionCreateWithoutUserInput>
  connect?: Enumerable<UserPermissionWhereUniqueInput>
  set?: Enumerable<UserPermissionWhereUniqueInput>
  disconnect?: Enumerable<UserPermissionWhereUniqueInput>
  delete?: Enumerable<UserPermissionWhereUniqueInput>
  update?: Enumerable<UserPermissionUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: Enumerable<UserPermissionUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<UserPermissionScalarWhereInput>
  upsert?: Enumerable<UserPermissionUpsertWithWhereUniqueWithoutUserInput>
}

export type PermissionCreateOneWithoutSubPermissionInput = {
  create?: PermissionCreateWithoutSubPermissionInput
  connect?: PermissionWhereUniqueInput
}

export type PermissionCreateManyWithoutPermissionInput = {
  create?: Enumerable<PermissionCreateWithoutPermissionInput>
  connect?: Enumerable<PermissionWhereUniqueInput>
}

export type UserPermissionCreateManyWithoutPermissionInput = {
  create?: Enumerable<UserPermissionCreateWithoutPermissionInput>
  connect?: Enumerable<UserPermissionWhereUniqueInput>
}

export type RolePermissionCreateManyWithoutPermissionInput = {
  create?: Enumerable<RolePermissionCreateWithoutPermissionInput>
  connect?: Enumerable<RolePermissionWhereUniqueInput>
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type EnumCanTypeFieldUpdateOperationsInput = {
  set?: CanType
}

export type PermissionUpdateOneWithoutSubPermissionInput = {
  create?: PermissionCreateWithoutSubPermissionInput
  connect?: PermissionWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: PermissionUpdateWithoutSubPermissionDataInput
  upsert?: PermissionUpsertWithoutSubPermissionInput
}

export type PermissionUpdateManyWithoutPermissionInput = {
  create?: Enumerable<PermissionCreateWithoutPermissionInput>
  connect?: Enumerable<PermissionWhereUniqueInput>
  set?: Enumerable<PermissionWhereUniqueInput>
  disconnect?: Enumerable<PermissionWhereUniqueInput>
  delete?: Enumerable<PermissionWhereUniqueInput>
  update?: Enumerable<PermissionUpdateWithWhereUniqueWithoutPermissionInput>
  updateMany?: Enumerable<PermissionUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<PermissionScalarWhereInput>
  upsert?: Enumerable<PermissionUpsertWithWhereUniqueWithoutPermissionInput>
}

export type UserPermissionUpdateManyWithoutPermissionInput = {
  create?: Enumerable<UserPermissionCreateWithoutPermissionInput>
  connect?: Enumerable<UserPermissionWhereUniqueInput>
  set?: Enumerable<UserPermissionWhereUniqueInput>
  disconnect?: Enumerable<UserPermissionWhereUniqueInput>
  delete?: Enumerable<UserPermissionWhereUniqueInput>
  update?: Enumerable<UserPermissionUpdateWithWhereUniqueWithoutPermissionInput>
  updateMany?: Enumerable<UserPermissionUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<UserPermissionScalarWhereInput>
  upsert?: Enumerable<UserPermissionUpsertWithWhereUniqueWithoutPermissionInput>
}

export type RolePermissionUpdateManyWithoutPermissionInput = {
  create?: Enumerable<RolePermissionCreateWithoutPermissionInput>
  connect?: Enumerable<RolePermissionWhereUniqueInput>
  set?: Enumerable<RolePermissionWhereUniqueInput>
  disconnect?: Enumerable<RolePermissionWhereUniqueInput>
  delete?: Enumerable<RolePermissionWhereUniqueInput>
  update?: Enumerable<RolePermissionUpdateWithWhereUniqueWithoutPermissionInput>
  updateMany?: Enumerable<RolePermissionUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<RolePermissionScalarWhereInput>
  upsert?: Enumerable<RolePermissionUpsertWithWhereUniqueWithoutPermissionInput>
}

export type UserCreateOneWithoutUserPermissionInput = {
  create?: UserCreateWithoutUserPermissionInput
  connect?: UserWhereUniqueInput
}

export type PermissionCreateOneWithoutUserPermissionInput = {
  create?: PermissionCreateWithoutUserPermissionInput
  connect?: PermissionWhereUniqueInput
}

export type UserUpdateOneRequiredWithoutUserPermissionInput = {
  create?: UserCreateWithoutUserPermissionInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutUserPermissionDataInput
  upsert?: UserUpsertWithoutUserPermissionInput
}

export type PermissionUpdateOneRequiredWithoutUserPermissionInput = {
  create?: PermissionCreateWithoutUserPermissionInput
  connect?: PermissionWhereUniqueInput
  update?: PermissionUpdateWithoutUserPermissionDataInput
  upsert?: PermissionUpsertWithoutUserPermissionInput
}

export type RolePermissionCreateManyWithoutRoleInput = {
  create?: Enumerable<RolePermissionCreateWithoutRoleInput>
  connect?: Enumerable<RolePermissionWhereUniqueInput>
}

export type RolePermissionUpdateManyWithoutRoleInput = {
  create?: Enumerable<RolePermissionCreateWithoutRoleInput>
  connect?: Enumerable<RolePermissionWhereUniqueInput>
  set?: Enumerable<RolePermissionWhereUniqueInput>
  disconnect?: Enumerable<RolePermissionWhereUniqueInput>
  delete?: Enumerable<RolePermissionWhereUniqueInput>
  update?: Enumerable<RolePermissionUpdateWithWhereUniqueWithoutRoleInput>
  updateMany?: Enumerable<RolePermissionUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<RolePermissionScalarWhereInput>
  upsert?: Enumerable<RolePermissionUpsertWithWhereUniqueWithoutRoleInput>
}

export type PermissionCreateOneWithoutRolePermissionInput = {
  create?: PermissionCreateWithoutRolePermissionInput
  connect?: PermissionWhereUniqueInput
}

export type RoleCreateOneWithoutRolePermissionInput = {
  create?: RoleCreateWithoutRolePermissionInput
  connect?: RoleWhereUniqueInput
}

export type PermissionUpdateOneRequiredWithoutRolePermissionInput = {
  create?: PermissionCreateWithoutRolePermissionInput
  connect?: PermissionWhereUniqueInput
  update?: PermissionUpdateWithoutRolePermissionDataInput
  upsert?: PermissionUpsertWithoutRolePermissionInput
}

export type RoleUpdateOneWithoutRolePermissionInput = {
  create?: RoleCreateWithoutRolePermissionInput
  connect?: RoleWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: RoleUpdateWithoutRolePermissionDataInput
  upsert?: RoleUpsertWithoutRolePermissionInput
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedIntFilter | null
}

export type NestedStringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
  not?: NestedStringNullableFilter | null
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringFilter | null
}

export type NestedEnumCanTypeFilter = {
  equals?: CanType
  in?: Enumerable<CanType>
  notIn?: Enumerable<CanType>
  not?: NestedEnumCanTypeFilter | null
}

export type UserPermissionCreateWithoutUserInput = {
  permission: PermissionCreateOneWithoutUserPermissionInput
}

export type UserPermissionUpdateWithWhereUniqueWithoutUserInput = {
  where: UserPermissionWhereUniqueInput
  data: UserPermissionUpdateWithoutUserDataInput
}

export type UserPermissionUpdateManyWithWhereNestedInput = {
  where: UserPermissionScalarWhereInput
  data: UserPermissionUpdateManyDataInput
}

export type UserPermissionScalarWhereInput = {
  AND?: Enumerable<UserPermissionScalarWhereInput>
  OR?: Array<UserPermissionScalarWhereInput>
  NOT?: Enumerable<UserPermissionScalarWhereInput>
  id?: number | IntFilter
  userId?: number | IntFilter
  permissionId?: string | StringFilter
}

export type UserPermissionUpsertWithWhereUniqueWithoutUserInput = {
  where: UserPermissionWhereUniqueInput
  update: UserPermissionUpdateWithoutUserDataInput
  create: UserPermissionCreateWithoutUserInput
}

export type PermissionCreateWithoutSubPermissionInput = {
  action: string
  can?: CanType
  permission?: PermissionCreateOneWithoutSubPermissionInput
  UserPermission?: UserPermissionCreateManyWithoutPermissionInput
  RolePermission?: RolePermissionCreateManyWithoutPermissionInput
}

export type PermissionCreateWithoutPermissionInput = {
  action: string
  can?: CanType
  subPermission?: PermissionCreateManyWithoutPermissionInput
  UserPermission?: UserPermissionCreateManyWithoutPermissionInput
  RolePermission?: RolePermissionCreateManyWithoutPermissionInput
}

export type UserPermissionCreateWithoutPermissionInput = {
  user: UserCreateOneWithoutUserPermissionInput
}

export type RolePermissionCreateWithoutPermissionInput = {
  Role?: RoleCreateOneWithoutRolePermissionInput
}

export type PermissionUpdateWithoutSubPermissionDataInput = {
  action?: string | StringFieldUpdateOperationsInput
  can?: CanType | EnumCanTypeFieldUpdateOperationsInput
  permission?: PermissionUpdateOneWithoutSubPermissionInput
  UserPermission?: UserPermissionUpdateManyWithoutPermissionInput
  RolePermission?: RolePermissionUpdateManyWithoutPermissionInput
}

export type PermissionUpsertWithoutSubPermissionInput = {
  update: PermissionUpdateWithoutSubPermissionDataInput
  create: PermissionCreateWithoutSubPermissionInput
}

export type PermissionUpdateWithWhereUniqueWithoutPermissionInput = {
  where: PermissionWhereUniqueInput
  data: PermissionUpdateWithoutPermissionDataInput
}

export type PermissionUpdateManyWithWhereNestedInput = {
  where: PermissionScalarWhereInput
  data: PermissionUpdateManyDataInput
}

export type PermissionScalarWhereInput = {
  AND?: Enumerable<PermissionScalarWhereInput>
  OR?: Array<PermissionScalarWhereInput>
  NOT?: Enumerable<PermissionScalarWhereInput>
  action?: string | StringFilter
  can?: CanType | EnumCanTypeFilter
  parent?: string | StringNullableFilter | null
}

export type PermissionUpsertWithWhereUniqueWithoutPermissionInput = {
  where: PermissionWhereUniqueInput
  update: PermissionUpdateWithoutPermissionDataInput
  create: PermissionCreateWithoutPermissionInput
}

export type UserPermissionUpdateWithWhereUniqueWithoutPermissionInput = {
  where: UserPermissionWhereUniqueInput
  data: UserPermissionUpdateWithoutPermissionDataInput
}

export type UserPermissionUpsertWithWhereUniqueWithoutPermissionInput = {
  where: UserPermissionWhereUniqueInput
  update: UserPermissionUpdateWithoutPermissionDataInput
  create: UserPermissionCreateWithoutPermissionInput
}

export type RolePermissionUpdateWithWhereUniqueWithoutPermissionInput = {
  where: RolePermissionWhereUniqueInput
  data: RolePermissionUpdateWithoutPermissionDataInput
}

export type RolePermissionUpdateManyWithWhereNestedInput = {
  where: RolePermissionScalarWhereInput
  data: RolePermissionUpdateManyDataInput
}

export type RolePermissionScalarWhereInput = {
  AND?: Enumerable<RolePermissionScalarWhereInput>
  OR?: Array<RolePermissionScalarWhereInput>
  NOT?: Enumerable<RolePermissionScalarWhereInput>
  id?: number | IntFilter
  permissionId?: string | StringFilter
  roleName?: string | StringNullableFilter | null
}

export type RolePermissionUpsertWithWhereUniqueWithoutPermissionInput = {
  where: RolePermissionWhereUniqueInput
  update: RolePermissionUpdateWithoutPermissionDataInput
  create: RolePermissionCreateWithoutPermissionInput
}

export type UserCreateWithoutUserPermissionInput = {
  name?: string | null
}

export type PermissionCreateWithoutUserPermissionInput = {
  action: string
  can?: CanType
  permission?: PermissionCreateOneWithoutSubPermissionInput
  subPermission?: PermissionCreateManyWithoutPermissionInput
  RolePermission?: RolePermissionCreateManyWithoutPermissionInput
}

export type UserUpdateWithoutUserPermissionDataInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type UserUpsertWithoutUserPermissionInput = {
  update: UserUpdateWithoutUserPermissionDataInput
  create: UserCreateWithoutUserPermissionInput
}

export type PermissionUpdateWithoutUserPermissionDataInput = {
  action?: string | StringFieldUpdateOperationsInput
  can?: CanType | EnumCanTypeFieldUpdateOperationsInput
  permission?: PermissionUpdateOneWithoutSubPermissionInput
  subPermission?: PermissionUpdateManyWithoutPermissionInput
  RolePermission?: RolePermissionUpdateManyWithoutPermissionInput
}

export type PermissionUpsertWithoutUserPermissionInput = {
  update: PermissionUpdateWithoutUserPermissionDataInput
  create: PermissionCreateWithoutUserPermissionInput
}

export type RolePermissionCreateWithoutRoleInput = {
  permission: PermissionCreateOneWithoutRolePermissionInput
}

export type RolePermissionUpdateWithWhereUniqueWithoutRoleInput = {
  where: RolePermissionWhereUniqueInput
  data: RolePermissionUpdateWithoutRoleDataInput
}

export type RolePermissionUpsertWithWhereUniqueWithoutRoleInput = {
  where: RolePermissionWhereUniqueInput
  update: RolePermissionUpdateWithoutRoleDataInput
  create: RolePermissionCreateWithoutRoleInput
}

export type PermissionCreateWithoutRolePermissionInput = {
  action: string
  can?: CanType
  permission?: PermissionCreateOneWithoutSubPermissionInput
  subPermission?: PermissionCreateManyWithoutPermissionInput
  UserPermission?: UserPermissionCreateManyWithoutPermissionInput
}

export type RoleCreateWithoutRolePermissionInput = {
  name: string
}

export type PermissionUpdateWithoutRolePermissionDataInput = {
  action?: string | StringFieldUpdateOperationsInput
  can?: CanType | EnumCanTypeFieldUpdateOperationsInput
  permission?: PermissionUpdateOneWithoutSubPermissionInput
  subPermission?: PermissionUpdateManyWithoutPermissionInput
  UserPermission?: UserPermissionUpdateManyWithoutPermissionInput
}

export type PermissionUpsertWithoutRolePermissionInput = {
  update: PermissionUpdateWithoutRolePermissionDataInput
  create: PermissionCreateWithoutRolePermissionInput
}

export type RoleUpdateWithoutRolePermissionDataInput = {
  name?: string | StringFieldUpdateOperationsInput
}

export type RoleUpsertWithoutRolePermissionInput = {
  update: RoleUpdateWithoutRolePermissionDataInput
  create: RoleCreateWithoutRolePermissionInput
}

export type UserPermissionUpdateWithoutUserDataInput = {
  permission?: PermissionUpdateOneRequiredWithoutUserPermissionInput
}

export type UserPermissionUpdateManyDataInput = {

}

export type PermissionUpdateWithoutPermissionDataInput = {
  action?: string | StringFieldUpdateOperationsInput
  can?: CanType | EnumCanTypeFieldUpdateOperationsInput
  subPermission?: PermissionUpdateManyWithoutPermissionInput
  UserPermission?: UserPermissionUpdateManyWithoutPermissionInput
  RolePermission?: RolePermissionUpdateManyWithoutPermissionInput
}

export type PermissionUpdateManyDataInput = {
  action?: string | StringFieldUpdateOperationsInput
  can?: CanType | EnumCanTypeFieldUpdateOperationsInput
}

export type UserPermissionUpdateWithoutPermissionDataInput = {
  user?: UserUpdateOneRequiredWithoutUserPermissionInput
}

export type RolePermissionUpdateWithoutPermissionDataInput = {
  Role?: RoleUpdateOneWithoutRolePermissionInput
}

export type RolePermissionUpdateManyDataInput = {

}

export type RolePermissionUpdateWithoutRoleDataInput = {
  permission?: PermissionUpdateOneRequiredWithoutRolePermissionInput
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
