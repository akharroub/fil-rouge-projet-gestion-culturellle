import { Component, OnInit } from '@angular/core';
import { AnimationService } from '../../../service/animation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimationDto } from '../../../model/animationDto';
import { ToastrService } from 'ngx-toastr';
import { faHome, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-animation-update',
  templateUrl: './animation-update.component.html',
  styleUrls: ['./animation-update.component.css']
})
export class AnimationUpdateComponent implements OnInit {

  id: number;
  animation: AnimationDto;
  faHome = faHome;
  faCheckSquare = faCheckSquare;


  constructor(private route: ActivatedRoute, private animationService: AnimationService,
     private router: Router,    private toastrService: ToastrService) { }

  ngOnInit() {
    this.animation = new AnimationDto();

    let id = this.route.snapshot.params['id'];

    this.animationService.getOne(id).subscribe(
      res => {
        this.animation = res;
      }
    );
  }

  update(): void {
    let id = this.route.snapshot.params['id'];
    this.animationService.update(id, this.animation).subscribe(
      res => {
        if (res) {
          this.toastrService.success(this.animation.label+' a été modifiée.','Mise à jour Ok.')
        } else {
          this.toastrService.error(+this.animation.label+' n a pas été modifiée','Mise à jour impossible.')
        }
        this.goHome();
      }
    );
  }

  onSubmit() {
this.update();
  }
  
  goHome() {
    this.router.navigate(['/public/animation-list']);
  }

}

