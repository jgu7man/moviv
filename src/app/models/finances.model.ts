import firebase from 'firebase/app'

export interface iEventFinances {
  unit_price: number,
  unit_cant: number,
  addons: number[],
  subtotal: number,
  discount: number,
  iva: number,
  total: number,
  payments: iEventPayment[],
}

export interface iEventPayment {
  date: Date | firebase.firestore.Timestamp
  amount: number,
}

export interface iMemebershipPayment extends MembershipPayModel {
  date: firebase.firestore.Timestamp,
  ends: firebase.firestore.Timestamp
}
export class MembershipPayModel {
  date: Date | firebase.firestore.Timestamp
  ends: Date | firebase.firestore.Timestamp
  amount: number
  constructor (
    amount?: number,
  ) {
    this.date = new Date()
    let year = this.date.getFullYear()
    let month = this.date.getMonth()
    let day = this.date.getDate()
    this.ends = new Date(year, month, day + 30)
    this.amount = amount || 0
  }
}

export interface iCommissionPayment extends CommissionPaymentModel{
  date: firebase.firestore.Timestamp
}
export class CommissionPaymentModel {
  date: Date | firebase.firestore.Timestamp
  app_tax: number
  gob_tax: number
  rest: number
  collected: boolean

  constructor(
    public amount: number
  ) {
    this.date = new Date()
    this.gob_tax = amount * .16
    this.app_tax = amount * .10
    this.rest = this.amount - ( this.gob_tax + this.app_tax )
    this.collected = false
  }
}
