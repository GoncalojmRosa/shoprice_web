import api from './api'

export interface UserData {
  id: string
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


export interface Suggestions {
  id: Int16Array
  text: string
  likes: Int16Array
  shares: Int16Array
  views: Int16Array
  comments: []
  user_id: Int16Array
  _created_at: string
  name: string
  avatar: string
}
export interface SuggestionsResponse {
  data: Suggestions[]
}

export interface Reports {
  id: Int16Array
  Title: string
  Status: string
  Summary: string
  Priority: string
  Tags: string
  user_id: Int16Array
  user: string
}
export interface ReportsResponse {
  data: Reports[]
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

export function getSuggestions(params: object): Promise<SuggestionsResponse> {
  return api.post('/userSuggestion', params)
}

export function getReports(): Promise<ReportsResponse> {
  return api.get('/reports')
}
export function newReport(params: object): Promise<ReportsResponse> {
  return api.post('/reports', params)
}
export function updateReport(params: object): Promise<ReportsResponse> {
  return api.put('/reports', params)
}
export function deleteReport(params: object): Promise<ReportsResponse> {
  console.log(params)
  return api.delete('/reports', params)
}
