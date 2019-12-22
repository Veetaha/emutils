// // By default Emscripten emits a single global Module.  Users setting -s
// // MODULARIZE=1 -s EXPORT_NAME=MyMod should declare their own types, e.g.
// // declare var MyMod: EmscriptenModule;
// declare var Module: Module;

export interface FileSystemType {
}
/*
export namespace FS {
    interface Lookup {
        path: string;
        node: FSNode;
    }

    interface FSStream {}
    interface FSNode {}
    interface ErrnoError {}

    let ignorePermissions: boolean;
    let trackingDelegate: any;
    let tracking: any;
    let genericErrors: any;

    //
    // paths
    //
    function lookupPath(path: string, opts: any): Lookup;
    function getPath(node: FSNode): string;

    //
    // nodes
    //
    function isFile(mode: number): boolean;
    function isDir(mode: number): boolean;
    function isLink(mode: number): boolean;
    function isChrdev(mode: number): boolean;
    function isBlkdev(mode: number): boolean;
    function isFIFO(mode: number): boolean;
    function isSocket(mode: number): boolean;

    //
    // devices
    //
    function major(dev: number): number;
    function minor(dev: number): number;
    function makedev(ma: number, mi: number): number;
    function registerDevice(dev: number, ops: any): void;

    //
    // core
    //
    function syncfs(populate: boolean, callback: (e: any) => any): void;
    function syncfs(callback: (e: any) => any, populate?: boolean): void;
    function mount(type: Emscripten.FileSystemType, opts: any, mountpoint: string): any;
    function unmount(mountpoint: string): void;

    function mkdir(path: string, mode?: number): any;
    function mkdev(path: string, mode?: number, dev?: number): any;
    function symlink(oldpath: string, newpath: string): any;
    function rename(old_path: string, new_path: string): void;
    function rmdir(path: string): void;
    function readdir(path: string): any;
    function unlink(path: string): void;
    function readlink(path: string): string;
    function stat(path: string, dontFollow?: boolean): any;
    function lstat(path: string): any;
    function chmod(path: string, mode: number, dontFollow?: boolean): void;
    function lchmod(path: string, mode: number): void;
    function fchmod(fd: number, mode: number): void;
    function chown(path: string, uid: number, gid: number, dontFollow?: boolean): void;
    function lchown(path: string, uid: number, gid: number): void;
    function fchown(fd: number, uid: number, gid: number): void;
    function truncate(path: string, len: number): void;
    function ftruncate(fd: number, len: number): void;
    function utime(path: string, atime: number, mtime: number): void;
    function open(path: string, flags: string, mode?: number, fd_start?: number, fd_end?: number): FSStream;
    function close(stream: FSStream): void;
    function llseek(stream: FSStream, offset: number, whence: number): any;
    function read(stream: FSStream, buffer: ArrayBufferView, offset: number, length: number, position?: number): number;
    function write(stream: FSStream, buffer: ArrayBufferView, offset: number, length: number, position?: number, canOwn?: boolean): number;
    function allocate(stream: FSStream, offset: number, length: number): void;
    function mmap(stream: FSStream, buffer: ArrayBufferView, offset: number, length: number, position: number, prot: number, flags: number): any;
    function ioctl(stream: FSStream, cmd: any, arg: any): any;
    function readFile(path: string, opts?: { encoding?: "binary" | "utf8"; flags?: string }): string | Uint8Array;
    function writeFile(path: string, data: string | ArrayBufferView, opts?: { flags?: string }): void;

    //
    // module-level FS code
    //
    function cwd(): string;
    function chdir(path: string): void;
    function init(
        input: null | (() => number | null),
        output: null | ((c: number) => any),
        error: null | ((c: number) => any),
    ): void;

    function createLazyFile(parent: string | FSNode, name: string, url: string, canRead: boolean, canWrite: boolean): FSNode;
    function createPreloadedFile(parent: string | FSNode, name: string, url: string,
        canRead: boolean, canWrite: boolean, onload?: () => void, onerror?: () => void, dontCreateFile?: boolean, canOwn?: boolean): void;
}
*/

// declare var MEMFS: Emscripten.FileSystemType;
// declare var NODEFS: Emscripten.FileSystemType;
// declare var IDBFS: Emscripten.FileSystemType;


export interface Math {
    imul(a: number, b: number): number;
}
