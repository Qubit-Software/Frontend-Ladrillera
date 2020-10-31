import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.auth.authenticated()) {
      return true;
    } else {
      console.log("vamos");
      this.router.navigateByUrl("/home");
    }
  }

}
