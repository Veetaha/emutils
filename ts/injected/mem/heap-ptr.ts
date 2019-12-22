declare const Module: import('../../static/types').EmModule;

import { ptr, num, Delete } from '../../static/types';

/**
 * Represents an aligned pointer to heap. It is your responsibility to call
 * `.destroy()` method to free its memory once your are done with it.
 */
export class HeapPtr<T extends num = num> implements Delete {
    constructor(
        /**
         * Pointer to the first byte of the allocated memory block.
         * It is not necessarily aligned, it is saved only to be passed to `Module._free()`.
         */
        readonly originalPtr: ptr<T>,
        /**
         * Pointer that points to actual aligned memory block, though the original
         * allocated block doesn't necesserily (in fact never) starts at this address,
         * since some padding for alignment was used.
         */
        readonly ptr: ptr<T>
    ) {}

    delete() {
        Module._free(this.originalPtr);
    }
}
