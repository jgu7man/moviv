import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MxAlert, MxCache } from '@marxa/devkit';
import { iManager, ManagerModel } from 'src/app/models/managers.model';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import firebase from 'firebase/app'


@Injectable({
  providedIn: 'root'
})
export class TalentAuthService {

  recaptchaVerifier!: firebase.auth.RecaptchaVerifier
  phoneAuth?: firebase.auth.ConfirmationResult
  catchVerificationCode$: Subject<string> = new Subject()
  manager$: Observable<iManager | undefined>
  constructor (
    private afAuth: AngularFireAuth,
    private _af: AngularFirestore,
    private _alert: MxAlert,
    private _cache: MxCache,
    private _router: Router,
  ) {
    // this.afAuth.signOut()
    this.manager$ = this.afAuth.authState.pipe(
      tap(console.log),
      switchMap( user => { return user
        ? this._af.doc<iManager>( `managers/${ user.uid }` ).valueChanges()
        : of( undefined )
        }
      )
    )
  }

  setCaptcha() {
    firebase.auth().useDeviceLanguage()
    return new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response: any) => {
      }
    } )
  }

  async login( celular: string ) {
    let captcha = this.setCaptcha()

    this.afAuth.signInWithPhoneNumber( `+52${ celular }`, captcha )
      .then( phoneState => {
        this.catchVerificationCode$
          .pipe(take(1))
          .subscribe( async ( code ) => {
            let credentials = await phoneState.confirm( code )
            let uid = credentials.user?.uid as string
            let managerDoc = await this._af.doc( `managers/${ uid }` ).ref.get()

            try {
              if ( managerDoc.exists ) {
                let manager = managerDoc.data()
                this._cache.updateData('manager', manager )
              } else {
                await this.afAuth.signOut()
                this._alert.request(`
                  <p class="center white-text"><b>Usuario no encontrado</b></p>
                  <p class="center white-text">Parece que no te has registrado todavía como manager de algún talento. Regístrate ahora</p>
                `, 'html', 'Registrarse', 'Salir del talent' )
                  .pipe( take( 1 ) ).subscribe( confirmation => {
                    if ( confirmation ) {
                      this._router.navigate(['/registro'])
                    }
                  })
              }
            } catch (error) {
              if ('mensaje' in error) {
                this._alert.error(error.message, error)
              } else {
                this._alert.error(`Error en el login`, error)
              }
              return console.error(error)
            }
        })
    })
  }


  async onRegist( {celular, ...user}: ManagerModel ): Promise<any>{
    let talentCol = await this._af.collection( 'managers').ref
      .where( 'celular', '==', celular ).get()

    try {
      if ( talentCol.empty ) {
      const captcha = this.setCaptcha()
      let phoneState = await this.afAuth.signInWithPhoneNumber( celular, captcha )

      this.catchVerificationCode$
        .pipe(take(1))
        .subscribe( async ( code ) => {
          let credentials = await phoneState.confirm( code )
          let uid = credentials.user?.uid as string
          let manager: iManager = { ...user, celular, uid }
          await this._af.collection( `managers` )
            .doc( uid )
            .set(manager)
          this._alert.notify( 'Manager registrado' )
          this._cache.updateData('manager', manager )
      })
    } else {
      this._alert.request( `
        <p><b>Celular duplicado</b></p>
        <p>El número de celular ${celular} ya se encuentra registrado. Tal vez quieras iniciar sesión</p>
      `, 'html', 'Iniciar sesión', 'Cancelar' )
        .pipe( take( 1 ) ).subscribe( confirm => {
          if ( confirm ) {
            this._router.navigate(['/login']);
          }
        } )
        return
    }
    } catch (error) {
      if ( 'mensaje' in error ) {
        this._alert.error( error.message, error )

      } else if ( error.code ) {
        if ( error.code === "auth/argument-error" ) {
          this._alert.error('Error en el captcha. No se reconoce como válido', error)
        }
      } else {
        this._alert.error(`Error en el registro del manager`, error)
      }
      return console.error(error)
    }

  }

  signOut() {
    this.afAuth.signOut()
    this._router.navigate(['/'])
  }
}
