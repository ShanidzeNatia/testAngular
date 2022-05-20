import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../interface/user-data.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{
  public sidebarMinimized = false;
  public navItems = navItems;
  public user: UserData;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.checkToken(localStorage.getItem('token')).subscribe(data => {
      this.user = data;
      console.log(data);
    })
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
