import { EmModule } from '../../static/types';
declare const Module: EmModule;

import { Heap } from '../mem/heap';
import { HeapPtr } from '../mem/heap-ptr';
import { writePtr } from '../mem/write';
import { ptr, u8, Delete } from '../../static/types';

export class Utf8StrArr implements Delete {

    /**
     * The actual memory layout of this class is:
     *
     *      *-------------------------V
     * [u8* | u8* | u8* | ... | ...| ... | u8 | u8 | u8 |... | '\0' | ?? | ??]
     *  ^-`StrPtrs`    `StrPtrs[reinterpret_cast<u8*>(*StrPtrs) - 1]`-^
     *
     * `*StrPtrs` points to the first u8acter in strings array.
     * `StrPtrs[1]` points to the beginning of the seconds string.
     * `StrPtrs[reinterpret_cast<u8*>(*StrPtrs) - 1]` points to the byte
     * one past the terminating null u8 ('\0') of the last string.
     */

    // Lengths all don't include null character.
    private readonly strPtrs: HeapPtr;

    getRawPtr() {
        return this.strPtrs.ptr;
    }

    constructor(jsStrings: readonly string[]) {
        const SIZEOF_PTR = 4;
        let totalUtf8Len = 0;
        for (const jsStr of jsStrings) totalUtf8Len += Module.lengthBytesUTF8(jsStr) + 1;

        // One more byte to store pointer one past the last string
        const charPtrPtrBlockLength = SIZEOF_PTR * (jsStrings.length + 1);

        this.strPtrs = Heap.alloc(SIZEOF_PTR, charPtrPtrBlockLength + totalUtf8Len);

        let charPtrPtr = this.strPtrs.ptr;
        let charPtr = charPtrPtr + charPtrPtrBlockLength as ptr<u8>;

        for (const jsStr of jsStrings) {
            writePtr(charPtrPtr, charPtr);
            charPtr    += Module.stringToUTF8(jsStr, charPtr, Infinity) + 1 as any;
            charPtrPtr += SIZEOF_PTR as any;
        }
        writePtr(charPtrPtr, charPtr);
    }

    delete() {
        this.strPtrs.delete();
    }

}


