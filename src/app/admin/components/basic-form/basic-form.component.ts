import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {
   form: FormGroup;
  
  categories = new FormControl('');
  categoriesList: string[] = ['Tech', 'Fashion', 'TV', 'Smartphone', 'shoes', 'others'];

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
   }

  ngOnInit(): void {
    this.nameField.valueChanges
    .subscribe(value => {
      console.log(value);
    });
    this.form.valueChanges
    .subscribe(value => {
      console.log(value);
    });
  }
  private buildForm(){
    this.form = this.formBuilder.group({
      fullName: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]],
        lastname: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]]
      }),
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      color: ['#FFFFFF', Validators.required],
      date: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      url: ['', Validators.required],
      category: ['', Validators.required],
      tag: ['', Validators.required],
      agree: [false, [Validators.requiredTrue]],
      gender: ['', Validators.required],
      zone: ['', Validators.required]
    });
  }

  getNameValue() {
    console.log(this.nameField.value);
  }

  save(event) {
    if (this.form.valid){
      console.log(this.form.value);
    }else{
      this.form.markAllAsTouched();

    }
  }

  get nameField() {
    return this.form.get('fullName.name');
  }
  get lastField() {
    return this.form.get('fullName.lastname');
  }


  get isNameFieldValid() {
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFieldInvalid() {
    return this.nameField.touched && this.nameField.invalid;
  }
  get isLastNameFieldValid() {
    return this.lastField.touched && this.lastField.valid;
  }

  get isLastNameFieldInvalid() {
    return this.lastField.touched && this.lastField.invalid;
  }
  get isEmailFieldValid() {
    return this.emailField.touched && this.emailField.valid;
  }

  get isEmailFieldInvalid() {
    return this.emailField.touched && this.emailField.invalid;
  }
  get isPhoneFieldValid() {
    return this.phoneField.touched && this.phoneField.valid;
  }

  get isPhoneFieldInvalid() {
    return this.phoneField.touched && this.phoneField.invalid;
  }

  get emailField() {
    return this.form.get('email');
  }

  get phoneField() {
    return this.form.get('phone');
  }

  get colorField() {
    return this.form.get('color');
  }

  get dateField() {
    return this.form.get('date');
  }

  get ageField() {
    return this.form.get('age');
  }

  get categoryField() {
    return this.form.get('category');
  }

  get tagField() {
    return this.form.get('tag');
  }

  get agreeField() {
    return this.form.get('agree');
  }

  get genderField() {
    return this.form.get('gender');
  }

  get zoneField() {
    return this.form.get('zone');
  }

}