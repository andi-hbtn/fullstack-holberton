import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import Checkout from "../components/Checkout";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutWrapper = () => {
    return (
        <Elements stripe={stripePromise}>
            <Checkout />
        </Elements>
    )
}

export default CheckoutWrapper;