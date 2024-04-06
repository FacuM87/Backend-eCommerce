import { Preference } from "mercadopago"
import config from "../config/config.js"
import { client } from "../config/mercadoPago.config.js";

export const getPublicKey = async (req, res) => {
	try {
		const publicKey = JSON.stringify(config.mercadoPagoKey);

		res.status(200).send(publicKey);
	} catch (error) {
		req.logger.fatal("Couldnt get MercadoPago public key");
		res.status(500).json({errorMessage: "Internal Server Error: "+error});
	}
};

export const createOrderMP = async (req, res) => {
	try {
        const { totalAmount } = req.params
		
        const body = {
			items: [
				{
					title: "eCommerce Purchase",
					quantity: 1,
					unit_price: Number(totalAmount),
					currency_id: 'ARS',
				},
			],
			back_urls: {
				success: "/",
				failure: "/",
				pending: "/"
			},
		};

		const preference = new Preference(client);
		const resultPreference = await preference.create({ body });

		res.status(201).json({ id: resultPreference.id });
	} catch (error) {
		req.logger.fatal('It is not possible to create order.');
		res.status(500).json({message:`Internal Server Error: ${error}`});
	}
};
