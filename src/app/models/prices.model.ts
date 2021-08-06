import { FeatureTalent } from './talent.model';

export interface iPrice extends PriceModel {}
export class PriceModel {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public specifications: FeatureTalent[],
    public hours: number,
    public min_amount: number,
    public isPublic: boolean
  ){}
}

export interface iTalentPack extends PackModel {}
export class PackModel {
  constructor (
    public name: string,
    public description: string,
    public item: {
      service: iPrice[],
      cant: number
    },
    public amount: number,
    public isPublic: boolean
  ){}
}

