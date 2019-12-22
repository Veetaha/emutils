
/**
 * Defines an object type that represents some handle that aquired some resources
 * and requires to free them when you are done working with it.
 */
export interface Delete {
    /**
     * Pre: AHTUNG! Never call this function twice on the same object, otherwise
     *      undefined behaviour (possibly double free or memory corruption), if
     *      not stated otherwise.
     *
     * Post: any interaction with `this` can have undefined behaviour if not
     *       stated otherwise. Don'y use this handle after destruction!
     *
     * Desturctor function that frees resources previously aquired by the handle.
     * It is your responsibilty to call `.destroy()` on `this` once it becomes
     * useless during the execution of the program. Otherwise not calling this
     * function incurs memory leaks.
     *
     * @remarks
     * It's your choise to deal with manual memory management, remember:
     * "Who likes skiing downhill must enjoy skiing uphill"!
     */
    delete(): void;
}
