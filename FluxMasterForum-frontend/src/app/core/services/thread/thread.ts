import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ThreadModel } from "../../../models/thread.model";
import { CategoryModel } from "../../../models/category.model";

@Injectable({ providedIn: "root" })

export class Thread {
  private api = "http://localhost:8000/api";
  constructor(private http: HttpClient) {}

  /**
   * Retrieve a thread
   * @param id
   */
  get(id: number) {
    return this.http.get<ThreadModel>(`${this.api}/threads/${id}/`);
  }

  /**
   * Get all threads with optional category
   * @param category_id
   */
  getAll(category_id?: number) {
    if (category_id) {
      return this.http.get<ThreadModel[]>(`${this.api}/threads/?category_id=${category_id}`);
    }
    return this.http.get<ThreadModel[]>(`${this.api}/threads/`);
  }

  /**
   * Create a new thread
   * @param title
   * @param content
   * @param category_id
   */
  create(title: string, content: string, category_id: number) {
    return this.http.post<ThreadModel>(`${this.api}/threads/`, {title, content, category_id});
  }

  /**
   * Update an existing thread
   * @param id
   * @param title
   * @param content
   * @param category_id
   */
  update(id: number, title: string, content: string, category_id: number) {
    return this.http.put<ThreadModel>(`${this.api}/threads/${id}/`, {title, content, category_id});
  }

  /**
   * Delete an existing thread
   * @param id
   */
  delete(id: number) {
    return this.http.delete<ThreadModel>(`${this.api}/threads/${id}/`)
  }
}
