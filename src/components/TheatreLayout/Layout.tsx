import { Button, Card, ScrollArea, Loader, createStyles, rem, Badge, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconHttpDelete } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useState } from "react";
import { PerformanceResponse } from "src/api/performance.api";
import { TheatreResponse, useGetAllTheatre } from "src/api/theatre.api";
import { useMapFilterData } from "src/hooks/useMapData";
// import CustomStepper from "./Stepper";
import useAlgorithm from "src/hooks/useAlgorithm";

const useStyles = createStyles((theme) => {
    return {
        root: {
            // marginTop: '2rem',
            // backgroundColor: 'transparent',
            // border: 1,
            // borderStyle: 'solid',
            // borderColor: 'white'
        },
        label: {
            // color: 'white',
            fontWeight: 'bold',
            marginBottom: '1rem'
        },
        seatGrid: {
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            margin: '0.75rem 0', gap: '0.75rem'

            // gridTemplateRows: 'auto',
            // gridTemplateColumns: "repeat(auto-fill, minmax(1.75rem, 1fr))",
            // gridAutoRows: '1.75rem',
        },
        seat: {
            width: '1.75rem',
            height: '1.75rem',
            fontSize: rem("12px"),
            // backgroundColor: theme.colors.gray[3],
            backgroundColor: theme.colors.teal[2],

            flexShrink: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: "pointer"
        },

        indicator: {
            width: '0.75rem',
            height: '0.75rem',
            borderRadius: '1px',
        },
        availableBg: {
            backgroundColor: theme.colors.teal[3]
        },

        bookedBg: {
            backgroundColor: theme.colors.indigo[3]
        },

        userSelectionBg: {
            backgroundColor: theme.colors.green,
        },

        unavailableBg: {
            backgroundColor: theme.colors.dark[3]
        },
    }
})

interface TheatreLayoutInterface {
    data: Pick<PerformanceResponse, "seatStatus">,
    seatNeeded: number,
    clearStep: Dispatch<SetStateAction<boolean>>,
}

const getRange = (max: number) => Array.from({ length: max }, (_, index) => 1 + index * 1);

