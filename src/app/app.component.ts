import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { FormField } from './shared/model/form-field';
import { FormfieldControlService } from './shared/services/formfield-control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FormfieldControlService]
})
export class AppComponent implements OnInit{
  formFields: Observable<FormField<string>[]>;
  routeActived: string = ''

  constructor(private service: FormfieldControlService,
    private router: Router) {
    this.formFields = this.service.getFormFields();
    this.routeActived = this.router.url
  }

  ngOnInit(): void {
    this.formFields = this.service.getFormFields();
  }
}
