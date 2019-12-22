declare const Module: import('../../static/types').EmModule;

import { num, sizeof, ptr } from '../../static/types';

export const Stack = {

    /**
     * Pre: `size > 0`
     * Pre: `alignment > 0`
     *
     * Allocates memory of the given `size` plus `alignment - 1` on the stack.
     * Additional `aligment - 1` bytes of memory is needed for efficient one-time
     * call to `Module.stackAlloc()`.
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
    alloc: <T extends num<B>, B extends number = sizeof<T>>(
        alignment: number,
        size: number
    ) => {
        const originalPtr = Module.stackAlloc<T>(size + alignment);
        return originalPtr + alignment - (originalPtr % alignment) as ptr<T>;
    },

    /**
     * Creates aligned array of bytes.
     *
     * @param bytesPerElement Amount of bytes one element of array occupies.
     * @param size Amount of elements in allocated array.
     */
    allocArray: <TElem extends num<B>, B extends number = sizeof<TElem>>(
        bytesPerElement: B,
        size: number
    ): ptr<TElem> => Stack.alloc(bytesPerElement, bytesPerElement * size)

};
