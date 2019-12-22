# emutils

## :zap: Rationale

This simple npm package provides utility TypeScript and C++ code for `emscripten`
WebAssembly toolchain. It designed for performance and simplicity.

C++ library is header-only and dependency-free. Just include headers into your `pch.h` (precompiled header) or dependent C++ source file directly and that's it.

## :dvd: Compilation

This library is designed with `std=gnu++2a` compiler option in mind, so be sure to configure your `em++` with this standard or higher.

You have to add the following methods to `EXTRA_EXPORTED_RUNTIME_METHODS` command-line option when compiling with `em++`:
 - `lengthBytesUTF8`,
 - `stringToUTF8`,
 - `stackSave`,
 - `stackRestore`,
 - `stackAlloc`

There are 2 modules exported by this package:
 - `injected`
 - `static`

## `injected` module

This is the a JavaScript file that you have to include after your emscripten
glue code via `post-js` parameter when compiling with `em++` or `emcc`:
```
--post-js ./node_modules/emutils/build/injected/index.js
```
The path `build/injected/index.js` to the bundle is guaranteed not to change within one major version of `emutils` package.

After that all the exports will reside in `Module.Emu` object.

```ts
import { EmuModule } from "emutils";

const Module: EmuModule = require('../my-wasm-emscripten-js-glue-code');

Module.onRuntimeInitialized = () => {
    const Emu = Module.Emu

    const emuStrArr = new Emu.Utf8StrArr(["my string1", "my string2"]);

    try {
        /* ... */
    } finally {
        emuStrArr.delete();
    }
};
```
You may have noticed the ugly `try {} finally {}` block you are forced to use in order to prevent memory leaks. Since JavaScript objects have indeterminate lifetimes and there is no way to hook into their destruction code, all memory management stuff is manual.

