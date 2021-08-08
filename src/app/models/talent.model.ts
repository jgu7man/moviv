import { iUploadedFile } from "@marxa/storage";
import firebase from 'firebase/app'
import { iUbication } from "./ubication.model";

export class TalentModel {
  registered: Date | firebase.firestore.Timestamp
  managers: string[]
  genres: string[]
  categories: string[]
  features: FeatureTalent[]
  state: TalentState
  contracts: number
  followers: number
  constructor (
    manager: string,
    public name: string,
    public logo: iUploadedFile,
    public description: string,
  ) {
    this.managers = [manager]
    this.registered = new Date();
    this.genres = [];
    this.categories = [];
    this.features = [];
    this.state = 'unavalible'
    this.contracts = 0
    this.followers = 0
  }
}

export interface iIndentityTalent {
  name: string,
  logo: iUploadedFile,
  description: string,
}


export interface iIntegrantTalent {
  name: string,
  roll?: string,
  picture?:iUploadedFile,
}

export type FeatureTalent = 'streo' | 'uniform' | 'lighting' | 'stage' | 'decor' | 'dancefloor'

export type ReferralTalent = 'spotify' | 'youtube'
export interface iReferralTalent {
  reference: ReferralTalent,
  link: string,
}

export type TalentState = 'reservations' | 'express' | 'unavalible'

export interface iTalent extends TalentModel {
  registered: firebase.firestore.Timestamp
  ubication: iUbication,
  genres: string[],
  categories: string[],
  features: FeatureTalent[],
  state: TalentState
  contracts: number,
  followers: number,
  integrants?: iIntegrantTalent[],
  references?: iReferralTalent[],
  busy_until?: Date | firebase.firestore.Timestamp,
}


