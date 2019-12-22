declare const Module: import('../../static/types').EmModule;
import { HeapPtr } from './heap-ptr';
import { num, sizeof, ptr, alignof } from '../../static/types';

export const Heap = {

    /**
     * Pre: `size > 0`
     * Pre: `alignment > 0`
     *
     * Allocates memory of the given `size` plus `alignment - 1` on the heap.
     * Additional `aligment - 1` bytes of memory is needed for efficient one-time
     * call to `Module._malloc()`.
     *
     * @remarks
     * In the worst case it can return a pointer with the address `N` such
     * that `(N - 1) % alignment == 0` so that we would need to use first
     * `alignment - 1` bytes for padding, otherwise some padding at the end
     * of the memory block will be present.
     *
     *
     * @param alignment Requirement for allocated pointer value (`ptr() % alignment === 0`)
     * @param size      Amount of bytes to allocate
     */
    alloc: <T extends num, B extends number = alignof<T>>(alignment: B, size: number) => {
        const originalPtr = Module._malloc<T>(size + alignment);
        return new HeapPtr<T>(
            originalPtr,
            originalPtr + alignment - (originalPtr % alignment) as ptr<T>
        );
    },

    /**
     * Creates aligned array of bytes.
     *
     * @param bytesPerElement Amount of bytes one element of array occupies.
     * @param size Amount of elements in allocated array.
     */
    allocArray: <TElem extends num, B extends number = sizeof<TElem>>(
        bytesPerElement: B,
        size: number
    ): HeapPtr<TElem> => Heap.alloc(bytesPerElement, bytesPerElement * size)
};
