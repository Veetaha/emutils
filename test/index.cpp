#include <emscripten/bind.h>

#include "emutils/std/vector.h"

EMSCRIPTEN_BINDINGS(emutils_test) {
    Emu::RegisterStdVector<std::string>("StdVectorString");
}

