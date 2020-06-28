import { Component, OnInit, ɵɵsanitizeUrlOrResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../security/auth.service';
import { RoleDto } from '../../model/roleDto';
import { PanierDto } from '../../model/panierDto';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';
import { ToastrService } from 'ngx-toastr';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { PanierService } from '../../service/panier.service';

@Component({
  selector: 'app-navebar',
  templateUrl: './navebar.component.html',
  styleUrls: ['./navebar.component.css']
})
export class NavebarComponent implements OnInit {
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  isConnected: boolean;
  isResp: boolean;
  isClient: boolean;
  isVip: boolean;
  isAnim: boolean;
  isAdmin: boolean;
  isRespAdmin: boolean;
  isVipAdmin: boolean;
  isRespAdminVip: boolean;
  user: String;
  userDto: User;
  role: RoleDto;
  panierDto: PanierDto;
  userCourant: User;

  constructor(private router: Router, private userService: UserService,
    private authService: AuthService, private panierService: PanierService,
    private toastrService: ToastrService,
  ) { this.panierDto = new PanierDto() }

  ngOnInit() {
    this.reload();
    this.authService.subjectConnexion.subscribe(
      res => {
        this.isConnected = this.authService.isConnected();

        if (res == 0) {
          this.isResp = false;
          this.isClient = false;
          this.isVip = false;
          this.isAnim = false;
          this.isAdmin = false;
          this.isRespAdmin = false;
          this.isVipAdmin = false;
          this.isRespAdminVip = false;
          this.user = '';
          this.role = null;
        } else {
          this.reload();
        }
      }
    );
  }

  reload() {
    this.isConnected = this.authService.isConnected();

    if (this.authService.getCurrentUser()) {
      const userCourant = this.authService.getCurrentUser();
      this.isResp = userCourant.role.label === 'RESP';
      this.isClient = userCourant.role.label === 'CLIENT';
      this.isVip = userCourant.role.label === 'VIP';
      this.isAnim = userCourant.role.label === 'ANIM';
      this.isAdmin = userCourant.role.label === 'ADMIN';
      this.isRespAdmin = (userCourant.role.label === 'RESP') || (userCourant.role.label === 'ADMIN');
      this.isVipAdmin = (userCourant.role.label === 'VIP') || (userCourant.role.label === 'ADMIN');
      this.isRespAdminVip = (userCourant.role.label === 'RESP') || (userCourant.role.label === 'VIP') || (userCourant.role.label === 'ADMIN');
      this.userDto = userCourant;
      this.user = userCourant.nom;
      this.role = userCourant.role;

      if (this.userDto.role.label === 'CLIENT') {
        this.userService.getOne(this.userDto.id).subscribe(
          res => {
            this.panierDto = res.panier;
          }
        );
      }
      
    }
  }

  logout(): void {
    this.userCourant = this.authService.getCurrentUser();

    if (this.userCourant.role.label === 'CLIENT') {
      this.panierService.getUser(this.userCourant.id).subscribe(
        res => {
          this.panierDto = res;
        }
      )
    }
    this.panierService.deleteArticles(this.panierDto.id).subscribe(
      res => {

      }
    )
    this.toastrService.info('A bientôt ...', 'Deconnexion');
    this.authService.logout();
    this.router.navigateByUrl('/public/login');
    this.isConnected = false;
  }

  redirectToShowPanier(id: number) {
    this.router.navigateByUrl('/panier-show/' + id)
  }
  
  redirectToShowInvitation(id: number) {
    this.router.navigateByUrl('/invitation-show/' + id)
  }

  redirectToAnswerInvitation(id: number) {
    this.router.navigateByUrl('/invitation-answer/' + id)
  }

}
