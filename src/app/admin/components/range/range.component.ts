import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MyValidators } from '../../../utils/validators'


@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {
   form: FormGroup;
  

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
   }

  ngOnInit(): void {
  }
  private buildForm(){
    this.form = this.formBuilder.group({
      min: ['',Validators.min(0)],
      max: ['',Validators.max(100)]
    },{
      validators: MyValidators.range(0,100)
    });
  }
  get minField(){
    return this.form.get('min');
  }
  get maxField(){
    return this.form.get('max');
  }
  enviar(event: Event){
    console.log(this.form);
  }

}