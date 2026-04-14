import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PostModel } from "../../../models/post.model";

@Injectable({ providedIn: "root" })

export class Post {
  private api = "http://localhost:8000/api/";
  constructor(private http: HttpClient) {}

  /**
   * Get posts from a thread
   * @param thread_id
   */
  get(thread_id: number) {
    return this.http.get<PostModel[]>(`${this.api}/threads/${thread_id}/posts/`);
  }

  /**
   * Create a new post
   * @param content
   * @param thread_id
   */
  create(content: string, thread_id: number) {
    return this.http.post<PostModel>(`${this.api}/posts/`, {content, thread_id});
  }

  /**
   * Update an existing post
   * @param id
   * @param content
   */
  update(id: number, content: string) {
    return this.http.put<PostModel>(`${this.api}/posts/${id}/`, {content});
  }

  /**
   * Delete an existing post
   * @param id
   */
  delete(id: number) {
    return this.http.delete<PostModel>(`${this.api}/posts/${id}/`);
  }
}