export default function TheatreLayout({ data, seatNeeded, clearStep }: TheatreLayoutInterface) {
    const { classes } = useStyles();
    const { data: theatreData, isLoading } = useGetAllTheatre();
    const { mapFilteredData } = useMapFilterData<TheatreResponse>(theatreData, data.seatStatus.map(ds => ds.theatreId));
    const [selectedTheatre, setSelectedTheatre] = useState<string | null>(null);
    // const [tempSelection, setTempSelection] = useState<Record<string, number[]>[] | []>([])
    const [tempSelection, setTempSelection] = useState<string[] | []>([])

    const {
        // checkRequestedSeats, 
        // checkSingleSeatGap, 
        // remainingSeats,
        checkGapBetweenSelection
    } = useAlgorithm();

    // const fetchEnumereatedSeat = () => {
    //     if (!mapFilteredData) return
    //     const seatPlanOfSelectedTheatre = mapFilteredData?.filter(el => el._id === selectedTheatre)[0].seatPlan
    //     const seatKeys = Object.keys(seatPlanOfSelectedTheatre).sort();
    //     return seatKeys.reduce((acc, sk) => {
    //         const seatPlanOfSelectedKey = seatPlanOfSelectedTheatre[sk];
    //         const seatPlanOfSelectedKeyRange = getRange(seatPlanOfSelectedKey!);
    //         return {
    //             ...acc,
    //             [sk]: seatPlanOfSelectedKeyRange
    //         }
    //     }, {})
    // }

    const handleBookings = () => {
        // console.log('Parameters');
        // console.log('ENUMERATED SEAT: ', fetchEnumereatedSeat())
        // console.log('TEMP SELECTION: ', tempSelection);
        // console.log('SEAT PLAN: ', data.seatStatus.filter(dss => dss.theatreId === selectedTheatre)[0].plan);
        // console.log('Parameters');
        // console.log('=================================');

        // const hasSingleSeatGap = checkSingleSeatGap(tempSelection, fetchEnumereatedSeat() as Record<string, number[]>);
        // // const hasValidRequestedSeats = checkRequestedSeats(tempSelection, data.seatStatus.filter(dss => dss.theatreId === selectedTheatre)[0].plan);
        // const isSeatRemaining = remainingSeats(tempSelection, data.seatStatus.filter(dss => dss.theatreId === selectedTheatre)[0].plan, fetchEnumereatedSeat() as Record<string, number[]>);
        const gapBetweenSelection = checkGapBetweenSelection(tempSelection);

        // console.log('hasSingleSeatGap', hasSingleSeatGap);
        // // console.log('hasValidRequestedSeats', hasValidRequestedSeats);
        const isAllValid = Object.values(gapBetweenSelection).every(arr => arr.every(el => el === false));
        // console.log("gapBetweenSelection: ", gapBetweenSelection);
        // console.log('isSeatRemaining', isSeatRemaining);
        // console.log("isAllValid: ", isAllValid);
        // const isAllValid = Object.values(hasSingleSeatGap).every(el => el === true);
        // every(el => el === true) && hasValidRequestedSeats.every(el => el === true) && isSeatRemaining.every(el => el === true) && gapBetweenSelection.every(el => el === true);

        if (seatNeeded !== tempSelection.length) {
            notifications.show({
                title: 'Sorry 😞!',
                message: 'Please select seats correctly!',
                withBorder: true,
                color: "red",
                loading: true
            })
            return;
        }

        if (!isAllValid && seatNeeded > 1) {
            notifications.show({
                title: 'Sorry 😞!',
                message: 'Please select seats correctly!',
                withBorder: true,
                color: "red",
                loading: true
            })
            return;
        } else {
            notifications.show({
                title: 'Great 🥳!',
                message: 'Your tickets will be issued soon!',
                withBorder: true,
                color: "green",
                loading: true
            })
            clearStep(true);
        }

        // notifications.show({
        //     title: 'Great 🥳!',
        //     // message: 'Your tickets will be issued soon, there appears be a problem with the server. Just bare with us!',
        //     message: 'Thank you very much for using our platform. It appears that the system is going through some hard times so we could not process your action 😞. Come back Later !',
        //     withBorder: true,
        //     color: "green",
        //     loading: true
        // })
    }


    if (isLoading) {
        <Loader color="blue" variant="bars" size={"xl"} />
    }

    const storeTempSelection = (sk: string, sp: number) => {
        const seatVal = sk.concat(String(sp));
        if (tempSelection.length === seatNeeded) return;

        if (tempSelection.length > 0 && (tempSelection as string[]).includes(seatVal)) {
            const newState = tempSelection.filter(el => el !== seatVal);
            setTempSelection(newState);
            return;
        }

        setTempSelection((prevState) => [...prevState, seatVal])
    }

    const renderSeatingPlan = () => {
        const seatPlan = mapFilteredData?.filter(el => el._id === selectedTheatre)[0].seatPlan!
        const seatKeys = Object.keys(seatPlan).sort();

        // REPAINT SEAT STATUS
        const seatStatusOfSelectedTheatre = data.seatStatus.filter(dss => dss.theatreId === selectedTheatre)[0].plan;

        const isBooked = (sk: string, sp: number): boolean => {
            if (Object.keys(seatStatusOfSelectedTheatre).length === 0) return false;
            if ((seatStatusOfSelectedTheatre as Record<string, number[]>)[sk]?.includes(sp)) return true

            return false;
        }

        const isSelectedByUser = (sk: string, sp: number) => {
            if (tempSelection.length === 0) return false;
            if ((tempSelection as string[]).includes(`${sk}${sp}`)) return true;

            return false
        }

        return seatKeys.map(sk => (
            <div className={classes.seatGrid} key={sk}>
                {
                    getRange(seatPlan[sk]).map(sp => (
                        <div
                            onClick={() => isBooked(sk, sp) ? null : storeTempSelection(sk, sp)}
                            className={
                                `
                                ${classes.seat} 
                                ${isBooked(sk, sp) ? classes.bookedBg : ''}
                                ${isSelectedByUser(sk, sp) ? classes.userSelectionBg : ''}
                                `
                            }
                            key={sp}
                        >
                            {sk}{sp}
                        </div>
                    ))
                }
            </div>
        ))
    }

    const handleClearSelection = () => setTempSelection([])

    return (
        <>
            <Card>
                {/* <Text className={classes.label}>Available Shows</Text> */}
                {
                    mapFilteredData?.map((btn) => (
                        <Button key={btn._id} variant="gradient" mr={'1rem'} onClick={() => setSelectedTheatre(btn._id)}>Theatre: {btn.name}</Button>
                    ))
                }
            </Card>

            <ScrollArea
                type="always"
                offsetScrollbars
                styles={(theme) => ({
                    scrollbar: {
                        '&, &:hover': {
                            background:
                                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                        },

                        '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
                            backgroundColor: theme.colors.red[6],
                        },

                        '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
                            backgroundColor: theme.colors.blue[6],
                        },
                    },

                    corner: {
                        opacity: 1,
                        background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                })}
            >
                {
                    selectedTheatre &&
                    renderSeatingPlan()
                }
            </ScrollArea>

            <Card style={{ margin: '0.5rem 0' }}>
                <Badge size="md" color="teal" leftSection={<div className={`${classes.indicator} ${classes.availableBg}`} />} mr={7}>Available</Badge>
                <Badge size="md" color="indigo" leftSection={<div className={`${classes.indicator} ${classes.bookedBg}`} />} mr={7}>Booked</Badge>
                <Badge size="md" color="green" leftSection={<div className={`${classes.indicator} ${classes.userSelectionBg}`} />} mr={7}>Your Bookings</Badge>
                <Badge size="md" color="dark" leftSection={<div className={`${classes.indicator} ${classes.unavailableBg}`} />} mr={7}>Unavailable</Badge>
            </Card>

            {
                tempSelection.length > 0 &&
                <>
                    <Card style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Text className={classes.label} style={{ margin: "0 1rem 0 0" }}>Selected Seats</Text>
                        <Button onClick={handleClearSelection} variant="outline" leftIcon={<IconHttpDelete />}>Clear Selection</Button>
                    </Card>
                    <Card className={classes.seatGrid}>
                        {
                            tempSelection &&
                            tempSelection.map((el, idx) => (
                                <Text key={`selection-${idx}`} className={`${classes.seat} ${classes.userSelectionBg}`}>{el}</Text>
                            ))
                        }
                    </Card>

                    <Button variant="gradient" type="button" onClick={handleBookings}>
                        Verify your Booking
                    </Button>
                </>
            }
        </>
    )
}