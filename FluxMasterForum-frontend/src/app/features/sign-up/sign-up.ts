import {Component, inject} from '@angular/core';
import { FormsModule } from "@angular/forms";
import {Auth} from "../../core/services/auth/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})

export class SignUp {
  protected readonly auth = inject(Auth);
  protected readonly router = inject(Router);

  email:    string = "";
  username: string = "";
  password: string = "";

  onSubmit(email: string, username: string, password: string) {
    this.auth.register(email, username, password)
      .subscribe({
        next: () => this.router.navigate(["/sign-in"]),
        error: err => alert("Произошла ошибка при регистрации")
      });
  }
}
