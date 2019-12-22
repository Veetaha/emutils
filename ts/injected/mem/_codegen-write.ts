import Fs from 'fs';
import { NumTypes, NumTypesComaSeparated  } from '../../codegen/num';
import { bt, maybePlural } from '../../codegen/utils';

let code =
`declare const Module: import('../../static/types').EmModule;

import { ${NumTypesComaSeparated} } from '../../static/types';

`;

for (const type of NumTypes) {
    const writeArrayBytes = `(${(type.size)} * ${bt('jsArray.length')})`;
    code += `

/**
 * Pre: ${bt('destPtr')} points to memory that is valid to write ${type.size
 } byte${maybePlural(type.size)} to.
 *
 * Writes ${bt(type.name)} (${type.getDescription()})
 * to memory location pointed by ${bt('destPtr')}.
 *
 * @param destPtr Pointer to memory location where to write ${bt('value')} to.
 * @param value   Value of type ${bt(type.name)} to store in memory.
 */
export function ${type.getFnSpecName('write')}(destPtr: ${type.getSelfPtr()}, value: ${type}) {
    ${type.getHEAPRead('destPtr')} = value;
}


/**
 * Pre: ${bt('destPtr')} points to memory that is valid to write ${writeArrayBytes} bytes to.
 *
 * Writes array of ${bt(type.name)} (${type.getDescription()})
 * to memory location pointed by ${bt('destPtr')}.
 *
 * @param destPtr Pointer to memory location where to write ${bt('jsArray')} to.
 * @param jsArray Array of ${bt(type.name)} to store in memory.
 */
export function ${type.getFnSpecName('writeArray')
}(destPtr: ${type.getSelfPtr()}, jsArray: ${type.getSelfTypedArray()} | readonly ${type.name}[]) {
    ${type.getHEAPWriteArray('jsArray', 'destPtr')};
}
`;
}

Fs.writeFileSync(`${__dirname}/write.ts`, code, 'utf8');
