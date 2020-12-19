import * as tslib_1 from "tslib";
/*
#
#   Python backend and Angular frontend code generation by gencrud
#   Copyright (C) 2018-2020 Marc Bertens-Nguyen m.bertens@pe2mbs.nl
#
#   This library is free software; you can redistribute it and/or modify
#   it under the terms of the GNU Library General Public License GPL-2.0-only
#   as published by the Free Software Foundation.
#
#   This library is distributed in the hope that it will be useful, but
#   WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
#   Library General Public License for more details.
#
#   You should have received a copy of the GNU Library General Public
#   License GPL-2.0-only along with this library; if not, write to the
#   Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
#   Boston, MA 02110-1301 USA
#
*/
import { Component, Input, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PytBaseComponent } from './base.input.component';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PytMonacoEditorComponent),
    multi: true
};
export function OnLoadMonaco() {
    // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
    console.log("OnLoadMonaco", window.monaco);
    return;
}
export const monacoConfig = {
    baseUrl: 'assets',
    defaultOptions: // pass default options to be used
    {
        scrollBeyondLastLine: false,
        automaticLayout: false
    },
    onMonacoLoad: OnLoadMonaco
};
let PytMonacoEditorComponent = class PytMonacoEditorComponent extends PytBaseComponent {
    constructor(formGroupDir) {
        super(formGroupDir);
        this.height = 'auto';
        this.language = "plaintext";
        this.minimap = true;
        this.monacoOptions = monacoConfig.defaultOptions;
        this.code = "";
        return;
    }
    ngOnInit() {
        super.ngOnInit();
        this.code = this.control.value;
        this.monacoOptions.language = this.language;
        this.control.registerOnChange(() => {
            this.code = this.control.value;
        });
        return;
    }
    onEditorInit($event) {
        this._editorInstance = $event;
        this._editorInstance.updateOptions({ readOnly: this.readonly,
            minimap: { enabled: this.minimap }
        });
        const model = this._editorInstance.getModel(); // we'll create a model for you if the editor created from string value.
        monaco.editor.setModelLanguage(model, this.language);
        this._editorInstance.onDidChangeModelContent(() => {
            this.control.patchValue(this._editorInstance.getValue());
            this.control.markAsPending();
            this.control.updateValueAndValidity();
        });
        setInterval(() => {
            this._editorInstance.layout();
        }, 500);
        return;
    }
};
tslib_1.__decorate([
    Input()
], PytMonacoEditorComponent.prototype, "height", void 0);
tslib_1.__decorate([
    Input()
], PytMonacoEditorComponent.prototype, "language", void 0);
tslib_1.__decorate([
    Input()
], PytMonacoEditorComponent.prototype, "minimap", void 0);
tslib_1.__decorate([
    ViewChild("editor", { static: true })
], PytMonacoEditorComponent.prototype, "editorContent", void 0);
PytMonacoEditorComponent = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'pyt-monaco-editor-box',
        template: `<div #editor class="monaco-code-editor">
    <label class="label-style">
    <span>{{ placeholder }}</span>
    </label>
    <ngx-monaco-editor (onInit)="onEditorInit($event)"
                       [options]="monacoOptions"
                       [(ngModel)]="code" class="ngx-monaco-editor">
    </ngx-monaco-editor>
    </div>`,
        styles: [`:host
    {
        height: calc( 100% - 40px );
    }

    .monaco-code-editor
    {
		width: 100%;
		min-height: 200px;
		height: calc( 100% - 20px );
		padding-bottom: 35px;
		box-sizing: content-box;
	}

	.ngx-monaco-editor
	{
		height: calc( 100% - 16px );
		border: 1px solid rgba(0, 0, 0, 0.10) !important;
	}

	.label-style
	{
		font-size: inherit;
		font-weight: 400;
		line-height: 1.125;
		font-family: Roboto, monospace;
		font-size: 14px;
		color: rgba(0, 0, 0, 0.54);`
        ],
        providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
        animations: [trigger('visibilityChanged', [
                state('true', style({ 'height': '*', 'padding-top': '4px' })),
                state('false', style({ height: '0px', 'padding-top': '0px' })),
                transition('*=>*', animate('200ms'))
            ])
        ]
    })
], PytMonacoEditorComponent);
export { PytMonacoEditorComponent };
//# sourceMappingURL=monaco.component.js.map