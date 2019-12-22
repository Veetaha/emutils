#pragma once

#include <vector>
#include <emscripten/emscripten.h>
#include <emscripten/bind.h>

#include "emutils/debug/assert.h"
#include "emutils/aliases/emscripten-em.h"
#include "emutils/meta/lambda-to-fn-ptr.h"
#include "emutils/meta/without-noexcept.h"

namespace Emu {

    template <typename T>
    auto RegisterStdVector(const char* const name) {
        using StdVector = std::vector<T>;
        using size_type = typename StdVector::size_type;

        return Em::class_<std::vector<T>>(name)
            .class_function("createReserved", LambdaToFnPtr([](const uint32_t elementsAmount){
                StdVector newbie;
                newbie.reserve(elementsAmount);
                return newbie;
            }))
            .template constructor<>()
            .function("pushBack", Em::select_overload<void(const T&)>(&StdVector::push_back))
            .function("popBack",  &StdVector::pop_back)
            .function("reserve",  &StdVector::reserve)
            .function("clear",    RemoveNoexcept(&StdVector::clear))
            .function("size",     RemoveNoexcept(&StdVector::size))


            .function("get",
                #ifndef EMU_NO_DEBUG
                LambdaToFnPtr([](StdVector& self, const size_type index) {
                    EMU_ASSERT(index < self.size());
                    return self[index];
                })
                #else
                Em::select_const(&StdVector::operator[])
                #endif
            )


            .function("set", LambdaToFnPtr([](StdVector& self, const size_type index, T&& val) {
                EMU_ASSERT(index < self.size());
                
                self[index] = val;
            }))


            .function("erase", LambdaToFnPtr([](StdVector& self, const ptrdiff_t index){
                EMU_ASSERT(index < static_cast<ptrdiff_t>(self.size()));

                self.erase(self.cbegin() + index);
            }))


            .function("eraseRange", LambdaToFnPtr([](StdVector& self, const ptrdiff_t begin, const ptrdiff_t end){
                EMU_ASSERT(end <= static_cast<ptrdiff_t>(self.size()));

                const auto beginIterator{self.cbegin()};
                self.erase(beginIterator + begin, beginIterator + end);
            }))


            .function("insert", LambdaToFnPtr([](StdVector& self, const ptrdiff_t index, T&& val){
                EMU_ASSERT(index <= static_cast<ptrdiff_t>(self.size()));

                self.insert(self.cbegin() + index, val);
            }));
    }

}
