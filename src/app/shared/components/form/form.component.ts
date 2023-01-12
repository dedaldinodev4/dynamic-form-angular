import { Component, Input, OnInit } from '@angular/core';
import { FormField } from '../../model/form-field';
import { FormGroup } from '@angular/forms'
import { FormfieldControlService } from '../../services/formfield-control.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() formFields: FormField<string>[] | null = null;
  form: FormGroup;
  payload = ''
  @Input() preview: boolean = true


  constructor(private formFiledService: FormfieldControlService) { 
    this.form = this.formFiledService.toFormGroup(this.formFields);
  }

  ngOnInit(): void {
    this.form = this.formFiledService.toFormGroup(this.formFields);
  }

  onSubmit() {
    this.payload = JSON.stringify(this.form.getRawValue())
  }

}
