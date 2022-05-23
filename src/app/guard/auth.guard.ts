import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable} from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService ) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | boolean|UrlTree{

      if (localStorage.getItem('token'))  {
        const token = localStorage.getItem('token');

        return this.authService.checkToken(token).pipe(
          map(result => {
            if(result){
              return true;
            } else {
              alert('You are not allowed to view this page');
              this.router.navigate(['login']);
              return false;
            }
          })
        )
      }
      
      return true;
  }
      
}