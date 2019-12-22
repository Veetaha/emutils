import { Delete } from '../delete';
import { u32 } from '..';


/**
 * See C++ documentation for std::vector
 * @see https://en.cppreference.com/w/cpp/container/vector
 */
export interface StdVector<T> extends Delete {
    /**
     * @see https://en.cppreference.com/w/cpp/container/vector/push_back
     *
     * Adds `val` to the end of `std::vector<T>`. This may involve dynamic
     * storage reallocation. Consider `.reserve(size)` memory ahead before
     * pushing known amount of values to `std::vector<T>`.
     *
     * @param val Value to push to `std::vector<T>`.
     */
    pushBack(val: T): void;
    /**
     * @see https://en.cppreference.com/w/cpp/container/vector/pop_back
     *
     * Pre: `std::vector<T>` is not empty otherwise UNDEFINED BEHAVIOUR.
     *
     * Removes value from the tail of `std::vector<T>`.
     */
    popBack(): void;
    /**
     * @see https://en.cppreference.com/w/cpp/container/vector/reserve
     *
     * Allocates memory ahead of time for the anticipated `elementsAmount` to
     * be stored in `std::vector<T>`.
     *
     * @param elementsAmount Amount of elements to pre-allocate memory for.
     */
    reserve(elementsAmount: u32): void;
    /**
     * @see https://en.cppreference.com/w/cpp/container/vector/clear
     *
     * Removes all elements from `std::vector<T>`.
     */
    clear(): void;
    /**
     * @see https://en.cppreference.com/w/cpp/container/vector/size
     *
     * Returns amount of elements currently stored in `std::vector<T>`.
     */
    size(): u32;
    /**
     * @see https://en.cppreference.com/w/cpp/container/vector/operator_at
     *
     * Pre: `index < this.size()` otherwise UNDEFINED BEHAVIOUR.
     *
     * Returns element under given `index` stored in `std::vector<T>`.
     * @param index Element index to access.
     */
    get(index: u32): T;
    /**
     * @see https://en.cppreference.com/w/cpp/container/vector/operator_at
     *
     * Pre: `index < this.size()` otherwise UNDEFINED BEHAVIOUR.
     *
     * Writes given `val` at `index` in `std::vector<T>`.
     *
     *
     * @param index Element index to write `val` to.
     * @param val   Value to store at `index`.
     */
    set(index: u32, val: T): void;
    /**
     * @see https://en.cppreference.com/w/cpp/container/vector/erase
     *
     * Pre: `index < this.size()` otherwise UNDEFINED BEHAVIOUR.
     *
     * Removes single element from `std::vector` at `index` and shifts all elements
     * that follow to the left.
     *
     * @param index Index of the element to remove from `std::vector<T>`.
     */
    erase(index: u32): void;
    /**
     * @see https://en.cppreference.com/w/cpp/container/vector/erase
     *
     * Pre: `begin <= end && end <= this.size()` otherwise UNDEFINED BEHAVIOUR.
     *
     * This function represent an overload of `std::vector<T>::erase` that removes
     * a range of elements from `begin` index to `end` index.
     *
     * @param begin Begin index of the range of elements to remove (inclusive).
     * @param end   End index of the range of elements to remove (exclusive).
     */
    eraseRange(begin: u32, end: u32): void;
    /**
     * @see https://en.cppreference.com/w/cpp/container/vector/insert 
     * 
     * Pre: `index <= this.size()` otherwise UNDEFINED BEHAVIOUR.
     *
     * Inserts `val` into `std::vector<T>` at the given `index`. Shifts all
     * elements in range `[index, this.size)` to the right.
     *
     * @param index Index in `std::vector<T>` to insert given `val` to.
     * @param val   Value to insert into `std::vector<T>`.
     */
    insert(index: u32, val: T): void;
}

export interface StdVectorConstructor<T> {
    prototype: StdVector<T>;

    /**
     * Creates an empty `std::vector<T>`.
     */
    new(): StdVector<T>;

    /**
     * Shorthand for:
     * ```ts
     * const vec = new StdVector();
     * vec.reserve(elementsAmount);
     * ```
     * This is actually faster since you create and reserve memory space in one
     * call to WebAssembly instead of two.
     *
     * @param elementsAmount Amount of elements to pre-allocate memory for.
     */
    createReserved(elementsAmount: u32): StdVector<T>;
}
