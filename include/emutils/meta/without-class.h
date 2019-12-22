#pragma once

namespace Emu {
    namespace Internal {
        template <typename TFn> struct WithoutClass {
            using type = TFn;
        };

        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...)> {
            using type = TRet(TParams...);
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) noexcept> {
            using type = TRet(TParams...) noexcept;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) &> {
            using type = TRet(TParams...);
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) & noexcept> {
            using type = TRet(TParams...) noexcept;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) &&> {
            using type = TRet(TParams...);
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) && noexcept> {
            using type = TRet(TParams...) noexcept;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) const> {
            using type = TRet(TParams...);
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) const noexcept> {
            using type = TRet(TParams...) noexcept;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) const &> {
            using type = TRet(TParams...);
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) const & noexcept> {
            using type = TRet(TParams...) noexcept;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) const &&> {
            using type = TRet(TParams...);
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) const && noexcept> {
            using type = TRet(TParams...) noexcept;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) volatile> {
            using type = TRet(TParams...);
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) volatile noexcept> {
            using type = TRet(TParams...) noexcept;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) volatile &> {
            using type = TRet(TParams...);
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) volatile & noexcept> {
            using type = TRet(TParams...) noexcept;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) volatile &&> {
            using type = TRet(TParams...);
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) volatile && noexcept> {
            using type = TRet(TParams...) noexcept;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) const volatile> {
            using type = TRet(TParams...);
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) const volatile noexcept> {
            using type = TRet(TParams...) noexcept;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) const volatile &> {
            using type = TRet(TParams...);
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) const volatile & noexcept> {
            using type = TRet(TParams...) noexcept;
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) const volatile &&> {
            using type = TRet(TParams...);
        };
    
        template <typename TRet, typename TClass, typename... TParams>
        struct WithoutClass<TRet(TClass::*)(TParams...) const volatile && noexcept> {
            using type = TRet(TParams...) noexcept;
        };
    
    } // namespace Internal

    template <typename TFn>
    using WithoutClass = typename Internal::WithoutClass<TFn>::type;

} // namespace Emu
