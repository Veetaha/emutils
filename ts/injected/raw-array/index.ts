import { HeapArray } from './heap-array';
import { StackArray } from './stack-array';

export * from './heap-array';
export * from './stack-array';

export type RawArray<TItem = any> = HeapArray<TItem> | StackArray<TItem>;
