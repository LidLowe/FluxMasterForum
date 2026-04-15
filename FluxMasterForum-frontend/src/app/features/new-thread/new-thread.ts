import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {Category} from "../../core/services/category/category";
import {Thread} from "../../core/services/thread/thread";
import {FormsModule} from "@angular/forms";
import {CategoryModel} from "../../models/category.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-thread',
  imports: [FormsModule],
  templateUrl: './new-thread.html',
  styleUrl: './new-thread.css',
})

export class NewThread implements OnInit {
  protected readonly threadService = inject(Thread);
  protected readonly categoryService = inject(Category);
  protected readonly route = inject(Router);
  protected readonly cdr = inject(ChangeDetectorRef);

  title: string = "";
  content: string = "";
  category_id: number = 0;

  categories: CategoryModel[] = [];

  ngOnInit() {
    this.categoryService.getAll()
      .subscribe({
        next: (data) => {
          this.categories = data;
          this.cdr.detectChanges();
        },
        error: err => alert("Произошла ошибка")
      });
  }

  onSubmit(title: string, content: string, category_id: number) {
    this.threadService.create(title, content, category_id)
      .subscribe({
        next: () => this.route.navigate(["/threads"]),
        error: err => alert("Произошла ошибка при создании темы")
      });
  }
}
