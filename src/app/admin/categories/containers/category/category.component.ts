import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Category;

  constructor(
    private categoriesService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      if(params.id){
        this.getCategory(params.id);
      }
    });
  }
  createCategory(data){
    this.categoriesService.create(data).subscribe((x) =>{
      console.log(x);
      this.router.navigate(['./admin/categories']);
    })
  }
  updateCategory(data){
    this.categoriesService.update(this.category.id,data).subscribe((x) =>{
      this.router.navigate(['./admin/categories']);
    })
  }
  private getCategory(id: string){
    this.categoriesService.get(id).subscribe((x) =>{
      this.category = x;
    })
  }

}
