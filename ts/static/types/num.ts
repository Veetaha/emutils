declare const PHANTOM_PTR_TYPE_TAG: unique symbol;
declare const PHANTOM_NUM_TYPE_TAG: unique symbol;
export declare const PHANTOM_BYTE_SIZE_TAG: unique symbol;

export type sizeof<TNum extends num> = TNum[typeof PHANTOM_BYTE_SIZE_TAG];
export type alignof<TNum extends num> =
    | sizeof<TNum> extends 8 ? 8 | 16 :
    | sizeof<TNum> extends 4 ? 4 | 8 | 12 | 16 :
    | sizeof<TNum> extends 2 ? 2 | 4 | 6 | 8 | 10 | 12 | 14 | 16 :
    | sizeof<TNum> extends 1 ? 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 :
    never;

interface NumTag<B extends number = -1, TTagName extends string = any> {
    [PHANTOM_NUM_TYPE_TAG]: TTagName;
    [PHANTOM_BYTE_SIZE_TAG]: B;
}

/**
 * This actually is a workaround to avoid internal TypeScript intersection
 * type simplification that otherwise would yield `{} & number` types to `never`.
 */
interface PtrTag<TPointee extends num = num> {
    [PHANTOM_PTR_TYPE_TAG]: 'ptr';
    [PHANTOM_BYTE_SIZE_TAG]: 4;
    [PHANTOM_NUM_TYPE_TAG]: TPointee[typeof PHANTOM_NUM_TYPE_TAG];
}

export type num<TByteSize extends number = any> =
    TByteSize extends 1 ? i8   | u8   :
    TByteSize extends 2 ? i16  | u16  :
    TByteSize extends 4 ? i32  | u32  | f32 :
    TByteSize extends 8 ? f64 :
    never;

export type i8 = number & NumTag<1, 'i8'>;
export type u8 = number & NumTag<1, 'u8'>;

export type i16 = number & NumTag<2, 'i16'>;
export type u16 = number & NumTag<2, 'u16'>;

export type i32    = number & NumTag<4, 'i32'>;
export type u32    = number & NumTag<4, 'u32'>;
export type f32    = number & NumTag<4, 'f32'>;

export type f64 = number & NumTag<8, 'f64'>;

/**
 * There is no type-safe way to create pointer to pointer (`ptr<ptr>`) type
 * in TypeScript, so you should just use type-unsafe `ptr` in this case.
 */
export type ptr<TNum extends num = num> = number & PtrTag<TNum>;

export const nullptr = 0 as ptr;

export type i<Bits extends number = any> =
    Bits extends 8  ? i8  :
    Bits extends 16 ? i16 :
    Bits extends 32 ? i32 :
    never;

export type u<Bits extends number = any> =
    Bits extends 8  ? u8  :
    Bits extends 16 ? u16 :
    Bits extends 32 ? u32 :
    never;

export type f<Bits extends number = any> =
    Bits extends 32 ? f32 :
    Bits extends 64 ? f64 :
    never;


export type TypedArrayOf<TNum extends num | ptr> =
    TNum extends i8        ? Int8Array    :
    TNum extends u8        ? Uint8Array   | Uint8ClampedArray :
    TNum extends i16       ? Int16Array   :
    TNum extends u16       ? Uint16Array  :
    TNum extends i32 | ptr ? Int32Array   :
    TNum extends u32       ? Uint32Array  :
    TNum extends f32       ? Float32Array :
    TNum extends f64       ? Float64Array :
    never;


