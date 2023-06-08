import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form: UntypedFormGroup;
  id: string;
  categories: Category[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getCategories()
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productsService.getProduct(this.id)
      .subscribe(product => {
        this.form.patchValue(product);
        this.categoryIdField.setValue(product?.category.id)
      });
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.updateProduct(this.id, product)
      .subscribe((newProduct) => {
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required,Validators.minLength(4)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      images: [''],
      categoryId: ['',[Validators.required]],
      description: ['', [Validators.required,Validators.minLength(10)]],
    });
  }

  get priceField() {
    return this.form.get('price');
  }
  get titleField() {
    return this.form.get('title');
  }
  get categoryIdField() {
    return this.form.get('categoryId');
  }
  private getCategories(){
    this.categoryService.getAll().subscribe((x:any) =>{
      this.categories = x;
    })
  }

}
