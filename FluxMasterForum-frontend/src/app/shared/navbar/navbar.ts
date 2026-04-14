import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Auth} from "../../core/services/auth/auth";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly router = inject(Router);
  protected readonly auth = inject(Auth);

  logout() {
    this.auth.logout();
    this.router.navigate(["/sign-in"]);
  }
}
