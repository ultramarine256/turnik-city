import { DOCUMENT } from "@angular/common";
import { inject, InjectionToken } from "@angular/core";

/**
 * An abstraction over global window object
 *
 * @usage:
 * constructor(
 *     @Inject(WINDOW) private window: Window,
 * ) {}
 *
 */
export const WINDOW = new InjectionToken<Window>('An abstraction over global window object', {
    factory: () => {
        const { defaultView } = inject(DOCUMENT);

        if (!defaultView) {
            throw new Error('Window is not available');
        }

        return defaultView;
    },
});
