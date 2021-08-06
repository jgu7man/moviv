import firebase from 'firebase/app'
import { iEventFinances, iEventPayment } from './finances.model';
import { PriceModel } from './prices.model';
import { iPlace } from './ubication.model';

export interface iBudget {
  date: firebase.firestore.Timestamp
}
export class BudgetModel {
  date: Date | firebase.firestore.Timestamp
  constructor(
    public clientId: string,
    public event: iEvent,
    public description: string,
  ) {
    this.date = new Date()
  }
}

export interface iContract {
  date: firebase.firestore.Timestamp
}
export class ContractModel {
  date: Date | firebase.firestore.Timestamp;
  constructor(
    public clientId: string,
    public event: iEvent,
    public specifications: string,
    public addons: PriceModel[],
    public billing: EventBilling,
    public finances: iEventFinances
  ) {
    this.date = new Date()
    this.addons = addons || []
    if ( this.addons.length > 0 ) {
      this.finances.addons = this.addons.map(a => a.price)
    }
  }
}

export interface iEvent {
  type: string,
  starts: Date | firebase.firestore.Timestamp,
  ends: Date | firebase.firestore.Timestamp,
  place: iPlace,
}

export type EventBilling = 'byEvent' | 'byHours'


export class EventFinancesModel {
  subtotal: number
  iva: number
  total: number
  payments: iEventPayment[]
  constructor(
    public unit_price: number,
    public unit_cant: number,
    public discount: number,
    fac: boolean,
    advance?: number,
  ) {
    this.subtotal = unit_price * unit_cant;
    this.iva = fac ? ( this.subtotal - this.discount ) * .16 : 0
    this.total = ( this.subtotal + this.iva ) - this.discount
    this.payments = advance ? [{date: new Date(), amount: advance}] : []
  }
}

