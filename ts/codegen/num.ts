import { binary, par } from "./utils";

export const enum NumTypeName {
    i8  = "i8",
    u8  = "u8",
    i16 = "i16",
    u16 = "u16",
    i32 = "i32",
    ptr = "ptr",
    u32 = "u32",
    f32 = "f32",
    f64 = "f64"
}

export enum TypedArrayType {
    i8  = "Int8Array",
    u8  = "Uint8Array | Uint8ClampedArray",
    i16 = "Int16Array",
    u16 = "Uint16Array",
    i32 = "Int32Array",
    ptr = "Int32Array",
    u32 = "Uint32Array",
    f32 = "Float32Array",
    f64 = "Float64Array"
}
export type TypeSuffix = "f" | "u" | "p" | "";
export type Signedness = "signed" | "unsigned";
export type FloatPrecision = "single" | "double";


class NumType<TSize extends number = number> {

    constructor(
        readonly size: TSize,
        readonly name: NumTypeName
    ) {}

    toString(): string {
        return this.name;
    }

    getSizeInBits(): number {
        return this.size * 8;
    }

    getDescription(): string {
        return `${this.size}-byte ${(
            this.isInt() ? `${this.isU_() ? 'un' : ''}signed integer` :
            this.is(ptr)      ? `pointer` :
            `${this.getFloatPrecision()} precision floating point number`
        )}`;
    }

    getSignedness(): Signedness | "" {
        return this.isU_() ? "unsigned" : this.isI_() ? "signed" : "";
    }

    getFloatPrecision(): FloatPrecision | "" {
        return this.is(f32) ? "single" : this.is(f64) ? "double" : "";
    }

    is(suspect: NumType): boolean {
        return this.name === suspect.name;
    }

    getHEAP(): string {
        return this.is(ptr)
            ? `Module.HEAP32`
            : `Module.HEAP${this.getSuffix().toUpperCase()}${this.getSizeInBits()}`;
    }

    getHEAPWrite(ptrExpr: string | number, value: string | number): string {
        return `${this.getHEAPRead(ptrExpr)} = ${par(value)}`;
    }

    getHEAPRead(ptrExpr: string | number): string {
        return `${this.getHEAP()}[${this.getHEAPIndex(ptrExpr)}]`;
    }

    getHEAPIndex(ptrExpr: string | number): string {
        return binary(ptrExpr, '>>', Math.log2(this.size));
    }

    getHEAPWriteArray(jsArray: string, ptrExpr: string | number): string {
        return `${this.getHEAP()}.set(${par(jsArray)}, ${this.getHEAPIndex(ptrExpr)})`;
    }

    getSelfHeapPtr(): string {
        return `HeapPtr${this.is(ptr) ? '' : `<${this.name}>`}`;
    }

    getSelfTypedArray(): TypedArrayType {
        return TypedArrayType[this.name];
    }

    getSelfPtr(): string {
        return `ptr${this.is(ptr) ? "" : `<${this.name}>`}`;
    }

    getFnSpecName(fnName: string): string {
        return `${fnName}${this.name[0].toUpperCase() + this.name.slice(1)}`;
    }

    isInt(): boolean {
        return this.isI_() || this.isU_();
    }
    isI_(): boolean {
        return this.name.startsWith('i');
    }
    isU_(): boolean {
        return this.name.startsWith('u');
    }

    isFloat(): boolean {
        return this.is(f32) || this.is(f64);
    }

    private getSuffix(): TypeSuffix {
        return (
            this.isU_()  ? 'u' :
            this.isFloat() ? 'f' :
            this.is(ptr)   ? 'p' :
            ''
        );
    }

}

export const i8  = new NumType(1, NumTypeName.i8);
export const u8  = new NumType(1, NumTypeName.u8);
export const i16 = new NumType(2, NumTypeName.i16);
export const u16 = new NumType(2, NumTypeName.u16);
export const i32 = new NumType(4, NumTypeName.i32);
export const u32 = new NumType(4, NumTypeName.u32);
export const ptr = new NumType(4, NumTypeName.ptr);
export const f32 = new NumType(4, NumTypeName.f32);
export const f64 = new NumType(8, NumTypeName.f64);

export const NumTypes = [
    i8,
    u8,
    i16,
    u16,
    i32,
    u32,
    ptr,
    f32,
    f64
];
export const NumTypesComaSeparated = NumTypes.join(', ');
