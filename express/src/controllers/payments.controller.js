import config from "../config/config.js"
import Stripe from "stripe"

const stripe = new Stripe(config.stripeKey)
export const createSession = async (req, res) => {
	try {
		const { totalAmount } = req.params
		const totalStripeAmount = totalAmount*100
	
		const stripeSession = await stripe.checkout.sessions.create({
			line_items:[
				{
					price_data:{
						product_data:{
							name: "eCommerce Total",
							description: "eCommerce Bill"
						},
						currency: "usd",
						unit_amount: totalStripeAmount
					},
					quantity: 1
				}
			],
			mode: "payment",
			success_url: `${config.url}/products`,
			cancel_url: `${config.url}/products`
		})
		return res.json(stripeSession)
		
	} catch (error) {
		return res.status(500).json({status: "fail", message: error})		
	}
}

/* http://localhost:${config.port} */