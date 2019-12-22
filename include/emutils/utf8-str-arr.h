#pragma once

#include <cassert>
#include <string_view>

#include "emutils/debug/assert.h"
#include "emutils/raw-array.h"

namespace Emu {

    class Utf8StrArr {
        char** StrPtrs;
    public:

        Utf8StrArr(const int32_t ptr): StrPtrs(reinterpret_cast<char**>(ptr)) {
            EMU_ASSERT(ptr);
        }

        [[nodiscard]] inline auto IsEmpty() const noexcept {
            return reinterpret_cast<char**>(*StrPtrs) == StrPtrs + 1;
        }

        [[nodiscard]] inline uint32_t Length() const noexcept {
            return static_cast<uint32_t>(reinterpret_cast<char**>(*StrPtrs) - 1 - StrPtrs);
        }

        [[nodiscard]] inline uint32_t Length(uint32_t index) const noexcept {
            EMU_ASSERT(index < Length());
            return static_cast<uint32_t>(StrPtrs[index + 1] - StrPtrs[index] - 1);
        }

        [[nodiscard]] inline std::string_view operator[](uint32_t index) const noexcept {
            EMU_ASSERT(index < Length());
            return std::string_view(StrPtrs[index], Length(index));
        }

    };


}
