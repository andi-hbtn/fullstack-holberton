import axios from "axios";

export const createPaymentIntent = async (amount) => {
    const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}api/order/create-payment-intent`,
        { amount: amount * 100 } // Stripe merr pennies
    );
    if (!data?.clientSecret) {
        throw new Error("Unable to initiate payment. Please try again.");
    }
    return data.clientSecret;
};

export const confirmStripePayment = async (stripe, cardNumberElement, values, clientSecret) => {
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: cardNumberElement,
            billing_details: {
                name: `${values.firstname} ${values.lastname}`,
                email: values.email,
                phone: values.phone,
                address: {
                    line1: values.address,
                    line2: values.appartment,
                    postal_code: values.zipCode,
                    city: values.town,
                    country: values.country.toUpperCase()
                }
            }
        }
    });

    if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
    }

    if (paymentResult.paymentIntent.status !== "succeeded") {
        throw new Error("Payment was not successful. Please try again.");
    }

    return paymentResult.paymentIntent;
};