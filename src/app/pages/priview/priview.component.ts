import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormField } from '../../shared/model/form-field';
import { FormfieldControlService } from '../../shared/services/formfield-control.service';


@Component({
  selector: 'app-priview',
  templateUrl: './priview.component.html',
  styleUrls: ['./priview.component.css'],
  providers: [FormfieldControlService]
})
export class PriviewComponent implements OnInit {

  formFields: Observable<FormField<string>[]>;

  constructor(private service: FormfieldControlService) {
    this.formFields = this.service.getFormFields();
  }

  ngOnInit(): void {
    this.formFields = this.service.getFormFields();
  }

}
