import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";
import { RoleService } from "../services/role.service";

@Injectable({
  providedIn: 'root'
})
export class authGuard {

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.userService.estaLogado()) {
      this.router.navigate(['/login']);
      return false;
    }

    const perfil = route.data["perfil"];
    const user = this.roleService.retornarRole();

    console.log("user", user);
    console.log("perfil de acesso", perfil);

    // Verifica se user é definido e se tem a propriedade acesso
    if (user?.includes(perfil) || user?.acesso.includes(perfil)) {
      console.log("autorizado");
      return true;
    } else {
      this.roleService.excluirRole();
      this.userService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
