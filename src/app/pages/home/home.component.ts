import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from 'src/app/shared/model/form-field';
import { BuilderFormService } from 'src/app/shared/services/builder-form.service';
import { Observable } from 'rxjs';
import { FormfieldControlService } from '../../shared/services/formfield-control.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FormfieldControlService]
})
export class HomeComponent implements OnInit {

  options: string[];
  form: FormGroup;
  buildedForm: FormGroup = new FormGroup({})
  inputs: FormField<string>[] = []
  payload: string = ''
  formFields: Observable<FormField<string>[]>;
  
  constructor(private formBuilder: FormBuilder,
    private service: FormfieldControlService,
    private apiService: ApiService,
    private builderForm: BuilderFormService) { 
    this.options = ['text', 
      'password','checkbox', 
      'radio', 'textarea', 
      'number','date', 
      'select', 'email'
    ]
    this.form = formBuilder.group(
      {
        input: ['text', Validators.required],
        label: ['', Validators.required],
        value: [''],
      }
    )

    this.formFields = this.builderForm.getFormFields(this.inputs);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const value = this.builderForm.addFrormField(this.form.value)
    if(!this.inputs.includes(value)) {
      this.inputs.push(value)
      this.formFields = this.builderForm.getFormFields(this.inputs);
      this.apiService.createField(value)
        .subscribe({
          next: (res) => console.log(res),
          error: (err: HttpErrorResponse) => console.log(err.error)
        })
    }
    
  }

  convertToJson() {
    this.payload = JSON.parse(JSON.stringify(this.inputs, null, 4))
  }

}
