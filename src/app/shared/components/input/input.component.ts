import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '../../model/form-field';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @Input() input: FormField<string>;
  @Input() form: FormGroup;

  constructor() {
    this.form = new FormGroup({})
    this.input = new FormField()
  }

 
  get isValid() { return this.form.controls[this.input.key].valid; }

}
