import { useEffect, useState } from 'react';
import { Stepper, Button, Group, Text, Card } from '@mantine/core';
import { PerformanceResponse } from 'src/api/performance.api';
import TheatreLayout from './Layout';
import { SnacksList } from './SnacksList';
import CheckoutPage from './PaymentStep';

interface CustomStepperInterface {
    data: Pick<PerformanceResponse, "seatStatus">,
    seatNeeded: number,
}

export default function CustomStepper({ data, seatNeeded }: CustomStepperInterface) {
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => ((stepClear && current < 4) ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const [stepClear, setStepClear] = useState(false);

    useEffect(() => {
        if (stepClear) {
            // setActive((prevStat) => prevStat + 1);
            nextStep();
            setStepClear(false);
        }
    }, [stepClear])

    return (
        <>
            <Stepper active={active} onStepClick={setActive} breakpoint="sm">
                <Stepper.Step label="Select you seats" description="">
                    <TheatreLayout data={data} seatNeeded={seatNeeded} clearStep={setStepClear} />
                    {/* Step 1 content: Create an account */}
                </Stepper.Step>
                <Stepper.Step label="Add any snacks ?" description="">
                    <SnacksList clearStep={setStepClear} />
                </Stepper.Step>
                <Stepper.Step label="Go to payment" description="">
                    <CheckoutPage clearStep={setStepClear} />
                </Stepper.Step>
                <Stepper.Completed>
                    <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 3rem' }}>
                        <Text style={{ fontSize: '1.5rem', textAlign: 'center' }}>You are all set now 🥳! Your tickets will be emailed to you. You can also access to your tickets via dashboard anytime</Text>
                        <Text style={{ margin: '1rem', fontWeight: 'bold' }}>Enjoy your movie !</Text>
                    </Card>
                </Stepper.Completed>
            </Stepper>

            <Group position="center" mt="xl">
                <Button variant="default" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep}>Next step</Button>
            </Group>
        </>
    );
}