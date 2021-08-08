import firebase from 'firebase/app'
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MxAlert, MxCache } from '@marxa/devkit';
import { iManagerRegistration, ManagerModel } from 'src/app/models/managers.model';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TalentAuthService {

  recaptchaVerifier!: firebase.auth.RecaptchaVerifier
  phoneAuth?: firebase.auth.ConfirmationResult
  catchVerificationCode$: Subject<string> = new Subject()
  constructor (
    private afAuth: AngularFireAuth,
    private _af: AngularFirestore,
    private _alert: MxAlert,
    private _cache: MxCache,
    private _router: Router,
  ) {
    firebase.auth().useDeviceLanguage()
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response: any) => {
        console.log( response )
      }
    } );
  }

  async login(celular:string) {
    let phoneState = await this.afAuth.signInWithPhoneNumber( celular, this.recaptchaVerifier )

    this.catchVerificationCode$
      .pipe(take(1))
      .subscribe( async ( code ) => {
        let credentials = await phoneState.confirm( code )
        let uid = credentials.user?.uid as string
        let managerDoc = await this._af.doc( `managers/${ uid }` ).ref.get()
        if ( managerDoc.exists ) {
          let manager = managerDoc.data()
          this._cache.updateData('manager', manager )
        } else {
          await this.afAuth.signOut()
          this._alert.request(`
            <p class="center"><b>Usuario no encontrado</b></p>
            <p class="center">Parece que no te has registrado todavía como manager de algún talento. Regístrate ahora</p>
          `, 'html', 'Registrarse', 'Salir del talent' )
            .pipe( take( 1 ) ).subscribe( confirmation => {
              if ( confirmation ) {
                this._router.navigate(['/registro'])
              }
            })
        }
    })
  }


  async onRegist( {celular, ...user}: iManagerRegistration ): Promise<any>{
    let talentCol = await this._af.collection( 'managers').ref
      .where( 'celular', '==', celular ).get()

    if ( talentCol.empty ) {
      let phoneState = await this.afAuth.signInWithPhoneNumber( celular, this.recaptchaVerifier )

      this.catchVerificationCode$
        .pipe(take(1))
        .subscribe( async ( code ) => {
          let credentials = await phoneState.confirm( code )
          let uid = credentials.user?.uid as string
          let {first_name, last_name, email} = user
          let manager = new ManagerModel(celular, first_name, last_name, email, uid)
          await this._af.collection( `managers` )
            .doc( uid )
            .set( { ...manager } )
          this._alert.notify( 'Manager registrado' )
          this._cache.updateData('manager', manager )
      })
    } else {
      throw this._alert.request( `
        <p><b>Celular duplicado</b></p>
        <p>El número de celular ${celular} ya se encuentra registrado. Tal vez quieras iniciar sesión</p>
      `, 'html', 'Iniciar sesión', 'Cancelar' )
        .pipe( take( 1 ) ).subscribe( confirm => {
          if ( confirm ) {
            this._router.navigate(['/login']);
          }
      })
    }

  }
}
