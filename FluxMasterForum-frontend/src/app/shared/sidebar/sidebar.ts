import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {Category} from "../../core/services/category/category";
import {CategoryModel} from "../../models/category.model";
import {Router} from "@angular/router";
import {Thread} from "../../core/services/thread/thread";
import {ThreadModel} from "../../models/thread.model";

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})

export class Sidebar implements OnInit {
  protected readonly categoryService = inject(Category);
  protected readonly threadService = inject(Thread);
  protected readonly router = inject(Router);
  protected readonly cdr = inject(ChangeDetectorRef)

  categories: CategoryModel[] = [];
  threads: ThreadModel[] = [];

  ngOnInit() {
    console.log("Sidebar onInit initialized")

    this.categoryService.getAll().subscribe({
      next: (data: CategoryModel[]) => {
        this.categories = data as CategoryModel[];
        this.cdr.detectChanges();
      }
    });
  }

  showCategoryThreads(category_id: number) {
    console.log(category_id);
    this.router.navigate([`/threads`], { queryParams: { category_id: category_id } });
  }
}
