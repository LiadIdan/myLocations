import { Component, Host, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroupDirective, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

import { formControlErrorsAnimations } from './form-control-errors.animations';

interface ValidationError {
  message: string;
  params?: { value: unknown };
}

@Component({
  selector: 'app-form-control-errors',
  templateUrl: './form-control-errors.component.html',
  styleUrls: ['./form-control-errors.component.scss'],
  animations: [formControlErrorsAnimations.fadeInOut],
})
export class FormControlErrorsComponent implements OnInit, OnDestroy {
  control!: AbstractControl;
  currentError: ValidationError | null = null;

  @Input() controlName!: string;

  private _destroyed$ = new Subject<void>();
  private _errorDictionary: Record<string, (params: ValidationErrors) => ValidationError> = {
    required: () => ({ message: 'This field is required' }),
  };

  constructor(@Host() private _rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.control = this._rootFormGroup.control.get(this.controlName) as AbstractControl;
    this.currentError = this._evalCurrentError();

    this.control.valueChanges
      .pipe(
        distinctUntilChanged(),
        filter(() => !!this.control.errors && this.control.invalid && this.control.touched),
        map(() => this._evalCurrentError()),
        takeUntil(this._destroyed$)
      )
      .subscribe((error) => (this.currentError = error));
  }

  private _evalCurrentError(): ValidationError | null {
    if (!this.control.errors) {
      return null;
    }

    const type = Object.keys(this.control.errors)[0];
    return this._errorDictionary[type](this.control.errors[type]);
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
