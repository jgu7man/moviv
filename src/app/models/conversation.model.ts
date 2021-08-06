import { iUploadedFile } from '@marxa/storage'
import firebase from 'firebase/app'

export interface iConversation extends ConversationModel{
  readonly clientId: string
}
export class ConversationModel {
  chat: iInter[]
  constructor(
    public clientId: string,
  ) {
    this.chat = []
  }
}

export interface iInter {
  message: string | iUploadedFile,
  author: 'me' | 'they',
  datetime: Date | firebase.firestore.Timestamp
}
