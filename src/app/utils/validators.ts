import { AbstractControl } from '@angular/forms';
import { CategoryService } from '../core/services/category.service'
import { map } from 'rxjs/operators';

export class MyValidators {

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return {price_invalid: true};
    }
    return null;
  }
  static validPassword(control: AbstractControl){
    const value = control.value;
    if(!cotainsNumber(value)){
      return {invalid_password: true}
    }
    return null;
  }
  static matchPassword(control: AbstractControl){
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if(password === confirmPassword){
      return null;
    }else{
      return {match_password:true};
    }
  }
  
  static range(minRange: number, maxRange){
    return(control: AbstractControl) =>{
      const min = control.get('min').value;
      const max = control.get('max').value;
      if(min === '' && max === ''){return null;}
      if(min <= minRange || max >= maxRange){
        return {range:true};
      }
      return null;
    }
  }
  
  static validateCategory(service: CategoryService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return service.getAll().pipe(
        map((categories: any) => {
          console.log(value);
          console.log(categories);
          // const unAvailable = categories.find((category) => category.name === value);
          // if (unAvailable === undefined) {
          //   return null;
          // }
          // return { not_available: true };
        })
      );
    };
  }


}

function cotainsNumber(value: string){
  return value.split('').find(v => isNumber(v)) !== undefined;
}

function isNumber (value:string){
  return isNaN(parseInt(value,10));
}