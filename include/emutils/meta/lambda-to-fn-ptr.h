#pragma once

#include "emutils/meta/without-class.h"

namespace Emu {

    template <typename TLambda>
    [[nodiscard]] constexpr inline WithoutClass<decltype(&TLambda::operator())>*
    LambdaToFnPtr(const TLambda& lambda) noexcept {
        return lambda;
    }

}
