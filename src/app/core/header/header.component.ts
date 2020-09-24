import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user$: Observable<User>;

  constructor(private userService: UserService, private router: Router) {
    this.user$ = userService.getUser();
  }

  logout() {
    this.userService.logout();

    //rota para login é uma string em branco, rota principal
    this.router.navigate(['']);
  }
}
