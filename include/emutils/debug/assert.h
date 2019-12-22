#include <cassert>

#ifndef EMU_NO_DEBUG
    #define EMU_ASSERT(cond) assert(cond)
#else
    #define EMU_ASSERT(cond) ((void)0)
#endif

