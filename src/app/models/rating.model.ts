import firebase from 'firebase/app'

export class RatingModel {
  public date: Date | firebase.firestore.Timestamp
  public comment: string
  public beers: number
  constructor(
    public clientId: string,
    beers: number,
    comment: string,
  ) {
    this.date = new Date();
    this.comment = comment || '';
    this.beers = beers || 0;
  }
}

export interface iRating {
  date: firebase.firestore.Timestamp;
}
