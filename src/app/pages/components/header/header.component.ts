import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { RoleService } from 'src/app/core/services/role.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user = this.roleService.retornarRole();
  @Input() isLogged: boolean = true;

  constructor(
    private router: Router,
    private UserService: UserService,
    private roleService: RoleService,
  ){}

  logout() {
    this.UserService.logout();
    this.router.navigate(['/login']);
  }
}
