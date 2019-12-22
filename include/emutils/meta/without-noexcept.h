#pragma once

#include <type_traits>

namespace Emu {
    namespace Internal {
        template <typename TFn> struct WithoutNoexcept {
            using type = TFn;
        };
        template <typename TRet, typename... TParams>
        struct WithoutNoexcept<TRet(TParams...) noexcept> {
            using type = TRet(TParams...);
        };

        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutNoexcept<TRet(TClass::*)(TParams...) noexcept> {
            using type = TRet(TClass::*)(TParams...);
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutNoexcept<TRet(TClass::*)(TParams...) & noexcept> {
            using type = TRet(TClass::*)(TParams...) &;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutNoexcept<TRet(TClass::*)(TParams...) && noexcept> {
            using type = TRet(TClass::*)(TParams...) &&;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutNoexcept<TRet(TClass::*)(TParams...) const noexcept> {
            using type = TRet(TClass::*)(TParams...) const;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutNoexcept<TRet(TClass::*)(TParams...) const & noexcept> {
            using type = TRet(TClass::*)(TParams...) const &;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutNoexcept<TRet(TClass::*)(TParams...) const && noexcept> {
            using type = TRet(TClass::*)(TParams...) const &&;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutNoexcept<TRet(TClass::*)(TParams...) volatile noexcept> {
            using type = TRet(TClass::*)(TParams...) volatile;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutNoexcept<TRet(TClass::*)(TParams...) volatile & noexcept> {
            using type = TRet(TClass::*)(TParams...) volatile &;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutNoexcept<TRet(TClass::*)(TParams...) volatile && noexcept> {
            using type = TRet(TClass::*)(TParams...) volatile &&;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutNoexcept<TRet(TClass::*)(TParams...) const volatile noexcept> {
            using type = TRet(TClass::*)(TParams...) const volatile;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutNoexcept<TRet(TClass::*)(TParams...) const volatile & noexcept> {
            using type = TRet(TClass::*)(TParams...) const volatile &;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutNoexcept<TRet(TClass::*)(TParams...) const volatile && noexcept> {
            using type = TRet(TClass::*)(TParams...) const volatile &&;
        };
    
    } // namespace Internal

    template <typename TFn>
    using WithoutNoexcept = typename Internal::WithoutNoexcept<TFn>::type;

    template <typename TFn>
    [[nodiscard]] constexpr inline std::decay_t<WithoutNoexcept<TFn>>
    RemoveNoexcept(const TFn& fn) noexcept {
        return fn;
    }

} // namespace Emu
