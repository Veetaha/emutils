import Fs from 'fs';

import { FnModifiers } from '../../../ts/codegen/fn-modifiers';
import { FnSignature } from '../../../ts/codegen/fn-signature';

const noexceptFnSignature = new FnSignature(new FnModifiers('', '', '', 'noexcept'));
let code =
`#pragma once

#include <type_traits>

namespace Emu {
    namespace Internal {
        template <typename TFn> struct WithoutNoexcept {
            using type = TFn;
        };
        template <${noexceptFnSignature.injectTemplateParams()}>
        struct WithoutNoexcept<${noexceptFnSignature.getTypeWithModifiers()}> {
            using type = ${noexceptFnSignature.getType()};
        };
`;

for (const modifiers of FnModifiers.getCombinedPermuts([
    FnModifiers.getAllCvPermuts(),
    FnModifiers.getAllRefPermuts()
])) {
    const s = new FnSignature(modifiers, 'TClass');
    code += `
        template <${s.injectTemplateParams()}>
        struct WithoutNoexcept<${s.getTypeWithModifiers()} noexcept> {
            using type = ${s.getType()}${FnModifiers.join(s.modifiers)};
        };
    `;
}

code += `
    } // namespace Internal

    template <typename TFn>
    using WithoutNoexcept = typename Internal::WithoutNoexcept<TFn>::type;

    template <typename TFn>
    [[nodiscard]] constexpr inline std::decay_t<WithoutNoexcept<TFn>>
    RemoveNoexcept(const TFn& fn) noexcept {
        return fn;
    }

} // namespace Emu
`;

Fs.writeFileSync(`${__dirname}/without-noexcept.h`, code, 'utf8');
