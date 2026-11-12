import * as qs from 'qs-esm'

class Stripe {
  constructor (options = {}) {
    if (typeof options === 'string') {
      options = { secretKey: options }
    }

    this.secretKey = options?.secretKey || options?.secret_key || options?.sk
    if (!this.secretKey) {
      throw new TypeError('No secretKey')
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
    const fetchOptions = {
      method,
      headers: Object.assign({
        Authorization: `Bearer ${this.secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }, headers)
    }

    if (body instanceof FormData) {
      // fetch sets the Content-Type with boundary automatically
      fetchOptions.body = body
      delete fetchOptions.headers['Content-Type']
      delete fetchOptions.headers['content-type']
    } else if (typeof body === 'string') {
      fetchOptions.body = body
    } else if (body != null) {
      fetchOptions.body = qs.stringify(body)
    }

    const response = await fetch(this._getURL(url), fetchOptions)
    const text = await response.text()

    try {
      return JSON.parse(text)
    } catch (e) {
      return text
    }
  }
}

export default Stripe
