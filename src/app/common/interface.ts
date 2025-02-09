  
  export interface ApiCosmeticos {
    cosmeticos: Pagination
  }
  
  export interface Info {
    total: number
    pages: number
  }
  
  export interface Cosmetico {
  cosmeticos: any
    _id: string
    name: string
    image: string
    type: string
    brand: string
    price: number
  }

  export interface Pagination {
    info: Info
    cosmeticos: Cosmetico[]
  }

  export interface allCosmetics {
    cosmeticos: Cosmetico[]
  }