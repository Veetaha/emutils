#pragma once

#include <type_traits>

#define EMU_GENERATE_GETTERS_WITH_PRECOND(QUALIFIERS, SIGNATURE, PRECOND_CHECK, GET_EXPR)\
    [[nodiscard]] QUALIFIERS auto& SIGNATURE& noexcept {                                 \
        PRECOND_CHECK;                                                                   \
        return GET_EXPR;                                                                 \
    }                                                                                    \
    [[nodiscard]] QUALIFIERS const auto& SIGNATURE const& noexcept {                     \
        PRECOND_CHECK;                                                                   \
        return GET_EXPR;                                                                 \
    }                                                                                    \
    [[nodiscard]] QUALIFIERS auto SIGNATURE &&                                           \
    noexcept(std::is_nothrow_constructible_v<decltype(GET_EXPR)>) {                      \
        PRECOND_CHECK;                                                                   \
        return GET_EXPR;                                                                 \
    }                                                                                    \
    int SIGNATURE const&& = delete;

#define EMU_GENERATE_GETTERS(QUALIFIERS, SIGNATURE, GET_EXPR) \
    EMU_GENERATE_GETTERS_WITH_PRECOND(QUALIFIERS, SIGNATURE, ,GET_EXPR)
