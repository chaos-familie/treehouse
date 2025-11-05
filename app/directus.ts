import { createDirectus, rest, type DirectusFile } from '@directus/sdk'

export const ASSETS_URL = 'https://cms.chaos-familie.de/assets/'
export const Directus = createDirectus('https://cms.chaos-familie.de').with(rest())

export interface DirectusRestError {
  message: string
  errors: { message: string; extensions: { code: string; reason: string } }[]
  response: {
    ok: boolean
    redirected: boolean
    status: number
    urL: string
    statusText: string
  }
}

export interface BlogScheme {
  id: number
  user_created: string
  date_created: string
  user_updated: string
  date_updated: string
  opener_image: string
  title: string
  tags: string[]
  post: string
  is_released: boolean
}

export interface CustomDirectusFile extends DirectusFile {
  blurhash: string
}
