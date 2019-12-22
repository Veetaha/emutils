import { ptr, i8, num, u8, u16, u32, i32 } from './num';

export const enum EnvType {
    Web    = "WEB",
    Node   = "NODE",
    Shell  = "SHELL",
    Worker = "WORKER"
}
export const enum CCallType {
    /**
     * Maps JS number to to any C/C++ numeric type or pointer.
     */
    Number  = "number",
    /**
     * Maps to C/C++ `char*`.
     */
    String  = "string",
    /**
     * Maps to C/C++ `bool`.
     */
    Boolean = "boolean",
    /**
     * Maps to C/C++ `unsigned char*` or `char*`
     */
    Array   = "array"
}
/**
 * @see https://emscripten.org/docs/api_reference/preamble.js.html?highlight=ccall#ccall
 */
export type CCallTypeToJs<TCCallType extends CCallType> = {
    number:  number | ptr;
    string:  string;
    boolean: boolean;
    array:
        | i8[]
        | Uint8Array
        | Int8Array
        | Uint8ClampedArray;
}[TCCallType];

export type CCallTuple<TTuple> = Record<Extract<keyof TTuple, number>, CCallType>;

export type CCallTypesTupleToJs<TCCallTypes extends CCallTuple<TCCallTypes>> = {
    [i in keyof TCCallTypes]: CCallTypeToJs<TCCallTypes[i]>;
};

export interface CCallOpts {
    async?: boolean;
}

export interface InitiateWasmImports {
    env: {
        [fnName: string]: any; // TODO
    };
}

export interface EmModule {
    print(str: string): void;
    printErr(str: string): void;
    arguments: string[];
    environment: EnvType;
    preInit: (() => void )[];
    preRun:  (() => void )[];
    postRun: (() => void )[];
    onAbort(what: any): void ;
    onRuntimeInitialized(): void;
    preinitializedWebGLContext: WebGLRenderingContext;
    noInitialRun: boolean;
    noExitRuntime: boolean;
    logReadFiles: boolean;
    filePackagePrefixURL: string;
    wasmBinary: ArrayBuffer;

    destroy(object: object): void;
    getPreloadedPackage(remotePackageName: string, remotePackageSize: number): ArrayBuffer;

    /**
     * User shell pages can write their own
     * `Module.instantiateWasm = function(imports, successCallback)` callback
     * to manually instantiate the Wasm module themselves.
     * This allows pages to run the instantiation parallel to any other async
     * startup actions they are performing.
     */
    instantiateWasm(
        imports: InitiateWasmImports,
        successCallback: (module: WebAssembly.Module) => void
    ): WebAssembly.Module;

    locateFile(url: string): string;
    onCustomMessage(event: MessageEvent): void;

    Runtime: never; // deprecated

    /**
     * Call a compiled C function from JavaScript.
     * The function executes a compiled C function from JavaScript and returns the result.
     * C++ name mangling means that “normal” C++ functions cannot be called;
     * the function must either be defined in a .c file or be a C++ function
     * defined with extern "C".
     *
     * @remarks
     * `ccall()` uses the C stack for temporary values.
     * If you pass a string then it is only “alive” until the call is complete.
     * If the code being called saves the pointer to be used later,
     * it may point to invalid data.
     * If you need a string to live forever, you can create it, for example,
     * using `_malloc` and `stringToUTF8()`.
     * However, you must later delete it manually!
     *
     * LLVM optimizations can inline and remove functions, after which you will
     * not be able to call them.
     * Similarly, function names minified by the Closure Compiler are inaccessible.
     * In either case, the solution is to add the functions to the
     * `EXPORTED_FUNCTIONS` list when you invoke emcc:
     * ```
     * -s EXPORTED_FUNCTIONS="['_main', '_myfunc']"
     * ```
     * Note that we also export main - if we didn’t, the compiler would assume
     * we don’t need it.
     *
     *
     * @param ident The name of the C function to be called.
     *
     * @param returnType The return type of the function. Note that array is not
     *                   supported as there is no way for us to know the length
     *                   of the array. For a void function this can be null
     *                   (note: the JavaScript null value, not a string containing the word "null").
     * @param argTypes   // TODO
     * @param args       // TODO
     * @param opts       // TODO
     */
    ccall<TRet extends CCallType, TParams extends CCallTuple<TParams>>(
        ident:      string,
        returnType: TRet | null,
        argTypes:   TParams,
        args:       CCallTypesTupleToJs<TParams>,
        opts?:      CCallOpts
    ): CCallTypeToJs<TRet>;

    cwrap(
        ident: string,
        returnType: CCallType | null,
        argTypes: CCallType[],
        opts?: CCallOpts
    ): (...args: any[]) => any;

