#pragma once

#include <type_traits>
#include <string_view>
#include <string>
#include <algorithm>

#include "emutils/debug/assert.h"
#include "emutils/macros/generate-getters.h"

namespace Emu {
    namespace Internal {
        template <typename TItem>
        constexpr inline int GetPadding() {
            return std::max(int(sizeof(TItem)) - int(sizeof(uint32_t)), 0);
        }

        template <typename TItem, int Padding>
        struct [[gnu::packed]] RawArrayBaseMembers {
            public:  uint32_t Length;
            private: [[maybe_unused]] std::byte m_Padding[Padding];
            public:  TItem Arr[1];
        };

        template <typename TItem>
        struct [[gnu::packed]] RawArrayBaseMembers<TItem, 0> {
            uint32_t Length;
            TItem Arr[1];
        };

        template <typename TItem> 
        struct RawArrayBase : RawArrayBaseMembers<TItem, GetPadding<TItem>()> {
            using Super =     RawArrayBaseMembers<TItem, GetPadding<TItem>()>;
            using Super::Arr;
            using Super::Length;
            
            [[nodiscard]] constexpr auto*       end()         noexcept { return Arr + Length; }
            [[nodiscard]] constexpr const auto* end()   const noexcept { return Arr + Length; }
            [[nodiscard]] constexpr auto*       begin()       noexcept { return Arr; }
            [[nodiscard]] constexpr const auto* begin() const noexcept { return Arr; }

            EMU_GENERATE_GETTERS_WITH_PRECOND(
                constexpr, operator[](const uint32_t index), 
                EMU_ASSERT(index < Length),
                Arr[index]
            )
        };
        
    } // namespace Internal
    

template <typename TItem> 
struct RawArray : Internal::RawArrayBase<TItem> {};

#define EMU_INTERNAL_GENERATE_STR_RAW_ARRAY_SPEC(TChar)                  \
    template <> struct RawArray<TChar> : Internal::RawArrayBase<TChar> { \
                                                                         \
        [[nodiscard]] constexpr auto GetStringView() const noexcept {    \
            return std::basic_string_view<TChar>(Arr, Length - 1);       \
        }                                                                \
        [[nodiscard]] auto ToString() const {                            \
            return std::basic_string<TChar>(Arr, Length - 1);            \
        }                                                                \
    };

EMU_INTERNAL_GENERATE_STR_RAW_ARRAY_SPEC(char)
EMU_INTERNAL_GENERATE_STR_RAW_ARRAY_SPEC(wchar_t)
EMU_INTERNAL_GENERATE_STR_RAW_ARRAY_SPEC(char16_t)
EMU_INTERNAL_GENERATE_STR_RAW_ARRAY_SPEC(char32_t)


} // namespace Emu
