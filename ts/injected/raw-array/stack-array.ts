import { EmModule } from '../../static/types';
declare const Module: EmModule;

import { i8, u8, i16, u16, i32, u32, ptr, f32, f64 } from "../../static/types";

import { Stack } from '../mem/stack';
import { PHANTOM_RAW_ARRAY_TAG } from './raw-array-tag';

/**
 * Represents `RawArray<T>` allocated on stack.
 */
export class StackArray<TItem = any> {
    [PHANTOM_RAW_ARRAY_TAG]: TItem;

    getRawPtr() {
        return this.ptr;
    }

    private constructor(readonly ptr: ptr<u32>) {}




    /**
     * Allocates array of `i8` (1-byte signed integer) on stack.
     *
     * @param jsArray Javascript array of `i8` to copy to stack.
     *
     * @returns StackArray that governs created memory block, you must manually
     * call `Module.stackRestore(sp)` once you are done using it.
     */
    static allocI8(jsArray: readonly i8[] | Int8Array) {
        const ptr = Stack.alloc<u32>(4, 4 + jsArray.length);
        Module.HEAPU32[ptr >> 2] = (jsArray.length as u32);
        Module.HEAP8.set(jsArray, (ptr + 4) >> 0);
        return new StackArray<i8>(ptr);
    }



    /**
     * Allocates array of `u8` (1-byte unsigned integer) on stack.
     *
     * @param jsArray Javascript array of `u8` to copy to stack.
     *
     * @returns StackArray that governs created memory block, you must manually
     * call `Module.stackRestore(sp)` once you are done using it.
     */
    static allocU8(jsArray: readonly u8[] | Uint8Array | Uint8ClampedArray) {
        const ptr = Stack.alloc<u32>(4, 4 + jsArray.length);
        Module.HEAPU32[ptr >> 2] = (jsArray.length as u32);
        Module.HEAPU8.set(jsArray, (ptr + 4) >> 0);
        return new StackArray<u8>(ptr);
    }



    /**
     * Allocates array of `i16` (2-byte signed integer) on stack.
     *
     * @param jsArray Javascript array of `i16` to copy to stack.
     *
     * @returns StackArray that governs created memory block, you must manually
     * call `Module.stackRestore(sp)` once you are done using it.
     */
    static allocI16(jsArray: readonly i16[] | Int16Array) {
        const ptr = Stack.alloc<u32>(4, 4 + (2 * jsArray.length));
        Module.HEAPU32[ptr >> 2] = (jsArray.length as u32);
        Module.HEAP16.set(jsArray, (ptr + 4) >> 1);
        return new StackArray<i16>(ptr);
    }



    /**
     * Allocates array of `u16` (2-byte unsigned integer) on stack.
     *
     * @param jsArray Javascript array of `u16` to copy to stack.
     *
     * @returns StackArray that governs created memory block, you must manually
     * call `Module.stackRestore(sp)` once you are done using it.
     */
    static allocU16(jsArray: readonly u16[] | Uint16Array) {
        const ptr = Stack.alloc<u32>(4, 4 + (2 * jsArray.length));
        Module.HEAPU32[ptr >> 2] = (jsArray.length as u32);
        Module.HEAPU16.set(jsArray, (ptr + 4) >> 1);
        return new StackArray<u16>(ptr);
    }



    /**
     * Allocates array of `i32` (4-byte signed integer) on stack.
     *
     * @param jsArray Javascript array of `i32` to copy to stack.
     *
     * @returns StackArray that governs created memory block, you must manually
     * call `Module.stackRestore(sp)` once you are done using it.
     */
    static allocI32(jsArray: readonly i32[] | Int32Array) {
        const ptr = Stack.alloc<u32>(4, 4 + (4 * jsArray.length));
        Module.HEAPU32[ptr >> 2] = (jsArray.length as u32);
        Module.HEAP32.set(jsArray, (ptr + 4) >> 2);
        return new StackArray<i32>(ptr);
    }



    /**
     * Allocates array of `u32` (4-byte unsigned integer) on stack.
     *
     * @param jsArray Javascript array of `u32` to copy to stack.
     *
     * @returns StackArray that governs created memory block, you must manually
     * call `Module.stackRestore(sp)` once you are done using it.
     */
    static allocU32(jsArray: readonly u32[] | Uint32Array) {
        const ptr = Stack.alloc<u32>(4, 4 + (4 * jsArray.length));
        Module.HEAPU32[ptr >> 2] = (jsArray.length as u32);
        Module.HEAPU32.set(jsArray, (ptr + 4) >> 2);
        return new StackArray<u32>(ptr);
    }



    /**
     * Allocates array of `ptr` (4-byte pointer) on stack.
     *
     * @param jsArray Javascript array of `ptr` to copy to stack.
     *
     * @returns StackArray that governs created memory block, you must manually
     * call `Module.stackRestore(sp)` once you are done using it.
     */
    static allocPtr(jsArray: readonly ptr[] | Int32Array) {
        const ptr = Stack.alloc<u32>(4, 4 + (4 * jsArray.length));
        Module.HEAPU32[ptr >> 2] = (jsArray.length as u32);
        Module.HEAP32.set(jsArray, (ptr + 4) >> 2);
        return new StackArray<ptr>(ptr);
    }



    /**
     * Allocates array of `f32` (4-byte single precision floating point number) on stack.
     *
     * @param jsArray Javascript array of `f32` to copy to stack.
     *
     * @returns StackArray that governs created memory block, you must manually
     * call `Module.stackRestore(sp)` once you are done using it.
     */
    static allocF32(jsArray: readonly f32[] | Float32Array) {
        const ptr = Stack.alloc<u32>(4, 4 + (4 * jsArray.length));
        Module.HEAPU32[ptr >> 2] = (jsArray.length as u32);
        Module.HEAPF32.set(jsArray, (ptr + 4) >> 2);
        return new StackArray<f32>(ptr);
    }



    /**
     * Allocates array of `f64` (8-byte double precision floating point number) on stack.
     *
     * @param jsArray Javascript array of `f64` to copy to stack.
     *
     * @returns StackArray that governs created memory block, you must manually
     * call `Module.stackRestore(sp)` once you are done using it.
     */
    static allocF64(jsArray: readonly f64[] | Float64Array) {
        const ptr = Stack.alloc<u32>(8, 8 + (8 * jsArray.length));
        Module.HEAPU32[ptr >> 2] = (jsArray.length as u32);
        Module.HEAPF64.set(jsArray, (ptr + 8) >> 3);
        return new StackArray<f64>(ptr);
    }



}
