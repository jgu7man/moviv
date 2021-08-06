import firebase from 'firebase/app'
import { iUploadedFile } from '@marxa/storage'

export interface iPost {
  date: firebase.firestore.Timestamp
}
export class PostModel {
  date: Date | firebase.firestore.Timestamp
  constructor(
    public description: string,
    public type: PostType,
    public galerie: iUploadedFile[]
  ) {
    this.date = new Date()
  }
}

export type PostType = 'event' | 'galerie' | 'video'
export interface iEventPost extends PostModel {
  name: string,
  starts: Date | firebase.firestore.Timestamp,
  isPublic: boolean,
}
