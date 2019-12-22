import { EmModule } from '../../static/types';
declare const Module: EmModule;

import { Delete, i8, u8, i16, u16, i32, u32, ptr, f32, f64 } from "../../static/types";
import { HeapPtr } from '../mem/heap-ptr';
import { Heap } from '../mem/heap';
import { PHANTOM_RAW_ARRAY_TAG } from './raw-array-tag';

/**
 * Represents `RawArray<T>` allocated on heap.
 */
export class HeapArray<TItem = any> implements Delete {
    [PHANTOM_RAW_ARRAY_TAG]: TItem;

    getRawPtr() {
        return this.ptr.ptr;
    }

    private constructor(readonly ptr: HeapPtr<u32>) {}

    delete() {
        this.ptr.delete();
    }



    /**
     * Allocates array of `i8` (1-byte signed integer) on heap.
     *
     * @param jsArray Javascript array of `i8` to copy to heap.
     *
     * @returns HeapArray that governs created memory block, you must manually
     * call `.delete()` on it once you are done using it.
     */
    static allocI8(jsArray: readonly i8[] | Int8Array) {
        const ptr = Heap.alloc<u32>(4, 4 + jsArray.length);
        Module.HEAPU32[ptr.ptr >> 2] = (jsArray.length as u32);
        Module.HEAP8.set(jsArray, (ptr.ptr + 4) >> 0);
        return new HeapArray<i8>(ptr);
    }



    /**
     * Allocates array of `u8` (1-byte unsigned integer) on heap.
     *
     * @param jsArray Javascript array of `u8` to copy to heap.
     *
     * @returns HeapArray that governs created memory block, you must manually
     * call `.delete()` on it once you are done using it.
     */
    static allocU8(jsArray: readonly u8[] | Uint8Array | Uint8ClampedArray) {
        const ptr = Heap.alloc<u32>(4, 4 + jsArray.length);
        Module.HEAPU32[ptr.ptr >> 2] = (jsArray.length as u32);
        Module.HEAPU8.set(jsArray, (ptr.ptr + 4) >> 0);
        return new HeapArray<u8>(ptr);
    }



    /**
     * Allocates array of `i16` (2-byte signed integer) on heap.
     *
     * @param jsArray Javascript array of `i16` to copy to heap.
     *
     * @returns HeapArray that governs created memory block, you must manually
     * call `.delete()` on it once you are done using it.
     */
    static allocI16(jsArray: readonly i16[] | Int16Array) {
        const ptr = Heap.alloc<u32>(4, 4 + (2 * jsArray.length));
        Module.HEAPU32[ptr.ptr >> 2] = (jsArray.length as u32);
        Module.HEAP16.set(jsArray, (ptr.ptr + 4) >> 1);
        return new HeapArray<i16>(ptr);
    }



    /**
     * Allocates array of `u16` (2-byte unsigned integer) on heap.
     *
     * @param jsArray Javascript array of `u16` to copy to heap.
     *
     * @returns HeapArray that governs created memory block, you must manually
     * call `.delete()` on it once you are done using it.
     */
    static allocU16(jsArray: readonly u16[] | Uint16Array) {
        const ptr = Heap.alloc<u32>(4, 4 + (2 * jsArray.length));
        Module.HEAPU32[ptr.ptr >> 2] = (jsArray.length as u32);
        Module.HEAPU16.set(jsArray, (ptr.ptr + 4) >> 1);
        return new HeapArray<u16>(ptr);
    }



    /**
     * Allocates array of `i32` (4-byte signed integer) on heap.
     *
     * @param jsArray Javascript array of `i32` to copy to heap.
     *
     * @returns HeapArray that governs created memory block, you must manually
     * call `.delete()` on it once you are done using it.
     */
    static allocI32(jsArray: readonly i32[] | Int32Array) {
        const ptr = Heap.alloc<u32>(4, 4 + (4 * jsArray.length));
        Module.HEAPU32[ptr.ptr >> 2] = (jsArray.length as u32);
        Module.HEAP32.set(jsArray, (ptr.ptr + 4) >> 2);
        return new HeapArray<i32>(ptr);
    }



    /**
     * Allocates array of `u32` (4-byte unsigned integer) on heap.
     *
     * @param jsArray Javascript array of `u32` to copy to heap.
     *
     * @returns HeapArray that governs created memory block, you must manually
     * call `.delete()` on it once you are done using it.
     */
    static allocU32(jsArray: readonly u32[] | Uint32Array) {
        const ptr = Heap.alloc<u32>(4, 4 + (4 * jsArray.length));
        Module.HEAPU32[ptr.ptr >> 2] = (jsArray.length as u32);
        Module.HEAPU32.set(jsArray, (ptr.ptr + 4) >> 2);
        return new HeapArray<u32>(ptr);
    }



    /**
     * Allocates array of `ptr` (4-byte pointer) on heap.
     *
     * @param jsArray Javascript array of `ptr` to copy to heap.
     *
     * @returns HeapArray that governs created memory block, you must manually
     * call `.delete()` on it once you are done using it.
     */
    static allocPtr(jsArray: readonly ptr[] | Int32Array) {
        const ptr = Heap.alloc<u32>(4, 4 + (4 * jsArray.length));
        Module.HEAPU32[ptr.ptr >> 2] = (jsArray.length as u32);
        Module.HEAP32.set(jsArray, (ptr.ptr + 4) >> 2);
        return new HeapArray<ptr>(ptr);
    }



    /**
     * Allocates array of `f32` (4-byte single precision floating point number) on heap.
     *
     * @param jsArray Javascript array of `f32` to copy to heap.
     *
     * @returns HeapArray that governs created memory block, you must manually
     * call `.delete()` on it once you are done using it.
     */
    static allocF32(jsArray: readonly f32[] | Float32Array) {
        const ptr = Heap.alloc<u32>(4, 4 + (4 * jsArray.length));
        Module.HEAPU32[ptr.ptr >> 2] = (jsArray.length as u32);
        Module.HEAPF32.set(jsArray, (ptr.ptr + 4) >> 2);
        return new HeapArray<f32>(ptr);
    }



    /**
     * Allocates array of `f64` (8-byte double precision floating point number) on heap.
     *
     * @param jsArray Javascript array of `f64` to copy to heap.
     *
     * @returns HeapArray that governs created memory block, you must manually
     * call `.delete()` on it once you are done using it.
     */
    static allocF64(jsArray: readonly f64[] | Float64Array) {
        const ptr = Heap.alloc<u32>(8, 8 + (8 * jsArray.length));
        Module.HEAPU32[ptr.ptr >> 2] = (jsArray.length as u32);
        Module.HEAPF64.set(jsArray, (ptr.ptr + 8) >> 3);
        return new HeapArray<f64>(ptr);
    }



}
