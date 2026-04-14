import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategoryModel } from "../../../models/category.model";

@Injectable({ providedIn: "root" })

export class Category {
  private api = "http://localhost:8000/api";
  constructor(private http: HttpClient) {}

  /**
   * Get a category by id
   * @group
   * CategoryDetailView
   * @param id
   */
  get(id: number) {
    return this.http.get<CategoryModel>(`${this.api}/categories/${id}/`);
  }

  /**
   * Get all categories
   * @group
   * CategoryListView
   */
  getAll() {
    return this.http.get<CategoryModel[]>(`http://localhost:8000/api/categories/`);
  }

  //create() {}
}
