import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() isLogged: boolean = true;
  constructor(
    private router: Router,
    private UserService: UserService
  ){}
  logout() {
    this.UserService.logout();
    this.router.navigate(['/login']);
  }
}
