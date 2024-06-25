// const stripe_secret_key =
//   "sk_test_51PU8J4SDoT5YA6SzEbNTjILXn1mx4WLFbDurt8TucuGoQ1doTyaHVMC5PZmGWJLLCNBrk8obSMojZUtkZUyMB3Kf00DcUJQE83";
  
async function paymentSession(req, res) {
  const { currency, price, title, stripe_secret_key, payment_mode, interval, interval_count, current_url } = req.body;
  const stripe = require("stripe")(stripe_secret_key);

  let options;

  if(payment_mode === 'subscription'){
    options = {
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: title,
            },
            recurring: {
              interval: interval,
              interval_count: interval_count,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
    }
  }
  else {
    options = {
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: title,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
    }
  }

  options.success_url = `${current_url}?payment_status=success`
  options.cancel_url = `${current_url}?payment_status=cancel`
  options.billing_address_collection = 'required';

  const session = await stripe.checkout.sessions.create(options);

  res.json({ id: session.id });
}

module.exports = { paymentSession };
