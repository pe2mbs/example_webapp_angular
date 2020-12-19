import { Subscribers } from './subscribers';
export class BaseDialog extends Subscribers {
    constructor(dialogRef, dataService, mode = 'edit', fixed_values = null) {
        super();
        this.debug = false;
        this.fixedValues = null;
        this.dialogRef = dialogRef;
        this.dataService = dataService;
        this.mode = mode;
        this.fixedValues = fixed_values;
        return;
    }
    isEditMode() {
        return (this.mode === 'edit');
    }
    getErrorMessage(ctrl_name) {
        let ctrl = null;
        if (typeof ctrl_name === 'string') {
            ctrl = this.formGroup.get(ctrl_name);
        }
        else {
            ctrl = ctrl_name;
        }
        if (ctrl == null || ctrl.valid) {
            return ('');
        }
        if (this.debug) {
            console.log('getErrorMessage( ctrl_name = "' + ctrl_name + '" )');
        }
        let result = 'Unknown error';
        if (ctrl.hasError('required')) {
            result = 'Required field';
        }
        else if (ctrl.hasError('email')) {
            result = 'Not a valid email';
        }
        else if (ctrl.hasError('maxlength')) {
            result = 'The data is too long, allowed (' + ctrl.errors.maxlength.requiredLength + ')';
        }
        else if (ctrl.invalid) {
            console.log(result, ctrl);
        }
        if (this.debug) {
            console.log("getErrorMessage() => " + result);
        }
        return (result);
    }
    updateFixedValues() {
        if (this.fixedValues != null) {
            this.formGroup.patchValue(this.fixedValues);
        }
        if (this.isEditMode()) {
            // For the fixed value fields, they should be "readonly" !!!
            for (let key in this.fixedValues) {
                let ctrl = this.formGroup.get(key);
                if (ctrl != null) {
                    ctrl.disable({ onlySelf: true });
                }
            }
        }
        return;
    }
    submit() {
        // empty stuff
        return;
    }
    onSaveClick() {
        if (this.debug) {
            console.log('onSaveClick() close');
        }
        this.dialogRef.close(1);
        return;
    }
    onCancelClick() {
        if (this.debug) {
            console.log('onCancelClick() close');
        }
        this.dialogRef.close(0);
        return;
    }
}
//# sourceMappingURL=dialog.js.map