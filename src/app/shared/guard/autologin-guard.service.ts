import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AutologinGuard implements CanActivate {

    public exit: boolean;
    public autologin: boolean;

    constructor(
        private router: Router) {

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.exit = (localStorage['exit'] == 'true');
        this.autologin = (localStorage['login'] == 'true');
        if (!this.exit) {
            return false;
        }
        if (this.autologin) {
            this.router.navigate(['/app/tabs/']);
            return false;
        } else {
            return true;
        }
    }
}