import api from './api'

export interface UserData {
  id?: string
  name?: string
  avatar?: string
  email: string
  password?: string
  badge?: string
  isConfirmed?: boolean
  emailToken?: string
}
export interface Product {
  title: string
  name: string
  price: string
  img: string
  url: string
}
export interface ProductsResponse {
  data: Product[]
}

export interface Response {
  data: {
    token: string
    refresh_token: string
    user: UserData
  }
}





export function authenticate(params: object): Promise<Response> {
  return api.post('/authenticate', params)
}

export function register(params: object): Promise<Response> {
  return api.post('/register', params)
}
export function getProfile(params: Object): Promise<Response> {
  return api.post('/profile', params)
}
export function updateProfile(params: object): Promise<Response> {
  return api.put('/profile', params)
}

export function getProducts(params: object): Promise<ProductsResponse> {
  return api.post('/products', params)
}
