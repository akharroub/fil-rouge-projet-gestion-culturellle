import { Component, OnInit } from '@angular/core';
import { TypeSalleService } from '../../../service/typeSalle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TypeSalleDto } from '../../../model/typeSalleDto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-typesalle-update',
  templateUrl: './typesalle-update.component.html',
  styleUrls: ['./typesalle-update.component.css']
})
export class TypeSalleUpdateComponent implements OnInit {

  id: number;
  typeSalle: TypeSalleDto;

  constructor(private route: ActivatedRoute, private typeSalleService: TypeSalleService,
     private router: Router,  private toastrService: ToastrService) { }

  ngOnInit() {
    this.typeSalle = new TypeSalleDto();

    let id = this.route.snapshot.params['id'];

    this.typeSalleService.getOne(id).subscribe(
      res => {
        this.typeSalle = res;
      }
    );
  }

  update(): void {
    let id = this.route.snapshot.params['id'];
    this.typeSalleService.update(id, this.typeSalle).subscribe(
      res => {
        if (res) {
          this.toastrService.success(this.typeSalle.label+' a été modifié.','Mise à jour Ok.')
        } else {
          this.toastrService.error(+this.typeSalle.label+' n a pas été modifié','Mise à jour impossible.')
        }
        this.goHome();
      }
    );
  }

  onSubmit() {
this.update();
  }
  
  goHome() {
    this.router.navigate(['/typesalle-list']);
  }

}

