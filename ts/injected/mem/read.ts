declare const Module: import('../../static/types').EmModule;

import { i8, u8, i16, u16, i32, u32, ptr, f32, f64 } from '../../static/types';


/**
 * Pre: `srcPtr` points to memory that is valid to read 1 byte from.
 *
 * Reads `i8` (1-byte signed integer)
 * from memory location pointed by given `srcPtr`.
 *
 * @param srcPtr Pointer to memory to read `i8` from.
 */
export function readI8(srcPtr: ptr<i8>) {
    return Module.HEAP8[srcPtr >> 0] as i8;
}
/**
 * Pre: `srcPtr` points to memory that is valid to read 1 byte from.
 *
 * Reads `u8` (1-byte unsigned integer)
 * from memory location pointed by given `srcPtr`.
 *
 * @param srcPtr Pointer to memory to read `u8` from.
 */
export function readU8(srcPtr: ptr<u8>) {
    return Module.HEAPU8[srcPtr >> 0] as u8;
}
/**
 * Pre: `srcPtr` points to memory that is valid to read 2 bytes from.
 *
 * Reads `i16` (2-byte signed integer)
 * from memory location pointed by given `srcPtr`.
 *
 * @param srcPtr Pointer to memory to read `i16` from.
 */
export function readI16(srcPtr: ptr<i16>) {
    return Module.HEAP16[srcPtr >> 1] as i16;
}
/**
 * Pre: `srcPtr` points to memory that is valid to read 2 bytes from.
 *
 * Reads `u16` (2-byte unsigned integer)
 * from memory location pointed by given `srcPtr`.
 *
 * @param srcPtr Pointer to memory to read `u16` from.
 */
export function readU16(srcPtr: ptr<u16>) {
    return Module.HEAPU16[srcPtr >> 1] as u16;
}
/**
 * Pre: `srcPtr` points to memory that is valid to read 4 bytes from.
 *
 * Reads `i32` (4-byte signed integer)
 * from memory location pointed by given `srcPtr`.
 *
 * @param srcPtr Pointer to memory to read `i32` from.
 */
export function readI32(srcPtr: ptr<i32>) {
    return Module.HEAP32[srcPtr >> 2] as i32;
}
/**
 * Pre: `srcPtr` points to memory that is valid to read 4 bytes from.
 *
 * Reads `u32` (4-byte unsigned integer)
 * from memory location pointed by given `srcPtr`.
 *
 * @param srcPtr Pointer to memory to read `u32` from.
 */
export function readU32(srcPtr: ptr<u32>) {
    return Module.HEAPU32[srcPtr >> 2] as u32;
}
/**
 * Pre: `srcPtr` points to memory that is valid to read 4 bytes from.
 *
 * Reads `ptr` (4-byte pointer)
 * from memory location pointed by given `srcPtr`.
 *
 * @param srcPtr Pointer to memory to read `ptr` from.
 */
export function readPtr(srcPtr: ptr) {
    return Module.HEAP32[srcPtr >> 2] as ptr;
}
/**
 * Pre: `srcPtr` points to memory that is valid to read 4 bytes from.
 *
 * Reads `f32` (4-byte single precision floating point number)
 * from memory location pointed by given `srcPtr`.
 *
 * @param srcPtr Pointer to memory to read `f32` from.
 */
export function readF32(srcPtr: ptr<f32>) {
    return Module.HEAPF32[srcPtr >> 2] as f32;
}
/**
 * Pre: `srcPtr` points to memory that is valid to read 8 bytes from.
 *
 * Reads `f64` (8-byte double precision floating point number)
 * from memory location pointed by given `srcPtr`.
 *
 * @param srcPtr Pointer to memory to read `f64` from.
 */
export function readF64(srcPtr: ptr<f64>) {
    return Module.HEAPF64[srcPtr >> 3] as f64;
}