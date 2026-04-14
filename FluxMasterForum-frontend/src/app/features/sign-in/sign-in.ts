import { Component, inject } from '@angular/core';
import { Auth } from "../../core/services/auth/auth";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})

export class SignIn {
  protected readonly auth = inject(Auth);
  protected readonly router = inject(Router);

  username: string = "";
  password: string = "";

  onSubmit(username: string, password: string) {
    this.auth.login(username, password)
      .subscribe({
        next: () => this.router.navigate(["/"]),
        error: err => alert("Произошла ошибка при входе")
      });
  }
}
