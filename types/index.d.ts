export type ProxyOptions =
  | string
  | {
      protocol: 'http' | 'socks'
      host: string
      port: number
      username?: string
      password?: string
    }

export type StripeInitOptions =
  | string
  | {
      secretKey: string
      proxy?: ProxyOptions
    }

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD'

export interface ExecuteOptions {
  method?: HttpMethod
  url: string
  headers?: Record<string, string | number | boolean>
  // object: form-encoded body; FormData: multipart/form-data body (file upload, e.g. https://files.stripe.com/v1/files)
  body?: any
}

export default class Stripe {
  constructor (options: StripeInitOptions)
  execute<T = any> (options: ExecuteOptions): Promise<T>
}
