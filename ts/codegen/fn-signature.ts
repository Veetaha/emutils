import { FnModifiers } from './fn-modifiers';

export class FnSignature {
    constructor(
        readonly modifiers: FnModifiers,
        readonly TClass  = '',
        readonly TRet    = 'TRet',
        readonly TParams = 'TParams'
    ) {}

    private ifMethod(str: string) {
        return this.TClass ? str : '';
    }

    injectTemplateParams() {
        return `typename ${this.TRet}, ${this.ifMethod(`typename ${this.TClass}, `)}typename... ${this.TParams}`;
    }

    getType() {
        return `${this.TRet}${!this.TClass ? '' : `(${this.TClass}::*)`}(${this.TParams}...)`;
    }

    getTypeWithModifiers() {
        return  this.getType() + FnModifiers.join(this.modifiers);
    }

    static *getAllPermuts() {
        yield* this.getAllFreeFnPermuts();
        yield* this.getAllMethodPermuts();
    }

    static *getAllFreeFnPermuts() {
        for (const modifiers of FnModifiers.getAllNoexceptPermuts()) yield new FnSignature(modifiers);
    }

    static *getAllMethodPermuts() {
        for (const modifiers of FnModifiers.getAllPermuts()) yield new FnSignature(modifiers, 'TClass');
    }
}
