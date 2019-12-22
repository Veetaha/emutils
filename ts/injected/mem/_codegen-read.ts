import Fs from 'fs';
import { NumTypes, NumTypesComaSeparated } from '../../codegen/num';
import { bt, maybePlural } from '../../codegen/utils';

let code =
`declare const Module: import('../../static/types').EmModule;

import { ${NumTypesComaSeparated} } from '../../static/types';

`;

for (const type of NumTypes) {
    code += `
/**
 * Pre: ${bt('srcPtr')} points to memory that is valid to read ${type.size
 } byte${maybePlural(type.size)} from.
 *
 * Reads ${bt(type.name)} (${type.getDescription()})
 * from memory location pointed by given ${bt('srcPtr')}.
 *
 * @param srcPtr Pointer to memory to read ${bt(type.name)} from.
 */
export function ${type.getFnSpecName('read')}(srcPtr: ${type.getSelfPtr()}) {
    return ${type.getHEAPRead('srcPtr')} as ${type};
}`;
}

Fs.writeFileSync(`${__dirname}/read.ts`, code, 'utf8');
