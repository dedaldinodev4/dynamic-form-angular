import { Injectable } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators} from '@angular/forms';
import { of } from 'rxjs';
import { Field } from '../dtos';
import { FormField } from '../model/form-field';

@Injectable({
  providedIn: 'root'
})
export class BuilderFormService {

  group: FormGroup
  inputs: FormField<string>[] = []

  constructor() { 
    this.group = new FormGroup([]);
  }

  addTextBox(field: Field): FormField<string> {
    return new FormField<string>({
      controlType: "textbox",
      key: `${field.label.toLowerCase()}`,
      label: `${field.label}`,
      type: `${field.input}`,
      required: true,
      
    })
  }

  addDropDown(field: Field): FormField<string> {
    const array = field.value?.split(',').map((item) => {
      return { key: `${item.toLowerCase()}`,  value: `${item}`}
    })

    return new FormField<string>({
      controlType: "dropdown",
      key: `${field.label.toLowerCase()}`,
      label: `${field.label}`,
      options: array
    })
  }

  addCheckBox(field: Field): FormField<string> {
    const arrBox = field.value?.split(',').map((item) => {
      return { key: `${item.toLowerCase()}`,  value: `${item}`}
    })

    return new FormField<string>({
      controlType: "checkbox",
      key: `${field.label.toLowerCase()}`,
      label: `${field.label}`,
      type: `${field.input}`,
      options: arrBox
    })
  }

  addRadioBox(field: Field): FormField<string> {
    const arrRadio = field.value?.split(',').map((item) => {
      return { key: `${item.toLowerCase()}`,  value: `${item}`}
    })

    return  new FormField<string>({
      controlType: "radio",
      key: `${field.label.toLowerCase()}`,
      label: `${field.label}`,
      options: arrRadio
    })
  }

  addTextArea(field: Field): FormField<string> {
    return new FormField<string>({
      controlType: "textarea",
      key: `${field.label.toLowerCase()}`,
      label: `${field.label}`,
      type: `${field.input}`
    })
  }

  addFrormField(field: Field): FormField<string> {

    let fieldForm = new FormField<string>({});

    switch (field.input) {
      case 'select': 
        fieldForm = this.addDropDown(field)
        break;
      case 'checkbox': 
        fieldForm = this.addCheckBox(field)
        break;
      case 'radio': 
        fieldForm = this.addRadioBox(field)
        break;
      case 'textarea':
        fieldForm = this.addTextArea(field)
        break;
      default:
        fieldForm = this.addTextBox(field)
        break;
    }

    return fieldForm;
  }

  getFormFields(inputs: FormField<string>[]) {
    return of(inputs.sort((a, b) => a.order - b.order))
  }

  // buildingJsonFile(inputs: FormField<string>[]) {
  //   fs.writeFileSync('data.json', JSON.stringify(inputs.toString, null, 4));
  // }

  toFormGroup( inputs: FormField<string>[] | null): FormGroup {
    const group: any = {};

    inputs?.forEach(input => {
      let validator: ValidatorFn[] = input.required ? [Validators.required]: [];

      switch(input.validator) {
        case 'email':
          validator.push(Validators.email);
          break;
        default:
          break;
      }
      group[input.key] = validator.length > 0 ? new FormControl(input.value || '', validator)
                                              : new FormControl(input.value || '');
    });
    return new FormGroup(group);
  }

 
}
