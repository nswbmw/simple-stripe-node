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
  body?: any
}

export default class Stripe {
  constructor (options: StripeInitOptions)
  execute<T = any> (options: ExecuteOptions): Promise<T>
}
