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

    if (typeof body === 'string') {
      fetchOptions.body = body
    } else {
      if (body != null) {
        fetchOptions.body = new URLSearchParams(body)
      }
    }

    const response = await fetch(this._getURL(url), fetchOptions)

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Stripe request failed: ${response.status} ${text}`)
    }

    const data = await response.json()
    return data
  }
}

export default Stripe
