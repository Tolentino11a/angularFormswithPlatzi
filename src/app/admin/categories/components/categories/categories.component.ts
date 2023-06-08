import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public data$: Observable<Category>;
  constructor(private categoriesService: CategoryService) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.data$ = this.categoriesService.getAll()
  }

}
