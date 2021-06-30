import api from './api'

export interface UserData {
  id: string
  name?: string
  avatar?: string
  email: string
  password?: string
  badge?: string
  // isConfirmed?: boolean
  emailToken?: string
  role?: string
  warnings?: string
}
export interface SitesData {
  id: string
  Name: string
  Url: string
  XPath: string
  ImgXPath: string
  NameXPath: string
  PriceXPath: string
  // isConfirmed?: boolean

}
export interface Product {
  title: string
  name: string
  price: number
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

// export interface ReportsResponse {
//   data: Reports[]
// }

interface User {
  name: string;
  avatar: string;
  id: string;
}

interface Comments {
  id: String;
  text: string;
  _created_at: string;
  suggestion_id: Int16Array;
  user_id: Int16Array;
  user: User;
}

export interface listAllSuggestions {
  id: Int16Array;
  text: string;
  likes: Int16Array;
  shares: Int16Array;
  views: Int16Array;
  comments: Comments[];
  user_id: Int16Array;
  _created_at: string;
  user: User;
}

export interface listAllSuggestionsReponse {
  data: listAllSuggestions[];
}

interface newsResponse {
  id: string;
  ProductName: string;
  _created_at: string;
  _next_email: string;
  _sended_at: string;
  website_id: string;
  schedule_id: string;
}
interface codeResponse {
  message: string,
  error?: string
}

export interface listNewsByUserId {
  data: newsResponse[];
}

export interface sendCodeResponse {
  data: codeResponse[];
}


export interface Categories {
  id: Int16Array;
  name: String;
  queryString?: String;
  website_id?: String;
}
export interface CategoriesResponse {
  data: Categories[];
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
export function deleteUser(params: object): Promise<Response> {
  return api.delete('/users', {data: params})
}
export function changePassword(params: object): Promise<Response> {
  return api.put('/updatePassword', params)
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
  console.log(params)
  return api.put('/reports', params)
}
export function deleteReport(params: object): Promise<ReportsResponse> {
  return api.delete('/reports', {data: params})
}
export function indexSuggestions(): Promise<listAllSuggestionsReponse> {
  return api.get('/allSuggestions')
}
export function newSuggestion(params: object): Promise<listAllSuggestionsReponse> {
  return api.post('/suggestions', params)
}
export function getCategories(params: object): Promise<CategoriesResponse> {
  return api.post('/siteCategories', params)
}

export function deleteSuggestion(params: object): Promise<SuggestionsResponse> {
  return api.delete('/suggestions', {data: params})
}
export function newComment(params: object): Promise<SuggestionsResponse> {
  return api.post('/comments', params)
}
export function listUsers(): Promise<UserData> {
  return api.get('/users')
}
export function listSites(): Promise<SitesData> {
  return api.get('/websites')
}
export function indexSiteById(params: object): Promise<SitesData> {

  return api.post('/indexWebsites', params)
}
export function updateWebsite(params: object): Promise<SitesData> {

  return api.put('/websites', params)
}
export function indexNewsByUserId(params: object): Promise<listNewsByUserId> {

  return api.post('/indexNewsLetter', params)
}
export function newNewsLetter(params: object): Promise<listNewsByUserId> {

  return api.post('/newsletter', params)
}

export function passwordToken(params: object): Promise<sendCodeResponse> {
  return api.post('/passwordToken', params)
}
export function updatePassword(params: object): Promise<sendCodeResponse> {
  return api.put('/changePassword', params)
} 
export function search(params: object): Promise<UserData> {
  return api.post('/search', params)
}
