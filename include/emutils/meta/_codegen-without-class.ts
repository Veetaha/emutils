import Fs from 'fs';
import { shrinkWs } from '../../../ts/codegen/utils';
import { FnSignature } from '../../../ts/codegen/fn-signature';

let code =
`#pragma once

namespace Emu {
    namespace Internal {
        template <typename TFn> struct WithoutClass {
            using type = TFn;
        };
`;

for (const s of FnSignature.getAllMethodPermuts()) {
    const {TRet, TParams} = s;
    code += `
        template <${s.injectTemplateParams()}>
        struct WithoutClass<${s.getTypeWithModifiers()}> {
            using type = ${TRet}(${TParams}...)${shrinkWs(s.modifiers.noexcept)};
        };
    `;
}

code += `
    } // namespace Internal

    template <typename TFn>
    using WithoutClass = typename Internal::WithoutClass<TFn>::type;

} // namespace Emu
`;

Fs.writeFileSync(`${__dirname}/without-class.h`, code, 'utf8');
