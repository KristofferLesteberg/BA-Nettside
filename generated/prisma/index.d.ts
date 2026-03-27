
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Catorgory
 * 
 */
export type Catorgory = $Result.DefaultSelection<Prisma.$CatorgoryPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Request
 * 
 */
export type Request = $Result.DefaultSelection<Prisma.$RequestPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Catorgories
 * const catorgories = await prisma.catorgory.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Catorgories
   * const catorgories = await prisma.catorgory.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.catorgory`: Exposes CRUD operations for the **Catorgory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Catorgories
    * const catorgories = await prisma.catorgory.findMany()
    * ```
    */
  get catorgory(): Prisma.CatorgoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.request`: Exposes CRUD operations for the **Request** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Requests
    * const requests = await prisma.request.findMany()
    * ```
    */
  get request(): Prisma.RequestDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Catorgory: 'Catorgory',
    Product: 'Product',
    Request: 'Request'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "catorgory" | "product" | "request"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Catorgory: {
        payload: Prisma.$CatorgoryPayload<ExtArgs>
        fields: Prisma.CatorgoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CatorgoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatorgoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CatorgoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatorgoryPayload>
          }
          findFirst: {
            args: Prisma.CatorgoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatorgoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CatorgoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatorgoryPayload>
          }
          findMany: {
            args: Prisma.CatorgoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatorgoryPayload>[]
          }
          create: {
            args: Prisma.CatorgoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatorgoryPayload>
          }
          createMany: {
            args: Prisma.CatorgoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CatorgoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatorgoryPayload>[]
          }
          delete: {
            args: Prisma.CatorgoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatorgoryPayload>
          }
          update: {
            args: Prisma.CatorgoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatorgoryPayload>
          }
          deleteMany: {
            args: Prisma.CatorgoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CatorgoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CatorgoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatorgoryPayload>[]
          }
          upsert: {
            args: Prisma.CatorgoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatorgoryPayload>
          }
          aggregate: {
            args: Prisma.CatorgoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCatorgory>
          }
          groupBy: {
            args: Prisma.CatorgoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CatorgoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CatorgoryCountArgs<ExtArgs>
            result: $Utils.Optional<CatorgoryCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Request: {
        payload: Prisma.$RequestPayload<ExtArgs>
        fields: Prisma.RequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>
          }
          findFirst: {
            args: Prisma.RequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>
          }
          findMany: {
            args: Prisma.RequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>[]
          }
          create: {
            args: Prisma.RequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>
          }
          createMany: {
            args: Prisma.RequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>[]
          }
          delete: {
            args: Prisma.RequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>
          }
          update: {
            args: Prisma.RequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>
          }
          deleteMany: {
            args: Prisma.RequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>[]
          }
          upsert: {
            args: Prisma.RequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>
          }
          aggregate: {
            args: Prisma.RequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequest>
          }
          groupBy: {
            args: Prisma.RequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.RequestCountArgs<ExtArgs>
            result: $Utils.Optional<RequestCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    catorgory?: CatorgoryOmit
    product?: ProductOmit
    request?: RequestOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CatorgoryCountOutputType
   */

  export type CatorgoryCountOutputType = {
    products: number
  }

  export type CatorgoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | CatorgoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CatorgoryCountOutputType without action
   */
  export type CatorgoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatorgoryCountOutputType
     */
    select?: CatorgoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CatorgoryCountOutputType without action
   */
  export type CatorgoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Catorgory
   */

  export type AggregateCatorgory = {
    _count: CatorgoryCountAggregateOutputType | null
    _avg: CatorgoryAvgAggregateOutputType | null
    _sum: CatorgorySumAggregateOutputType | null
    _min: CatorgoryMinAggregateOutputType | null
    _max: CatorgoryMaxAggregateOutputType | null
  }

  export type CatorgoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CatorgorySumAggregateOutputType = {
    id: number | null
  }

  export type CatorgoryMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type CatorgoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type CatorgoryCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type CatorgoryAvgAggregateInputType = {
    id?: true
  }

  export type CatorgorySumAggregateInputType = {
    id?: true
  }

  export type CatorgoryMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type CatorgoryMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type CatorgoryCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type CatorgoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Catorgory to aggregate.
     */
    where?: CatorgoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Catorgories to fetch.
     */
    orderBy?: CatorgoryOrderByWithRelationInput | CatorgoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CatorgoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Catorgories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Catorgories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Catorgories
    **/
    _count?: true | CatorgoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CatorgoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CatorgorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CatorgoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CatorgoryMaxAggregateInputType
  }

  export type GetCatorgoryAggregateType<T extends CatorgoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCatorgory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCatorgory[P]>
      : GetScalarType<T[P], AggregateCatorgory[P]>
  }




  export type CatorgoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CatorgoryWhereInput
    orderBy?: CatorgoryOrderByWithAggregationInput | CatorgoryOrderByWithAggregationInput[]
    by: CatorgoryScalarFieldEnum[] | CatorgoryScalarFieldEnum
    having?: CatorgoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CatorgoryCountAggregateInputType | true
    _avg?: CatorgoryAvgAggregateInputType
    _sum?: CatorgorySumAggregateInputType
    _min?: CatorgoryMinAggregateInputType
    _max?: CatorgoryMaxAggregateInputType
  }

  export type CatorgoryGroupByOutputType = {
    id: number
    name: string
    _count: CatorgoryCountAggregateOutputType | null
    _avg: CatorgoryAvgAggregateOutputType | null
    _sum: CatorgorySumAggregateOutputType | null
    _min: CatorgoryMinAggregateOutputType | null
    _max: CatorgoryMaxAggregateOutputType | null
  }

  type GetCatorgoryGroupByPayload<T extends CatorgoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CatorgoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CatorgoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CatorgoryGroupByOutputType[P]>
            : GetScalarType<T[P], CatorgoryGroupByOutputType[P]>
        }
      >
    >


  export type CatorgorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    products?: boolean | Catorgory$productsArgs<ExtArgs>
    _count?: boolean | CatorgoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["catorgory"]>

  export type CatorgorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["catorgory"]>

  export type CatorgorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["catorgory"]>

  export type CatorgorySelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type CatorgoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["catorgory"]>
  export type CatorgoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Catorgory$productsArgs<ExtArgs>
    _count?: boolean | CatorgoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CatorgoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CatorgoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CatorgoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Catorgory"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["catorgory"]>
    composites: {}
  }

  type CatorgoryGetPayload<S extends boolean | null | undefined | CatorgoryDefaultArgs> = $Result.GetResult<Prisma.$CatorgoryPayload, S>

  type CatorgoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CatorgoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CatorgoryCountAggregateInputType | true
    }

  export interface CatorgoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Catorgory'], meta: { name: 'Catorgory' } }
    /**
     * Find zero or one Catorgory that matches the filter.
     * @param {CatorgoryFindUniqueArgs} args - Arguments to find a Catorgory
     * @example
     * // Get one Catorgory
     * const catorgory = await prisma.catorgory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CatorgoryFindUniqueArgs>(args: SelectSubset<T, CatorgoryFindUniqueArgs<ExtArgs>>): Prisma__CatorgoryClient<$Result.GetResult<Prisma.$CatorgoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Catorgory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CatorgoryFindUniqueOrThrowArgs} args - Arguments to find a Catorgory
     * @example
     * // Get one Catorgory
     * const catorgory = await prisma.catorgory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CatorgoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CatorgoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CatorgoryClient<$Result.GetResult<Prisma.$CatorgoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Catorgory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatorgoryFindFirstArgs} args - Arguments to find a Catorgory
     * @example
     * // Get one Catorgory
     * const catorgory = await prisma.catorgory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CatorgoryFindFirstArgs>(args?: SelectSubset<T, CatorgoryFindFirstArgs<ExtArgs>>): Prisma__CatorgoryClient<$Result.GetResult<Prisma.$CatorgoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Catorgory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatorgoryFindFirstOrThrowArgs} args - Arguments to find a Catorgory
     * @example
     * // Get one Catorgory
     * const catorgory = await prisma.catorgory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CatorgoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CatorgoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CatorgoryClient<$Result.GetResult<Prisma.$CatorgoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Catorgories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatorgoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Catorgories
     * const catorgories = await prisma.catorgory.findMany()
     * 
     * // Get first 10 Catorgories
     * const catorgories = await prisma.catorgory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const catorgoryWithIdOnly = await prisma.catorgory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CatorgoryFindManyArgs>(args?: SelectSubset<T, CatorgoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatorgoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Catorgory.
     * @param {CatorgoryCreateArgs} args - Arguments to create a Catorgory.
     * @example
     * // Create one Catorgory
     * const Catorgory = await prisma.catorgory.create({
     *   data: {
     *     // ... data to create a Catorgory
     *   }
     * })
     * 
     */
    create<T extends CatorgoryCreateArgs>(args: SelectSubset<T, CatorgoryCreateArgs<ExtArgs>>): Prisma__CatorgoryClient<$Result.GetResult<Prisma.$CatorgoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Catorgories.
     * @param {CatorgoryCreateManyArgs} args - Arguments to create many Catorgories.
     * @example
     * // Create many Catorgories
     * const catorgory = await prisma.catorgory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CatorgoryCreateManyArgs>(args?: SelectSubset<T, CatorgoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Catorgories and returns the data saved in the database.
     * @param {CatorgoryCreateManyAndReturnArgs} args - Arguments to create many Catorgories.
     * @example
     * // Create many Catorgories
     * const catorgory = await prisma.catorgory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Catorgories and only return the `id`
     * const catorgoryWithIdOnly = await prisma.catorgory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CatorgoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CatorgoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatorgoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Catorgory.
     * @param {CatorgoryDeleteArgs} args - Arguments to delete one Catorgory.
     * @example
     * // Delete one Catorgory
     * const Catorgory = await prisma.catorgory.delete({
     *   where: {
     *     // ... filter to delete one Catorgory
     *   }
     * })
     * 
     */
    delete<T extends CatorgoryDeleteArgs>(args: SelectSubset<T, CatorgoryDeleteArgs<ExtArgs>>): Prisma__CatorgoryClient<$Result.GetResult<Prisma.$CatorgoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Catorgory.
     * @param {CatorgoryUpdateArgs} args - Arguments to update one Catorgory.
     * @example
     * // Update one Catorgory
     * const catorgory = await prisma.catorgory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CatorgoryUpdateArgs>(args: SelectSubset<T, CatorgoryUpdateArgs<ExtArgs>>): Prisma__CatorgoryClient<$Result.GetResult<Prisma.$CatorgoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Catorgories.
     * @param {CatorgoryDeleteManyArgs} args - Arguments to filter Catorgories to delete.
     * @example
     * // Delete a few Catorgories
     * const { count } = await prisma.catorgory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CatorgoryDeleteManyArgs>(args?: SelectSubset<T, CatorgoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Catorgories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatorgoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Catorgories
     * const catorgory = await prisma.catorgory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CatorgoryUpdateManyArgs>(args: SelectSubset<T, CatorgoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Catorgories and returns the data updated in the database.
     * @param {CatorgoryUpdateManyAndReturnArgs} args - Arguments to update many Catorgories.
     * @example
     * // Update many Catorgories
     * const catorgory = await prisma.catorgory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Catorgories and only return the `id`
     * const catorgoryWithIdOnly = await prisma.catorgory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CatorgoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CatorgoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatorgoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Catorgory.
     * @param {CatorgoryUpsertArgs} args - Arguments to update or create a Catorgory.
     * @example
     * // Update or create a Catorgory
     * const catorgory = await prisma.catorgory.upsert({
     *   create: {
     *     // ... data to create a Catorgory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Catorgory we want to update
     *   }
     * })
     */
    upsert<T extends CatorgoryUpsertArgs>(args: SelectSubset<T, CatorgoryUpsertArgs<ExtArgs>>): Prisma__CatorgoryClient<$Result.GetResult<Prisma.$CatorgoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Catorgories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatorgoryCountArgs} args - Arguments to filter Catorgories to count.
     * @example
     * // Count the number of Catorgories
     * const count = await prisma.catorgory.count({
     *   where: {
     *     // ... the filter for the Catorgories we want to count
     *   }
     * })
    **/
    count<T extends CatorgoryCountArgs>(
      args?: Subset<T, CatorgoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CatorgoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Catorgory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatorgoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CatorgoryAggregateArgs>(args: Subset<T, CatorgoryAggregateArgs>): Prisma.PrismaPromise<GetCatorgoryAggregateType<T>>

    /**
     * Group by Catorgory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatorgoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CatorgoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CatorgoryGroupByArgs['orderBy'] }
        : { orderBy?: CatorgoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CatorgoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCatorgoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Catorgory model
   */
  readonly fields: CatorgoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Catorgory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CatorgoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Catorgory$productsArgs<ExtArgs> = {}>(args?: Subset<T, Catorgory$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Catorgory model
   */
  interface CatorgoryFieldRefs {
    readonly id: FieldRef<"Catorgory", 'Int'>
    readonly name: FieldRef<"Catorgory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Catorgory findUnique
   */
  export type CatorgoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catorgory
     */
    select?: CatorgorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catorgory
     */
    omit?: CatorgoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatorgoryInclude<ExtArgs> | null
    /**
     * Filter, which Catorgory to fetch.
     */
    where: CatorgoryWhereUniqueInput
  }

  /**
   * Catorgory findUniqueOrThrow
   */
  export type CatorgoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catorgory
     */
    select?: CatorgorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catorgory
     */
    omit?: CatorgoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatorgoryInclude<ExtArgs> | null
    /**
     * Filter, which Catorgory to fetch.
     */
    where: CatorgoryWhereUniqueInput
  }

  /**
   * Catorgory findFirst
   */
  export type CatorgoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catorgory
     */
    select?: CatorgorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catorgory
     */
    omit?: CatorgoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatorgoryInclude<ExtArgs> | null
    /**
     * Filter, which Catorgory to fetch.
     */
    where?: CatorgoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Catorgories to fetch.
     */
    orderBy?: CatorgoryOrderByWithRelationInput | CatorgoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Catorgories.
     */
    cursor?: CatorgoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Catorgories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Catorgories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Catorgories.
     */
    distinct?: CatorgoryScalarFieldEnum | CatorgoryScalarFieldEnum[]
  }

  /**
   * Catorgory findFirstOrThrow
   */
  export type CatorgoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catorgory
     */
    select?: CatorgorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catorgory
     */
    omit?: CatorgoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatorgoryInclude<ExtArgs> | null
    /**
     * Filter, which Catorgory to fetch.
     */
    where?: CatorgoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Catorgories to fetch.
     */
    orderBy?: CatorgoryOrderByWithRelationInput | CatorgoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Catorgories.
     */
    cursor?: CatorgoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Catorgories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Catorgories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Catorgories.
     */
    distinct?: CatorgoryScalarFieldEnum | CatorgoryScalarFieldEnum[]
  }

  /**
   * Catorgory findMany
   */
  export type CatorgoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catorgory
     */
    select?: CatorgorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catorgory
     */
    omit?: CatorgoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatorgoryInclude<ExtArgs> | null
    /**
     * Filter, which Catorgories to fetch.
     */
    where?: CatorgoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Catorgories to fetch.
     */
    orderBy?: CatorgoryOrderByWithRelationInput | CatorgoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Catorgories.
     */
    cursor?: CatorgoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Catorgories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Catorgories.
     */
    skip?: number
    distinct?: CatorgoryScalarFieldEnum | CatorgoryScalarFieldEnum[]
  }

  /**
   * Catorgory create
   */
  export type CatorgoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catorgory
     */
    select?: CatorgorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catorgory
     */
    omit?: CatorgoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatorgoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Catorgory.
     */
    data: XOR<CatorgoryCreateInput, CatorgoryUncheckedCreateInput>
  }

  /**
   * Catorgory createMany
   */
  export type CatorgoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Catorgories.
     */
    data: CatorgoryCreateManyInput | CatorgoryCreateManyInput[]
  }

  /**
   * Catorgory createManyAndReturn
   */
  export type CatorgoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catorgory
     */
    select?: CatorgorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Catorgory
     */
    omit?: CatorgoryOmit<ExtArgs> | null
    /**
     * The data used to create many Catorgories.
     */
    data: CatorgoryCreateManyInput | CatorgoryCreateManyInput[]
  }

  /**
   * Catorgory update
   */
  export type CatorgoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catorgory
     */
    select?: CatorgorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catorgory
     */
    omit?: CatorgoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatorgoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Catorgory.
     */
    data: XOR<CatorgoryUpdateInput, CatorgoryUncheckedUpdateInput>
    /**
     * Choose, which Catorgory to update.
     */
    where: CatorgoryWhereUniqueInput
  }

  /**
   * Catorgory updateMany
   */
  export type CatorgoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Catorgories.
     */
    data: XOR<CatorgoryUpdateManyMutationInput, CatorgoryUncheckedUpdateManyInput>
    /**
     * Filter which Catorgories to update
     */
    where?: CatorgoryWhereInput
    /**
     * Limit how many Catorgories to update.
     */
    limit?: number
  }

  /**
   * Catorgory updateManyAndReturn
   */
  export type CatorgoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catorgory
     */
    select?: CatorgorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Catorgory
     */
    omit?: CatorgoryOmit<ExtArgs> | null
    /**
     * The data used to update Catorgories.
     */
    data: XOR<CatorgoryUpdateManyMutationInput, CatorgoryUncheckedUpdateManyInput>
    /**
     * Filter which Catorgories to update
     */
    where?: CatorgoryWhereInput
    /**
     * Limit how many Catorgories to update.
     */
    limit?: number
  }

  /**
   * Catorgory upsert
   */
  export type CatorgoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catorgory
     */
    select?: CatorgorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catorgory
     */
    omit?: CatorgoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatorgoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Catorgory to update in case it exists.
     */
    where: CatorgoryWhereUniqueInput
    /**
     * In case the Catorgory found by the `where` argument doesn't exist, create a new Catorgory with this data.
     */
    create: XOR<CatorgoryCreateInput, CatorgoryUncheckedCreateInput>
    /**
     * In case the Catorgory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CatorgoryUpdateInput, CatorgoryUncheckedUpdateInput>
  }

  /**
   * Catorgory delete
   */
  export type CatorgoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catorgory
     */
    select?: CatorgorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catorgory
     */
    omit?: CatorgoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatorgoryInclude<ExtArgs> | null
    /**
     * Filter which Catorgory to delete.
     */
    where: CatorgoryWhereUniqueInput
  }

  /**
   * Catorgory deleteMany
   */
  export type CatorgoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Catorgories to delete
     */
    where?: CatorgoryWhereInput
    /**
     * Limit how many Catorgories to delete.
     */
    limit?: number
  }

  /**
   * Catorgory.products
   */
  export type Catorgory$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Catorgory without action
   */
  export type CatorgoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catorgory
     */
    select?: CatorgorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catorgory
     */
    omit?: CatorgoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatorgoryInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    id: number | null
    price: number | null
    amount: number | null
    catogoryId: number | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    price: number | null
    amount: number | null
    catogoryId: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    specs: string | null
    price: number | null
    producer: string | null
    className: string | null
    amount: number | null
    catogoryId: number | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    specs: string | null
    price: number | null
    producer: string | null
    className: string | null
    amount: number | null
    catogoryId: number | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    title: number
    description: number
    specs: number
    price: number
    producer: number
    className: number
    amount: number
    catogoryId: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    price?: true
    amount?: true
    catogoryId?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    price?: true
    amount?: true
    catogoryId?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    specs?: true
    price?: true
    producer?: true
    className?: true
    amount?: true
    catogoryId?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    specs?: true
    price?: true
    producer?: true
    className?: true
    amount?: true
    catogoryId?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    specs?: true
    price?: true
    producer?: true
    className?: true
    amount?: true
    catogoryId?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: number
    title: string
    description: string
    specs: string
    price: number
    producer: string
    className: string
    amount: number
    catogoryId: number
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    specs?: boolean
    price?: boolean
    producer?: boolean
    className?: boolean
    amount?: boolean
    catogoryId?: boolean
    catorgory?: boolean | CatorgoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    specs?: boolean
    price?: boolean
    producer?: boolean
    className?: boolean
    amount?: boolean
    catogoryId?: boolean
    catorgory?: boolean | CatorgoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    specs?: boolean
    price?: boolean
    producer?: boolean
    className?: boolean
    amount?: boolean
    catogoryId?: boolean
    catorgory?: boolean | CatorgoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    specs?: boolean
    price?: boolean
    producer?: boolean
    className?: boolean
    amount?: boolean
    catogoryId?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "specs" | "price" | "producer" | "className" | "amount" | "catogoryId", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    catorgory?: boolean | CatorgoryDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    catorgory?: boolean | CatorgoryDefaultArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    catorgory?: boolean | CatorgoryDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      catorgory: Prisma.$CatorgoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string
      specs: string
      price: number
      producer: string
      className: string
      amount: number
      catogoryId: number
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    catorgory<T extends CatorgoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CatorgoryDefaultArgs<ExtArgs>>): Prisma__CatorgoryClient<$Result.GetResult<Prisma.$CatorgoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'Int'>
    readonly title: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly specs: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Float'>
    readonly producer: FieldRef<"Product", 'String'>
    readonly className: FieldRef<"Product", 'String'>
    readonly amount: FieldRef<"Product", 'Int'>
    readonly catogoryId: FieldRef<"Product", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Request
   */

  export type AggregateRequest = {
    _count: RequestCountAggregateOutputType | null
    _avg: RequestAvgAggregateOutputType | null
    _sum: RequestSumAggregateOutputType | null
    _min: RequestMinAggregateOutputType | null
    _max: RequestMaxAggregateOutputType | null
  }

  export type RequestAvgAggregateOutputType = {
    id: number | null
  }

  export type RequestSumAggregateOutputType = {
    id: number | null
  }

  export type RequestMinAggregateOutputType = {
    id: number | null
    title: string | null
  }

  export type RequestMaxAggregateOutputType = {
    id: number | null
    title: string | null
  }

  export type RequestCountAggregateOutputType = {
    id: number
    title: number
    _all: number
  }


  export type RequestAvgAggregateInputType = {
    id?: true
  }

  export type RequestSumAggregateInputType = {
    id?: true
  }

  export type RequestMinAggregateInputType = {
    id?: true
    title?: true
  }

  export type RequestMaxAggregateInputType = {
    id?: true
    title?: true
  }

  export type RequestCountAggregateInputType = {
    id?: true
    title?: true
    _all?: true
  }

  export type RequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Request to aggregate.
     */
    where?: RequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Requests to fetch.
     */
    orderBy?: RequestOrderByWithRelationInput | RequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Requests
    **/
    _count?: true | RequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequestMaxAggregateInputType
  }

  export type GetRequestAggregateType<T extends RequestAggregateArgs> = {
        [P in keyof T & keyof AggregateRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequest[P]>
      : GetScalarType<T[P], AggregateRequest[P]>
  }




  export type RequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestWhereInput
    orderBy?: RequestOrderByWithAggregationInput | RequestOrderByWithAggregationInput[]
    by: RequestScalarFieldEnum[] | RequestScalarFieldEnum
    having?: RequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequestCountAggregateInputType | true
    _avg?: RequestAvgAggregateInputType
    _sum?: RequestSumAggregateInputType
    _min?: RequestMinAggregateInputType
    _max?: RequestMaxAggregateInputType
  }

  export type RequestGroupByOutputType = {
    id: number
    title: string
    _count: RequestCountAggregateOutputType | null
    _avg: RequestAvgAggregateOutputType | null
    _sum: RequestSumAggregateOutputType | null
    _min: RequestMinAggregateOutputType | null
    _max: RequestMaxAggregateOutputType | null
  }

  type GetRequestGroupByPayload<T extends RequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequestGroupByOutputType[P]>
            : GetScalarType<T[P], RequestGroupByOutputType[P]>
        }
      >
    >


  export type RequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
  }, ExtArgs["result"]["request"]>

  export type RequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
  }, ExtArgs["result"]["request"]>

  export type RequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
  }, ExtArgs["result"]["request"]>

  export type RequestSelectScalar = {
    id?: boolean
    title?: boolean
  }

  export type RequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title", ExtArgs["result"]["request"]>

  export type $RequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Request"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
    }, ExtArgs["result"]["request"]>
    composites: {}
  }

  type RequestGetPayload<S extends boolean | null | undefined | RequestDefaultArgs> = $Result.GetResult<Prisma.$RequestPayload, S>

  type RequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RequestCountAggregateInputType | true
    }

  export interface RequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Request'], meta: { name: 'Request' } }
    /**
     * Find zero or one Request that matches the filter.
     * @param {RequestFindUniqueArgs} args - Arguments to find a Request
     * @example
     * // Get one Request
     * const request = await prisma.request.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RequestFindUniqueArgs>(args: SelectSubset<T, RequestFindUniqueArgs<ExtArgs>>): Prisma__RequestClient<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Request that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RequestFindUniqueOrThrowArgs} args - Arguments to find a Request
     * @example
     * // Get one Request
     * const request = await prisma.request.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RequestFindUniqueOrThrowArgs>(args: SelectSubset<T, RequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RequestClient<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Request that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestFindFirstArgs} args - Arguments to find a Request
     * @example
     * // Get one Request
     * const request = await prisma.request.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RequestFindFirstArgs>(args?: SelectSubset<T, RequestFindFirstArgs<ExtArgs>>): Prisma__RequestClient<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Request that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestFindFirstOrThrowArgs} args - Arguments to find a Request
     * @example
     * // Get one Request
     * const request = await prisma.request.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RequestFindFirstOrThrowArgs>(args?: SelectSubset<T, RequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__RequestClient<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Requests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Requests
     * const requests = await prisma.request.findMany()
     * 
     * // Get first 10 Requests
     * const requests = await prisma.request.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const requestWithIdOnly = await prisma.request.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RequestFindManyArgs>(args?: SelectSubset<T, RequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Request.
     * @param {RequestCreateArgs} args - Arguments to create a Request.
     * @example
     * // Create one Request
     * const Request = await prisma.request.create({
     *   data: {
     *     // ... data to create a Request
     *   }
     * })
     * 
     */
    create<T extends RequestCreateArgs>(args: SelectSubset<T, RequestCreateArgs<ExtArgs>>): Prisma__RequestClient<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Requests.
     * @param {RequestCreateManyArgs} args - Arguments to create many Requests.
     * @example
     * // Create many Requests
     * const request = await prisma.request.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RequestCreateManyArgs>(args?: SelectSubset<T, RequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Requests and returns the data saved in the database.
     * @param {RequestCreateManyAndReturnArgs} args - Arguments to create many Requests.
     * @example
     * // Create many Requests
     * const request = await prisma.request.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Requests and only return the `id`
     * const requestWithIdOnly = await prisma.request.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RequestCreateManyAndReturnArgs>(args?: SelectSubset<T, RequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Request.
     * @param {RequestDeleteArgs} args - Arguments to delete one Request.
     * @example
     * // Delete one Request
     * const Request = await prisma.request.delete({
     *   where: {
     *     // ... filter to delete one Request
     *   }
     * })
     * 
     */
    delete<T extends RequestDeleteArgs>(args: SelectSubset<T, RequestDeleteArgs<ExtArgs>>): Prisma__RequestClient<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Request.
     * @param {RequestUpdateArgs} args - Arguments to update one Request.
     * @example
     * // Update one Request
     * const request = await prisma.request.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RequestUpdateArgs>(args: SelectSubset<T, RequestUpdateArgs<ExtArgs>>): Prisma__RequestClient<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Requests.
     * @param {RequestDeleteManyArgs} args - Arguments to filter Requests to delete.
     * @example
     * // Delete a few Requests
     * const { count } = await prisma.request.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RequestDeleteManyArgs>(args?: SelectSubset<T, RequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Requests
     * const request = await prisma.request.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RequestUpdateManyArgs>(args: SelectSubset<T, RequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Requests and returns the data updated in the database.
     * @param {RequestUpdateManyAndReturnArgs} args - Arguments to update many Requests.
     * @example
     * // Update many Requests
     * const request = await prisma.request.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Requests and only return the `id`
     * const requestWithIdOnly = await prisma.request.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RequestUpdateManyAndReturnArgs>(args: SelectSubset<T, RequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Request.
     * @param {RequestUpsertArgs} args - Arguments to update or create a Request.
     * @example
     * // Update or create a Request
     * const request = await prisma.request.upsert({
     *   create: {
     *     // ... data to create a Request
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Request we want to update
     *   }
     * })
     */
    upsert<T extends RequestUpsertArgs>(args: SelectSubset<T, RequestUpsertArgs<ExtArgs>>): Prisma__RequestClient<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestCountArgs} args - Arguments to filter Requests to count.
     * @example
     * // Count the number of Requests
     * const count = await prisma.request.count({
     *   where: {
     *     // ... the filter for the Requests we want to count
     *   }
     * })
    **/
    count<T extends RequestCountArgs>(
      args?: Subset<T, RequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Request.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RequestAggregateArgs>(args: Subset<T, RequestAggregateArgs>): Prisma.PrismaPromise<GetRequestAggregateType<T>>

    /**
     * Group by Request.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RequestGroupByArgs['orderBy'] }
        : { orderBy?: RequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Request model
   */
  readonly fields: RequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Request.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Request model
   */
  interface RequestFieldRefs {
    readonly id: FieldRef<"Request", 'Int'>
    readonly title: FieldRef<"Request", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Request findUnique
   */
  export type RequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * Filter, which Request to fetch.
     */
    where: RequestWhereUniqueInput
  }

  /**
   * Request findUniqueOrThrow
   */
  export type RequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * Filter, which Request to fetch.
     */
    where: RequestWhereUniqueInput
  }

  /**
   * Request findFirst
   */
  export type RequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * Filter, which Request to fetch.
     */
    where?: RequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Requests to fetch.
     */
    orderBy?: RequestOrderByWithRelationInput | RequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Requests.
     */
    cursor?: RequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Requests.
     */
    distinct?: RequestScalarFieldEnum | RequestScalarFieldEnum[]
  }

  /**
   * Request findFirstOrThrow
   */
  export type RequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * Filter, which Request to fetch.
     */
    where?: RequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Requests to fetch.
     */
    orderBy?: RequestOrderByWithRelationInput | RequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Requests.
     */
    cursor?: RequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Requests.
     */
    distinct?: RequestScalarFieldEnum | RequestScalarFieldEnum[]
  }

  /**
   * Request findMany
   */
  export type RequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * Filter, which Requests to fetch.
     */
    where?: RequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Requests to fetch.
     */
    orderBy?: RequestOrderByWithRelationInput | RequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Requests.
     */
    cursor?: RequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Requests.
     */
    skip?: number
    distinct?: RequestScalarFieldEnum | RequestScalarFieldEnum[]
  }

  /**
   * Request create
   */
  export type RequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * The data needed to create a Request.
     */
    data: XOR<RequestCreateInput, RequestUncheckedCreateInput>
  }

  /**
   * Request createMany
   */
  export type RequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Requests.
     */
    data: RequestCreateManyInput | RequestCreateManyInput[]
  }

  /**
   * Request createManyAndReturn
   */
  export type RequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * The data used to create many Requests.
     */
    data: RequestCreateManyInput | RequestCreateManyInput[]
  }

  /**
   * Request update
   */
  export type RequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * The data needed to update a Request.
     */
    data: XOR<RequestUpdateInput, RequestUncheckedUpdateInput>
    /**
     * Choose, which Request to update.
     */
    where: RequestWhereUniqueInput
  }

  /**
   * Request updateMany
   */
  export type RequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Requests.
     */
    data: XOR<RequestUpdateManyMutationInput, RequestUncheckedUpdateManyInput>
    /**
     * Filter which Requests to update
     */
    where?: RequestWhereInput
    /**
     * Limit how many Requests to update.
     */
    limit?: number
  }

  /**
   * Request updateManyAndReturn
   */
  export type RequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * The data used to update Requests.
     */
    data: XOR<RequestUpdateManyMutationInput, RequestUncheckedUpdateManyInput>
    /**
     * Filter which Requests to update
     */
    where?: RequestWhereInput
    /**
     * Limit how many Requests to update.
     */
    limit?: number
  }

  /**
   * Request upsert
   */
  export type RequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * The filter to search for the Request to update in case it exists.
     */
    where: RequestWhereUniqueInput
    /**
     * In case the Request found by the `where` argument doesn't exist, create a new Request with this data.
     */
    create: XOR<RequestCreateInput, RequestUncheckedCreateInput>
    /**
     * In case the Request was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RequestUpdateInput, RequestUncheckedUpdateInput>
  }

  /**
   * Request delete
   */
  export type RequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * Filter which Request to delete.
     */
    where: RequestWhereUniqueInput
  }

  /**
   * Request deleteMany
   */
  export type RequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Requests to delete
     */
    where?: RequestWhereInput
    /**
     * Limit how many Requests to delete.
     */
    limit?: number
  }

  /**
   * Request without action
   */
  export type RequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CatorgoryScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type CatorgoryScalarFieldEnum = (typeof CatorgoryScalarFieldEnum)[keyof typeof CatorgoryScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    specs: 'specs',
    price: 'price',
    producer: 'producer',
    className: 'className',
    amount: 'amount',
    catogoryId: 'catogoryId'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const RequestScalarFieldEnum: {
    id: 'id',
    title: 'title'
  };

  export type RequestScalarFieldEnum = (typeof RequestScalarFieldEnum)[keyof typeof RequestScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type CatorgoryWhereInput = {
    AND?: CatorgoryWhereInput | CatorgoryWhereInput[]
    OR?: CatorgoryWhereInput[]
    NOT?: CatorgoryWhereInput | CatorgoryWhereInput[]
    id?: IntFilter<"Catorgory"> | number
    name?: StringFilter<"Catorgory"> | string
    products?: ProductListRelationFilter
  }

  export type CatorgoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    products?: ProductOrderByRelationAggregateInput
  }

  export type CatorgoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CatorgoryWhereInput | CatorgoryWhereInput[]
    OR?: CatorgoryWhereInput[]
    NOT?: CatorgoryWhereInput | CatorgoryWhereInput[]
    name?: StringFilter<"Catorgory"> | string
    products?: ProductListRelationFilter
  }, "id">

  export type CatorgoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: CatorgoryCountOrderByAggregateInput
    _avg?: CatorgoryAvgOrderByAggregateInput
    _max?: CatorgoryMaxOrderByAggregateInput
    _min?: CatorgoryMinOrderByAggregateInput
    _sum?: CatorgorySumOrderByAggregateInput
  }

  export type CatorgoryScalarWhereWithAggregatesInput = {
    AND?: CatorgoryScalarWhereWithAggregatesInput | CatorgoryScalarWhereWithAggregatesInput[]
    OR?: CatorgoryScalarWhereWithAggregatesInput[]
    NOT?: CatorgoryScalarWhereWithAggregatesInput | CatorgoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Catorgory"> | number
    name?: StringWithAggregatesFilter<"Catorgory"> | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: IntFilter<"Product"> | number
    title?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    specs?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    producer?: StringFilter<"Product"> | string
    className?: StringFilter<"Product"> | string
    amount?: IntFilter<"Product"> | number
    catogoryId?: IntFilter<"Product"> | number
    catorgory?: XOR<CatorgoryScalarRelationFilter, CatorgoryWhereInput>
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    specs?: SortOrder
    price?: SortOrder
    producer?: SortOrder
    className?: SortOrder
    amount?: SortOrder
    catogoryId?: SortOrder
    catorgory?: CatorgoryOrderByWithRelationInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    title?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    specs?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    producer?: StringFilter<"Product"> | string
    className?: StringFilter<"Product"> | string
    amount?: IntFilter<"Product"> | number
    catogoryId?: IntFilter<"Product"> | number
    catorgory?: XOR<CatorgoryScalarRelationFilter, CatorgoryWhereInput>
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    specs?: SortOrder
    price?: SortOrder
    producer?: SortOrder
    className?: SortOrder
    amount?: SortOrder
    catogoryId?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Product"> | number
    title?: StringWithAggregatesFilter<"Product"> | string
    description?: StringWithAggregatesFilter<"Product"> | string
    specs?: StringWithAggregatesFilter<"Product"> | string
    price?: FloatWithAggregatesFilter<"Product"> | number
    producer?: StringWithAggregatesFilter<"Product"> | string
    className?: StringWithAggregatesFilter<"Product"> | string
    amount?: IntWithAggregatesFilter<"Product"> | number
    catogoryId?: IntWithAggregatesFilter<"Product"> | number
  }

  export type RequestWhereInput = {
    AND?: RequestWhereInput | RequestWhereInput[]
    OR?: RequestWhereInput[]
    NOT?: RequestWhereInput | RequestWhereInput[]
    id?: IntFilter<"Request"> | number
    title?: StringFilter<"Request"> | string
  }

  export type RequestOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
  }

  export type RequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RequestWhereInput | RequestWhereInput[]
    OR?: RequestWhereInput[]
    NOT?: RequestWhereInput | RequestWhereInput[]
    title?: StringFilter<"Request"> | string
  }, "id">

  export type RequestOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    _count?: RequestCountOrderByAggregateInput
    _avg?: RequestAvgOrderByAggregateInput
    _max?: RequestMaxOrderByAggregateInput
    _min?: RequestMinOrderByAggregateInput
    _sum?: RequestSumOrderByAggregateInput
  }

  export type RequestScalarWhereWithAggregatesInput = {
    AND?: RequestScalarWhereWithAggregatesInput | RequestScalarWhereWithAggregatesInput[]
    OR?: RequestScalarWhereWithAggregatesInput[]
    NOT?: RequestScalarWhereWithAggregatesInput | RequestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Request"> | number
    title?: StringWithAggregatesFilter<"Request"> | string
  }

  export type CatorgoryCreateInput = {
    name: string
    products?: ProductCreateNestedManyWithoutCatorgoryInput
  }

  export type CatorgoryUncheckedCreateInput = {
    id?: number
    name: string
    products?: ProductUncheckedCreateNestedManyWithoutCatorgoryInput
  }

  export type CatorgoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    products?: ProductUpdateManyWithoutCatorgoryNestedInput
  }

  export type CatorgoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    products?: ProductUncheckedUpdateManyWithoutCatorgoryNestedInput
  }

  export type CatorgoryCreateManyInput = {
    id?: number
    name: string
  }

  export type CatorgoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CatorgoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCreateInput = {
    title: string
    description: string
    specs: string
    price: number
    producer: string
    className: string
    amount: number
    catorgory: CatorgoryCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateInput = {
    id?: number
    title: string
    description: string
    specs: string
    price: number
    producer: string
    className: string
    amount: number
    catogoryId: number
  }

  export type ProductUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    producer?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    catorgory?: CatorgoryUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    producer?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    catogoryId?: IntFieldUpdateOperationsInput | number
  }

  export type ProductCreateManyInput = {
    id?: number
    title: string
    description: string
    specs: string
    price: number
    producer: string
    className: string
    amount: number
    catogoryId: number
  }

  export type ProductUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    producer?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    producer?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    catogoryId?: IntFieldUpdateOperationsInput | number
  }

  export type RequestCreateInput = {
    title: string
  }

  export type RequestUncheckedCreateInput = {
    id?: number
    title: string
  }

  export type RequestUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
  }

  export type RequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
  }

  export type RequestCreateManyInput = {
    id?: number
    title: string
  }

  export type RequestUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
  }

  export type RequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CatorgoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CatorgoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CatorgoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CatorgoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CatorgorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type CatorgoryScalarRelationFilter = {
    is?: CatorgoryWhereInput
    isNot?: CatorgoryWhereInput
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    specs?: SortOrder
    price?: SortOrder
    producer?: SortOrder
    className?: SortOrder
    amount?: SortOrder
    catogoryId?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    catogoryId?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    specs?: SortOrder
    price?: SortOrder
    producer?: SortOrder
    className?: SortOrder
    amount?: SortOrder
    catogoryId?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    specs?: SortOrder
    price?: SortOrder
    producer?: SortOrder
    className?: SortOrder
    amount?: SortOrder
    catogoryId?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    catogoryId?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type RequestCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
  }

  export type RequestAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RequestMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
  }

  export type RequestMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
  }

  export type RequestSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProductCreateNestedManyWithoutCatorgoryInput = {
    create?: XOR<ProductCreateWithoutCatorgoryInput, ProductUncheckedCreateWithoutCatorgoryInput> | ProductCreateWithoutCatorgoryInput[] | ProductUncheckedCreateWithoutCatorgoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCatorgoryInput | ProductCreateOrConnectWithoutCatorgoryInput[]
    createMany?: ProductCreateManyCatorgoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCatorgoryInput = {
    create?: XOR<ProductCreateWithoutCatorgoryInput, ProductUncheckedCreateWithoutCatorgoryInput> | ProductCreateWithoutCatorgoryInput[] | ProductUncheckedCreateWithoutCatorgoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCatorgoryInput | ProductCreateOrConnectWithoutCatorgoryInput[]
    createMany?: ProductCreateManyCatorgoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type ProductUpdateManyWithoutCatorgoryNestedInput = {
    create?: XOR<ProductCreateWithoutCatorgoryInput, ProductUncheckedCreateWithoutCatorgoryInput> | ProductCreateWithoutCatorgoryInput[] | ProductUncheckedCreateWithoutCatorgoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCatorgoryInput | ProductCreateOrConnectWithoutCatorgoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCatorgoryInput | ProductUpsertWithWhereUniqueWithoutCatorgoryInput[]
    createMany?: ProductCreateManyCatorgoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCatorgoryInput | ProductUpdateWithWhereUniqueWithoutCatorgoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCatorgoryInput | ProductUpdateManyWithWhereWithoutCatorgoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductUncheckedUpdateManyWithoutCatorgoryNestedInput = {
    create?: XOR<ProductCreateWithoutCatorgoryInput, ProductUncheckedCreateWithoutCatorgoryInput> | ProductCreateWithoutCatorgoryInput[] | ProductUncheckedCreateWithoutCatorgoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCatorgoryInput | ProductCreateOrConnectWithoutCatorgoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCatorgoryInput | ProductUpsertWithWhereUniqueWithoutCatorgoryInput[]
    createMany?: ProductCreateManyCatorgoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCatorgoryInput | ProductUpdateWithWhereUniqueWithoutCatorgoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCatorgoryInput | ProductUpdateManyWithWhereWithoutCatorgoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CatorgoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CatorgoryCreateWithoutProductsInput, CatorgoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CatorgoryCreateOrConnectWithoutProductsInput
    connect?: CatorgoryWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CatorgoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CatorgoryCreateWithoutProductsInput, CatorgoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CatorgoryCreateOrConnectWithoutProductsInput
    upsert?: CatorgoryUpsertWithoutProductsInput
    connect?: CatorgoryWhereUniqueInput
    update?: XOR<XOR<CatorgoryUpdateToOneWithWhereWithoutProductsInput, CatorgoryUpdateWithoutProductsInput>, CatorgoryUncheckedUpdateWithoutProductsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ProductCreateWithoutCatorgoryInput = {
    title: string
    description: string
    specs: string
    price: number
    producer: string
    className: string
    amount: number
  }

  export type ProductUncheckedCreateWithoutCatorgoryInput = {
    id?: number
    title: string
    description: string
    specs: string
    price: number
    producer: string
    className: string
    amount: number
  }

  export type ProductCreateOrConnectWithoutCatorgoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCatorgoryInput, ProductUncheckedCreateWithoutCatorgoryInput>
  }

  export type ProductCreateManyCatorgoryInputEnvelope = {
    data: ProductCreateManyCatorgoryInput | ProductCreateManyCatorgoryInput[]
  }

  export type ProductUpsertWithWhereUniqueWithoutCatorgoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCatorgoryInput, ProductUncheckedUpdateWithoutCatorgoryInput>
    create: XOR<ProductCreateWithoutCatorgoryInput, ProductUncheckedCreateWithoutCatorgoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCatorgoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCatorgoryInput, ProductUncheckedUpdateWithoutCatorgoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCatorgoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCatorgoryInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: IntFilter<"Product"> | number
    title?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    specs?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    producer?: StringFilter<"Product"> | string
    className?: StringFilter<"Product"> | string
    amount?: IntFilter<"Product"> | number
    catogoryId?: IntFilter<"Product"> | number
  }

  export type CatorgoryCreateWithoutProductsInput = {
    name: string
  }

  export type CatorgoryUncheckedCreateWithoutProductsInput = {
    id?: number
    name: string
  }

  export type CatorgoryCreateOrConnectWithoutProductsInput = {
    where: CatorgoryWhereUniqueInput
    create: XOR<CatorgoryCreateWithoutProductsInput, CatorgoryUncheckedCreateWithoutProductsInput>
  }

  export type CatorgoryUpsertWithoutProductsInput = {
    update: XOR<CatorgoryUpdateWithoutProductsInput, CatorgoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CatorgoryCreateWithoutProductsInput, CatorgoryUncheckedCreateWithoutProductsInput>
    where?: CatorgoryWhereInput
  }

  export type CatorgoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CatorgoryWhereInput
    data: XOR<CatorgoryUpdateWithoutProductsInput, CatorgoryUncheckedUpdateWithoutProductsInput>
  }

  export type CatorgoryUpdateWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CatorgoryUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCreateManyCatorgoryInput = {
    id?: number
    title: string
    description: string
    specs: string
    price: number
    producer: string
    className: string
    amount: number
  }

  export type ProductUpdateWithoutCatorgoryInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    producer?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type ProductUncheckedUpdateWithoutCatorgoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    producer?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type ProductUncheckedUpdateManyWithoutCatorgoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    producer?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}