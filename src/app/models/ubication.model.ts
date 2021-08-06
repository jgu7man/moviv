export interface iUbication {
  country: string,
  state: string,
  city?: string,
  dept?: string,
  address?: string,
}

export interface iPlace extends iUbication {
  name: string,
  reference?: string,
  coords?: {
    lat: number,
    lang: string,
  }
}
