import * as tslib_1 from "tslib";
import { Directive, HostListener } from "@angular/core";
let ClickStopPropagation = 
// tslint:disable-next-line:directive-class-suffix
class ClickStopPropagation {
    onClick(event) {
        event.stopPropagation();
    }
};
tslib_1.__decorate([
    HostListener("click", ["$event"])
], ClickStopPropagation.prototype, "onClick", null);
ClickStopPropagation = tslib_1.__decorate([
    Directive({
        // tslint:disable-next-line:directive-selector
        selector: "[click-stop-propagation]"
    })
    // tslint:disable-next-line:directive-class-suffix
], ClickStopPropagation);
export { ClickStopPropagation };
//# sourceMappingURL=click-stop-propagation.js.map