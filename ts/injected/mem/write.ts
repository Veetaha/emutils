declare const Module: import('../../static/types').EmModule;

import { i8, u8, i16, u16, i32, u32, ptr, f32, f64 } from '../../static/types';



/**
 * Pre: `destPtr` points to memory that is valid to write 1 byte to.
 *
 * Writes `i8` (1-byte signed integer)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `value` to.
 * @param value   Value of type `i8` to store in memory.
 */
export function writeI8(destPtr: ptr<i8>, value: i8) {
    Module.HEAP8[destPtr >> 0] = value;
}


/**
 * Pre: `destPtr` points to memory that is valid to write (1 * `jsArray.length`) bytes to.
 *
 * Writes array of `i8` (1-byte signed integer)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `jsArray` to.
 * @param jsArray Array of `i8` to store in memory.
 */
export function writeArrayI8(destPtr: ptr<i8>, jsArray: Int8Array | readonly i8[]) {
    Module.HEAP8.set(jsArray, destPtr >> 0);
}


/**
 * Pre: `destPtr` points to memory that is valid to write 1 byte to.
 *
 * Writes `u8` (1-byte unsigned integer)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `value` to.
 * @param value   Value of type `u8` to store in memory.
 */
export function writeU8(destPtr: ptr<u8>, value: u8) {
    Module.HEAPU8[destPtr >> 0] = value;
}


/**
 * Pre: `destPtr` points to memory that is valid to write (1 * `jsArray.length`) bytes to.
 *
 * Writes array of `u8` (1-byte unsigned integer)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `jsArray` to.
 * @param jsArray Array of `u8` to store in memory.
 */
export function writeArrayU8(destPtr: ptr<u8>, jsArray: Uint8Array | Uint8ClampedArray | readonly u8[]) {
    Module.HEAPU8.set(jsArray, destPtr >> 0);
}


/**
 * Pre: `destPtr` points to memory that is valid to write 2 bytes to.
 *
 * Writes `i16` (2-byte signed integer)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `value` to.
 * @param value   Value of type `i16` to store in memory.
 */
export function writeI16(destPtr: ptr<i16>, value: i16) {
    Module.HEAP16[destPtr >> 1] = value;
}


/**
 * Pre: `destPtr` points to memory that is valid to write (2 * `jsArray.length`) bytes to.
 *
 * Writes array of `i16` (2-byte signed integer)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `jsArray` to.
 * @param jsArray Array of `i16` to store in memory.
 */
export function writeArrayI16(destPtr: ptr<i16>, jsArray: Int16Array | readonly i16[]) {
    Module.HEAP16.set(jsArray, destPtr >> 1);
}


/**
 * Pre: `destPtr` points to memory that is valid to write 2 bytes to.
 *
 * Writes `u16` (2-byte unsigned integer)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `value` to.
 * @param value   Value of type `u16` to store in memory.
 */
export function writeU16(destPtr: ptr<u16>, value: u16) {
    Module.HEAPU16[destPtr >> 1] = value;
}


/**
 * Pre: `destPtr` points to memory that is valid to write (2 * `jsArray.length`) bytes to.
 *
 * Writes array of `u16` (2-byte unsigned integer)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `jsArray` to.
 * @param jsArray Array of `u16` to store in memory.
 */
export function writeArrayU16(destPtr: ptr<u16>, jsArray: Uint16Array | readonly u16[]) {
    Module.HEAPU16.set(jsArray, destPtr >> 1);
}


/**
 * Pre: `destPtr` points to memory that is valid to write 4 bytes to.
 *
 * Writes `i32` (4-byte signed integer)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `value` to.
 * @param value   Value of type `i32` to store in memory.
 */
export function writeI32(destPtr: ptr<i32>, value: i32) {
    Module.HEAP32[destPtr >> 2] = value;
}


/**
 * Pre: `destPtr` points to memory that is valid to write (4 * `jsArray.length`) bytes to.
 *
 * Writes array of `i32` (4-byte signed integer)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `jsArray` to.
 * @param jsArray Array of `i32` to store in memory.
 */
export function writeArrayI32(destPtr: ptr<i32>, jsArray: Int32Array | readonly i32[]) {
    Module.HEAP32.set(jsArray, destPtr >> 2);
}


/**
 * Pre: `destPtr` points to memory that is valid to write 4 bytes to.
 *
 * Writes `u32` (4-byte unsigned integer)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `value` to.
 * @param value   Value of type `u32` to store in memory.
 */
export function writeU32(destPtr: ptr<u32>, value: u32) {
    Module.HEAPU32[destPtr >> 2] = value;
}


/**
 * Pre: `destPtr` points to memory that is valid to write (4 * `jsArray.length`) bytes to.
 *
 * Writes array of `u32` (4-byte unsigned integer)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `jsArray` to.
 * @param jsArray Array of `u32` to store in memory.
 */
export function writeArrayU32(destPtr: ptr<u32>, jsArray: Uint32Array | readonly u32[]) {
    Module.HEAPU32.set(jsArray, destPtr >> 2);
}


/**
 * Pre: `destPtr` points to memory that is valid to write 4 bytes to.
 *
 * Writes `ptr` (4-byte pointer)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `value` to.
 * @param value   Value of type `ptr` to store in memory.
 */
export function writePtr(destPtr: ptr, value: ptr) {
    Module.HEAP32[destPtr >> 2] = value;
}


/**
 * Pre: `destPtr` points to memory that is valid to write (4 * `jsArray.length`) bytes to.
 *
 * Writes array of `ptr` (4-byte pointer)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `jsArray` to.
 * @param jsArray Array of `ptr` to store in memory.
 */
export function writeArrayPtr(destPtr: ptr, jsArray: Int32Array | readonly ptr[]) {
    Module.HEAP32.set(jsArray, destPtr >> 2);
}


/**
 * Pre: `destPtr` points to memory that is valid to write 4 bytes to.
 *
 * Writes `f32` (4-byte single precision floating point number)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `value` to.
 * @param value   Value of type `f32` to store in memory.
 */
export function writeF32(destPtr: ptr<f32>, value: f32) {
    Module.HEAPF32[destPtr >> 2] = value;
}


/**
 * Pre: `destPtr` points to memory that is valid to write (4 * `jsArray.length`) bytes to.
 *
 * Writes array of `f32` (4-byte single precision floating point number)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `jsArray` to.
 * @param jsArray Array of `f32` to store in memory.
 */
export function writeArrayF32(destPtr: ptr<f32>, jsArray: Float32Array | readonly f32[]) {
    Module.HEAPF32.set(jsArray, destPtr >> 2);
}


/**
 * Pre: `destPtr` points to memory that is valid to write 8 bytes to.
 *
 * Writes `f64` (8-byte double precision floating point number)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `value` to.
 * @param value   Value of type `f64` to store in memory.
 */
export function writeF64(destPtr: ptr<f64>, value: f64) {
    Module.HEAPF64[destPtr >> 3] = value;
}


/**
 * Pre: `destPtr` points to memory that is valid to write (8 * `jsArray.length`) bytes to.
 *
 * Writes array of `f64` (8-byte double precision floating point number)
 * to memory location pointed by `destPtr`.
 *
 * @param destPtr Pointer to memory location where to write `jsArray` to.
 * @param jsArray Array of `f64` to store in memory.
 */
export function writeArrayF64(destPtr: ptr<f64>, jsArray: Float64Array | readonly f64[]) {
    Module.HEAPF64.set(jsArray, destPtr >> 3);
}