    setValue(
        ptr: ptr,
        value: any,
        type: string,
        noSafe?: boolean
    ): void;
    getValue(ptr: ptr, type: string, noSafe?: boolean): number;

    ALLOC_NORMAL: number;
    ALLOC_STACK: number;
    ALLOC_STATIC: number;
    ALLOC_DYNAMIC: number;
    ALLOC_NONE: number;

    allocate(slab: any, types: string | string[], allocator: number, ptr: number): number;

    // USE_TYPED_ARRAYS == 1
    HEAP: Int32Array;
    IHEAP: Int32Array;
    FHEAP: Float64Array;

    // USE_TYPED_ARRAYS == 2
    HEAP8: Int8Array;
    HEAP16: Int16Array;
    HEAP32: Int32Array;
    HEAPU8: Uint8Array;
    HEAPU16: Uint16Array;
    HEAPU32: Uint32Array;
    HEAPF32: Float32Array;
    HEAPF64: Float64Array;

    TOTAL_STACK: number;
    TOTAL_MEMORY: number;
    FAST_MEMORY: number;

    addOnPreRun(cb: () => any): void;
    addOnInit(cb: () => any): void;
    addOnPreMain(cb: () => any): void;
    addOnExit(cb: () => any): void;
    addOnPostRun(cb: () => any): void;

    // Tools
    intArrayFromString(stringy: string, dontAddNull?: boolean, length?: number): number[];
    intArrayToString(array: number[]): string;
    writeStringToMemory(str: string, buffer: number, dontAddNull: boolean): void;
    writeArrayToMemory(array: number[], buffer: number): void;
    writeAsciiToMemory(str: string, buffer: number, dontAddNull: boolean): void;

    addRunDependency(id: any): void;
    removeRunDependency(id: any): void;

    preloadedImages: any;
    preloadedAudios: any;

    /**
     * Returns current stack pointer (`sp`).
     */
    stackSave(): ptr;
    /**
     * Restores current stack pointer to the given value.
     *
     * AHTUNG! Beware of callstack corruption! Always pass only pointers returned by
     * `stackSave()` to this function, otherwise undefined behaviour.
     *
     * @param sp Pointer to memory current stack pointer must be set to.
     */
    stackRestore(sp: ptr): void;

    /**
     * Pre: `size` > 0
     *
     * Allocates given amount of bytes on stack, advances stack pointer, so you
     * should save it with `stackSave()` and call `stackRestore(sp)` on it once
     * you are done with it.
     *
     * AHTUNG! Stack size is very limited, though it is more efficient do stack
     * memory allocation rather heap allocation, but large chunks of data must be stored
     * on heap, since stackoverfow is very likely otherwise.
     *
     * @param size Number of bytes to allocate on stack.
     *
     * @returns Pointer to allocated stack memory.
     */
    stackAlloc<TNum extends num = num>(size: number): ptr<TNum>;

    _memset<TNum extends num = num>(ptr: ptr<TNum>, value: TNum, length: number): i32;
    _malloc<TNum extends num = num>(size: number): ptr<TNum>;
    _free(ptr: ptr): void;

    UTF8ToString(ptr: ptr<u8>, maxBytesToRead?: number): string;


    /**
     * Pre: `outPtr` points to valid memory to write `str` to so that
     *  `maxBytesToWrite` bytes of it can be used.
     *
     * Copies the given Javascript String object `str` to the emscripten HEAP
     * at address `outPtr`, null-terminated and encoded in UTF8 form. The copy
     * will require at most `str.length * 4 + 1` bytes of space in the HEAP.
     * Use the function `lengthBytesUTF8` to compute the exact number of bytes
     * (excluding null terminator) that this function will write.
     *
     * @returns the number of bytes written, EXCLUDING the null terminator.
     *
     * @param str             JavaScript string to write to HEAP.
     * @param outPtr          Pointer to memory to write `str` to.
     * @param maxBytesToWrite Maximum amount of bytes to use when writing.
     */
    stringToUTF8(str: string, outPtr: ptr<u8>, maxBytesToWrite: number): u32;
    lengthBytesUTF8(str: string): number;
    allocateUTF8(str: string): ptr<u8>;
    allocateUTF8OnStack(str: string): ptr<u8>;

    UTF16ToString(ptr: ptr<u16>): string;
    stringToUTF16(str: string, outPtr: ptr<u16>, maxBytesToWrite?: number): number;
    lengthBytesUTF16(str: string): number;

    UTF32ToString(ptr: ptr<u32>): string;
    stringToUTF32(str: string, outPtr: ptr<u32>, maxBytesToWrite?: number): number;
    lengthBytesUTF32(str: string): number;
}
