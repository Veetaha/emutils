function StrArrOpt(optionName, strings) 
    return '\'' .. optionName .. '=["' .. table.concat(strings, '", "')  .. '"]\''
end

workspace "emutils-test"
    configurations { "Debug", "Release" }
    startproject "emutils"

project "emutils-test"
    language "C++"
    kind     "ConsoleApp"

    targetname "emu.js"
    location   "build/wasm"
    targetdir  "build/wasm/bin"
    objdir     "build/wasm/bin-int"

    files { "test/**.cpp" }
    includedirs {
        "include"
    }

    linkoptions {
        "--bind",
        "--post-js ../injected/index.js",
        StrArrOpt('EXTRA_EXPORTED_RUNTIME_METHODS', { -- "-s" is prepended automatically
            'lengthBytesUTF8',
            'stringToUTF8',
            'stackSave',
            'stackRestore',
            'stackAlloc'
        }),
        "-s ENVIRONMENT=node"
    }
    buildoptions {
        "-std=gnu++2a", -- workaround: `cppdialect "gnu++2a"` is not allowed
        "-pedantic",
        "-s EXIT_RUNTIME=0",
        "-Wno-error-padded"
    }
    enablewarnings {
        "error",
        "all",
        "extra",
        "everything"
    }
    disablewarnings {
        "dollar-in-identifier-extension",
        "missing-prototypes",
        "global-constructors",
        "gnu-zero-variadic-macro-arguments",
        "c++98-compat-pedantic",
        "c++98-compat"
    }

    filter "configurations:Debug"
        runtime "Debug"
        defines { "DEBUG", "_LIBCPP_DEBUG=1" }
        buildoptions {
            "-g4", 
            "-s SAFE_HEAP=1",
            "-s ASSERTIONS=2",
        }

    filter "configurations:Release"
        runtime  "Release"
        defines  { "NDEBUG" }
        buildoptions {
            "-s WASM_OBJECT_FILES=0",
            "-O3",
            "-s ASSERTIONS=0"
        }
        linkoptions  {
            "-s WASM_OBJECT_FILES=0",
            "-O3",
            "--llvm-lto 1"
        }
