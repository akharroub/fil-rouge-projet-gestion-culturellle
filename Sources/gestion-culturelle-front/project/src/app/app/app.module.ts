import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { NavebarComponent } from './navebar/navebar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { TypeSalleModule } from './../modules/typesalle/typesalle.module';
import { RoleModule } from './../modules/role/role.module';
import { SalleModule } from './../modules/salle/salle.module';
import { LoginModule } from './../modules/login/login.module';
import { ManifestationModule } from './../modules/manifestation/manifestation.module';
import { AnimationModule } from './../modules/animation/animation.module';
import { PanierModule } from './../modules/panier/panier.module';
import { UserModule } from './../modules/user/user.module';
import { AuthInterceptor } from './../security/auth.interceptor';
import { ProfilModule } from './../modules/profil/profil.module';
import { InscriptionModule } from './../modules/inscription/inscription.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { InvitationModule } from './../modules/invitation/invitation.module';
import { ReservationModule } from './../modules/reservation/reservation.module';

@NgModule({
  declarations: [
    AppComponent,
    NavebarComponent,
    FooterComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TypeSalleModule,
    RoleModule,
    SalleModule,
    LoginModule,
    ManifestationModule, 
    AnimationModule, 
    PanierModule, 
    UserModule,
    ProfilModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        // pour injecter le token dans toutes les requetes
        tokenGetter: function  tokenGetter() {
          return localStorage.getItem('access_token');
        },
        // injecte le token pour tous ces chemins
        whitelistedDomains: ['localhost:8080'],
        // n'injecte pas le token pour ce chemin
        blacklistedRoutes: ['http://localhost:8080/public/login']
      }
    }),
    InscriptionModule,
    InvitationModule,
    ReservationModule,
   
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
