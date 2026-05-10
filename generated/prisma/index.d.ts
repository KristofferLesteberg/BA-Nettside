
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ProductImage
 * 
 */
export type ProductImage = $Result.DefaultSelection<Prisma.$ProductImagePayload>
/**
 * Model ProjectRequest
 * 
 */
export type ProjectRequest = $Result.DefaultSelection<Prisma.$ProjectRequestPayload>
/**
 * Model ClientReview
 * 
 */
export type ClientReview = $Result.DefaultSelection<Prisma.$ClientReviewPayload>
/**
 * Model ContactPerson
 * 
 */
export type ContactPerson = $Result.DefaultSelection<Prisma.$ContactPersonPayload>
/**
 * Model ProductOrder
 * 
 */
export type ProductOrder = $Result.DefaultSelection<Prisma.$ProductOrderPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EducationField: {
  BUILDING: 'BUILDING',
  CONSTRUCTION: 'CONSTRUCTION'
};

export type EducationField = (typeof EducationField)[keyof typeof EducationField]


export const Status: {
  NEW: 'NEW',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETE: 'COMPLETE'
};

export type Status = (typeof Status)[keyof typeof Status]


export const OrderStatus: {
  NEW: 'NEW',
  IN_CONTACT: 'IN_CONTACT',
  COMPLETED: 'COMPLETED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

}

export type EducationField = $Enums.EducationField

