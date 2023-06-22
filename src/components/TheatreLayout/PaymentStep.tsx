import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    TextInput,
    Button,
    Notification,
    Loader,
} from '@mantine/core';
import { FaCheck, FaCreditCard, FaCalendarAlt, FaLock, FaUser } from 'react-icons/fa';
import { notifications } from '@mantine/notifications';
import { Dispatch, SetStateAction } from 'react';

interface CheckoutPageInterface {
    clearStep: Dispatch<SetStateAction<boolean>>;
}

export default function CheckoutPage({ clearStep }: CheckoutPageInterface) {
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');

    const handlePayment = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);

        // Simulating payment processing
        setTimeout(() => {
            setLoading(false);
            setPaymentSuccess(true);
        }, 2000);
    };

    const resetForm = () => {
        setCardNumber('');
        setExpirationDate('');
        setCvv('');
        setNameOnCard('');
        setPaymentSuccess(false);
    };

    useEffect(() => {
        if (paymentSuccess) {
            notifications.show({
                title: 'Payment Successful',
                message: 'Thank you for your payment!',
                color: 'teal',
                icon: <FaCheck />,
            });
            resetForm();
            clearStep(true);
        }
    }, [paymentSuccess]);

    return (
        <Container size="sm" style={{ marginTop: '2rem' }}>
            <Paper p="lg" shadow="sm">
                <h2 style={{ marginBottom: '1.5rem' }}>Payment Checkout</h2>
                {paymentSuccess ? (
                    <Notification
                        title="Payment Successful"
                        color="teal"
                        // shadow="md"
                        style={{ marginBottom: '1.5rem' }}
                    >
                        Thank you for your payment! <FaCheck />
                    </Notification>
                ) : (
                    <form onSubmit={handlePayment}>
                        <TextInput
                            label="Card Number"
                            placeholder="Enter your card number"
                            required
                            icon={<FaCreditCard />}
                            value={cardNumber}
                            onChange={(event) => setCardNumber(event.currentTarget.value)}
                        />
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                            <TextInput
                                label="Expiration Date"
                                placeholder="MM/YY"
                                required
                                icon={<FaCalendarAlt />}
                                value={expirationDate}
                                onChange={(event) =>
                                    setExpirationDate(event.currentTarget.value)
                                }
                            />
                            <TextInput
                                label="CVV"
                                placeholder="123"
                                required
                                icon={<FaLock />}
                                value={cvv}
                                onChange={(event) => setCvv(event.currentTarget.value)}
                            />
                        </div>
                        <TextInput
                            label="Name on Card"
                            placeholder="Enter the name on card"
                            required
                            icon={<FaUser />}
                            value={nameOnCard}
                            onChange={(event) => setNameOnCard(event.currentTarget.value)}
                        />
                        <Button
                            type="submit"
                            variant="gradient"
                            color="blue"
                            fullWidth
                            style={{ marginTop: '1.5rem' }}
                            disabled={loading}
                        >
                            {loading ? <Loader /> : 'Pay Now'}
                        </Button>
                    </form>
                )}
            </Paper>
            {/* {paymentSuccess && (
                <Button
                    variant="outline"
                    color="blue"
                    fullWidth
                    style={{ marginTop: '1rem' }}
                    onClick={resetForm}
                >
                    <Text align="center">Make Another Payment</Text>
                </Button>
            )} */}
        </Container>
    );
};