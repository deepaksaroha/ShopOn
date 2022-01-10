function initiatePayment(paymentHandlers, onOrderCreateFailure) {
    fetch('/api/orders', {
        method: 'POST'
    })
    .then(res => res.json())
    .then(res => {
        const options = {
            key: process.env.REACT_APP_RZP_KEY_ID,
            amount: res.amount,
            currency: res.currency,
            order_id: res.rzpOrderId,
            name: 'Shopon',
            image: '/images/payments.svg',
            description: 'Orders',
            theme: {
                color: '#276ef1',
            },
            modal: {
                ondismiss: paymentHandlers.onDismiss || (() => {}),
                escape: false,
            },
            handler: response => {
                paymentHandlers.onSuccess &&
                    paymentHandlers.onSuccess({
                        ...response,
                        id: res.orderId,
                        amount: res.amount,
                        currency: res.currency,
                    });
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    },
    err => {
        onOrderCreateFailure && onOrderCreateFailure(err);
    });
}

export { initiatePayment };