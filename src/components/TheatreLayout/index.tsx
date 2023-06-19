import { Button, Card, Flex, Grid, Loader, Text, createStyles, rem } from "@mantine/core";
import { useState } from "react";
import { PerformanceResponse } from "src/api/performance.api";
import { TheatreResponse, useGetAllTheatre } from "src/api/theatre.api";
import { useMapFilterData } from "src/hooks/useMapData";

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

        seat: {
            width: '1.75rem',
            height: '1.75rem',
            fontSize: rem("12px"),
            backgroundColor: theme.colors.gray[3],
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: "pointer"
        }
    }
})

interface TheatreLayoutInterface {
    data: Pick<PerformanceResponse, "seatStatus">
}

const getRange = (max: number) => Array.from({ length: max }, (_, index) => 1 + index * 1);

export default function TheatreLayout({ data }: TheatreLayoutInterface) {
    const { classes } = useStyles();
    const { data: theatreData, isLoading } = useGetAllTheatre();
    const { mapFilteredData } = useMapFilterData<TheatreResponse>(theatreData, data.seatStatus.map(ds => ds.theatreId));
    const [selectedTheatre, setSelectedTheatre] = useState<string | null>(null);

    if (isLoading) {
        <Loader color="blue" variant="bars" size={"xl"} />
    }

    const renderSeatingPlan = () => {
        const seatPlan = mapFilteredData?.filter(el => el._id === selectedTheatre)[0].seatPlan!
        const seatKeys = Object.keys(seatPlan).sort();

        return seatKeys.map(sk => (
            <Flex key={sk} style={{ margin: '0.75rem', gap: '0.75rem' }}>
                {/* <Text>{sk} :</Text> */}
                {
                    getRange(seatPlan[sk]).map(sp => (
                        <div className={classes.seat} key={sp}>
                            {sk}{sp}
                        </div>
                    ))
                }
            </Flex>
        ))
    }

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

            {
                selectedTheatre &&
                renderSeatingPlan()
            }
        </>
    )
}