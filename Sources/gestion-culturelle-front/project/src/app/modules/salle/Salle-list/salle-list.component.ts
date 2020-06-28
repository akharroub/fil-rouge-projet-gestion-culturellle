import { Component, OnInit } from '@angular/core';
import { SalleDto } from '../../../model/salleDto';
import { Router } from '@angular/router';
import { SalleService } from '../../../service/salle.service';
import { AuthService } from '../../../security/auth.service';
import { RoleDto } from '../../../model/roleDto';
import { ToastrService } from 'ngx-toastr';
import { faInfoCircle, faEdit, faTrashAlt, faHome, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-salle-list',
  templateUrl: './salle-list.component.html',
  styleUrls: ['./salle-list.component.css']
})
export class SalleListComponent implements OnInit {

  faInfoCircle = faInfoCircle;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faHome = faHome;
  faPlusSquare = faPlusSquare;

  isConnected: boolean;
  salles: SalleDto[];
  isResp: boolean;
  user: String;
  role: RoleDto;
  salle: SalleDto;

  constructor(private salleService: SalleService, private router: Router,
    private authService: AuthService, private toastrService: ToastrService) { }

  ngOnInit() {

    this.isConnected = this.authService.isConnected();
    if (this.authService.getCurrentUser()) {
      this.isResp = this.authService.getCurrentUser().role.label === 'RESP';
      this.user = this.authService.getCurrentUser().nom;
      this.role = this.authService.getCurrentUser().role;
    }

    this.salleService.subjectMiseAJour.subscribe(
      res => {
        this.salleService.getAll().subscribe(
          donnees => {
            this.salles = donnees;
          }
        );
      }
    );

    this.salleService.getAll().subscribe(
      resultat => {
        this.salles = resultat;

      }
    );

    this.authService.subjectConnexion.subscribe(
      res => {
        this.isConnected = this.authService.isConnected();

      }
    );

  }

  delete(id: number) {
    this.salle = new SalleDto();
    this.salleService.getOne(id).subscribe(
      res => {
        this.salle = res;
      }
    );

    this.salleService.delete(id).subscribe(
      res => {
        if (res) {
          this.toastrService.success(this.salle.label + ' effacée.', 'Suppression Ok.')
        } else {
          this.toastrService.error(this.salle.label + ' est associée à une manifestation', 'Suppression impossible')
        }
        this.salleService.subjectMiseAJour.next(0);
      }
    );
  }

  redirectToUpdate(id: number) {
    this.router.navigateByUrl('/salle-update/' + id)
  }


  redirectToShow(id: number) {
    this.router.navigateByUrl('/salle-show/' + id)
  }
}
