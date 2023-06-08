import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validator, FormBuilder, Validators, FormGroup} from '@angular/forms'

import { AngularFireStorage } from '@angular/fire/compat/storage'
import { finalize } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { MyValidators } from 'src/app/utils/validators';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup
  isNew: boolean = true;
  @Input()
  set category(data: Category){
    if(data){
      this.isNew = false;
      this.form.patchValue(data);
    }
  }
  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    ) {
    this.buildForm();
   }

  ngOnInit(): void {
    
  }
  private buildForm(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), ]],
      image: ['', [Validators.required ]]
    })
  }
  
  get nameField(){
    return this.form.get('name');
  }
  get imageField(){
    return this.form.get('image');
  }
  save(){
    if(this.form.valid){
      if(this.isNew){
        this.create.emit(this.form.value)
      }else{
        this.update.emit(this.form.value);
      }
    }else{
      this.form.markAllAsTouched();
    }

  }

  uploadFile(event){
    const image = event.target.files[0];
    const name = `${uuidv4()}.png`;
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task.snapshotChanges()
    .pipe(
      finalize(() =>{
        const urlImage$ = ref.getDownloadURL();
        urlImage$.subscribe(url =>{
          console.log(url);
          this.imageField.setValue(url);
        })
      })
    )
    .subscribe()

  }

}

