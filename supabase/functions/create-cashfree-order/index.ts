import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const CASHFREE_APP_ID = Deno.env.get("12611419de3385897f7feded6221411621") 
const CASHFREE_SECRET_KEY = Deno.env.get("cfsk_ma_prod_ca5d63f7c7cf9380cf859854a82f3047_c2b6047e") 

// Use 'https://sandbox.cashfree.com/pg/orders' for testing
// Use 'https://api.cashfree.com/pg/orders' for production
const CASHFREE_ENV_URL = "https://api.cashfree.com/pg/orders"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT, DELETE',
}

serve(async (req) => {
  // Handle CORS for browser preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, order_id, customer_id, customer_phone, customer_email, customer_name, return_url } = await req.json()

    // 1) Make a request to Cashfree API to securely create the payment session order
    const cashfreeRes = await fetch(CASHFREE_ENV_URL, {
      method: 'POST',
      headers: {
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        order_amount: amount,
        order_currency: "INR",
        order_id: order_id,
        customer_details: {
          customer_id: customer_id,
          customer_phone: customer_phone,
          customer_email: customer_email,
          customer_name: customer_name
        },
        order_meta: {
          return_url: return_url || "https://yourwebsite.com/success?order_id={order_id}"
        }
      })
    })

    const cashfreeData = await cashfreeRes.json()

    if (!cashfreeRes.ok) {
      throw new Error(cashfreeData.message || "Failed to create Cashfree order from bank")
    }

    // Return the secret payment session ID back to our React App frontend!
    return new Response(JSON.stringify({
      payment_session_id: cashfreeData.payment_session_id,
      order_id: cashfreeData.order_id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    })
  }
})