export const EducationField: typeof $Enums.EducationField

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Products
 * const products = await prisma.product.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Products
   * const products = await prisma.product.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

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
   * `prisma.productImage`: Exposes CRUD operations for the **ProductImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductImages
    * const productImages = await prisma.productImage.findMany()
    * ```
    */
  get productImage(): Prisma.ProductImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectRequest`: Exposes CRUD operations for the **ProjectRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectRequests
    * const projectRequests = await prisma.projectRequest.findMany()
    * ```
    */
  get projectRequest(): Prisma.ProjectRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clientReview`: Exposes CRUD operations for the **ClientReview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClientReviews
    * const clientReviews = await prisma.clientReview.findMany()
    * ```
    */
  get clientReview(): Prisma.ClientReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contactPerson`: Exposes CRUD operations for the **ContactPerson** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContactPeople
    * const contactPeople = await prisma.contactPerson.findMany()
    * ```
    */
  get contactPerson(): Prisma.ContactPersonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productOrder`: Exposes CRUD operations for the **ProductOrder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductOrders
    * const productOrders = await prisma.productOrder.findMany()
    * ```
    */
  get productOrder(): Prisma.ProductOrderDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
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
    Product: 'Product',
    ProductImage: 'ProductImage',
    ProjectRequest: 'ProjectRequest',
    ClientReview: 'ClientReview',
    ContactPerson: 'ContactPerson',
    ProductOrder: 'ProductOrder'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "product" | "productImage" | "projectRequest" | "clientReview" | "contactPerson" | "productOrder"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
      ProductImage: {
        payload: Prisma.$ProductImagePayload<ExtArgs>
        fields: Prisma.ProductImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          findFirst: {
            args: Prisma.ProductImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          findMany: {
            args: Prisma.ProductImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>[]
          }
          create: {
            args: Prisma.ProductImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          createMany: {
            args: Prisma.ProductImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>[]
          }
          delete: {
            args: Prisma.ProductImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          update: {
            args: Prisma.ProductImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          deleteMany: {
            args: Prisma.ProductImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>[]
          }
          upsert: {
            args: Prisma.ProductImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          aggregate: {
            args: Prisma.ProductImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductImage>
          }
          groupBy: {
            args: Prisma.ProductImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductImageCountArgs<ExtArgs>
            result: $Utils.Optional<ProductImageCountAggregateOutputType> | number
          }
        }
      }
      ProjectRequest: {
        payload: Prisma.$ProjectRequestPayload<ExtArgs>
        fields: Prisma.ProjectRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>
          }
          findFirst: {
            args: Prisma.ProjectRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>
          }
          findMany: {
            args: Prisma.ProjectRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>[]
          }
          create: {
            args: Prisma.ProjectRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>
          }
          createMany: {
            args: Prisma.ProjectRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>[]
          }
          delete: {
            args: Prisma.ProjectRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>
          }
          update: {
            args: Prisma.ProjectRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>
          }
          deleteMany: {
            args: Prisma.ProjectRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>[]
          }
          upsert: {
            args: Prisma.ProjectRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>
          }
          aggregate: {
            args: Prisma.ProjectRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectRequest>
          }
          groupBy: {
            args: Prisma.ProjectRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectRequestCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectRequestCountAggregateOutputType> | number
          }
        }
      }
      ClientReview: {
        payload: Prisma.$ClientReviewPayload<ExtArgs>
        fields: Prisma.ClientReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientReviewPayload>
          }
          findFirst: {
            args: Prisma.ClientReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientReviewPayload>
          }
          findMany: {
            args: Prisma.ClientReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientReviewPayload>[]
          }
          create: {
            args: Prisma.ClientReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientReviewPayload>
          }
          createMany: {
            args: Prisma.ClientReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientReviewPayload>[]
          }
          delete: {
            args: Prisma.ClientReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientReviewPayload>
          }
          update: {
            args: Prisma.ClientReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientReviewPayload>
          }
          deleteMany: {
            args: Prisma.ClientReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientReviewPayload>[]
          }
          upsert: {
            args: Prisma.ClientReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientReviewPayload>
          }
          aggregate: {
            args: Prisma.ClientReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClientReview>
          }
          groupBy: {
            args: Prisma.ClientReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ClientReviewCountAggregateOutputType> | number
          }
        }
      }
      ContactPerson: {
        payload: Prisma.$ContactPersonPayload<ExtArgs>
        fields: Prisma.ContactPersonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactPersonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactPersonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>
          }
          findFirst: {
            args: Prisma.ContactPersonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactPersonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>
          }
          findMany: {
            args: Prisma.ContactPersonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>[]
          }
          create: {
            args: Prisma.ContactPersonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>
          }
          createMany: {
            args: Prisma.ContactPersonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactPersonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>[]
          }
          delete: {
            args: Prisma.ContactPersonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>
          }
          update: {
            args: Prisma.ContactPersonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>
          }
          deleteMany: {
            args: Prisma.ContactPersonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactPersonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContactPersonUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>[]
          }
          upsert: {
            args: Prisma.ContactPersonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPersonPayload>
          }
          aggregate: {
            args: Prisma.ContactPersonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContactPerson>
          }
          groupBy: {
            args: Prisma.ContactPersonGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactPersonGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactPersonCountArgs<ExtArgs>
            result: $Utils.Optional<ContactPersonCountAggregateOutputType> | number
          }
        }
      }
      ProductOrder: {
        payload: Prisma.$ProductOrderPayload<ExtArgs>
        fields: Prisma.ProductOrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductOrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductOrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductOrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductOrderPayload>
          }
          findFirst: {
            args: Prisma.ProductOrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductOrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductOrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductOrderPayload>
          }
          findMany: {
            args: Prisma.ProductOrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductOrderPayload>[]
          }
          create: {
            args: Prisma.ProductOrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductOrderPayload>
          }
          createMany: {
            args: Prisma.ProductOrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductOrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductOrderPayload>[]
          }
          delete: {
            args: Prisma.ProductOrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductOrderPayload>
          }
          update: {
            args: Prisma.ProductOrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductOrderPayload>
          }
          deleteMany: {
            args: Prisma.ProductOrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductOrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductOrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductOrderPayload>[]
          }
          upsert: {
            args: Prisma.ProductOrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductOrderPayload>
          }
          aggregate: {
            args: Prisma.ProductOrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductOrder>
          }
          groupBy: {
            args: Prisma.ProductOrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductOrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductOrderCountArgs<ExtArgs>
            result: $Utils.Optional<ProductOrderCountAggregateOutputType> | number
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    product?: ProductOmit
    productImage?: ProductImageOmit
    projectRequest?: ProjectRequestOmit
    clientReview?: ClientReviewOmit
    contactPerson?: ContactPersonOmit
    productOrder?: ProductOrderOmit
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
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    images: number
    orders: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | ProductCountOutputTypeCountImagesArgs
    orders?: boolean | ProductCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductImageWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductOrderWhereInput
  }


  /**
   * Count Type ContactPersonCountOutputType
   */

  export type ContactPersonCountOutputType = {
    product: number
  }

  export type ContactPersonCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ContactPersonCountOutputTypeCountProductArgs
  }

  // Custom InputTypes
  /**
   * ContactPersonCountOutputType without action
   */
  export type ContactPersonCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPersonCountOutputType
     */
    select?: ContactPersonCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContactPersonCountOutputType without action
   */
  export type ContactPersonCountOutputTypeCountProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Models
   */

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
    price: Decimal | null
    amount: number | null
    contactPersonId: number | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    price: Decimal | null
    amount: number | null
    contactPersonId: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    educationField: $Enums.EducationField | null
    title: string | null
    description: string | null
    price: Decimal | null
    amount: number | null
    publishedAt: Date | null
    draft: boolean | null
    contactPersonId: number | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    educationField: $Enums.EducationField | null
    title: string | null
    description: string | null
    price: Decimal | null
    amount: number | null
    publishedAt: Date | null
    draft: boolean | null
    contactPersonId: number | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    educationField: number
    title: number
    description: number
    price: number
    measures: number
    amount: number
    publishedAt: number
    draft: number
    contactPersonId: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    price?: true
    amount?: true
    contactPersonId?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    price?: true
    amount?: true
    contactPersonId?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    educationField?: true
    title?: true
    description?: true
    price?: true
    amount?: true
    publishedAt?: true
    draft?: true
    contactPersonId?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    educationField?: true
    title?: true
    description?: true
    price?: true
    amount?: true
    publishedAt?: true
    draft?: true
    contactPersonId?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    educationField?: true
    title?: true
    description?: true
    price?: true
    measures?: true
    amount?: true
    publishedAt?: true
    draft?: true
    contactPersonId?: true
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
    educationField: $Enums.EducationField | null
    title: string
    description: string
    price: Decimal
    measures: JsonValue | null
    amount: number
    publishedAt: Date
    draft: boolean
    contactPersonId: number | null
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
    educationField?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    measures?: boolean
    amount?: boolean
    publishedAt?: boolean
    draft?: boolean
    contactPersonId?: boolean
    images?: boolean | Product$imagesArgs<ExtArgs>
    contactPerson?: boolean | Product$contactPersonArgs<ExtArgs>
    orders?: boolean | Product$ordersArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    educationField?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    measures?: boolean
    amount?: boolean
    publishedAt?: boolean
    draft?: boolean
    contactPersonId?: boolean
    contactPerson?: boolean | Product$contactPersonArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    educationField?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    measures?: boolean
    amount?: boolean
    publishedAt?: boolean
    draft?: boolean
    contactPersonId?: boolean
    contactPerson?: boolean | Product$contactPersonArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    educationField?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    measures?: boolean
    amount?: boolean
    publishedAt?: boolean
    draft?: boolean
    contactPersonId?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "educationField" | "title" | "description" | "price" | "measures" | "amount" | "publishedAt" | "draft" | "contactPersonId", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | Product$imagesArgs<ExtArgs>
    contactPerson?: boolean | Product$contactPersonArgs<ExtArgs>
    orders?: boolean | Product$ordersArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contactPerson?: boolean | Product$contactPersonArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contactPerson?: boolean | Product$contactPersonArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      images: Prisma.$ProductImagePayload<ExtArgs>[]
      contactPerson: Prisma.$ContactPersonPayload<ExtArgs> | null
      orders: Prisma.$ProductOrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      educationField: $Enums.EducationField | null
      title: string
      description: string
      price: Prisma.Decimal
      measures: Prisma.JsonValue | null
      amount: number
      publishedAt: Date
      draft: boolean
      contactPersonId: number | null
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
    images<T extends Product$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Product$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    contactPerson<T extends Product$contactPersonArgs<ExtArgs> = {}>(args?: Subset<T, Product$contactPersonArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    orders<T extends Product$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Product$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly educationField: FieldRef<"Product", 'EducationField'>
    readonly title: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Decimal'>
    readonly measures: FieldRef<"Product", 'Json'>
    readonly amount: FieldRef<"Product", 'Int'>
    readonly publishedAt: FieldRef<"Product", 'DateTime'>
    readonly draft: FieldRef<"Product", 'Boolean'>
    readonly contactPersonId: FieldRef<"Product", 'Int'>
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
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
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
   * Product.images
   */
  export type Product$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    where?: ProductImageWhereInput
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    cursor?: ProductImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * Product.contactPerson
   */
  export type Product$contactPersonArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPerson
     */
    omit?: ContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    where?: ContactPersonWhereInput
  }

  /**
   * Product.orders
   */
  export type Product$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOrder
     */
    select?: ProductOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductOrder
     */
    omit?: ProductOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOrderInclude<ExtArgs> | null
    where?: ProductOrderWhereInput
    orderBy?: ProductOrderOrderByWithRelationInput | ProductOrderOrderByWithRelationInput[]
    cursor?: ProductOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductOrderScalarFieldEnum | ProductOrderScalarFieldEnum[]
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
   * Model ProductImage
   */

  export type AggregateProductImage = {
    _count: ProductImageCountAggregateOutputType | null
    _avg: ProductImageAvgAggregateOutputType | null
    _sum: ProductImageSumAggregateOutputType | null
    _min: ProductImageMinAggregateOutputType | null
    _max: ProductImageMaxAggregateOutputType | null
  }

  export type ProductImageAvgAggregateOutputType = {
    productId: number | null
    sortOrder: number | null
  }

  export type ProductImageSumAggregateOutputType = {
    productId: number | null
    sortOrder: number | null
  }

  export type ProductImageMinAggregateOutputType = {
    id: string | null
    productId: number | null
    sortOrder: number | null
  }

  export type ProductImageMaxAggregateOutputType = {
    id: string | null
    productId: number | null
    sortOrder: number | null
  }

  export type ProductImageCountAggregateOutputType = {
    id: number
    productId: number
    sortOrder: number
    _all: number
  }


  export type ProductImageAvgAggregateInputType = {
    productId?: true
    sortOrder?: true
  }

  export type ProductImageSumAggregateInputType = {
    productId?: true
    sortOrder?: true
  }

  export type ProductImageMinAggregateInputType = {
    id?: true
    productId?: true
    sortOrder?: true
  }

  export type ProductImageMaxAggregateInputType = {
    id?: true
    productId?: true
    sortOrder?: true
  }

  export type ProductImageCountAggregateInputType = {
    id?: true
    productId?: true
    sortOrder?: true
    _all?: true
  }

  export type ProductImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductImage to aggregate.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductImages
    **/
    _count?: true | ProductImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductImageMaxAggregateInputType
  }

  export type GetProductImageAggregateType<T extends ProductImageAggregateArgs> = {
        [P in keyof T & keyof AggregateProductImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductImage[P]>
      : GetScalarType<T[P], AggregateProductImage[P]>
  }




  export type ProductImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductImageWhereInput
    orderBy?: ProductImageOrderByWithAggregationInput | ProductImageOrderByWithAggregationInput[]
    by: ProductImageScalarFieldEnum[] | ProductImageScalarFieldEnum
    having?: ProductImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductImageCountAggregateInputType | true
    _avg?: ProductImageAvgAggregateInputType
    _sum?: ProductImageSumAggregateInputType
    _min?: ProductImageMinAggregateInputType
    _max?: ProductImageMaxAggregateInputType
  }

  export type ProductImageGroupByOutputType = {
    id: string
    productId: number
    sortOrder: number
    _count: ProductImageCountAggregateOutputType | null
    _avg: ProductImageAvgAggregateOutputType | null
    _sum: ProductImageSumAggregateOutputType | null
    _min: ProductImageMinAggregateOutputType | null
    _max: ProductImageMaxAggregateOutputType | null
  }

  type GetProductImageGroupByPayload<T extends ProductImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductImageGroupByOutputType[P]>
            : GetScalarType<T[P], ProductImageGroupByOutputType[P]>
        }
      >
    >


  export type ProductImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    sortOrder?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productImage"]>

  export type ProductImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    sortOrder?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productImage"]>

  export type ProductImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    sortOrder?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productImage"]>

  export type ProductImageSelectScalar = {
    id?: boolean
    productId?: boolean
    sortOrder?: boolean
  }

  export type ProductImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "sortOrder", ExtArgs["result"]["productImage"]>
  export type ProductImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type ProductImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type ProductImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductImage"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: number
      sortOrder: number
    }, ExtArgs["result"]["productImage"]>
    composites: {}
  }

  type ProductImageGetPayload<S extends boolean | null | undefined | ProductImageDefaultArgs> = $Result.GetResult<Prisma.$ProductImagePayload, S>

  type ProductImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductImageCountAggregateInputType | true
    }

  export interface ProductImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductImage'], meta: { name: 'ProductImage' } }
    /**
     * Find zero or one ProductImage that matches the filter.
     * @param {ProductImageFindUniqueArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductImageFindUniqueArgs>(args: SelectSubset<T, ProductImageFindUniqueArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductImageFindUniqueOrThrowArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductImageFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindFirstArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductImageFindFirstArgs>(args?: SelectSubset<T, ProductImageFindFirstArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindFirstOrThrowArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductImageFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductImages
     * const productImages = await prisma.productImage.findMany()
     * 
     * // Get first 10 ProductImages
     * const productImages = await prisma.productImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productImageWithIdOnly = await prisma.productImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductImageFindManyArgs>(args?: SelectSubset<T, ProductImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductImage.
     * @param {ProductImageCreateArgs} args - Arguments to create a ProductImage.
     * @example
     * // Create one ProductImage
     * const ProductImage = await prisma.productImage.create({
     *   data: {
     *     // ... data to create a ProductImage
     *   }
     * })
     * 
     */
    create<T extends ProductImageCreateArgs>(args: SelectSubset<T, ProductImageCreateArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductImages.
     * @param {ProductImageCreateManyArgs} args - Arguments to create many ProductImages.
     * @example
     * // Create many ProductImages
     * const productImage = await prisma.productImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductImageCreateManyArgs>(args?: SelectSubset<T, ProductImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductImages and returns the data saved in the database.
     * @param {ProductImageCreateManyAndReturnArgs} args - Arguments to create many ProductImages.
     * @example
     * // Create many ProductImages
     * const productImage = await prisma.productImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductImages and only return the `id`
     * const productImageWithIdOnly = await prisma.productImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductImageCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductImage.
     * @param {ProductImageDeleteArgs} args - Arguments to delete one ProductImage.
     * @example
     * // Delete one ProductImage
     * const ProductImage = await prisma.productImage.delete({
     *   where: {
     *     // ... filter to delete one ProductImage
     *   }
     * })
     * 
     */
    delete<T extends ProductImageDeleteArgs>(args: SelectSubset<T, ProductImageDeleteArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductImage.
     * @param {ProductImageUpdateArgs} args - Arguments to update one ProductImage.
     * @example
     * // Update one ProductImage
     * const productImage = await prisma.productImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductImageUpdateArgs>(args: SelectSubset<T, ProductImageUpdateArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductImages.
     * @param {ProductImageDeleteManyArgs} args - Arguments to filter ProductImages to delete.
     * @example
     * // Delete a few ProductImages
     * const { count } = await prisma.productImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductImageDeleteManyArgs>(args?: SelectSubset<T, ProductImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductImages
     * const productImage = await prisma.productImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductImageUpdateManyArgs>(args: SelectSubset<T, ProductImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductImages and returns the data updated in the database.
     * @param {ProductImageUpdateManyAndReturnArgs} args - Arguments to update many ProductImages.
     * @example
     * // Update many ProductImages
     * const productImage = await prisma.productImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductImages and only return the `id`
     * const productImageWithIdOnly = await prisma.productImage.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProductImageUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductImage.
     * @param {ProductImageUpsertArgs} args - Arguments to update or create a ProductImage.
     * @example
     * // Update or create a ProductImage
     * const productImage = await prisma.productImage.upsert({
     *   create: {
     *     // ... data to create a ProductImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductImage we want to update
     *   }
     * })
     */
    upsert<T extends ProductImageUpsertArgs>(args: SelectSubset<T, ProductImageUpsertArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageCountArgs} args - Arguments to filter ProductImages to count.
     * @example
     * // Count the number of ProductImages
     * const count = await prisma.productImage.count({
     *   where: {
     *     // ... the filter for the ProductImages we want to count
     *   }
     * })
    **/
    count<T extends ProductImageCountArgs>(
      args?: Subset<T, ProductImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductImageAggregateArgs>(args: Subset<T, ProductImageAggregateArgs>): Prisma.PrismaPromise<GetProductImageAggregateType<T>>

    /**
     * Group by ProductImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageGroupByArgs} args - Group by arguments.
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
      T extends ProductImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductImageGroupByArgs['orderBy'] }
        : { orderBy?: ProductImageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductImage model
   */
  readonly fields: ProductImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ProductImage model
   */
  interface ProductImageFieldRefs {
    readonly id: FieldRef<"ProductImage", 'String'>
    readonly productId: FieldRef<"ProductImage", 'Int'>
    readonly sortOrder: FieldRef<"ProductImage", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ProductImage findUnique
   */
  export type ProductImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage findUniqueOrThrow
   */
  export type ProductImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage findFirst
   */
  export type ProductImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductImages.
     */
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage findFirstOrThrow
   */
  export type ProductImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductImages.
     */
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage findMany
   */
  export type ProductImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImages to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductImages.
     */
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage create
   */
  export type ProductImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductImage.
     */
    data: XOR<ProductImageCreateInput, ProductImageUncheckedCreateInput>
  }

  /**
   * ProductImage createMany
   */
  export type ProductImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductImages.
     */
    data: ProductImageCreateManyInput | ProductImageCreateManyInput[]
  }

  /**
   * ProductImage createManyAndReturn
   */
  export type ProductImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * The data used to create many ProductImages.
     */
    data: ProductImageCreateManyInput | ProductImageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductImage update
   */
  export type ProductImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductImage.
     */
    data: XOR<ProductImageUpdateInput, ProductImageUncheckedUpdateInput>
    /**
     * Choose, which ProductImage to update.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage updateMany
   */
  export type ProductImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductImages.
     */
    data: XOR<ProductImageUpdateManyMutationInput, ProductImageUncheckedUpdateManyInput>
    /**
     * Filter which ProductImages to update
     */
    where?: ProductImageWhereInput
    /**
     * Limit how many ProductImages to update.
     */
    limit?: number
  }

  /**
   * ProductImage updateManyAndReturn
   */
  export type ProductImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * The data used to update ProductImages.
     */
    data: XOR<ProductImageUpdateManyMutationInput, ProductImageUncheckedUpdateManyInput>
    /**
     * Filter which ProductImages to update
     */
    where?: ProductImageWhereInput
    /**
     * Limit how many ProductImages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductImage upsert
   */
  export type ProductImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductImage to update in case it exists.
     */
    where: ProductImageWhereUniqueInput
    /**
     * In case the ProductImage found by the `where` argument doesn't exist, create a new ProductImage with this data.
     */
    create: XOR<ProductImageCreateInput, ProductImageUncheckedCreateInput>
    /**
     * In case the ProductImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductImageUpdateInput, ProductImageUncheckedUpdateInput>
  }

  /**
   * ProductImage delete
   */
  export type ProductImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter which ProductImage to delete.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage deleteMany
   */
  export type ProductImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductImages to delete
     */
    where?: ProductImageWhereInput
    /**
     * Limit how many ProductImages to delete.
     */
    limit?: number
  }

  /**
   * ProductImage without action
   */
  export type ProductImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
  }


  /**
   * Model ProjectRequest
   */

  export type AggregateProjectRequest = {
    _count: ProjectRequestCountAggregateOutputType | null
    _avg: ProjectRequestAvgAggregateOutputType | null
    _sum: ProjectRequestSumAggregateOutputType | null
    _min: ProjectRequestMinAggregateOutputType | null
    _max: ProjectRequestMaxAggregateOutputType | null
  }

  export type ProjectRequestAvgAggregateOutputType = {
    id: number | null
    minPrice: Decimal | null
    maxPrice: Decimal | null
  }

  export type ProjectRequestSumAggregateOutputType = {
    id: number | null
    minPrice: Decimal | null
    maxPrice: Decimal | null
  }

  export type ProjectRequestMinAggregateOutputType = {
    id: number | null
    educationField: $Enums.EducationField | null
    title: string | null
    description: string | null
    minPrice: Decimal | null
    maxPrice: Decimal | null
    clientForename: string | null
    clientSurname: string | null
    clientEmail: string | null
    clientPhone: string | null
    organizationName: string | null
    organizationNumber: string | null
    address: string | null
    billingAddress: string | null
    status: $Enums.Status | null
    createdAt: Date | null
  }

  export type ProjectRequestMaxAggregateOutputType = {
    id: number | null
    educationField: $Enums.EducationField | null
    title: string | null
    description: string | null
    minPrice: Decimal | null
    maxPrice: Decimal | null
    clientForename: string | null
    clientSurname: string | null
    clientEmail: string | null
    clientPhone: string | null
    organizationName: string | null
    organizationNumber: string | null
    address: string | null
    billingAddress: string | null
    status: $Enums.Status | null
    createdAt: Date | null
  }

  export type ProjectRequestCountAggregateOutputType = {
    id: number
    educationField: number
    title: number
    description: number
    minPrice: number
    maxPrice: number
    clientForename: number
    clientSurname: number
    clientEmail: number
    clientPhone: number
    organizationName: number
    organizationNumber: number
    address: number
    billingAddress: number
    status: number
    createdAt: number
    _all: number
  }


  export type ProjectRequestAvgAggregateInputType = {
    id?: true
    minPrice?: true
    maxPrice?: true
  }

  export type ProjectRequestSumAggregateInputType = {
    id?: true
    minPrice?: true
    maxPrice?: true
  }

  export type ProjectRequestMinAggregateInputType = {
    id?: true
    educationField?: true
    title?: true
    description?: true
    minPrice?: true
    maxPrice?: true
    clientForename?: true
    clientSurname?: true
    clientEmail?: true
    clientPhone?: true
    organizationName?: true
    organizationNumber?: true
    address?: true
    billingAddress?: true
    status?: true
    createdAt?: true
  }

  export type ProjectRequestMaxAggregateInputType = {
    id?: true
    educationField?: true
    title?: true
    description?: true
    minPrice?: true
    maxPrice?: true
    clientForename?: true
    clientSurname?: true
    clientEmail?: true
    clientPhone?: true
    organizationName?: true
    organizationNumber?: true
    address?: true
    billingAddress?: true
    status?: true
    createdAt?: true
  }

  export type ProjectRequestCountAggregateInputType = {
    id?: true
    educationField?: true
    title?: true
    description?: true
    minPrice?: true
    maxPrice?: true
    clientForename?: true
    clientSurname?: true
    clientEmail?: true
    clientPhone?: true
    organizationName?: true
    organizationNumber?: true
    address?: true
    billingAddress?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type ProjectRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectRequest to aggregate.
     */
    where?: ProjectRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectRequests to fetch.
     */
    orderBy?: ProjectRequestOrderByWithRelationInput | ProjectRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectRequests
    **/
    _count?: true | ProjectRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectRequestMaxAggregateInputType
  }

  export type GetProjectRequestAggregateType<T extends ProjectRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectRequest[P]>
      : GetScalarType<T[P], AggregateProjectRequest[P]>
  }




  export type ProjectRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectRequestWhereInput
    orderBy?: ProjectRequestOrderByWithAggregationInput | ProjectRequestOrderByWithAggregationInput[]
    by: ProjectRequestScalarFieldEnum[] | ProjectRequestScalarFieldEnum
    having?: ProjectRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectRequestCountAggregateInputType | true
    _avg?: ProjectRequestAvgAggregateInputType
    _sum?: ProjectRequestSumAggregateInputType
    _min?: ProjectRequestMinAggregateInputType
    _max?: ProjectRequestMaxAggregateInputType
  }

  export type ProjectRequestGroupByOutputType = {
    id: number
    educationField: $Enums.EducationField | null
    title: string
    description: string
    minPrice: Decimal
    maxPrice: Decimal
    clientForename: string
    clientSurname: string
    clientEmail: string
    clientPhone: string
    organizationName: string | null
    organizationNumber: string | null
    address: string
    billingAddress: string
    status: $Enums.Status
    createdAt: Date
    _count: ProjectRequestCountAggregateOutputType | null
    _avg: ProjectRequestAvgAggregateOutputType | null
    _sum: ProjectRequestSumAggregateOutputType | null
    _min: ProjectRequestMinAggregateOutputType | null
    _max: ProjectRequestMaxAggregateOutputType | null
  }

  type GetProjectRequestGroupByPayload<T extends ProjectRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectRequestGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectRequestGroupByOutputType[P]>
        }
      >
    >


  export type ProjectRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    educationField?: boolean
    title?: boolean
    description?: boolean
    minPrice?: boolean
    maxPrice?: boolean
    clientForename?: boolean
    clientSurname?: boolean
    clientEmail?: boolean
    clientPhone?: boolean
    organizationName?: boolean
    organizationNumber?: boolean
    address?: boolean
    billingAddress?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["projectRequest"]>

  export type ProjectRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    educationField?: boolean
    title?: boolean
    description?: boolean
    minPrice?: boolean
    maxPrice?: boolean
    clientForename?: boolean
    clientSurname?: boolean
    clientEmail?: boolean
    clientPhone?: boolean
    organizationName?: boolean
    organizationNumber?: boolean
    address?: boolean
    billingAddress?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["projectRequest"]>

  export type ProjectRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    educationField?: boolean
    title?: boolean
    description?: boolean
    minPrice?: boolean
    maxPrice?: boolean
    clientForename?: boolean
    clientSurname?: boolean
    clientEmail?: boolean
    clientPhone?: boolean
    organizationName?: boolean
    organizationNumber?: boolean
    address?: boolean
    billingAddress?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["projectRequest"]>

  export type ProjectRequestSelectScalar = {
    id?: boolean
    educationField?: boolean
    title?: boolean
    description?: boolean
    minPrice?: boolean
    maxPrice?: boolean
    clientForename?: boolean
    clientSurname?: boolean
    clientEmail?: boolean
    clientPhone?: boolean
    organizationName?: boolean
    organizationNumber?: boolean
    address?: boolean
    billingAddress?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type ProjectRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "educationField" | "title" | "description" | "minPrice" | "maxPrice" | "clientForename" | "clientSurname" | "clientEmail" | "clientPhone" | "organizationName" | "organizationNumber" | "address" | "billingAddress" | "status" | "createdAt", ExtArgs["result"]["projectRequest"]>

  export type $ProjectRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectRequest"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      educationField: $Enums.EducationField | null
      title: string
      description: string
      minPrice: Prisma.Decimal
      maxPrice: Prisma.Decimal
      clientForename: string
      clientSurname: string
      clientEmail: string
      clientPhone: string
      organizationName: string | null
      organizationNumber: string | null
      address: string
      billingAddress: string
      status: $Enums.Status
      createdAt: Date
    }, ExtArgs["result"]["projectRequest"]>
    composites: {}
  }

  type ProjectRequestGetPayload<S extends boolean | null | undefined | ProjectRequestDefaultArgs> = $Result.GetResult<Prisma.$ProjectRequestPayload, S>

  type ProjectRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectRequestCountAggregateInputType | true
    }

  export interface ProjectRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectRequest'], meta: { name: 'ProjectRequest' } }
    /**
     * Find zero or one ProjectRequest that matches the filter.
     * @param {ProjectRequestFindUniqueArgs} args - Arguments to find a ProjectRequest
     * @example
     * // Get one ProjectRequest
     * const projectRequest = await prisma.projectRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectRequestFindUniqueArgs>(args: SelectSubset<T, ProjectRequestFindUniqueArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectRequestFindUniqueOrThrowArgs} args - Arguments to find a ProjectRequest
     * @example
     * // Get one ProjectRequest
     * const projectRequest = await prisma.projectRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRequestFindFirstArgs} args - Arguments to find a ProjectRequest
     * @example
     * // Get one ProjectRequest
     * const projectRequest = await prisma.projectRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectRequestFindFirstArgs>(args?: SelectSubset<T, ProjectRequestFindFirstArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRequestFindFirstOrThrowArgs} args - Arguments to find a ProjectRequest
     * @example
     * // Get one ProjectRequest
     * const projectRequest = await prisma.projectRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectRequests
     * const projectRequests = await prisma.projectRequest.findMany()
     * 
     * // Get first 10 ProjectRequests
     * const projectRequests = await prisma.projectRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectRequestWithIdOnly = await prisma.projectRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectRequestFindManyArgs>(args?: SelectSubset<T, ProjectRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectRequest.
     * @param {ProjectRequestCreateArgs} args - Arguments to create a ProjectRequest.
     * @example
     * // Create one ProjectRequest
     * const ProjectRequest = await prisma.projectRequest.create({
     *   data: {
     *     // ... data to create a ProjectRequest
     *   }
     * })
     * 
     */
    create<T extends ProjectRequestCreateArgs>(args: SelectSubset<T, ProjectRequestCreateArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectRequests.
     * @param {ProjectRequestCreateManyArgs} args - Arguments to create many ProjectRequests.
     * @example
     * // Create many ProjectRequests
     * const projectRequest = await prisma.projectRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectRequestCreateManyArgs>(args?: SelectSubset<T, ProjectRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectRequests and returns the data saved in the database.
     * @param {ProjectRequestCreateManyAndReturnArgs} args - Arguments to create many ProjectRequests.
     * @example
     * // Create many ProjectRequests
     * const projectRequest = await prisma.projectRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectRequests and only return the `id`
     * const projectRequestWithIdOnly = await prisma.projectRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectRequest.
     * @param {ProjectRequestDeleteArgs} args - Arguments to delete one ProjectRequest.
     * @example
     * // Delete one ProjectRequest
     * const ProjectRequest = await prisma.projectRequest.delete({
     *   where: {
     *     // ... filter to delete one ProjectRequest
     *   }
     * })
     * 
     */
    delete<T extends ProjectRequestDeleteArgs>(args: SelectSubset<T, ProjectRequestDeleteArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectRequest.
     * @param {ProjectRequestUpdateArgs} args - Arguments to update one ProjectRequest.
     * @example
     * // Update one ProjectRequest
     * const projectRequest = await prisma.projectRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectRequestUpdateArgs>(args: SelectSubset<T, ProjectRequestUpdateArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectRequests.
     * @param {ProjectRequestDeleteManyArgs} args - Arguments to filter ProjectRequests to delete.
     * @example
     * // Delete a few ProjectRequests
     * const { count } = await prisma.projectRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectRequestDeleteManyArgs>(args?: SelectSubset<T, ProjectRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectRequests
     * const projectRequest = await prisma.projectRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectRequestUpdateManyArgs>(args: SelectSubset<T, ProjectRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectRequests and returns the data updated in the database.
     * @param {ProjectRequestUpdateManyAndReturnArgs} args - Arguments to update many ProjectRequests.
     * @example
     * // Update many ProjectRequests
     * const projectRequest = await prisma.projectRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectRequests and only return the `id`
     * const projectRequestWithIdOnly = await prisma.projectRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProjectRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectRequest.
     * @param {ProjectRequestUpsertArgs} args - Arguments to update or create a ProjectRequest.
     * @example
     * // Update or create a ProjectRequest
     * const projectRequest = await prisma.projectRequest.upsert({
     *   create: {
     *     // ... data to create a ProjectRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectRequest we want to update
     *   }
     * })
     */
    upsert<T extends ProjectRequestUpsertArgs>(args: SelectSubset<T, ProjectRequestUpsertArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRequestCountArgs} args - Arguments to filter ProjectRequests to count.
     * @example
     * // Count the number of ProjectRequests
     * const count = await prisma.projectRequest.count({
     *   where: {
     *     // ... the filter for the ProjectRequests we want to count
     *   }
     * })
    **/
    count<T extends ProjectRequestCountArgs>(
      args?: Subset<T, ProjectRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectRequestAggregateArgs>(args: Subset<T, ProjectRequestAggregateArgs>): Prisma.PrismaPromise<GetProjectRequestAggregateType<T>>

    /**
     * Group by ProjectRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRequestGroupByArgs} args - Group by arguments.
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
      T extends ProjectRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectRequestGroupByArgs['orderBy'] }
        : { orderBy?: ProjectRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProjectRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectRequest model
   */
  readonly fields: ProjectRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ProjectRequest model
   */
  interface ProjectRequestFieldRefs {
    readonly id: FieldRef<"ProjectRequest", 'Int'>
    readonly educationField: FieldRef<"ProjectRequest", 'EducationField'>
    readonly title: FieldRef<"ProjectRequest", 'String'>
    readonly description: FieldRef<"ProjectRequest", 'String'>
    readonly minPrice: FieldRef<"ProjectRequest", 'Decimal'>
    readonly maxPrice: FieldRef<"ProjectRequest", 'Decimal'>
    readonly clientForename: FieldRef<"ProjectRequest", 'String'>
    readonly clientSurname: FieldRef<"ProjectRequest", 'String'>
    readonly clientEmail: FieldRef<"ProjectRequest", 'String'>
    readonly clientPhone: FieldRef<"ProjectRequest", 'String'>
    readonly organizationName: FieldRef<"ProjectRequest", 'String'>
    readonly organizationNumber: FieldRef<"ProjectRequest", 'String'>
    readonly address: FieldRef<"ProjectRequest", 'String'>
    readonly billingAddress: FieldRef<"ProjectRequest", 'String'>
    readonly status: FieldRef<"ProjectRequest", 'Status'>
    readonly createdAt: FieldRef<"ProjectRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectRequest findUnique
   */
  export type ProjectRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Filter, which ProjectRequest to fetch.
     */
    where: ProjectRequestWhereUniqueInput
  }

  /**
   * ProjectRequest findUniqueOrThrow
   */
  export type ProjectRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Filter, which ProjectRequest to fetch.
     */
    where: ProjectRequestWhereUniqueInput
  }

  /**
   * ProjectRequest findFirst
   */
  export type ProjectRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Filter, which ProjectRequest to fetch.
     */
    where?: ProjectRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectRequests to fetch.
     */
    orderBy?: ProjectRequestOrderByWithRelationInput | ProjectRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectRequests.
     */
    cursor?: ProjectRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectRequests.
     */
    distinct?: ProjectRequestScalarFieldEnum | ProjectRequestScalarFieldEnum[]
  }

  /**
   * ProjectRequest findFirstOrThrow
   */
  export type ProjectRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Filter, which ProjectRequest to fetch.
     */
    where?: ProjectRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectRequests to fetch.
     */
    orderBy?: ProjectRequestOrderByWithRelationInput | ProjectRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectRequests.
     */
    cursor?: ProjectRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectRequests.
     */
    distinct?: ProjectRequestScalarFieldEnum | ProjectRequestScalarFieldEnum[]
  }

  /**
   * ProjectRequest findMany
   */
  export type ProjectRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Filter, which ProjectRequests to fetch.
     */
    where?: ProjectRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectRequests to fetch.
     */
    orderBy?: ProjectRequestOrderByWithRelationInput | ProjectRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectRequests.
     */
    cursor?: ProjectRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectRequests.
     */
    distinct?: ProjectRequestScalarFieldEnum | ProjectRequestScalarFieldEnum[]
  }

  /**
   * ProjectRequest create
   */
  export type ProjectRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * The data needed to create a ProjectRequest.
     */
    data: XOR<ProjectRequestCreateInput, ProjectRequestUncheckedCreateInput>
  }

  /**
   * ProjectRequest createMany
   */
  export type ProjectRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectRequests.
     */
    data: ProjectRequestCreateManyInput | ProjectRequestCreateManyInput[]
  }

  /**
   * ProjectRequest createManyAndReturn
   */
  export type ProjectRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectRequests.
     */
    data: ProjectRequestCreateManyInput | ProjectRequestCreateManyInput[]
  }

  /**
   * ProjectRequest update
   */
  export type ProjectRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * The data needed to update a ProjectRequest.
     */
    data: XOR<ProjectRequestUpdateInput, ProjectRequestUncheckedUpdateInput>
    /**
     * Choose, which ProjectRequest to update.
     */
    where: ProjectRequestWhereUniqueInput
  }

  /**
   * ProjectRequest updateMany
   */
  export type ProjectRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectRequests.
     */
    data: XOR<ProjectRequestUpdateManyMutationInput, ProjectRequestUncheckedUpdateManyInput>
    /**
     * Filter which ProjectRequests to update
     */
    where?: ProjectRequestWhereInput
    /**
     * Limit how many ProjectRequests to update.
     */
    limit?: number
  }

  /**
   * ProjectRequest updateManyAndReturn
   */
  export type ProjectRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * The data used to update ProjectRequests.
     */
    data: XOR<ProjectRequestUpdateManyMutationInput, ProjectRequestUncheckedUpdateManyInput>
    /**
     * Filter which ProjectRequests to update
     */
    where?: ProjectRequestWhereInput
    /**
     * Limit how many ProjectRequests to update.
     */
    limit?: number
  }

  /**
   * ProjectRequest upsert
   */
  export type ProjectRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * The filter to search for the ProjectRequest to update in case it exists.
     */
    where: ProjectRequestWhereUniqueInput
    /**
     * In case the ProjectRequest found by the `where` argument doesn't exist, create a new ProjectRequest with this data.
     */
    create: XOR<ProjectRequestCreateInput, ProjectRequestUncheckedCreateInput>
    /**
     * In case the ProjectRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectRequestUpdateInput, ProjectRequestUncheckedUpdateInput>
  }

  /**
   * ProjectRequest delete
   */
  export type ProjectRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Filter which ProjectRequest to delete.
     */
    where: ProjectRequestWhereUniqueInput
  }

  /**
   * ProjectRequest deleteMany
   */
  export type ProjectRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectRequests to delete
     */
    where?: ProjectRequestWhereInput
    /**
     * Limit how many ProjectRequests to delete.
     */
    limit?: number
  }

  /**
   * ProjectRequest without action
   */
  export type ProjectRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
  }


  /**
   * Model ClientReview
   */

  export type AggregateClientReview = {
    _count: ClientReviewCountAggregateOutputType | null
    _avg: ClientReviewAvgAggregateOutputType | null
    _sum: ClientReviewSumAggregateOutputType | null
    _min: ClientReviewMinAggregateOutputType | null
    _max: ClientReviewMaxAggregateOutputType | null
  }

  export type ClientReviewAvgAggregateOutputType = {
    id: number | null
  }

  export type ClientReviewSumAggregateOutputType = {
    id: number | null
  }

  export type ClientReviewMinAggregateOutputType = {
    id: number | null
    name: string | null
    role: string | null
    orgName: string | null
    orgURL: string | null
    imageId: string | null
    message: string | null
    createdAt: Date | null
  }

  export type ClientReviewMaxAggregateOutputType = {
    id: number | null
    name: string | null
    role: string | null
    orgName: string | null
    orgURL: string | null
    imageId: string | null
    message: string | null
    createdAt: Date | null
  }

  export type ClientReviewCountAggregateOutputType = {
    id: number
    name: number
    role: number
    orgName: number
    orgURL: number
    imageId: number
    message: number
    createdAt: number
    _all: number
  }


  export type ClientReviewAvgAggregateInputType = {
    id?: true
  }

  export type ClientReviewSumAggregateInputType = {
    id?: true
  }

  export type ClientReviewMinAggregateInputType = {
    id?: true
    name?: true
    role?: true
    orgName?: true
    orgURL?: true
    imageId?: true
    message?: true
    createdAt?: true
  }

  export type ClientReviewMaxAggregateInputType = {
    id?: true
    name?: true
    role?: true
    orgName?: true
    orgURL?: true
    imageId?: true
    message?: true
    createdAt?: true
  }

  export type ClientReviewCountAggregateInputType = {
    id?: true
    name?: true
    role?: true
    orgName?: true
    orgURL?: true
    imageId?: true
    message?: true
    createdAt?: true
    _all?: true
  }

  export type ClientReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClientReview to aggregate.
     */
    where?: ClientReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientReviews to fetch.
     */
    orderBy?: ClientReviewOrderByWithRelationInput | ClientReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClientReviews
    **/
    _count?: true | ClientReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClientReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClientReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientReviewMaxAggregateInputType
  }

  export type GetClientReviewAggregateType<T extends ClientReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateClientReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClientReview[P]>
      : GetScalarType<T[P], AggregateClientReview[P]>
  }




  export type ClientReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientReviewWhereInput
    orderBy?: ClientReviewOrderByWithAggregationInput | ClientReviewOrderByWithAggregationInput[]
    by: ClientReviewScalarFieldEnum[] | ClientReviewScalarFieldEnum
    having?: ClientReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientReviewCountAggregateInputType | true
    _avg?: ClientReviewAvgAggregateInputType
    _sum?: ClientReviewSumAggregateInputType
    _min?: ClientReviewMinAggregateInputType
    _max?: ClientReviewMaxAggregateInputType
  }

  export type ClientReviewGroupByOutputType = {
    id: number
    name: string
    role: string | null
    orgName: string | null
    orgURL: string | null
    imageId: string | null
    message: string
    createdAt: Date
    _count: ClientReviewCountAggregateOutputType | null
    _avg: ClientReviewAvgAggregateOutputType | null
    _sum: ClientReviewSumAggregateOutputType | null
    _min: ClientReviewMinAggregateOutputType | null
    _max: ClientReviewMaxAggregateOutputType | null
  }

  type GetClientReviewGroupByPayload<T extends ClientReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ClientReviewGroupByOutputType[P]>
        }
      >
    >


  export type ClientReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    orgName?: boolean
    orgURL?: boolean
    imageId?: boolean
    message?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["clientReview"]>

  export type ClientReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    orgName?: boolean
    orgURL?: boolean
    imageId?: boolean
    message?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["clientReview"]>

  export type ClientReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    orgName?: boolean
    orgURL?: boolean
    imageId?: boolean
    message?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["clientReview"]>

  export type ClientReviewSelectScalar = {
    id?: boolean
    name?: boolean
    role?: boolean
    orgName?: boolean
    orgURL?: boolean
    imageId?: boolean
    message?: boolean
    createdAt?: boolean
  }

  export type ClientReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "role" | "orgName" | "orgURL" | "imageId" | "message" | "createdAt", ExtArgs["result"]["clientReview"]>

  export type $ClientReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClientReview"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      role: string | null
      orgName: string | null
      orgURL: string | null
      imageId: string | null
      message: string
      createdAt: Date
    }, ExtArgs["result"]["clientReview"]>
    composites: {}
  }

  type ClientReviewGetPayload<S extends boolean | null | undefined | ClientReviewDefaultArgs> = $Result.GetResult<Prisma.$ClientReviewPayload, S>

  type ClientReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientReviewCountAggregateInputType | true
    }

  export interface ClientReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClientReview'], meta: { name: 'ClientReview' } }
    /**
     * Find zero or one ClientReview that matches the filter.
     * @param {ClientReviewFindUniqueArgs} args - Arguments to find a ClientReview
     * @example
     * // Get one ClientReview
     * const clientReview = await prisma.clientReview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientReviewFindUniqueArgs>(args: SelectSubset<T, ClientReviewFindUniqueArgs<ExtArgs>>): Prisma__ClientReviewClient<$Result.GetResult<Prisma.$ClientReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClientReview that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientReviewFindUniqueOrThrowArgs} args - Arguments to find a ClientReview
     * @example
     * // Get one ClientReview
     * const clientReview = await prisma.clientReview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientReviewClient<$Result.GetResult<Prisma.$ClientReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClientReview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientReviewFindFirstArgs} args - Arguments to find a ClientReview
     * @example
     * // Get one ClientReview
     * const clientReview = await prisma.clientReview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientReviewFindFirstArgs>(args?: SelectSubset<T, ClientReviewFindFirstArgs<ExtArgs>>): Prisma__ClientReviewClient<$Result.GetResult<Prisma.$ClientReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClientReview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientReviewFindFirstOrThrowArgs} args - Arguments to find a ClientReview
     * @example
     * // Get one ClientReview
     * const clientReview = await prisma.clientReview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientReviewClient<$Result.GetResult<Prisma.$ClientReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClientReviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClientReviews
     * const clientReviews = await prisma.clientReview.findMany()
     * 
     * // Get first 10 ClientReviews
     * const clientReviews = await prisma.clientReview.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientReviewWithIdOnly = await prisma.clientReview.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientReviewFindManyArgs>(args?: SelectSubset<T, ClientReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClientReview.
     * @param {ClientReviewCreateArgs} args - Arguments to create a ClientReview.
     * @example
     * // Create one ClientReview
     * const ClientReview = await prisma.clientReview.create({
     *   data: {
     *     // ... data to create a ClientReview
     *   }
     * })
     * 
     */
    create<T extends ClientReviewCreateArgs>(args: SelectSubset<T, ClientReviewCreateArgs<ExtArgs>>): Prisma__ClientReviewClient<$Result.GetResult<Prisma.$ClientReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClientReviews.
     * @param {ClientReviewCreateManyArgs} args - Arguments to create many ClientReviews.
     * @example
     * // Create many ClientReviews
     * const clientReview = await prisma.clientReview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientReviewCreateManyArgs>(args?: SelectSubset<T, ClientReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClientReviews and returns the data saved in the database.
     * @param {ClientReviewCreateManyAndReturnArgs} args - Arguments to create many ClientReviews.
     * @example
     * // Create many ClientReviews
     * const clientReview = await prisma.clientReview.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClientReviews and only return the `id`
     * const clientReviewWithIdOnly = await prisma.clientReview.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClientReview.
     * @param {ClientReviewDeleteArgs} args - Arguments to delete one ClientReview.
     * @example
     * // Delete one ClientReview
     * const ClientReview = await prisma.clientReview.delete({
     *   where: {
     *     // ... filter to delete one ClientReview
     *   }
     * })
     * 
     */
    delete<T extends ClientReviewDeleteArgs>(args: SelectSubset<T, ClientReviewDeleteArgs<ExtArgs>>): Prisma__ClientReviewClient<$Result.GetResult<Prisma.$ClientReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClientReview.
     * @param {ClientReviewUpdateArgs} args - Arguments to update one ClientReview.
     * @example
     * // Update one ClientReview
     * const clientReview = await prisma.clientReview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientReviewUpdateArgs>(args: SelectSubset<T, ClientReviewUpdateArgs<ExtArgs>>): Prisma__ClientReviewClient<$Result.GetResult<Prisma.$ClientReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClientReviews.
     * @param {ClientReviewDeleteManyArgs} args - Arguments to filter ClientReviews to delete.
     * @example
     * // Delete a few ClientReviews
     * const { count } = await prisma.clientReview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientReviewDeleteManyArgs>(args?: SelectSubset<T, ClientReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClientReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClientReviews
     * const clientReview = await prisma.clientReview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientReviewUpdateManyArgs>(args: SelectSubset<T, ClientReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClientReviews and returns the data updated in the database.
     * @param {ClientReviewUpdateManyAndReturnArgs} args - Arguments to update many ClientReviews.
     * @example
     * // Update many ClientReviews
     * const clientReview = await prisma.clientReview.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClientReviews and only return the `id`
     * const clientReviewWithIdOnly = await prisma.clientReview.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClientReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClientReview.
     * @param {ClientReviewUpsertArgs} args - Arguments to update or create a ClientReview.
     * @example
     * // Update or create a ClientReview
     * const clientReview = await prisma.clientReview.upsert({
     *   create: {
     *     // ... data to create a ClientReview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClientReview we want to update
     *   }
     * })
     */
    upsert<T extends ClientReviewUpsertArgs>(args: SelectSubset<T, ClientReviewUpsertArgs<ExtArgs>>): Prisma__ClientReviewClient<$Result.GetResult<Prisma.$ClientReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClientReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientReviewCountArgs} args - Arguments to filter ClientReviews to count.
     * @example
     * // Count the number of ClientReviews
     * const count = await prisma.clientReview.count({
     *   where: {
     *     // ... the filter for the ClientReviews we want to count
     *   }
     * })
    **/
    count<T extends ClientReviewCountArgs>(
      args?: Subset<T, ClientReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClientReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClientReviewAggregateArgs>(args: Subset<T, ClientReviewAggregateArgs>): Prisma.PrismaPromise<GetClientReviewAggregateType<T>>

    /**
     * Group by ClientReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientReviewGroupByArgs} args - Group by arguments.
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
      T extends ClientReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientReviewGroupByArgs['orderBy'] }
        : { orderBy?: ClientReviewGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClientReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClientReview model
   */
  readonly fields: ClientReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClientReview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ClientReview model
   */
  interface ClientReviewFieldRefs {
    readonly id: FieldRef<"ClientReview", 'Int'>
    readonly name: FieldRef<"ClientReview", 'String'>
    readonly role: FieldRef<"ClientReview", 'String'>
    readonly orgName: FieldRef<"ClientReview", 'String'>
    readonly orgURL: FieldRef<"ClientReview", 'String'>
    readonly imageId: FieldRef<"ClientReview", 'String'>
    readonly message: FieldRef<"ClientReview", 'String'>
    readonly createdAt: FieldRef<"ClientReview", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClientReview findUnique
   */
  export type ClientReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientReview
     */
    select?: ClientReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientReview
     */
    omit?: ClientReviewOmit<ExtArgs> | null
    /**
     * Filter, which ClientReview to fetch.
     */
    where: ClientReviewWhereUniqueInput
  }

  /**
   * ClientReview findUniqueOrThrow
   */
  export type ClientReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientReview
     */
    select?: ClientReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientReview
     */
    omit?: ClientReviewOmit<ExtArgs> | null
    /**
     * Filter, which ClientReview to fetch.
     */
    where: ClientReviewWhereUniqueInput
  }

  /**
   * ClientReview findFirst
   */
  export type ClientReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientReview
     */
    select?: ClientReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientReview
     */
    omit?: ClientReviewOmit<ExtArgs> | null
    /**
     * Filter, which ClientReview to fetch.
     */
    where?: ClientReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientReviews to fetch.
     */
    orderBy?: ClientReviewOrderByWithRelationInput | ClientReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClientReviews.
     */
    cursor?: ClientReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClientReviews.
     */
    distinct?: ClientReviewScalarFieldEnum | ClientReviewScalarFieldEnum[]
  }

  /**
   * ClientReview findFirstOrThrow
   */
  export type ClientReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientReview
     */
    select?: ClientReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientReview
     */
    omit?: ClientReviewOmit<ExtArgs> | null
    /**
     * Filter, which ClientReview to fetch.
     */
    where?: ClientReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientReviews to fetch.
     */
    orderBy?: ClientReviewOrderByWithRelationInput | ClientReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClientReviews.
     */
    cursor?: ClientReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClientReviews.
     */
    distinct?: ClientReviewScalarFieldEnum | ClientReviewScalarFieldEnum[]
  }

  /**
   * ClientReview findMany
   */
  export type ClientReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientReview
     */
    select?: ClientReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientReview
     */
    omit?: ClientReviewOmit<ExtArgs> | null
    /**
     * Filter, which ClientReviews to fetch.
     */
    where?: ClientReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientReviews to fetch.
     */
    orderBy?: ClientReviewOrderByWithRelationInput | ClientReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClientReviews.
     */
    cursor?: ClientReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClientReviews.
     */
    distinct?: ClientReviewScalarFieldEnum | ClientReviewScalarFieldEnum[]
  }

  /**
   * ClientReview create
   */
  export type ClientReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientReview
     */
    select?: ClientReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientReview
     */
    omit?: ClientReviewOmit<ExtArgs> | null
    /**
     * The data needed to create a ClientReview.
     */
    data: XOR<ClientReviewCreateInput, ClientReviewUncheckedCreateInput>
  }

  /**
   * ClientReview createMany
   */
  export type ClientReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClientReviews.
     */
    data: ClientReviewCreateManyInput | ClientReviewCreateManyInput[]
  }

  /**
   * ClientReview createManyAndReturn
   */
  export type ClientReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientReview
     */
    select?: ClientReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClientReview
     */
    omit?: ClientReviewOmit<ExtArgs> | null
    /**
     * The data used to create many ClientReviews.
     */
    data: ClientReviewCreateManyInput | ClientReviewCreateManyInput[]
  }

  /**
   * ClientReview update
   */
  export type ClientReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientReview
     */
    select?: ClientReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientReview
     */
    omit?: ClientReviewOmit<ExtArgs> | null
    /**
     * The data needed to update a ClientReview.
     */
    data: XOR<ClientReviewUpdateInput, ClientReviewUncheckedUpdateInput>
    /**
     * Choose, which ClientReview to update.
     */
    where: ClientReviewWhereUniqueInput
  }

  /**
   * ClientReview updateMany
   */
  export type ClientReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClientReviews.
     */
    data: XOR<ClientReviewUpdateManyMutationInput, ClientReviewUncheckedUpdateManyInput>
    /**
     * Filter which ClientReviews to update
     */
    where?: ClientReviewWhereInput
    /**
     * Limit how many ClientReviews to update.
     */
    limit?: number
  }

  /**
   * ClientReview updateManyAndReturn
   */
  export type ClientReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientReview
     */
    select?: ClientReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClientReview
     */
    omit?: ClientReviewOmit<ExtArgs> | null
    /**
     * The data used to update ClientReviews.
     */
    data: XOR<ClientReviewUpdateManyMutationInput, ClientReviewUncheckedUpdateManyInput>
    /**
     * Filter which ClientReviews to update
     */
    where?: ClientReviewWhereInput
    /**
     * Limit how many ClientReviews to update.
     */
    limit?: number
  }

  /**
   * ClientReview upsert
   */
  export type ClientReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientReview
     */
    select?: ClientReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientReview
     */
    omit?: ClientReviewOmit<ExtArgs> | null
    /**
     * The filter to search for the ClientReview to update in case it exists.
     */
    where: ClientReviewWhereUniqueInput
    /**
     * In case the ClientReview found by the `where` argument doesn't exist, create a new ClientReview with this data.
     */
    create: XOR<ClientReviewCreateInput, ClientReviewUncheckedCreateInput>
    /**
     * In case the ClientReview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientReviewUpdateInput, ClientReviewUncheckedUpdateInput>
  }

  /**
   * ClientReview delete
   */
  export type ClientReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientReview
     */
    select?: ClientReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientReview
     */
    omit?: ClientReviewOmit<ExtArgs> | null
    /**
     * Filter which ClientReview to delete.
     */
    where: ClientReviewWhereUniqueInput
  }

  /**
   * ClientReview deleteMany
   */
  export type ClientReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClientReviews to delete
     */
    where?: ClientReviewWhereInput
    /**
     * Limit how many ClientReviews to delete.
     */
    limit?: number
  }

  /**
   * ClientReview without action
   */
  export type ClientReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientReview
     */
    select?: ClientReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientReview
     */
    omit?: ClientReviewOmit<ExtArgs> | null
  }


  /**
   * Model ContactPerson
   */

  export type AggregateContactPerson = {
    _count: ContactPersonCountAggregateOutputType | null
    _avg: ContactPersonAvgAggregateOutputType | null
    _sum: ContactPersonSumAggregateOutputType | null
    _min: ContactPersonMinAggregateOutputType | null
    _max: ContactPersonMaxAggregateOutputType | null
  }

  export type ContactPersonAvgAggregateOutputType = {
    id: number | null
  }

  export type ContactPersonSumAggregateOutputType = {
    id: number | null
  }

  export type ContactPersonMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    phone: string | null
    title: string | null
  }

  export type ContactPersonMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    phone: string | null
    title: string | null
  }

  export type ContactPersonCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    title: number
    _all: number
  }


  export type ContactPersonAvgAggregateInputType = {
    id?: true
  }

  export type ContactPersonSumAggregateInputType = {
    id?: true
  }

  export type ContactPersonMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    title?: true
  }

  export type ContactPersonMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    title?: true
  }

  export type ContactPersonCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    title?: true
    _all?: true
  }

  export type ContactPersonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactPerson to aggregate.
     */
    where?: ContactPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactPeople to fetch.
     */
    orderBy?: ContactPersonOrderByWithRelationInput | ContactPersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactPeople from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactPeople.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContactPeople
    **/
    _count?: true | ContactPersonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContactPersonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContactPersonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactPersonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactPersonMaxAggregateInputType
  }

  export type GetContactPersonAggregateType<T extends ContactPersonAggregateArgs> = {
        [P in keyof T & keyof AggregateContactPerson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContactPerson[P]>
      : GetScalarType<T[P], AggregateContactPerson[P]>
  }




  export type ContactPersonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactPersonWhereInput
    orderBy?: ContactPersonOrderByWithAggregationInput | ContactPersonOrderByWithAggregationInput[]
    by: ContactPersonScalarFieldEnum[] | ContactPersonScalarFieldEnum
    having?: ContactPersonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactPersonCountAggregateInputType | true
    _avg?: ContactPersonAvgAggregateInputType
    _sum?: ContactPersonSumAggregateInputType
    _min?: ContactPersonMinAggregateInputType
    _max?: ContactPersonMaxAggregateInputType
  }

  export type ContactPersonGroupByOutputType = {
    id: number
    name: string
    email: string
    phone: string
    title: string
    _count: ContactPersonCountAggregateOutputType | null
    _avg: ContactPersonAvgAggregateOutputType | null
    _sum: ContactPersonSumAggregateOutputType | null
    _min: ContactPersonMinAggregateOutputType | null
    _max: ContactPersonMaxAggregateOutputType | null
  }

  type GetContactPersonGroupByPayload<T extends ContactPersonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactPersonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactPersonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactPersonGroupByOutputType[P]>
            : GetScalarType<T[P], ContactPersonGroupByOutputType[P]>
        }
      >
    >


  export type ContactPersonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    title?: boolean
    product?: boolean | ContactPerson$productArgs<ExtArgs>
    _count?: boolean | ContactPersonCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contactPerson"]>

  export type ContactPersonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    title?: boolean
  }, ExtArgs["result"]["contactPerson"]>

  export type ContactPersonSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    title?: boolean
  }, ExtArgs["result"]["contactPerson"]>

  export type ContactPersonSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    title?: boolean
  }

  export type ContactPersonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "title", ExtArgs["result"]["contactPerson"]>
  export type ContactPersonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ContactPerson$productArgs<ExtArgs>
    _count?: boolean | ContactPersonCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContactPersonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ContactPersonIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ContactPersonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContactPerson"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      phone: string
      title: string
    }, ExtArgs["result"]["contactPerson"]>
    composites: {}
  }

  type ContactPersonGetPayload<S extends boolean | null | undefined | ContactPersonDefaultArgs> = $Result.GetResult<Prisma.$ContactPersonPayload, S>

  type ContactPersonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactPersonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactPersonCountAggregateInputType | true
    }

  export interface ContactPersonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContactPerson'], meta: { name: 'ContactPerson' } }
    /**
     * Find zero or one ContactPerson that matches the filter.
     * @param {ContactPersonFindUniqueArgs} args - Arguments to find a ContactPerson
     * @example
     * // Get one ContactPerson
     * const contactPerson = await prisma.contactPerson.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactPersonFindUniqueArgs>(args: SelectSubset<T, ContactPersonFindUniqueArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContactPerson that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactPersonFindUniqueOrThrowArgs} args - Arguments to find a ContactPerson
     * @example
     * // Get one ContactPerson
     * const contactPerson = await prisma.contactPerson.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactPersonFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactPersonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactPerson that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPersonFindFirstArgs} args - Arguments to find a ContactPerson
     * @example
     * // Get one ContactPerson
     * const contactPerson = await prisma.contactPerson.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactPersonFindFirstArgs>(args?: SelectSubset<T, ContactPersonFindFirstArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactPerson that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPersonFindFirstOrThrowArgs} args - Arguments to find a ContactPerson
     * @example
     * // Get one ContactPerson
     * const contactPerson = await prisma.contactPerson.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactPersonFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactPersonFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContactPeople that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPersonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContactPeople
     * const contactPeople = await prisma.contactPerson.findMany()
     * 
     * // Get first 10 ContactPeople
     * const contactPeople = await prisma.contactPerson.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactPersonWithIdOnly = await prisma.contactPerson.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactPersonFindManyArgs>(args?: SelectSubset<T, ContactPersonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContactPerson.
     * @param {ContactPersonCreateArgs} args - Arguments to create a ContactPerson.
     * @example
     * // Create one ContactPerson
     * const ContactPerson = await prisma.contactPerson.create({
     *   data: {
     *     // ... data to create a ContactPerson
     *   }
     * })
     * 
     */
    create<T extends ContactPersonCreateArgs>(args: SelectSubset<T, ContactPersonCreateArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContactPeople.
     * @param {ContactPersonCreateManyArgs} args - Arguments to create many ContactPeople.
     * @example
     * // Create many ContactPeople
     * const contactPerson = await prisma.contactPerson.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactPersonCreateManyArgs>(args?: SelectSubset<T, ContactPersonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContactPeople and returns the data saved in the database.
     * @param {ContactPersonCreateManyAndReturnArgs} args - Arguments to create many ContactPeople.
     * @example
     * // Create many ContactPeople
     * const contactPerson = await prisma.contactPerson.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContactPeople and only return the `id`
     * const contactPersonWithIdOnly = await prisma.contactPerson.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactPersonCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactPersonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ContactPerson.
     * @param {ContactPersonDeleteArgs} args - Arguments to delete one ContactPerson.
     * @example
     * // Delete one ContactPerson
     * const ContactPerson = await prisma.contactPerson.delete({
     *   where: {
     *     // ... filter to delete one ContactPerson
     *   }
     * })
     * 
     */
    delete<T extends ContactPersonDeleteArgs>(args: SelectSubset<T, ContactPersonDeleteArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContactPerson.
     * @param {ContactPersonUpdateArgs} args - Arguments to update one ContactPerson.
     * @example
     * // Update one ContactPerson
     * const contactPerson = await prisma.contactPerson.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactPersonUpdateArgs>(args: SelectSubset<T, ContactPersonUpdateArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContactPeople.
     * @param {ContactPersonDeleteManyArgs} args - Arguments to filter ContactPeople to delete.
     * @example
     * // Delete a few ContactPeople
     * const { count } = await prisma.contactPerson.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactPersonDeleteManyArgs>(args?: SelectSubset<T, ContactPersonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactPeople.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPersonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContactPeople
     * const contactPerson = await prisma.contactPerson.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactPersonUpdateManyArgs>(args: SelectSubset<T, ContactPersonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactPeople and returns the data updated in the database.
     * @param {ContactPersonUpdateManyAndReturnArgs} args - Arguments to update many ContactPeople.
     * @example
     * // Update many ContactPeople
     * const contactPerson = await prisma.contactPerson.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ContactPeople and only return the `id`
     * const contactPersonWithIdOnly = await prisma.contactPerson.updateManyAndReturn({
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
    updateManyAndReturn<T extends ContactPersonUpdateManyAndReturnArgs>(args: SelectSubset<T, ContactPersonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ContactPerson.
     * @param {ContactPersonUpsertArgs} args - Arguments to update or create a ContactPerson.
     * @example
     * // Update or create a ContactPerson
     * const contactPerson = await prisma.contactPerson.upsert({
     *   create: {
     *     // ... data to create a ContactPerson
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContactPerson we want to update
     *   }
     * })
     */
    upsert<T extends ContactPersonUpsertArgs>(args: SelectSubset<T, ContactPersonUpsertArgs<ExtArgs>>): Prisma__ContactPersonClient<$Result.GetResult<Prisma.$ContactPersonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContactPeople.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPersonCountArgs} args - Arguments to filter ContactPeople to count.
     * @example
     * // Count the number of ContactPeople
     * const count = await prisma.contactPerson.count({
     *   where: {
     *     // ... the filter for the ContactPeople we want to count
     *   }
     * })
    **/
    count<T extends ContactPersonCountArgs>(
      args?: Subset<T, ContactPersonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactPersonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContactPerson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPersonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContactPersonAggregateArgs>(args: Subset<T, ContactPersonAggregateArgs>): Prisma.PrismaPromise<GetContactPersonAggregateType<T>>

    /**
     * Group by ContactPerson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPersonGroupByArgs} args - Group by arguments.
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
      T extends ContactPersonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactPersonGroupByArgs['orderBy'] }
        : { orderBy?: ContactPersonGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContactPersonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactPersonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContactPerson model
   */
  readonly fields: ContactPersonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContactPerson.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactPersonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ContactPerson$productArgs<ExtArgs> = {}>(args?: Subset<T, ContactPerson$productArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ContactPerson model
   */
  interface ContactPersonFieldRefs {
    readonly id: FieldRef<"ContactPerson", 'Int'>
    readonly name: FieldRef<"ContactPerson", 'String'>
    readonly email: FieldRef<"ContactPerson", 'String'>
    readonly phone: FieldRef<"ContactPerson", 'String'>
    readonly title: FieldRef<"ContactPerson", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ContactPerson findUnique
   */
  export type ContactPersonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPerson
     */
    omit?: ContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * Filter, which ContactPerson to fetch.
     */
    where: ContactPersonWhereUniqueInput
  }

  /**
   * ContactPerson findUniqueOrThrow
   */
  export type ContactPersonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPerson
     */
    omit?: ContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * Filter, which ContactPerson to fetch.
     */
    where: ContactPersonWhereUniqueInput
  }

  /**
   * ContactPerson findFirst
   */
  export type ContactPersonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPerson
     */
    omit?: ContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * Filter, which ContactPerson to fetch.
     */
    where?: ContactPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactPeople to fetch.
     */
    orderBy?: ContactPersonOrderByWithRelationInput | ContactPersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactPeople.
     */
    cursor?: ContactPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactPeople from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactPeople.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactPeople.
     */
    distinct?: ContactPersonScalarFieldEnum | ContactPersonScalarFieldEnum[]
  }

  /**
   * ContactPerson findFirstOrThrow
   */
  export type ContactPersonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPerson
     */
    omit?: ContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * Filter, which ContactPerson to fetch.
     */
    where?: ContactPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactPeople to fetch.
     */
    orderBy?: ContactPersonOrderByWithRelationInput | ContactPersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactPeople.
     */
    cursor?: ContactPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactPeople from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactPeople.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactPeople.
     */
    distinct?: ContactPersonScalarFieldEnum | ContactPersonScalarFieldEnum[]
  }

  /**
   * ContactPerson findMany
   */
  export type ContactPersonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPerson
     */
    omit?: ContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * Filter, which ContactPeople to fetch.
     */
    where?: ContactPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactPeople to fetch.
     */
    orderBy?: ContactPersonOrderByWithRelationInput | ContactPersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContactPeople.
     */
    cursor?: ContactPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactPeople from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactPeople.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactPeople.
     */
    distinct?: ContactPersonScalarFieldEnum | ContactPersonScalarFieldEnum[]
  }

  /**
   * ContactPerson create
   */
  export type ContactPersonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPerson
     */
    omit?: ContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * The data needed to create a ContactPerson.
     */
    data: XOR<ContactPersonCreateInput, ContactPersonUncheckedCreateInput>
  }

  /**
   * ContactPerson createMany
   */
  export type ContactPersonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContactPeople.
     */
    data: ContactPersonCreateManyInput | ContactPersonCreateManyInput[]
  }

  /**
   * ContactPerson createManyAndReturn
   */
  export type ContactPersonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPerson
     */
    omit?: ContactPersonOmit<ExtArgs> | null
    /**
     * The data used to create many ContactPeople.
     */
    data: ContactPersonCreateManyInput | ContactPersonCreateManyInput[]
  }

  /**
   * ContactPerson update
   */
  export type ContactPersonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPerson
     */
    omit?: ContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * The data needed to update a ContactPerson.
     */
    data: XOR<ContactPersonUpdateInput, ContactPersonUncheckedUpdateInput>
    /**
     * Choose, which ContactPerson to update.
     */
    where: ContactPersonWhereUniqueInput
  }

  /**
   * ContactPerson updateMany
   */
  export type ContactPersonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContactPeople.
     */
    data: XOR<ContactPersonUpdateManyMutationInput, ContactPersonUncheckedUpdateManyInput>
    /**
     * Filter which ContactPeople to update
     */
    where?: ContactPersonWhereInput
    /**
     * Limit how many ContactPeople to update.
     */
    limit?: number
  }

  /**
   * ContactPerson updateManyAndReturn
   */
  export type ContactPersonUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPerson
     */
    omit?: ContactPersonOmit<ExtArgs> | null
    /**
     * The data used to update ContactPeople.
     */
    data: XOR<ContactPersonUpdateManyMutationInput, ContactPersonUncheckedUpdateManyInput>
    /**
     * Filter which ContactPeople to update
     */
    where?: ContactPersonWhereInput
    /**
     * Limit how many ContactPeople to update.
     */
    limit?: number
  }

  /**
   * ContactPerson upsert
   */
  export type ContactPersonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPerson
     */
    omit?: ContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * The filter to search for the ContactPerson to update in case it exists.
     */
    where: ContactPersonWhereUniqueInput
    /**
     * In case the ContactPerson found by the `where` argument doesn't exist, create a new ContactPerson with this data.
     */
    create: XOR<ContactPersonCreateInput, ContactPersonUncheckedCreateInput>
    /**
     * In case the ContactPerson was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactPersonUpdateInput, ContactPersonUncheckedUpdateInput>
  }

  /**
   * ContactPerson delete
   */
  export type ContactPersonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPerson
     */
    omit?: ContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
    /**
     * Filter which ContactPerson to delete.
     */
    where: ContactPersonWhereUniqueInput
  }

  /**
   * ContactPerson deleteMany
   */
  export type ContactPersonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactPeople to delete
     */
    where?: ContactPersonWhereInput
    /**
     * Limit how many ContactPeople to delete.
     */
    limit?: number
  }

  /**
   * ContactPerson.product
   */
  export type ContactPerson$productArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * ContactPerson without action
   */
  export type ContactPersonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPerson
     */
    select?: ContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPerson
     */
    omit?: ContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactPersonInclude<ExtArgs> | null
  }


  /**
   * Model ProductOrder
   */

  export type AggregateProductOrder = {
    _count: ProductOrderCountAggregateOutputType | null
    _avg: ProductOrderAvgAggregateOutputType | null
    _sum: ProductOrderSumAggregateOutputType | null
    _min: ProductOrderMinAggregateOutputType | null
    _max: ProductOrderMaxAggregateOutputType | null
  }

  export type ProductOrderAvgAggregateOutputType = {
    id: number | null
    amount: number | null
    productId: number | null
  }

  export type ProductOrderSumAggregateOutputType = {
    id: number | null
    amount: number | null
    productId: number | null
  }

  export type ProductOrderMinAggregateOutputType = {
    id: number | null
    clientName: string | null
    clientEmail: string | null
    clientPhone: string | null
    amount: number | null
    extraDetails: string | null
    status: $Enums.OrderStatus | null
    productId: number | null
  }

  export type ProductOrderMaxAggregateOutputType = {
    id: number | null
    clientName: string | null
    clientEmail: string | null
    clientPhone: string | null
    amount: number | null
    extraDetails: string | null
    status: $Enums.OrderStatus | null
    productId: number | null
  }

  export type ProductOrderCountAggregateOutputType = {
    id: number
    clientName: number
    clientEmail: number
    clientPhone: number
    amount: number
    extraDetails: number
    status: number
    productId: number
    _all: number
  }


  export type ProductOrderAvgAggregateInputType = {
    id?: true
    amount?: true
    productId?: true
  }

  export type ProductOrderSumAggregateInputType = {
    id?: true
    amount?: true
    productId?: true
  }

  export type ProductOrderMinAggregateInputType = {
    id?: true
    clientName?: true
    clientEmail?: true
    clientPhone?: true
    amount?: true
    extraDetails?: true
    status?: true
    productId?: true
  }

  export type ProductOrderMaxAggregateInputType = {
    id?: true
    clientName?: true
    clientEmail?: true
    clientPhone?: true
    amount?: true
    extraDetails?: true
    status?: true
    productId?: true
  }

  export type ProductOrderCountAggregateInputType = {
    id?: true
    clientName?: true
    clientEmail?: true
    clientPhone?: true
    amount?: true
    extraDetails?: true
    status?: true
    productId?: true
    _all?: true
  }

  export type ProductOrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductOrder to aggregate.
     */
    where?: ProductOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductOrders to fetch.
     */
    orderBy?: ProductOrderOrderByWithRelationInput | ProductOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductOrders
    **/
    _count?: true | ProductOrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductOrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductOrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductOrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductOrderMaxAggregateInputType
  }

  export type GetProductOrderAggregateType<T extends ProductOrderAggregateArgs> = {
        [P in keyof T & keyof AggregateProductOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductOrder[P]>
      : GetScalarType<T[P], AggregateProductOrder[P]>
  }




  export type ProductOrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductOrderWhereInput
    orderBy?: ProductOrderOrderByWithAggregationInput | ProductOrderOrderByWithAggregationInput[]
    by: ProductOrderScalarFieldEnum[] | ProductOrderScalarFieldEnum
    having?: ProductOrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductOrderCountAggregateInputType | true
    _avg?: ProductOrderAvgAggregateInputType
    _sum?: ProductOrderSumAggregateInputType
    _min?: ProductOrderMinAggregateInputType
    _max?: ProductOrderMaxAggregateInputType
  }

  export type ProductOrderGroupByOutputType = {
    id: number
    clientName: string
    clientEmail: string
    clientPhone: string
    amount: number
    extraDetails: string | null
    status: $Enums.OrderStatus
    productId: number | null
    _count: ProductOrderCountAggregateOutputType | null
    _avg: ProductOrderAvgAggregateOutputType | null
    _sum: ProductOrderSumAggregateOutputType | null
    _min: ProductOrderMinAggregateOutputType | null
    _max: ProductOrderMaxAggregateOutputType | null
  }

  type GetProductOrderGroupByPayload<T extends ProductOrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductOrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductOrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductOrderGroupByOutputType[P]>
            : GetScalarType<T[P], ProductOrderGroupByOutputType[P]>
        }
      >
    >


  export type ProductOrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientName?: boolean
    clientEmail?: boolean
    clientPhone?: boolean
    amount?: boolean
    extraDetails?: boolean
    status?: boolean
    productId?: boolean
    product?: boolean | ProductOrder$productArgs<ExtArgs>
  }, ExtArgs["result"]["productOrder"]>

  export type ProductOrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientName?: boolean
    clientEmail?: boolean
    clientPhone?: boolean
    amount?: boolean
    extraDetails?: boolean
    status?: boolean
    productId?: boolean
    product?: boolean | ProductOrder$productArgs<ExtArgs>
  }, ExtArgs["result"]["productOrder"]>

  export type ProductOrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientName?: boolean
    clientEmail?: boolean
    clientPhone?: boolean
    amount?: boolean
    extraDetails?: boolean
    status?: boolean
    productId?: boolean
    product?: boolean | ProductOrder$productArgs<ExtArgs>
  }, ExtArgs["result"]["productOrder"]>

  export type ProductOrderSelectScalar = {
    id?: boolean
    clientName?: boolean
    clientEmail?: boolean
    clientPhone?: boolean
    amount?: boolean
    extraDetails?: boolean
    status?: boolean
    productId?: boolean
  }

  export type ProductOrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientName" | "clientEmail" | "clientPhone" | "amount" | "extraDetails" | "status" | "productId", ExtArgs["result"]["productOrder"]>
  export type ProductOrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductOrder$productArgs<ExtArgs>
  }
  export type ProductOrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductOrder$productArgs<ExtArgs>
  }
  export type ProductOrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductOrder$productArgs<ExtArgs>
  }

  export type $ProductOrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductOrder"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      clientName: string
      clientEmail: string
      clientPhone: string
      amount: number
      extraDetails: string | null
      status: $Enums.OrderStatus
      productId: number | null
    }, ExtArgs["result"]["productOrder"]>
    composites: {}
  }

  type ProductOrderGetPayload<S extends boolean | null | undefined | ProductOrderDefaultArgs> = $Result.GetResult<Prisma.$ProductOrderPayload, S>

  type ProductOrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductOrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductOrderCountAggregateInputType | true
    }

  export interface ProductOrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductOrder'], meta: { name: 'ProductOrder' } }
    /**
     * Find zero or one ProductOrder that matches the filter.
     * @param {ProductOrderFindUniqueArgs} args - Arguments to find a ProductOrder
     * @example
     * // Get one ProductOrder
     * const productOrder = await prisma.productOrder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductOrderFindUniqueArgs>(args: SelectSubset<T, ProductOrderFindUniqueArgs<ExtArgs>>): Prisma__ProductOrderClient<$Result.GetResult<Prisma.$ProductOrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductOrder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductOrderFindUniqueOrThrowArgs} args - Arguments to find a ProductOrder
     * @example
     * // Get one ProductOrder
     * const productOrder = await prisma.productOrder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductOrderFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductOrderClient<$Result.GetResult<Prisma.$ProductOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductOrder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductOrderFindFirstArgs} args - Arguments to find a ProductOrder
     * @example
     * // Get one ProductOrder
     * const productOrder = await prisma.productOrder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductOrderFindFirstArgs>(args?: SelectSubset<T, ProductOrderFindFirstArgs<ExtArgs>>): Prisma__ProductOrderClient<$Result.GetResult<Prisma.$ProductOrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductOrder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductOrderFindFirstOrThrowArgs} args - Arguments to find a ProductOrder
     * @example
     * // Get one ProductOrder
     * const productOrder = await prisma.productOrder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductOrderFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductOrderClient<$Result.GetResult<Prisma.$ProductOrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductOrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductOrders
     * const productOrders = await prisma.productOrder.findMany()
     * 
     * // Get first 10 ProductOrders
     * const productOrders = await prisma.productOrder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productOrderWithIdOnly = await prisma.productOrder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductOrderFindManyArgs>(args?: SelectSubset<T, ProductOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductOrder.
     * @param {ProductOrderCreateArgs} args - Arguments to create a ProductOrder.
     * @example
     * // Create one ProductOrder
     * const ProductOrder = await prisma.productOrder.create({
     *   data: {
     *     // ... data to create a ProductOrder
     *   }
     * })
     * 
     */
    create<T extends ProductOrderCreateArgs>(args: SelectSubset<T, ProductOrderCreateArgs<ExtArgs>>): Prisma__ProductOrderClient<$Result.GetResult<Prisma.$ProductOrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductOrders.
     * @param {ProductOrderCreateManyArgs} args - Arguments to create many ProductOrders.
     * @example
     * // Create many ProductOrders
     * const productOrder = await prisma.productOrder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductOrderCreateManyArgs>(args?: SelectSubset<T, ProductOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductOrders and returns the data saved in the database.
     * @param {ProductOrderCreateManyAndReturnArgs} args - Arguments to create many ProductOrders.
     * @example
     * // Create many ProductOrders
     * const productOrder = await prisma.productOrder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductOrders and only return the `id`
     * const productOrderWithIdOnly = await prisma.productOrder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductOrderCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductOrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductOrder.
     * @param {ProductOrderDeleteArgs} args - Arguments to delete one ProductOrder.
     * @example
     * // Delete one ProductOrder
     * const ProductOrder = await prisma.productOrder.delete({
     *   where: {
     *     // ... filter to delete one ProductOrder
     *   }
     * })
     * 
     */
    delete<T extends ProductOrderDeleteArgs>(args: SelectSubset<T, ProductOrderDeleteArgs<ExtArgs>>): Prisma__ProductOrderClient<$Result.GetResult<Prisma.$ProductOrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductOrder.
     * @param {ProductOrderUpdateArgs} args - Arguments to update one ProductOrder.
     * @example
     * // Update one ProductOrder
     * const productOrder = await prisma.productOrder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductOrderUpdateArgs>(args: SelectSubset<T, ProductOrderUpdateArgs<ExtArgs>>): Prisma__ProductOrderClient<$Result.GetResult<Prisma.$ProductOrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductOrders.
     * @param {ProductOrderDeleteManyArgs} args - Arguments to filter ProductOrders to delete.
     * @example
     * // Delete a few ProductOrders
     * const { count } = await prisma.productOrder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductOrderDeleteManyArgs>(args?: SelectSubset<T, ProductOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductOrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductOrders
     * const productOrder = await prisma.productOrder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductOrderUpdateManyArgs>(args: SelectSubset<T, ProductOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductOrders and returns the data updated in the database.
     * @param {ProductOrderUpdateManyAndReturnArgs} args - Arguments to update many ProductOrders.
     * @example
     * // Update many ProductOrders
     * const productOrder = await prisma.productOrder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductOrders and only return the `id`
     * const productOrderWithIdOnly = await prisma.productOrder.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProductOrderUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductOrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductOrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductOrder.
     * @param {ProductOrderUpsertArgs} args - Arguments to update or create a ProductOrder.
     * @example
     * // Update or create a ProductOrder
     * const productOrder = await prisma.productOrder.upsert({
     *   create: {
     *     // ... data to create a ProductOrder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductOrder we want to update
     *   }
     * })
     */
    upsert<T extends ProductOrderUpsertArgs>(args: SelectSubset<T, ProductOrderUpsertArgs<ExtArgs>>): Prisma__ProductOrderClient<$Result.GetResult<Prisma.$ProductOrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductOrderCountArgs} args - Arguments to filter ProductOrders to count.
     * @example
     * // Count the number of ProductOrders
     * const count = await prisma.productOrder.count({
     *   where: {
     *     // ... the filter for the ProductOrders we want to count
     *   }
     * })
    **/
    count<T extends ProductOrderCountArgs>(
      args?: Subset<T, ProductOrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductOrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductOrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductOrderAggregateArgs>(args: Subset<T, ProductOrderAggregateArgs>): Prisma.PrismaPromise<GetProductOrderAggregateType<T>>

    /**
     * Group by ProductOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductOrderGroupByArgs} args - Group by arguments.
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
      T extends ProductOrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductOrderGroupByArgs['orderBy'] }
        : { orderBy?: ProductOrderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductOrder model
   */
  readonly fields: ProductOrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductOrder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductOrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductOrder$productArgs<ExtArgs> = {}>(args?: Subset<T, ProductOrder$productArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ProductOrder model
   */
  interface ProductOrderFieldRefs {
    readonly id: FieldRef<"ProductOrder", 'Int'>
    readonly clientName: FieldRef<"ProductOrder", 'String'>
    readonly clientEmail: FieldRef<"ProductOrder", 'String'>
    readonly clientPhone: FieldRef<"ProductOrder", 'String'>
    readonly amount: FieldRef<"ProductOrder", 'Int'>
    readonly extraDetails: FieldRef<"ProductOrder", 'String'>
    readonly status: FieldRef<"ProductOrder", 'OrderStatus'>
    readonly productId: FieldRef<"ProductOrder", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ProductOrder findUnique
   */
  export type ProductOrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOrder
     */
    select?: ProductOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductOrder
     */
    omit?: ProductOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOrderInclude<ExtArgs> | null
    /**
     * Filter, which ProductOrder to fetch.
     */
    where: ProductOrderWhereUniqueInput
  }

  /**
   * ProductOrder findUniqueOrThrow
   */
  export type ProductOrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOrder
     */
    select?: ProductOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductOrder
     */
    omit?: ProductOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOrderInclude<ExtArgs> | null
    /**
     * Filter, which ProductOrder to fetch.
     */
    where: ProductOrderWhereUniqueInput
  }

  /**
   * ProductOrder findFirst
   */
  export type ProductOrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOrder
     */
    select?: ProductOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductOrder
     */
    omit?: ProductOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOrderInclude<ExtArgs> | null
    /**
     * Filter, which ProductOrder to fetch.
     */
    where?: ProductOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductOrders to fetch.
     */
    orderBy?: ProductOrderOrderByWithRelationInput | ProductOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductOrders.
     */
    cursor?: ProductOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductOrders.
     */
    distinct?: ProductOrderScalarFieldEnum | ProductOrderScalarFieldEnum[]
  }

  /**
   * ProductOrder findFirstOrThrow
   */
  export type ProductOrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOrder
     */
    select?: ProductOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductOrder
     */
    omit?: ProductOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOrderInclude<ExtArgs> | null
    /**
     * Filter, which ProductOrder to fetch.
     */
    where?: ProductOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductOrders to fetch.
     */
    orderBy?: ProductOrderOrderByWithRelationInput | ProductOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductOrders.
     */
    cursor?: ProductOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductOrders.
     */
    distinct?: ProductOrderScalarFieldEnum | ProductOrderScalarFieldEnum[]
  }

  /**
   * ProductOrder findMany
   */
  export type ProductOrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOrder
     */
    select?: ProductOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductOrder
     */
    omit?: ProductOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOrderInclude<ExtArgs> | null
    /**
     * Filter, which ProductOrders to fetch.
     */
    where?: ProductOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductOrders to fetch.
     */
    orderBy?: ProductOrderOrderByWithRelationInput | ProductOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductOrders.
     */
    cursor?: ProductOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductOrders.
     */
    distinct?: ProductOrderScalarFieldEnum | ProductOrderScalarFieldEnum[]
  }

  /**
   * ProductOrder create
   */
  export type ProductOrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOrder
     */
    select?: ProductOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductOrder
     */
    omit?: ProductOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOrderInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductOrder.
     */
    data: XOR<ProductOrderCreateInput, ProductOrderUncheckedCreateInput>
  }

  /**
   * ProductOrder createMany
   */
  export type ProductOrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductOrders.
     */
    data: ProductOrderCreateManyInput | ProductOrderCreateManyInput[]
  }

  /**
   * ProductOrder createManyAndReturn
   */
  export type ProductOrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOrder
     */
    select?: ProductOrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductOrder
     */
    omit?: ProductOrderOmit<ExtArgs> | null
    /**
     * The data used to create many ProductOrders.
     */
    data: ProductOrderCreateManyInput | ProductOrderCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductOrder update
   */
  export type ProductOrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOrder
     */
    select?: ProductOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductOrder
     */
    omit?: ProductOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOrderInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductOrder.
     */
    data: XOR<ProductOrderUpdateInput, ProductOrderUncheckedUpdateInput>
    /**
     * Choose, which ProductOrder to update.
     */
    where: ProductOrderWhereUniqueInput
  }

  /**
   * ProductOrder updateMany
   */
  export type ProductOrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductOrders.
     */
    data: XOR<ProductOrderUpdateManyMutationInput, ProductOrderUncheckedUpdateManyInput>
    /**
     * Filter which ProductOrders to update
     */
    where?: ProductOrderWhereInput
    /**
     * Limit how many ProductOrders to update.
     */
    limit?: number
  }

  /**
   * ProductOrder updateManyAndReturn
   */
  export type ProductOrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOrder
     */
    select?: ProductOrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductOrder
     */
    omit?: ProductOrderOmit<ExtArgs> | null
    /**
     * The data used to update ProductOrders.
     */
    data: XOR<ProductOrderUpdateManyMutationInput, ProductOrderUncheckedUpdateManyInput>
    /**
     * Filter which ProductOrders to update
     */
    where?: ProductOrderWhereInput
    /**
     * Limit how many ProductOrders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductOrder upsert
   */
  export type ProductOrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOrder
     */
    select?: ProductOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductOrder
     */
    omit?: ProductOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOrderInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductOrder to update in case it exists.
     */
    where: ProductOrderWhereUniqueInput
    /**
     * In case the ProductOrder found by the `where` argument doesn't exist, create a new ProductOrder with this data.
     */
    create: XOR<ProductOrderCreateInput, ProductOrderUncheckedCreateInput>
    /**
     * In case the ProductOrder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductOrderUpdateInput, ProductOrderUncheckedUpdateInput>
  }

  /**
   * ProductOrder delete
   */
  export type ProductOrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOrder
     */
    select?: ProductOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductOrder
     */
    omit?: ProductOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOrderInclude<ExtArgs> | null
    /**
     * Filter which ProductOrder to delete.
     */
    where: ProductOrderWhereUniqueInput
  }

  /**
   * ProductOrder deleteMany
   */
  export type ProductOrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductOrders to delete
     */
    where?: ProductOrderWhereInput
    /**
     * Limit how many ProductOrders to delete.
     */
    limit?: number
  }

  /**
   * ProductOrder.product
   */
  export type ProductOrder$productArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
  }

  /**
   * ProductOrder without action
   */
  export type ProductOrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOrder
     */
    select?: ProductOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductOrder
     */
    omit?: ProductOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOrderInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProductScalarFieldEnum: {
    id: 'id',
    educationField: 'educationField',
    title: 'title',
    description: 'description',
    price: 'price',
    measures: 'measures',
    amount: 'amount',
    publishedAt: 'publishedAt',
    draft: 'draft',
    contactPersonId: 'contactPersonId'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ProductImageScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    sortOrder: 'sortOrder'
  };

  export type ProductImageScalarFieldEnum = (typeof ProductImageScalarFieldEnum)[keyof typeof ProductImageScalarFieldEnum]


  export const ProjectRequestScalarFieldEnum: {
    id: 'id',
    educationField: 'educationField',
    title: 'title',
    description: 'description',
    minPrice: 'minPrice',
    maxPrice: 'maxPrice',
    clientForename: 'clientForename',
    clientSurname: 'clientSurname',
    clientEmail: 'clientEmail',
    clientPhone: 'clientPhone',
    organizationName: 'organizationName',
    organizationNumber: 'organizationNumber',
    address: 'address',
    billingAddress: 'billingAddress',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type ProjectRequestScalarFieldEnum = (typeof ProjectRequestScalarFieldEnum)[keyof typeof ProjectRequestScalarFieldEnum]


  export const ClientReviewScalarFieldEnum: {
    id: 'id',
    name: 'name',
    role: 'role',
    orgName: 'orgName',
    orgURL: 'orgURL',
    imageId: 'imageId',
    message: 'message',
    createdAt: 'createdAt'
  };

  export type ClientReviewScalarFieldEnum = (typeof ClientReviewScalarFieldEnum)[keyof typeof ClientReviewScalarFieldEnum]


  export const ContactPersonScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    title: 'title'
  };

  export type ContactPersonScalarFieldEnum = (typeof ContactPersonScalarFieldEnum)[keyof typeof ContactPersonScalarFieldEnum]


  export const ProductOrderScalarFieldEnum: {
    id: 'id',
    clientName: 'clientName',
    clientEmail: 'clientEmail',
    clientPhone: 'clientPhone',
    amount: 'amount',
    extraDetails: 'extraDetails',
    status: 'status',
    productId: 'productId'
  };

  export type ProductOrderScalarFieldEnum = (typeof ProductOrderScalarFieldEnum)[keyof typeof ProductOrderScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'EducationField'
   */
  export type EnumEducationFieldFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EducationField'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: IntFilter<"Product"> | number
    educationField?: EnumEducationFieldNullableFilter<"Product"> | $Enums.EducationField | null
    title?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    measures?: JsonNullableFilter<"Product">
    amount?: IntFilter<"Product"> | number
    publishedAt?: DateTimeFilter<"Product"> | Date | string
    draft?: BoolFilter<"Product"> | boolean
    contactPersonId?: IntNullableFilter<"Product"> | number | null
    images?: ProductImageListRelationFilter
    contactPerson?: XOR<ContactPersonNullableScalarRelationFilter, ContactPersonWhereInput> | null
    orders?: ProductOrderListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    educationField?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    measures?: SortOrderInput | SortOrder
    amount?: SortOrder
    publishedAt?: SortOrder
    draft?: SortOrder
    contactPersonId?: SortOrderInput | SortOrder
    images?: ProductImageOrderByRelationAggregateInput
    contactPerson?: ContactPersonOrderByWithRelationInput
    orders?: ProductOrderOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    educationField?: EnumEducationFieldNullableFilter<"Product"> | $Enums.EducationField | null
    title?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    measures?: JsonNullableFilter<"Product">
    amount?: IntFilter<"Product"> | number
    publishedAt?: DateTimeFilter<"Product"> | Date | string
    draft?: BoolFilter<"Product"> | boolean
    contactPersonId?: IntNullableFilter<"Product"> | number | null
    images?: ProductImageListRelationFilter
    contactPerson?: XOR<ContactPersonNullableScalarRelationFilter, ContactPersonWhereInput> | null
    orders?: ProductOrderListRelationFilter
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    educationField?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    measures?: SortOrderInput | SortOrder
    amount?: SortOrder
    publishedAt?: SortOrder
    draft?: SortOrder
    contactPersonId?: SortOrderInput | SortOrder
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
    educationField?: EnumEducationFieldNullableWithAggregatesFilter<"Product"> | $Enums.EducationField | null
    title?: StringWithAggregatesFilter<"Product"> | string
    description?: StringWithAggregatesFilter<"Product"> | string
    price?: DecimalWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string
    measures?: JsonNullableWithAggregatesFilter<"Product">
    amount?: IntWithAggregatesFilter<"Product"> | number
    publishedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    draft?: BoolWithAggregatesFilter<"Product"> | boolean
    contactPersonId?: IntNullableWithAggregatesFilter<"Product"> | number | null
  }

  export type ProductImageWhereInput = {
    AND?: ProductImageWhereInput | ProductImageWhereInput[]
    OR?: ProductImageWhereInput[]
    NOT?: ProductImageWhereInput | ProductImageWhereInput[]
    id?: StringFilter<"ProductImage"> | string
    productId?: IntFilter<"ProductImage"> | number
    sortOrder?: IntFilter<"ProductImage"> | number
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type ProductImageOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    sortOrder?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type ProductImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductImageWhereInput | ProductImageWhereInput[]
    OR?: ProductImageWhereInput[]
    NOT?: ProductImageWhereInput | ProductImageWhereInput[]
    productId?: IntFilter<"ProductImage"> | number
    sortOrder?: IntFilter<"ProductImage"> | number
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type ProductImageOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    sortOrder?: SortOrder
    _count?: ProductImageCountOrderByAggregateInput
    _avg?: ProductImageAvgOrderByAggregateInput
    _max?: ProductImageMaxOrderByAggregateInput
    _min?: ProductImageMinOrderByAggregateInput
    _sum?: ProductImageSumOrderByAggregateInput
  }

  export type ProductImageScalarWhereWithAggregatesInput = {
    AND?: ProductImageScalarWhereWithAggregatesInput | ProductImageScalarWhereWithAggregatesInput[]
    OR?: ProductImageScalarWhereWithAggregatesInput[]
    NOT?: ProductImageScalarWhereWithAggregatesInput | ProductImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductImage"> | string
    productId?: IntWithAggregatesFilter<"ProductImage"> | number
    sortOrder?: IntWithAggregatesFilter<"ProductImage"> | number
  }

  export type ProjectRequestWhereInput = {
    AND?: ProjectRequestWhereInput | ProjectRequestWhereInput[]
    OR?: ProjectRequestWhereInput[]
    NOT?: ProjectRequestWhereInput | ProjectRequestWhereInput[]
    id?: IntFilter<"ProjectRequest"> | number
    educationField?: EnumEducationFieldNullableFilter<"ProjectRequest"> | $Enums.EducationField | null
    title?: StringFilter<"ProjectRequest"> | string
    description?: StringFilter<"ProjectRequest"> | string
    minPrice?: DecimalFilter<"ProjectRequest"> | Decimal | DecimalJsLike | number | string
    maxPrice?: DecimalFilter<"ProjectRequest"> | Decimal | DecimalJsLike | number | string
    clientForename?: StringFilter<"ProjectRequest"> | string
    clientSurname?: StringFilter<"ProjectRequest"> | string
    clientEmail?: StringFilter<"ProjectRequest"> | string
    clientPhone?: StringFilter<"ProjectRequest"> | string
    organizationName?: StringNullableFilter<"ProjectRequest"> | string | null
    organizationNumber?: StringNullableFilter<"ProjectRequest"> | string | null
    address?: StringFilter<"ProjectRequest"> | string
    billingAddress?: StringFilter<"ProjectRequest"> | string
    status?: EnumStatusFilter<"ProjectRequest"> | $Enums.Status
    createdAt?: DateTimeFilter<"ProjectRequest"> | Date | string
  }

  export type ProjectRequestOrderByWithRelationInput = {
    id?: SortOrder
    educationField?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrder
    minPrice?: SortOrder
    maxPrice?: SortOrder
    clientForename?: SortOrder
    clientSurname?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    organizationName?: SortOrderInput | SortOrder
    organizationNumber?: SortOrderInput | SortOrder
    address?: SortOrder
    billingAddress?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProjectRequestWhereInput | ProjectRequestWhereInput[]
    OR?: ProjectRequestWhereInput[]
    NOT?: ProjectRequestWhereInput | ProjectRequestWhereInput[]
    educationField?: EnumEducationFieldNullableFilter<"ProjectRequest"> | $Enums.EducationField | null
    title?: StringFilter<"ProjectRequest"> | string
    description?: StringFilter<"ProjectRequest"> | string
    minPrice?: DecimalFilter<"ProjectRequest"> | Decimal | DecimalJsLike | number | string
    maxPrice?: DecimalFilter<"ProjectRequest"> | Decimal | DecimalJsLike | number | string
    clientForename?: StringFilter<"ProjectRequest"> | string
    clientSurname?: StringFilter<"ProjectRequest"> | string
    clientEmail?: StringFilter<"ProjectRequest"> | string
    clientPhone?: StringFilter<"ProjectRequest"> | string
    organizationName?: StringNullableFilter<"ProjectRequest"> | string | null
    organizationNumber?: StringNullableFilter<"ProjectRequest"> | string | null
    address?: StringFilter<"ProjectRequest"> | string
    billingAddress?: StringFilter<"ProjectRequest"> | string
    status?: EnumStatusFilter<"ProjectRequest"> | $Enums.Status
    createdAt?: DateTimeFilter<"ProjectRequest"> | Date | string
  }, "id">

  export type ProjectRequestOrderByWithAggregationInput = {
    id?: SortOrder
    educationField?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrder
    minPrice?: SortOrder
    maxPrice?: SortOrder
    clientForename?: SortOrder
    clientSurname?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    organizationName?: SortOrderInput | SortOrder
    organizationNumber?: SortOrderInput | SortOrder
    address?: SortOrder
    billingAddress?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: ProjectRequestCountOrderByAggregateInput
    _avg?: ProjectRequestAvgOrderByAggregateInput
    _max?: ProjectRequestMaxOrderByAggregateInput
    _min?: ProjectRequestMinOrderByAggregateInput
    _sum?: ProjectRequestSumOrderByAggregateInput
  }

  export type ProjectRequestScalarWhereWithAggregatesInput = {
    AND?: ProjectRequestScalarWhereWithAggregatesInput | ProjectRequestScalarWhereWithAggregatesInput[]
    OR?: ProjectRequestScalarWhereWithAggregatesInput[]
    NOT?: ProjectRequestScalarWhereWithAggregatesInput | ProjectRequestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProjectRequest"> | number
    educationField?: EnumEducationFieldNullableWithAggregatesFilter<"ProjectRequest"> | $Enums.EducationField | null
    title?: StringWithAggregatesFilter<"ProjectRequest"> | string
    description?: StringWithAggregatesFilter<"ProjectRequest"> | string
    minPrice?: DecimalWithAggregatesFilter<"ProjectRequest"> | Decimal | DecimalJsLike | number | string
    maxPrice?: DecimalWithAggregatesFilter<"ProjectRequest"> | Decimal | DecimalJsLike | number | string
    clientForename?: StringWithAggregatesFilter<"ProjectRequest"> | string
    clientSurname?: StringWithAggregatesFilter<"ProjectRequest"> | string
    clientEmail?: StringWithAggregatesFilter<"ProjectRequest"> | string
    clientPhone?: StringWithAggregatesFilter<"ProjectRequest"> | string
    organizationName?: StringNullableWithAggregatesFilter<"ProjectRequest"> | string | null
    organizationNumber?: StringNullableWithAggregatesFilter<"ProjectRequest"> | string | null
    address?: StringWithAggregatesFilter<"ProjectRequest"> | string
    billingAddress?: StringWithAggregatesFilter<"ProjectRequest"> | string
    status?: EnumStatusWithAggregatesFilter<"ProjectRequest"> | $Enums.Status
    createdAt?: DateTimeWithAggregatesFilter<"ProjectRequest"> | Date | string
  }

  export type ClientReviewWhereInput = {
    AND?: ClientReviewWhereInput | ClientReviewWhereInput[]
    OR?: ClientReviewWhereInput[]
    NOT?: ClientReviewWhereInput | ClientReviewWhereInput[]
    id?: IntFilter<"ClientReview"> | number
    name?: StringFilter<"ClientReview"> | string
    role?: StringNullableFilter<"ClientReview"> | string | null
    orgName?: StringNullableFilter<"ClientReview"> | string | null
    orgURL?: StringNullableFilter<"ClientReview"> | string | null
    imageId?: StringNullableFilter<"ClientReview"> | string | null
    message?: StringFilter<"ClientReview"> | string
    createdAt?: DateTimeFilter<"ClientReview"> | Date | string
  }

  export type ClientReviewOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrderInput | SortOrder
    orgName?: SortOrderInput | SortOrder
    orgURL?: SortOrderInput | SortOrder
    imageId?: SortOrderInput | SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ClientReviewWhereInput | ClientReviewWhereInput[]
    OR?: ClientReviewWhereInput[]
    NOT?: ClientReviewWhereInput | ClientReviewWhereInput[]
    name?: StringFilter<"ClientReview"> | string
    role?: StringNullableFilter<"ClientReview"> | string | null
    orgName?: StringNullableFilter<"ClientReview"> | string | null
    orgURL?: StringNullableFilter<"ClientReview"> | string | null
    imageId?: StringNullableFilter<"ClientReview"> | string | null
    message?: StringFilter<"ClientReview"> | string
    createdAt?: DateTimeFilter<"ClientReview"> | Date | string
  }, "id">

  export type ClientReviewOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrderInput | SortOrder
    orgName?: SortOrderInput | SortOrder
    orgURL?: SortOrderInput | SortOrder
    imageId?: SortOrderInput | SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    _count?: ClientReviewCountOrderByAggregateInput
    _avg?: ClientReviewAvgOrderByAggregateInput
    _max?: ClientReviewMaxOrderByAggregateInput
    _min?: ClientReviewMinOrderByAggregateInput
    _sum?: ClientReviewSumOrderByAggregateInput
  }

  export type ClientReviewScalarWhereWithAggregatesInput = {
    AND?: ClientReviewScalarWhereWithAggregatesInput | ClientReviewScalarWhereWithAggregatesInput[]
    OR?: ClientReviewScalarWhereWithAggregatesInput[]
    NOT?: ClientReviewScalarWhereWithAggregatesInput | ClientReviewScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ClientReview"> | number
    name?: StringWithAggregatesFilter<"ClientReview"> | string
    role?: StringNullableWithAggregatesFilter<"ClientReview"> | string | null
    orgName?: StringNullableWithAggregatesFilter<"ClientReview"> | string | null
    orgURL?: StringNullableWithAggregatesFilter<"ClientReview"> | string | null
    imageId?: StringNullableWithAggregatesFilter<"ClientReview"> | string | null
    message?: StringWithAggregatesFilter<"ClientReview"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ClientReview"> | Date | string
  }

  export type ContactPersonWhereInput = {
    AND?: ContactPersonWhereInput | ContactPersonWhereInput[]
    OR?: ContactPersonWhereInput[]
    NOT?: ContactPersonWhereInput | ContactPersonWhereInput[]
    id?: IntFilter<"ContactPerson"> | number
    name?: StringFilter<"ContactPerson"> | string
    email?: StringFilter<"ContactPerson"> | string
    phone?: StringFilter<"ContactPerson"> | string
    title?: StringFilter<"ContactPerson"> | string
    product?: ProductListRelationFilter
  }

  export type ContactPersonOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    title?: SortOrder
    product?: ProductOrderByRelationAggregateInput
  }

  export type ContactPersonWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ContactPersonWhereInput | ContactPersonWhereInput[]
    OR?: ContactPersonWhereInput[]
    NOT?: ContactPersonWhereInput | ContactPersonWhereInput[]
    name?: StringFilter<"ContactPerson"> | string
    email?: StringFilter<"ContactPerson"> | string
    phone?: StringFilter<"ContactPerson"> | string
    title?: StringFilter<"ContactPerson"> | string
    product?: ProductListRelationFilter
  }, "id">

  export type ContactPersonOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    title?: SortOrder
    _count?: ContactPersonCountOrderByAggregateInput
    _avg?: ContactPersonAvgOrderByAggregateInput
    _max?: ContactPersonMaxOrderByAggregateInput
    _min?: ContactPersonMinOrderByAggregateInput
    _sum?: ContactPersonSumOrderByAggregateInput
  }

  export type ContactPersonScalarWhereWithAggregatesInput = {
    AND?: ContactPersonScalarWhereWithAggregatesInput | ContactPersonScalarWhereWithAggregatesInput[]
    OR?: ContactPersonScalarWhereWithAggregatesInput[]
    NOT?: ContactPersonScalarWhereWithAggregatesInput | ContactPersonScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ContactPerson"> | number
    name?: StringWithAggregatesFilter<"ContactPerson"> | string
    email?: StringWithAggregatesFilter<"ContactPerson"> | string
    phone?: StringWithAggregatesFilter<"ContactPerson"> | string
    title?: StringWithAggregatesFilter<"ContactPerson"> | string
  }

  export type ProductOrderWhereInput = {
    AND?: ProductOrderWhereInput | ProductOrderWhereInput[]
    OR?: ProductOrderWhereInput[]
    NOT?: ProductOrderWhereInput | ProductOrderWhereInput[]
    id?: IntFilter<"ProductOrder"> | number
    clientName?: StringFilter<"ProductOrder"> | string
    clientEmail?: StringFilter<"ProductOrder"> | string
    clientPhone?: StringFilter<"ProductOrder"> | string
    amount?: IntFilter<"ProductOrder"> | number
    extraDetails?: StringNullableFilter<"ProductOrder"> | string | null
    status?: EnumOrderStatusFilter<"ProductOrder"> | $Enums.OrderStatus
    productId?: IntNullableFilter<"ProductOrder"> | number | null
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
  }

  export type ProductOrderOrderByWithRelationInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    amount?: SortOrder
    extraDetails?: SortOrderInput | SortOrder
    status?: SortOrder
    productId?: SortOrderInput | SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type ProductOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductOrderWhereInput | ProductOrderWhereInput[]
    OR?: ProductOrderWhereInput[]
    NOT?: ProductOrderWhereInput | ProductOrderWhereInput[]
    clientName?: StringFilter<"ProductOrder"> | string
    clientEmail?: StringFilter<"ProductOrder"> | string
    clientPhone?: StringFilter<"ProductOrder"> | string
    amount?: IntFilter<"ProductOrder"> | number
    extraDetails?: StringNullableFilter<"ProductOrder"> | string | null
    status?: EnumOrderStatusFilter<"ProductOrder"> | $Enums.OrderStatus
    productId?: IntNullableFilter<"ProductOrder"> | number | null
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
  }, "id">

  export type ProductOrderOrderByWithAggregationInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    amount?: SortOrder
    extraDetails?: SortOrderInput | SortOrder
    status?: SortOrder
    productId?: SortOrderInput | SortOrder
    _count?: ProductOrderCountOrderByAggregateInput
    _avg?: ProductOrderAvgOrderByAggregateInput
    _max?: ProductOrderMaxOrderByAggregateInput
    _min?: ProductOrderMinOrderByAggregateInput
    _sum?: ProductOrderSumOrderByAggregateInput
  }

  export type ProductOrderScalarWhereWithAggregatesInput = {
    AND?: ProductOrderScalarWhereWithAggregatesInput | ProductOrderScalarWhereWithAggregatesInput[]
    OR?: ProductOrderScalarWhereWithAggregatesInput[]
    NOT?: ProductOrderScalarWhereWithAggregatesInput | ProductOrderScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductOrder"> | number
    clientName?: StringWithAggregatesFilter<"ProductOrder"> | string
    clientEmail?: StringWithAggregatesFilter<"ProductOrder"> | string
    clientPhone?: StringWithAggregatesFilter<"ProductOrder"> | string
    amount?: IntWithAggregatesFilter<"ProductOrder"> | number
    extraDetails?: StringNullableWithAggregatesFilter<"ProductOrder"> | string | null
    status?: EnumOrderStatusWithAggregatesFilter<"ProductOrder"> | $Enums.OrderStatus
    productId?: IntNullableWithAggregatesFilter<"ProductOrder"> | number | null
  }

  export type ProductCreateInput = {
    educationField?: $Enums.EducationField | null
    title: string
    description: string
    price: Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    publishedAt?: Date | string
    draft?: boolean
    images?: ProductImageCreateNestedManyWithoutProductInput
    contactPerson?: ContactPersonCreateNestedOneWithoutProductInput
    orders?: ProductOrderCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: number
    educationField?: $Enums.EducationField | null
    title: string
    description: string
    price: Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    publishedAt?: Date | string
    draft?: boolean
    contactPersonId?: number | null
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    orders?: ProductOrderUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    educationField?: NullableEnumEducationFieldFieldUpdateOperationsInput | $Enums.EducationField | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    draft?: BoolFieldUpdateOperationsInput | boolean
    images?: ProductImageUpdateManyWithoutProductNestedInput
    contactPerson?: ContactPersonUpdateOneWithoutProductNestedInput
    orders?: ProductOrderUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    educationField?: NullableEnumEducationFieldFieldUpdateOperationsInput | $Enums.EducationField | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    draft?: BoolFieldUpdateOperationsInput | boolean
    contactPersonId?: NullableIntFieldUpdateOperationsInput | number | null
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    orders?: ProductOrderUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: number
    educationField?: $Enums.EducationField | null
    title: string
    description: string
    price: Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    publishedAt?: Date | string
    draft?: boolean
    contactPersonId?: number | null
  }

  export type ProductUpdateManyMutationInput = {
    educationField?: NullableEnumEducationFieldFieldUpdateOperationsInput | $Enums.EducationField | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    draft?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    educationField?: NullableEnumEducationFieldFieldUpdateOperationsInput | $Enums.EducationField | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    draft?: BoolFieldUpdateOperationsInput | boolean
    contactPersonId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProductImageCreateInput = {
    id: string
    sortOrder?: number
    product: ProductCreateNestedOneWithoutImagesInput
  }

  export type ProductImageUncheckedCreateInput = {
    id: string
    productId: number
    sortOrder?: number
  }

  export type ProductImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutImagesNestedInput
  }

  export type ProductImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: IntFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductImageCreateManyInput = {
    id: string
    productId: number
    sortOrder?: number
  }

  export type ProductImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: IntFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProjectRequestCreateInput = {
    educationField?: $Enums.EducationField | null
    title: string
    description: string
    minPrice: Decimal | DecimalJsLike | number | string
    maxPrice: Decimal | DecimalJsLike | number | string
    clientForename: string
    clientSurname: string
    clientEmail: string
    clientPhone: string
    organizationName?: string | null
    organizationNumber?: string | null
    address: string
    billingAddress: string
    status?: $Enums.Status
    createdAt?: Date | string
  }

  export type ProjectRequestUncheckedCreateInput = {
    id?: number
    educationField?: $Enums.EducationField | null
    title: string
    description: string
    minPrice: Decimal | DecimalJsLike | number | string
    maxPrice: Decimal | DecimalJsLike | number | string
    clientForename: string
    clientSurname: string
    clientEmail: string
    clientPhone: string
    organizationName?: string | null
    organizationNumber?: string | null
    address: string
    billingAddress: string
    status?: $Enums.Status
    createdAt?: Date | string
  }

  export type ProjectRequestUpdateInput = {
    educationField?: NullableEnumEducationFieldFieldUpdateOperationsInput | $Enums.EducationField | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    minPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    clientForename?: StringFieldUpdateOperationsInput | string
    clientSurname?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    organizationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    billingAddress?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectRequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    educationField?: NullableEnumEducationFieldFieldUpdateOperationsInput | $Enums.EducationField | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    minPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    clientForename?: StringFieldUpdateOperationsInput | string
    clientSurname?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    organizationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    billingAddress?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectRequestCreateManyInput = {
    id?: number
    educationField?: $Enums.EducationField | null
    title: string
    description: string
    minPrice: Decimal | DecimalJsLike | number | string
    maxPrice: Decimal | DecimalJsLike | number | string
    clientForename: string
    clientSurname: string
    clientEmail: string
    clientPhone: string
    organizationName?: string | null
    organizationNumber?: string | null
    address: string
    billingAddress: string
    status?: $Enums.Status
    createdAt?: Date | string
  }

  export type ProjectRequestUpdateManyMutationInput = {
    educationField?: NullableEnumEducationFieldFieldUpdateOperationsInput | $Enums.EducationField | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    minPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    clientForename?: StringFieldUpdateOperationsInput | string
    clientSurname?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    organizationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    billingAddress?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectRequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    educationField?: NullableEnumEducationFieldFieldUpdateOperationsInput | $Enums.EducationField | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    minPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    clientForename?: StringFieldUpdateOperationsInput | string
    clientSurname?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    organizationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    billingAddress?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientReviewCreateInput = {
    name: string
    role?: string | null
    orgName?: string | null
    orgURL?: string | null
    imageId?: string | null
    message: string
    createdAt?: Date | string
  }

  export type ClientReviewUncheckedCreateInput = {
    id?: number
    name: string
    role?: string | null
    orgName?: string | null
    orgURL?: string | null
    imageId?: string | null
    message: string
    createdAt?: Date | string
  }

  export type ClientReviewUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    orgName?: NullableStringFieldUpdateOperationsInput | string | null
    orgURL?: NullableStringFieldUpdateOperationsInput | string | null
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientReviewUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    orgName?: NullableStringFieldUpdateOperationsInput | string | null
    orgURL?: NullableStringFieldUpdateOperationsInput | string | null
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientReviewCreateManyInput = {
    id?: number
    name: string
    role?: string | null
    orgName?: string | null
    orgURL?: string | null
    imageId?: string | null
    message: string
    createdAt?: Date | string
  }

  export type ClientReviewUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    orgName?: NullableStringFieldUpdateOperationsInput | string | null
    orgURL?: NullableStringFieldUpdateOperationsInput | string | null
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientReviewUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    orgName?: NullableStringFieldUpdateOperationsInput | string | null
    orgURL?: NullableStringFieldUpdateOperationsInput | string | null
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactPersonCreateInput = {
    name: string
    email: string
    phone: string
    title: string
    product?: ProductCreateNestedManyWithoutContactPersonInput
  }

  export type ContactPersonUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    phone: string
    title: string
    product?: ProductUncheckedCreateNestedManyWithoutContactPersonInput
  }

  export type ContactPersonUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    product?: ProductUpdateManyWithoutContactPersonNestedInput
  }

  export type ContactPersonUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    product?: ProductUncheckedUpdateManyWithoutContactPersonNestedInput
  }

  export type ContactPersonCreateManyInput = {
    id?: number
    name: string
    email: string
    phone: string
    title: string
  }

  export type ContactPersonUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type ContactPersonUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type ProductOrderCreateInput = {
    clientName: string
    clientEmail: string
    clientPhone: string
    amount: number
    extraDetails?: string | null
    status?: $Enums.OrderStatus
    product?: ProductCreateNestedOneWithoutOrdersInput
  }

  export type ProductOrderUncheckedCreateInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    amount: number
    extraDetails?: string | null
    status?: $Enums.OrderStatus
    productId?: number | null
  }

  export type ProductOrderUpdateInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    extraDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    product?: ProductUpdateOneWithoutOrdersNestedInput
  }

  export type ProductOrderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    extraDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    productId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProductOrderCreateManyInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    amount: number
    extraDetails?: string | null
    status?: $Enums.OrderStatus
    productId?: number | null
  }

  export type ProductOrderUpdateManyMutationInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    extraDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
  }

  export type ProductOrderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    extraDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    productId?: NullableIntFieldUpdateOperationsInput | number | null
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

  export type EnumEducationFieldNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationField | EnumEducationFieldFieldRefInput<$PrismaModel> | null
    in?: $Enums.EducationField[] | null
    notIn?: $Enums.EducationField[] | null
    not?: NestedEnumEducationFieldNullableFilter<$PrismaModel> | $Enums.EducationField | null
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

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ProductImageListRelationFilter = {
    every?: ProductImageWhereInput
    some?: ProductImageWhereInput
    none?: ProductImageWhereInput
  }

  export type ContactPersonNullableScalarRelationFilter = {
    is?: ContactPersonWhereInput | null
    isNot?: ContactPersonWhereInput | null
  }

  export type ProductOrderListRelationFilter = {
    every?: ProductOrderWhereInput
    some?: ProductOrderWhereInput
    none?: ProductOrderWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProductImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    educationField?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    measures?: SortOrder
    amount?: SortOrder
    publishedAt?: SortOrder
    draft?: SortOrder
    contactPersonId?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    contactPersonId?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    educationField?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    publishedAt?: SortOrder
    draft?: SortOrder
    contactPersonId?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    educationField?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    publishedAt?: SortOrder
    draft?: SortOrder
    contactPersonId?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    contactPersonId?: SortOrder
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

  export type EnumEducationFieldNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationField | EnumEducationFieldFieldRefInput<$PrismaModel> | null
    in?: $Enums.EducationField[] | null
    notIn?: $Enums.EducationField[] | null
    not?: NestedEnumEducationFieldNullableWithAggregatesFilter<$PrismaModel> | $Enums.EducationField | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEducationFieldNullableFilter<$PrismaModel>
    _max?: NestedEnumEducationFieldNullableFilter<$PrismaModel>
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

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ProductImageCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    sortOrder?: SortOrder
  }

  export type ProductImageAvgOrderByAggregateInput = {
    productId?: SortOrder
    sortOrder?: SortOrder
  }

  export type ProductImageMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    sortOrder?: SortOrder
  }

  export type ProductImageMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    sortOrder?: SortOrder
  }

  export type ProductImageSumOrderByAggregateInput = {
    productId?: SortOrder
    sortOrder?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[]
    notIn?: $Enums.Status[]
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type ProjectRequestCountOrderByAggregateInput = {
    id?: SortOrder
    educationField?: SortOrder
    title?: SortOrder
    description?: SortOrder
    minPrice?: SortOrder
    maxPrice?: SortOrder
    clientForename?: SortOrder
    clientSurname?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    organizationName?: SortOrder
    organizationNumber?: SortOrder
    address?: SortOrder
    billingAddress?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectRequestAvgOrderByAggregateInput = {
    id?: SortOrder
    minPrice?: SortOrder
    maxPrice?: SortOrder
  }

  export type ProjectRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    educationField?: SortOrder
    title?: SortOrder
    description?: SortOrder
    minPrice?: SortOrder
    maxPrice?: SortOrder
    clientForename?: SortOrder
    clientSurname?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    organizationName?: SortOrder
    organizationNumber?: SortOrder
    address?: SortOrder
    billingAddress?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectRequestMinOrderByAggregateInput = {
    id?: SortOrder
    educationField?: SortOrder
    title?: SortOrder
    description?: SortOrder
    minPrice?: SortOrder
    maxPrice?: SortOrder
    clientForename?: SortOrder
    clientSurname?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    organizationName?: SortOrder
    organizationNumber?: SortOrder
    address?: SortOrder
    billingAddress?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectRequestSumOrderByAggregateInput = {
    id?: SortOrder
    minPrice?: SortOrder
    maxPrice?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[]
    notIn?: $Enums.Status[]
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type ClientReviewCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    orgName?: SortOrder
    orgURL?: SortOrder
    imageId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientReviewAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ClientReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    orgName?: SortOrder
    orgURL?: SortOrder
    imageId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientReviewMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    orgName?: SortOrder
    orgURL?: SortOrder
    imageId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientReviewSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContactPersonCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    title?: SortOrder
  }

  export type ContactPersonAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ContactPersonMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    title?: SortOrder
  }

  export type ContactPersonMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    title?: SortOrder
  }

  export type ContactPersonSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type ProductNullableScalarRelationFilter = {
    is?: ProductWhereInput | null
    isNot?: ProductWhereInput | null
  }

  export type ProductOrderCountOrderByAggregateInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    amount?: SortOrder
    extraDetails?: SortOrder
    status?: SortOrder
    productId?: SortOrder
  }

  export type ProductOrderAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    productId?: SortOrder
  }

  export type ProductOrderMaxOrderByAggregateInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    amount?: SortOrder
    extraDetails?: SortOrder
    status?: SortOrder
    productId?: SortOrder
  }

  export type ProductOrderMinOrderByAggregateInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    amount?: SortOrder
    extraDetails?: SortOrder
    status?: SortOrder
    productId?: SortOrder
  }

  export type ProductOrderSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    productId?: SortOrder
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type ProductImageCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
  }

  export type ContactPersonCreateNestedOneWithoutProductInput = {
    create?: XOR<ContactPersonCreateWithoutProductInput, ContactPersonUncheckedCreateWithoutProductInput>
    connectOrCreate?: ContactPersonCreateOrConnectWithoutProductInput
    connect?: ContactPersonWhereUniqueInput
  }

  export type ProductOrderCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductOrderCreateWithoutProductInput, ProductOrderUncheckedCreateWithoutProductInput> | ProductOrderCreateWithoutProductInput[] | ProductOrderUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductOrderCreateOrConnectWithoutProductInput | ProductOrderCreateOrConnectWithoutProductInput[]
    createMany?: ProductOrderCreateManyProductInputEnvelope
    connect?: ProductOrderWhereUniqueInput | ProductOrderWhereUniqueInput[]
  }

  export type ProductImageUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
  }

  export type ProductOrderUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductOrderCreateWithoutProductInput, ProductOrderUncheckedCreateWithoutProductInput> | ProductOrderCreateWithoutProductInput[] | ProductOrderUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductOrderCreateOrConnectWithoutProductInput | ProductOrderCreateOrConnectWithoutProductInput[]
    createMany?: ProductOrderCreateManyProductInputEnvelope
    connect?: ProductOrderWhereUniqueInput | ProductOrderWhereUniqueInput[]
  }

  export type NullableEnumEducationFieldFieldUpdateOperationsInput = {
    set?: $Enums.EducationField | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProductImageUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    upsert?: ProductImageUpsertWithWhereUniqueWithoutProductInput | ProductImageUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    set?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    disconnect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    delete?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    update?: ProductImageUpdateWithWhereUniqueWithoutProductInput | ProductImageUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductImageUpdateManyWithWhereWithoutProductInput | ProductImageUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
  }

  export type ContactPersonUpdateOneWithoutProductNestedInput = {
    create?: XOR<ContactPersonCreateWithoutProductInput, ContactPersonUncheckedCreateWithoutProductInput>
    connectOrCreate?: ContactPersonCreateOrConnectWithoutProductInput
    upsert?: ContactPersonUpsertWithoutProductInput
    disconnect?: ContactPersonWhereInput | boolean
    delete?: ContactPersonWhereInput | boolean
    connect?: ContactPersonWhereUniqueInput
    update?: XOR<XOR<ContactPersonUpdateToOneWithWhereWithoutProductInput, ContactPersonUpdateWithoutProductInput>, ContactPersonUncheckedUpdateWithoutProductInput>
  }

  export type ProductOrderUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductOrderCreateWithoutProductInput, ProductOrderUncheckedCreateWithoutProductInput> | ProductOrderCreateWithoutProductInput[] | ProductOrderUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductOrderCreateOrConnectWithoutProductInput | ProductOrderCreateOrConnectWithoutProductInput[]
    upsert?: ProductOrderUpsertWithWhereUniqueWithoutProductInput | ProductOrderUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductOrderCreateManyProductInputEnvelope
    set?: ProductOrderWhereUniqueInput | ProductOrderWhereUniqueInput[]
    disconnect?: ProductOrderWhereUniqueInput | ProductOrderWhereUniqueInput[]
    delete?: ProductOrderWhereUniqueInput | ProductOrderWhereUniqueInput[]
    connect?: ProductOrderWhereUniqueInput | ProductOrderWhereUniqueInput[]
    update?: ProductOrderUpdateWithWhereUniqueWithoutProductInput | ProductOrderUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductOrderUpdateManyWithWhereWithoutProductInput | ProductOrderUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductOrderScalarWhereInput | ProductOrderScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductImageUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    upsert?: ProductImageUpsertWithWhereUniqueWithoutProductInput | ProductImageUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    set?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    disconnect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    delete?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    update?: ProductImageUpdateWithWhereUniqueWithoutProductInput | ProductImageUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductImageUpdateManyWithWhereWithoutProductInput | ProductImageUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
  }

  export type ProductOrderUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductOrderCreateWithoutProductInput, ProductOrderUncheckedCreateWithoutProductInput> | ProductOrderCreateWithoutProductInput[] | ProductOrderUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductOrderCreateOrConnectWithoutProductInput | ProductOrderCreateOrConnectWithoutProductInput[]
    upsert?: ProductOrderUpsertWithWhereUniqueWithoutProductInput | ProductOrderUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductOrderCreateManyProductInputEnvelope
    set?: ProductOrderWhereUniqueInput | ProductOrderWhereUniqueInput[]
    disconnect?: ProductOrderWhereUniqueInput | ProductOrderWhereUniqueInput[]
    delete?: ProductOrderWhereUniqueInput | ProductOrderWhereUniqueInput[]
    connect?: ProductOrderWhereUniqueInput | ProductOrderWhereUniqueInput[]
    update?: ProductOrderUpdateWithWhereUniqueWithoutProductInput | ProductOrderUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductOrderUpdateManyWithWhereWithoutProductInput | ProductOrderUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductOrderScalarWhereInput | ProductOrderScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutImagesInput = {
    create?: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutImagesInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutImagesInput
    upsert?: ProductUpsertWithoutImagesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutImagesInput, ProductUpdateWithoutImagesInput>, ProductUncheckedUpdateWithoutImagesInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type ProductCreateNestedManyWithoutContactPersonInput = {
    create?: XOR<ProductCreateWithoutContactPersonInput, ProductUncheckedCreateWithoutContactPersonInput> | ProductCreateWithoutContactPersonInput[] | ProductUncheckedCreateWithoutContactPersonInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutContactPersonInput | ProductCreateOrConnectWithoutContactPersonInput[]
    createMany?: ProductCreateManyContactPersonInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutContactPersonInput = {
    create?: XOR<ProductCreateWithoutContactPersonInput, ProductUncheckedCreateWithoutContactPersonInput> | ProductCreateWithoutContactPersonInput[] | ProductUncheckedCreateWithoutContactPersonInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutContactPersonInput | ProductCreateOrConnectWithoutContactPersonInput[]
    createMany?: ProductCreateManyContactPersonInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUpdateManyWithoutContactPersonNestedInput = {
    create?: XOR<ProductCreateWithoutContactPersonInput, ProductUncheckedCreateWithoutContactPersonInput> | ProductCreateWithoutContactPersonInput[] | ProductUncheckedCreateWithoutContactPersonInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutContactPersonInput | ProductCreateOrConnectWithoutContactPersonInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutContactPersonInput | ProductUpsertWithWhereUniqueWithoutContactPersonInput[]
    createMany?: ProductCreateManyContactPersonInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutContactPersonInput | ProductUpdateWithWhereUniqueWithoutContactPersonInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutContactPersonInput | ProductUpdateManyWithWhereWithoutContactPersonInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutContactPersonNestedInput = {
    create?: XOR<ProductCreateWithoutContactPersonInput, ProductUncheckedCreateWithoutContactPersonInput> | ProductCreateWithoutContactPersonInput[] | ProductUncheckedCreateWithoutContactPersonInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutContactPersonInput | ProductCreateOrConnectWithoutContactPersonInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutContactPersonInput | ProductUpsertWithWhereUniqueWithoutContactPersonInput[]
    createMany?: ProductCreateManyContactPersonInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutContactPersonInput | ProductUpdateWithWhereUniqueWithoutContactPersonInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutContactPersonInput | ProductUpdateManyWithWhereWithoutContactPersonInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutOrdersInput = {
    create?: XOR<ProductCreateWithoutOrdersInput, ProductUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrdersInput
    connect?: ProductWhereUniqueInput
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type ProductUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<ProductCreateWithoutOrdersInput, ProductUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrdersInput
    upsert?: ProductUpsertWithoutOrdersInput
    disconnect?: ProductWhereInput | boolean
    delete?: ProductWhereInput | boolean
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrdersInput, ProductUpdateWithoutOrdersInput>, ProductUncheckedUpdateWithoutOrdersInput>
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

  export type NestedEnumEducationFieldNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationField | EnumEducationFieldFieldRefInput<$PrismaModel> | null
    in?: $Enums.EducationField[] | null
    notIn?: $Enums.EducationField[] | null
    not?: NestedEnumEducationFieldNullableFilter<$PrismaModel> | $Enums.EducationField | null
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
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

  export type NestedEnumEducationFieldNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationField | EnumEducationFieldFieldRefInput<$PrismaModel> | null
    in?: $Enums.EducationField[] | null
    notIn?: $Enums.EducationField[] | null
    not?: NestedEnumEducationFieldNullableWithAggregatesFilter<$PrismaModel> | $Enums.EducationField | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEducationFieldNullableFilter<$PrismaModel>
    _max?: NestedEnumEducationFieldNullableFilter<$PrismaModel>
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

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[]
    notIn?: $Enums.Status[]
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[]
    notIn?: $Enums.Status[]
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type ProductImageCreateWithoutProductInput = {
    id: string
    sortOrder?: number
  }

  export type ProductImageUncheckedCreateWithoutProductInput = {
    id: string
    sortOrder?: number
  }

  export type ProductImageCreateOrConnectWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    create: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput>
  }

  export type ProductImageCreateManyProductInputEnvelope = {
    data: ProductImageCreateManyProductInput | ProductImageCreateManyProductInput[]
  }

  export type ContactPersonCreateWithoutProductInput = {
    name: string
    email: string
    phone: string
    title: string
  }

  export type ContactPersonUncheckedCreateWithoutProductInput = {
    id?: number
    name: string
    email: string
    phone: string
    title: string
  }

  export type ContactPersonCreateOrConnectWithoutProductInput = {
    where: ContactPersonWhereUniqueInput
    create: XOR<ContactPersonCreateWithoutProductInput, ContactPersonUncheckedCreateWithoutProductInput>
  }

  export type ProductOrderCreateWithoutProductInput = {
    clientName: string
    clientEmail: string
    clientPhone: string
    amount: number
    extraDetails?: string | null
    status?: $Enums.OrderStatus
  }

  export type ProductOrderUncheckedCreateWithoutProductInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    amount: number
    extraDetails?: string | null
    status?: $Enums.OrderStatus
  }

  export type ProductOrderCreateOrConnectWithoutProductInput = {
    where: ProductOrderWhereUniqueInput
    create: XOR<ProductOrderCreateWithoutProductInput, ProductOrderUncheckedCreateWithoutProductInput>
  }

  export type ProductOrderCreateManyProductInputEnvelope = {
    data: ProductOrderCreateManyProductInput | ProductOrderCreateManyProductInput[]
  }

  export type ProductImageUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    update: XOR<ProductImageUpdateWithoutProductInput, ProductImageUncheckedUpdateWithoutProductInput>
    create: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput>
  }

  export type ProductImageUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    data: XOR<ProductImageUpdateWithoutProductInput, ProductImageUncheckedUpdateWithoutProductInput>
  }

  export type ProductImageUpdateManyWithWhereWithoutProductInput = {
    where: ProductImageScalarWhereInput
    data: XOR<ProductImageUpdateManyMutationInput, ProductImageUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductImageScalarWhereInput = {
    AND?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
    OR?: ProductImageScalarWhereInput[]
    NOT?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
    id?: StringFilter<"ProductImage"> | string
    productId?: IntFilter<"ProductImage"> | number
    sortOrder?: IntFilter<"ProductImage"> | number
  }

  export type ContactPersonUpsertWithoutProductInput = {
    update: XOR<ContactPersonUpdateWithoutProductInput, ContactPersonUncheckedUpdateWithoutProductInput>
    create: XOR<ContactPersonCreateWithoutProductInput, ContactPersonUncheckedCreateWithoutProductInput>
    where?: ContactPersonWhereInput
  }

  export type ContactPersonUpdateToOneWithWhereWithoutProductInput = {
    where?: ContactPersonWhereInput
    data: XOR<ContactPersonUpdateWithoutProductInput, ContactPersonUncheckedUpdateWithoutProductInput>
  }

  export type ContactPersonUpdateWithoutProductInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type ContactPersonUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type ProductOrderUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductOrderWhereUniqueInput
    update: XOR<ProductOrderUpdateWithoutProductInput, ProductOrderUncheckedUpdateWithoutProductInput>
    create: XOR<ProductOrderCreateWithoutProductInput, ProductOrderUncheckedCreateWithoutProductInput>
  }

  export type ProductOrderUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductOrderWhereUniqueInput
    data: XOR<ProductOrderUpdateWithoutProductInput, ProductOrderUncheckedUpdateWithoutProductInput>
  }

  export type ProductOrderUpdateManyWithWhereWithoutProductInput = {
    where: ProductOrderScalarWhereInput
    data: XOR<ProductOrderUpdateManyMutationInput, ProductOrderUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductOrderScalarWhereInput = {
    AND?: ProductOrderScalarWhereInput | ProductOrderScalarWhereInput[]
    OR?: ProductOrderScalarWhereInput[]
    NOT?: ProductOrderScalarWhereInput | ProductOrderScalarWhereInput[]
    id?: IntFilter<"ProductOrder"> | number
    clientName?: StringFilter<"ProductOrder"> | string
    clientEmail?: StringFilter<"ProductOrder"> | string
    clientPhone?: StringFilter<"ProductOrder"> | string
    amount?: IntFilter<"ProductOrder"> | number
    extraDetails?: StringNullableFilter<"ProductOrder"> | string | null
    status?: EnumOrderStatusFilter<"ProductOrder"> | $Enums.OrderStatus
    productId?: IntNullableFilter<"ProductOrder"> | number | null
  }

  export type ProductCreateWithoutImagesInput = {
    educationField?: $Enums.EducationField | null
    title: string
    description: string
    price: Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    publishedAt?: Date | string
    draft?: boolean
    contactPerson?: ContactPersonCreateNestedOneWithoutProductInput
    orders?: ProductOrderCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutImagesInput = {
    id?: number
    educationField?: $Enums.EducationField | null
    title: string
    description: string
    price: Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    publishedAt?: Date | string
    draft?: boolean
    contactPersonId?: number | null
    orders?: ProductOrderUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutImagesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
  }

  export type ProductUpsertWithoutImagesInput = {
    update: XOR<ProductUpdateWithoutImagesInput, ProductUncheckedUpdateWithoutImagesInput>
    create: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutImagesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutImagesInput, ProductUncheckedUpdateWithoutImagesInput>
  }

  export type ProductUpdateWithoutImagesInput = {
    educationField?: NullableEnumEducationFieldFieldUpdateOperationsInput | $Enums.EducationField | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    draft?: BoolFieldUpdateOperationsInput | boolean
    contactPerson?: ContactPersonUpdateOneWithoutProductNestedInput
    orders?: ProductOrderUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutImagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    educationField?: NullableEnumEducationFieldFieldUpdateOperationsInput | $Enums.EducationField | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    draft?: BoolFieldUpdateOperationsInput | boolean
    contactPersonId?: NullableIntFieldUpdateOperationsInput | number | null
    orders?: ProductOrderUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateWithoutContactPersonInput = {
    educationField?: $Enums.EducationField | null
    title: string
    description: string
    price: Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    publishedAt?: Date | string
    draft?: boolean
    images?: ProductImageCreateNestedManyWithoutProductInput
    orders?: ProductOrderCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutContactPersonInput = {
    id?: number
    educationField?: $Enums.EducationField | null
    title: string
    description: string
    price: Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    publishedAt?: Date | string
    draft?: boolean
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    orders?: ProductOrderUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutContactPersonInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutContactPersonInput, ProductUncheckedCreateWithoutContactPersonInput>
  }

  export type ProductCreateManyContactPersonInputEnvelope = {
    data: ProductCreateManyContactPersonInput | ProductCreateManyContactPersonInput[]
  }

  export type ProductUpsertWithWhereUniqueWithoutContactPersonInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutContactPersonInput, ProductUncheckedUpdateWithoutContactPersonInput>
    create: XOR<ProductCreateWithoutContactPersonInput, ProductUncheckedCreateWithoutContactPersonInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutContactPersonInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutContactPersonInput, ProductUncheckedUpdateWithoutContactPersonInput>
  }

  export type ProductUpdateManyWithWhereWithoutContactPersonInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutContactPersonInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: IntFilter<"Product"> | number
    educationField?: EnumEducationFieldNullableFilter<"Product"> | $Enums.EducationField | null
    title?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    measures?: JsonNullableFilter<"Product">
    amount?: IntFilter<"Product"> | number
    publishedAt?: DateTimeFilter<"Product"> | Date | string
    draft?: BoolFilter<"Product"> | boolean
    contactPersonId?: IntNullableFilter<"Product"> | number | null
  }

  export type ProductCreateWithoutOrdersInput = {
    educationField?: $Enums.EducationField | null
    title: string
    description: string
    price: Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    publishedAt?: Date | string
    draft?: boolean
    images?: ProductImageCreateNestedManyWithoutProductInput
    contactPerson?: ContactPersonCreateNestedOneWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutOrdersInput = {
    id?: number
    educationField?: $Enums.EducationField | null
    title: string
    description: string
    price: Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    publishedAt?: Date | string
    draft?: boolean
    contactPersonId?: number | null
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutOrdersInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrdersInput, ProductUncheckedCreateWithoutOrdersInput>
  }

  export type ProductUpsertWithoutOrdersInput = {
    update: XOR<ProductUpdateWithoutOrdersInput, ProductUncheckedUpdateWithoutOrdersInput>
    create: XOR<ProductCreateWithoutOrdersInput, ProductUncheckedCreateWithoutOrdersInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrdersInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrdersInput, ProductUncheckedUpdateWithoutOrdersInput>
  }

  export type ProductUpdateWithoutOrdersInput = {
    educationField?: NullableEnumEducationFieldFieldUpdateOperationsInput | $Enums.EducationField | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    draft?: BoolFieldUpdateOperationsInput | boolean
    images?: ProductImageUpdateManyWithoutProductNestedInput
    contactPerson?: ContactPersonUpdateOneWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutOrdersInput = {
    id?: IntFieldUpdateOperationsInput | number
    educationField?: NullableEnumEducationFieldFieldUpdateOperationsInput | $Enums.EducationField | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    draft?: BoolFieldUpdateOperationsInput | boolean
    contactPersonId?: NullableIntFieldUpdateOperationsInput | number | null
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductImageCreateManyProductInput = {
    id: string
    sortOrder?: number
  }

  export type ProductOrderCreateManyProductInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    amount: number
    extraDetails?: string | null
    status?: $Enums.OrderStatus
  }

  export type ProductImageUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductImageUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductImageUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductOrderUpdateWithoutProductInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    extraDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
  }

  export type ProductOrderUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    extraDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
  }

  export type ProductOrderUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    extraDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
  }

  export type ProductCreateManyContactPersonInput = {
    id?: number
    educationField?: $Enums.EducationField | null
    title: string
    description: string
    price: Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    publishedAt?: Date | string
    draft?: boolean
  }

  export type ProductUpdateWithoutContactPersonInput = {
    educationField?: NullableEnumEducationFieldFieldUpdateOperationsInput | $Enums.EducationField | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    draft?: BoolFieldUpdateOperationsInput | boolean
    images?: ProductImageUpdateManyWithoutProductNestedInput
    orders?: ProductOrderUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutContactPersonInput = {
    id?: IntFieldUpdateOperationsInput | number
    educationField?: NullableEnumEducationFieldFieldUpdateOperationsInput | $Enums.EducationField | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    draft?: BoolFieldUpdateOperationsInput | boolean
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    orders?: ProductOrderUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutContactPersonInput = {
    id?: IntFieldUpdateOperationsInput | number
    educationField?: NullableEnumEducationFieldFieldUpdateOperationsInput | $Enums.EducationField | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    measures?: NullableJsonNullValueInput | InputJsonValue
    amount?: IntFieldUpdateOperationsInput | number
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    draft?: BoolFieldUpdateOperationsInput | boolean
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