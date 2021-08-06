import firebase from 'firebase/app'

export class ManagerModel {
  registered: Date | firebase.firestore.Timestamp;
  uid: string;
  constructor(
    public celular: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    user: firebase.User,
  ) {
    this.registered = new Date()
    this.uid = user.uid
  }
}

export interface iManager extends ManagerModel{
  registered: firebase.firestore.Timestamp
}
