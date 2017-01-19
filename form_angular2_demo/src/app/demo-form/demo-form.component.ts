import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.css']
})
export class DemoFormComponent implements OnInit {

  myForm: FormGroup;
  submitted: boolean;
  name: string

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      name: ["", Validators.required],
      password: ["", Validators.compose([
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(8)
      ])],
      username: ["", Validators.compose([
        Validators.required,
        hasNumber
      ])]
    })
    this.submitted = false
  }


  onSubmit(formObj): any {
    this.submitted = true
    if (!this.myForm.valid) {
      return false
    }
    console.log("The value of of form is:", formObj)
  }
  ngOnInit() {
  }

}


function hasNumber(control: FormControl): { [s: string]: boolean } {
  if (!control.value.split("").some((l) => Number(l))) {
    return { noNumber: true }
  }
}
