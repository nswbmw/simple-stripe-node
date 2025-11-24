## simple-stripe-node

Simple Stripe SDK for Node.js.

### Install

```sh
$ npm i simple-stripe-node --save
```

### Example

```js
import Stripe from 'simple-stripe-node'

const stripeClient = new Stripe('sk_test_xxx')

;(async () => {
  const res = await stripeClient.execute({
    method: 'POST',
    url: '/v1/payment_intents',
    body: {
      amount: 999,
      currency: 'usd'
    }
  })

  /*
  {
    id: 'pi_3SWsqXBISeBNSdI60GJKjihB',
    object: 'payment_intent',
    amount: 999,
    amount_capturable: 0,
    amount_details: { tip: {} },
    amount_received: 0,
    application: null,
    application_fee_amount: null,
    automatic_payment_methods: { allow_redirects: 'always', enabled: true },
    canceled_at: null,
    cancellation_reason: null,
    capture_method: 'automatic_async',
    client_secret: 'pi_3SWsqXBISeBNSdI60GJKjihB_secret_RuySbHlbLkqjH1TcDfKpusgzl',
    confirmation_method: 'automatic',
    created: 1763964117,
    currency: 'usd',
    customer: null,
    description: null,
    excluded_payment_method_types: null,
    last_payment_error: null,
    latest_charge: null,
    livemode: false,
    metadata: {},
    next_action: null,
    on_behalf_of: null,
    payment_method: null,
    payment_method_configuration_details: { id: 'pmc_1MRAP8BISeBNSdI6AdP48BJw', parent: null },
    payment_method_options: {
      card: {
        installments: [Object],
        mandate_options: null,
        network: null,
        request_three_d_secure: 'automatic'
      },
      link: { persistent_token: null }
    },
    payment_method_types: [ 'card', 'link' ],
    processing: null,
    receipt_email: null,
    review: null,
    setup_future_usage: null,
    shipping: null,
    source: null,
    statement_descriptor: null,
    statement_descriptor_suffix: null,
    status: 'requires_payment_method',
    transfer_data: null,
    transfer_group: null
  }
  */
  console.log(res)
})().catch(console.error)
```
