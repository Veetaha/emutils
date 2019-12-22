import { NumTypes, NumTypesComaSeparated, u32 } from '../../codegen/num';
import { bt, binary } from '../../codegen/utils';


function createArrayDef(mem: 'heap' | 'stack') {
const Mem                  = mem[0].toUpperCase() + mem.substr(1); // Heap or Stack
const ptr                  = mem === 'heap' ? 'HeapPtr' : 'ptr';
const getPtr               = mem === 'heap' ? (ptr: string) => `${ptr}.ptr` : (ptr: string) => ptr;
const ifHeap = {
    importHeapPtr:  `import { HeapPtr } from '../mem/heap-ptr';`,
    deleteComa:       'Delete, ',
    implementsDelete: 'implements Delete ',
    deleteMethod: `
    delete() {
        this.ptr.delete();
    }`
};

if (mem === 'stack') Object.keys(ifHeap).forEach(key => (ifHeap as any)[key] = '');

let code =
`import { EmModule } from '../../static/types';
declare const Module: EmModule;

import { ${ifHeap.deleteComa}${NumTypesComaSeparated} } from "../../static/types";
${ifHeap.importHeapPtr}
import { ${Mem} } from '../mem/${mem}';
import { PHANTOM_RAW_ARRAY_TAG } from './raw-array-tag';

/**
 * Represents ${bt('RawArray<T>')} allocated on ${mem}.
 */
export class ${Mem}Array<TItem = any> ${ifHeap.implementsDelete}{
    [PHANTOM_RAW_ARRAY_TAG]: TItem;

    getRawPtr() {
        return ${getPtr('this.ptr')};
    }

    private constructor(readonly ptr: ${ptr}<u32>) {}
${ifHeap.deleteMethod}

`;


for (const type of NumTypes) {
    const alignment = Math.max(type.size, 4); // use padding after length for items of > 4 bytes size.
    code  += `

    /**
     * Allocates array of ${bt(type.name)} (${type.getDescription()}) on ${mem}.
     *
     * @param jsArray Javascript array of ${bt(type.name)} to copy to ${mem}.
     *
     * @returns ${Mem}Array that governs created memory block, you must manually
     * ${mem === 'heap'
        ? `call ${bt('.delete()')} on it`
        : `call ${bt('Module.stackRestore(sp)')}`
      } once you are done using it.
     */
    static ${type.getFnSpecName('alloc')}(jsArray: readonly ${type}[] | ${type.getSelfTypedArray()}) {
        const ptr = ${Mem}.alloc<${u32}>(${alignment}, ${
            binary(alignment, '+', binary(type.size, '*', 'jsArray.length'))
        });
        ${u32.getHEAPWrite(getPtr('ptr'), `jsArray.length as ${u32}`)};
        ${type.getHEAPWriteArray('jsArray', binary(getPtr('ptr'), '+', alignment))};
        return new ${Mem}Array<${type}>(ptr);
    }

`;
}
return `${code}

}
`;
}

const Fs = require('fs');
Fs.writeFileSync(`${__dirname}/heap-array.ts`, createArrayDef('heap'), 'utf8');
Fs.writeFileSync(`${__dirname}/stack-array.ts`, createArrayDef('stack'), 'utf8');
