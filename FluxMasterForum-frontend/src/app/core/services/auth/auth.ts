import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Injectable({providedIn: "root"})

export class Auth {
  private api = "http://localhost:8000/api";
  constructor (private http: HttpClient) {}

  /**
   * Log in to the account
   * @param username
   * @param password
   */
  login(username: string, password: string) {
    return this.http.post<{access: string, refresh: string}>(`${this.api}/sign-in/`, {username, password})
      .pipe(tap(res=>localStorage.setItem("token", res.access)));
  }

  /**
   * Log out from the account
   */
  logout() {
    localStorage.removeItem("token");
    return this.http.post(`${this.api}/sign-out/`, {})
  }

  /**
   * Check is logged in
   */
  isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  /**
   * Register a new account
   * @param email
   * @param username
   * @param password
   */
  register(email: string, username: string, password: string) {
    return this.http.post<{access: string, refresh: string}>(`${this.api}/sign-up/`, {email, username, password})
      .pipe(tap(res=>localStorage.setItem("token", res.access)));
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