However there is a good shortcut for writing these `try {} finally {}` blocks that requires some `babel` transpiling.
See [`using.macro` package](https://github.com/Veetaha/using.macro) to learn how to set up the following `using()` syntax in your project.

```ts
const emuStrArr = new Emu.Utf8StrArr(["my string1", "my string2"]);

try {
    /* ... */
} finally {
    emuStrArr.delete();
}

 ↓ ↓ ↓ ↓ ↓ ↓

import using from "using.macro";

const const emuStrArr = using (new Emu.Utf8StrArr(["my string1", "my string2"]));

// the following code will be wrapped into try {} finally {} automatically
```

### `Heap` and `Stack`

These two guys represent your WebAssembly stack and heap accordingly.

They provide two methods `alloc(alignment, size)` and `allocArray(bytesPerElement, size)`
where the latter is just a shorthand for `.alloc(bytesPerElement, bytesPerElement * size)`

`alloc()` is ridiculously simple, it returns you a pointer to the memory on heap or stack
of the size you requested.

There is some type safety here that you may rely on thanks to TypeScript that will help you to pass the proper alignment and size of primitive type you want to allocate for.

```ts
import {i32} from "emutils";

const {Heap, HeapPtr} = Module.Emu;

// points to heap memory block of 42 items of i32 type (32 bit integers)
const myI32BlobPtr: HeapPtr<i32> = Heap.alloc<i32>(4, 42);

// never forget to free the memory! or try `using()`
myI32BlobPtr.delete();
```
`HeapPtr` is a wraper over a pair of pointers to the heap, where one of them points
to the actual aligned memory block you requested and which can be obtained via `.ptr`
property. The second one points to the original memory block, returned by the memory
allocator that manages emscripten's heap and it can be read via `.originalPtr`.
This class is designed to save the original pointer that should be passed to 
`Module._free()` when deallocating the memory, because the pointer returned by
the allocator may not always be properly aligned we do allocate some extra memory
to ensure the alignment by our own means.

The `Stack` is a bit simpler

```ts
import {ptr, i32, f64} from "emutils";
const {Stack} = Module.Emu;

const sp = Module.stackSave();
try {
    const i32Ptr: ptr<i32> = Stack.alloc<i32>(4, 42);
    const f64Ptr: ptr<f64> = Stack.alloc<f64>(8, 112);
} finally {
    // no need to free each pointer one by one
    // just restore the stack to its original position
    // you may create special usingStack() macro for this if you want
    Module.stackRestore(sp);
}

```

### `write*()` and `read*()`

There are a bunch of `write*()` and `read*()` (`*` is the type name) helper functions to
write and read values from raw pointers accordingly. These all
abstract away inreaction with `Module.HEAP*` array views and provide the
ultimate type safety.

There are also `writeArray*()` variants if you wonder.

```ts
import {ptr, f32} from "emutils";
const { writePtr, readPtr, writeI32, readI32, Heap } = Module.Emu;

const i32Ptr = using (Heap.alloc<i32>(4, 1));
const ptrPtr = using (Heap.alloc<ptr>(4, 1));

writeI32(i32Ptr, 42);
writePtr(ptrPtr, i32Ptr);

assert(readI32(i32Ptr) === 42);
assert(readPtr(ptrPtr) === i32Ptr);
assert(readI32(readPtr(ptrPtr) as ptr<i32>) === 42); // double indirection
```

### `class Utf8StrArr`

This class represens a linear fixed-with array of utf8 strings. It wraps a memory block which contains a representation of C++ `Emu::Utf8StrArr` class counterpart that is located in `include/emutils/utf8-str-arr.h`

It currently provides almost no methods, because it is designed for performance and the way it is layout in memory is the single purpose of its creation.
When you make `Utf8StrArr` you allocate only one memory block on WebAssembly heap.
After that you pass the pointer returned by `.getRawPtr()` method to your C++
code.

Your C++ code shoud accept `int32_t` instead of a pointer type, since emscripten
[doesn't let you pass raw pointers between JavaScript and C++ code so easily](https://github.com/emscripten-core/emscripten/issues/9448).

So this looks like this:

```ts
// TypeScript

const myStrArr = using (new Module.Emu.Utf8StrArr(["my string1", "my string2"]));

Module.myCppFn(myStrArr.getRawPtr());

```
```cpp
// C++

#include <emutils/utf8-str-arr.h>

void MyCppFn(const int32_t strArrPtr) {
    const Emu::Utf8StrArr strArr{strArrPtr};
    const std::string_view firstString = strArr[0];
}
```

The API of C++ counterpart is very intuitive, it just mimics `std::vector<std::string_view>`.

### `class HeapArray`, `class StackArray` and C++ `Emu::RawArray`

All these classes are similarly to `Utf8StrArr` just wrappers over a memory block.
`HeapArray` should be explicitly freed via `.delete()` and `StackArray` is disposed
via a call to `Module.stackRestore(sp)`.

Both `HeapArray` and `StackArray` provide you with a simple and type safe interface
to allocating numeric arrays on emscripten's heap and stack.

The give you a whole bunch of static `.alloc*(jsArray)` factory methods that convert
javascript vanilla arrays or typed arrays to `HeapArray` and `StackArray`.

There is `.getRawPtr()` method that returns a pointer (`HeapPtr` from `HeapArray` and `ptr` from `StackArray`) to the underlying memory block.

In order to access this array of numbers from C++ side you shoud use `Emu::RawArray`


```ts
// TypeScript

const myRawArray = using (new Module.Emu.HeapArray<f64>([3.14, 2.71, 42.0]));

Module.myCppFn(myRawArray.getRawPtr());

```
```cpp
// C++

#include <emutils/raw-array.h>

void MyCppFn(const int32_t rawArrPtr) {
    // Cannot pass `void*` here due to the following issue:
    // https://github.com/emscripten-core/emscripten/issues/9448
    // As a workaround just use a noop placement-new operator here:

    const auto& rawArr { *new (reinterpret_cast<void*>(rawArrPtr)) Emu::RawArray<double> };
    const double firstDouble = rawArr[0];
}
```

### `StdVector<T>` and `Emu::RegisterStdVector(name)`
`Emu::RegisterStdVector` resides in the header file: `emutils/std/vector.h`

This is a utility function that registers `std::vector<T>` types to use in your
WebAssembly interface.

`StdVector<T>` is a simple TypeScript interface that provides you with methods
typings around your registered `std::vector<T>` types.


## `static` module

This is the functionallity you get from `"emutils"` package itself.
```ts
import {i32, nullptr, ptr, StdVector} from "emutils";

type MyStdVectorOfI32Ptrs = StdVector<ptr<i32>>;
const myVector: MyStdVectorOfI32Ptrs = new Module.StdVector();
myVector.pushBack(nullptr);
```
These are only some utility types like `i8`, `i16`, `i32`, `u8`, `u16`, `u32`,
`ptr<T>`, `f32`, `f64` that give you type safety and some other interfaces like
`Delete` that represents a resource handle with `.delete()` method and `StdVector<>`
which represents an interface of `std::vector<T>` that you will register from
C++ side via `Emu::RegisterStdVector` from `emutils/std/vector.h`.
