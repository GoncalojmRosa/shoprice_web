import api from './api'

export interface UserData {
  id?: string
  name?: string
  avatar?: string
  email: string
  password: string
  badge?: string
  isConfirmed?: boolean
  emailToken?: string
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
export function getProfile(params: object): Promise<Response> {
  return api.get('/profile', params)
}
export function updateProfile(params: object): Promise<Response> {
  return api.get('/profile', params)
}
