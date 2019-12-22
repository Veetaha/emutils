import { shrinkWs } from './utils';

export class FnModifiers {
    constructor(
        readonly cnst:     'const'    | '' = '',
        readonly volatile: 'volatile' | '' = '',
        readonly ref:      '&' | '&&' | '' = '',
        readonly noexcept: 'noexcept' | '' = '',
    ) {}


    private static readonly cvPermut = [
        new FnModifiers(),
        new FnModifiers('const'),
        new FnModifiers('', 'volatile'),
        new FnModifiers('const',  'volatile')
    ] as const;
    private static readonly refPremut = [
        new FnModifiers(),
        new FnModifiers('', '', '&'),
        new FnModifiers('', '', '&&')
    ] as const;
    private static readonly noexceptPremut = [
        new FnModifiers(),
        new FnModifiers('', '', '', 'noexcept')
    ] as const;

    static join(m: FnModifiers) {
        return shrinkWs(`${m.cnst || ''} ${m.volatile || ''} ${m.ref || ''} ${m.noexcept || ''}`);
    }

    static getAllCvPermuts() {
        return this.cvPermut;
    }
    static getAllRefPermuts() {
        return this.refPremut;
    }
    static getAllNoexceptPermuts() {
        return this.noexceptPremut;
    }

    static *getAllPermuts() {
        for (const {cnst, volatile} of this.cvPermut)
        for (const {ref}            of this.refPremut)
        for (const {noexcept}       of this.noexceptPremut)
            yield {cnst, volatile, ref, noexcept};
    }

    static *getCombinedPermuts(modifiersArr: readonly (readonly FnModifiers[])[]) {
        yield* this.getCombinedPermutsImpl(modifiersArr);
    }

    private static *getCombinedPermutsImpl(
        modifiersArr: readonly (readonly FnModifiers[])[],
        startIndex = 0
    ): IterableIterator<FnModifiers> {
        if (startIndex === modifiersArr.length - 1) return yield* modifiersArr[startIndex];
        for (const cur of modifiersArr[startIndex])
        for (const permut of this.getCombinedPermutsImpl(modifiersArr, startIndex + 1)) {
            yield {
                cnst:     cur.cnst     || permut.cnst,
                ref:      cur.ref      || permut.ref,
                volatile: cur.volatile || permut.volatile,
                noexcept: cur.noexcept || permut.noexcept
            };
        }
    }
}
