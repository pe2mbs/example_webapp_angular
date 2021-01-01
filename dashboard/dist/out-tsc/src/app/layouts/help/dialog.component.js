import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let GcHelpDialogComponent = class GcHelpDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        dialogRef.disableClose = true;
        return;
    }
    onCloseClick() {
        this.dialogRef.close();
    }
};
GcHelpDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-dialog',
        template: `<div class="help-contents">
  	<mat-card>
	  	<markdown [data]="data.text | async">No Help information available</markdown>
  	</mat-card>
  	<mat-card-actions align="end">
		<button mat-button cdkFocusInitial (click)="onCloseClick()">Close</button>
  	</mat-card-actions>
</div>`,
        styles: [':host { height: 100%; width: 100%; }',
            '.help-contents { height: 100%; width: 100%; }',
            'mat-card { height: calc(100hv - 100px); }'
        ]
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], GcHelpDialogComponent);
export { GcHelpDialogComponent };
//# sourceMappingURL=dialog.component.js.map