import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { SallefyAPIService } from '../services/sallefy-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{
  constructor(public auth: SallefyAPIService){
  
  }

  canActivate(): boolean{
    return this.auth.isAuthenticated();
  }

}
