import firebase from 'firebase/app'
import { iUbication } from './ubication.model';

export class ClientModel {
  registered: Date | firebase.firestore.Timestamp
  uid: string
  email: string
  profile_image: string
  genres: string[]
  categories: string[]
  follow: string[]

  constructor(
    user: firebase.User,
    public nombre: string,
    public telephone: string,
    public address: iUbication,
  ) {
    this.registered = new Date()
    this.uid = user.uid
    this.email = user.email || ''
    this.profile_image = user.photoURL || ''
    this.genres = []
    this.categories = []
    this.follow = []
  }
}

export interface iClient extends ClientModel {
}
