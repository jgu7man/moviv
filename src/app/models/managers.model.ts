import firebase from 'firebase/app'

export class ManagerModel {
  registered: Date | firebase.firestore.Timestamp;
  constructor(
    public celular: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public uid: string,
  ) {
    this.celular = `+52${this.celular}`
    this.registered = new Date()
  }
}

export interface iManagerRegistration {
  celular: string,
  first_name: string,
  last_name: string,
  email: string,
}
export interface iManager extends ManagerModel{}
