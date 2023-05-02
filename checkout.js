import { loadStripe } from "@stripe/stripe-js";

export async function checkout({lineItems}){
	let stripePromise = null

	const getStripe = () => {
		if(!stripePromise) {
			stripePromise = loadStripe('pk_test_51N3ESASJXPT5qMTQK3SxX0eoXwHosqiPLjgoKXmU2Mo5cIqvHOARIMJTVqz56JlHajTODQTWnaA0zTgnzdZYbW2X00LvtbLXVL')
		}
		return stripePromise
	}

	const stripe = await getStripe()

	await stripe.redirectToCheckout({
		mode: 'payment',
		lineItems,
		successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
		cancelUrl: window.location.origin
	})

}
