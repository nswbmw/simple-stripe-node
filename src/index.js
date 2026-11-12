import request from 'lite-request'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { SocksProxyAgent } from 'socks-proxy-agent'

class Stripe {
  constructor (options = {}) {
    if (typeof options === 'string') {
      options = { secretKey: options }
    }

    this.secretKey = options?.secretKey || options?.secret_key || options?.sk
    if (!this.secretKey) {
      throw new TypeError('No secretKey')
    }

    const proxy = options?.proxy
    if (proxy) {
      if (typeof proxy === 'string') {
        if (proxy.startsWith('http://')) {
          this.agent = new HttpsProxyAgent(proxy)
        } else if (proxy.startsWith('socks://')) {
          this.agent = new SocksProxyAgent(proxy)
        } else {
          throw new Error(`Invalid proxy string: "${proxy}". Expected "http://..." or "socks://..."`)
        }
      } else if (typeof proxy === 'object') {
        if (!['http', 'socks'].includes(proxy.protocol)) {
          throw new TypeError('proxy.protocol must be one of ["http", "socks"]')
        }
        this.agent = (proxy.protocol === 'http')
          ? new HttpsProxyAgent((proxy.username && proxy.password)
            ? `http://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`
            : `http://${proxy.host}:${proxy.port}`
          )
          : new SocksProxyAgent((proxy.username && proxy.password)
            ? `socks://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`
            : `socks://${proxy.host}:${proxy.port}`
          )
      }
    }
  }

  _getURL (url) {
    if (url.startsWith('https://')) {
      // absolute URL passthrough, e.g. https://files.stripe.com/v1/files
      return url
    }
    url = url.replace(/^\//, '')
    return `https://api.stripe.com/${url}`
  }

  async execute ({ method = 'GET', url, headers = {}, body }) {
    method = method.toUpperCase()

    const payload = {
      method,
      url: this._getURL(url),
      headers: Object.assign({
        Authorization: `Bearer ${this.secretKey}`
      }, headers),
      json: true,
      agent: this.agent
    }

    if (body instanceof FormData) {
      payload.body = body
    } else if (body) {
      payload.form = body
    }

    const response = await request(payload)

    return response.data
  }
}

export default Stripe
