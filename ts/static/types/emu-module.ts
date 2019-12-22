import { EmModule } from "./em-module";

export interface EmuModule extends EmModule {
    Emu: typeof import('../../injected');
}
