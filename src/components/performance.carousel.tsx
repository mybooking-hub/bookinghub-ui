import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Title, Button, useMantineTheme, rem, Badge, Text } from '@mantine/core';
import { PerformanceResponse } from 'src/api/performance.api';
import { useNavigate } from 'react-router-dom';

import { IconTicket } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    card: {
        height: rem(440),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer'
    },

    overlay: {
        position: 'absolute',
        // top: '20%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
        backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 100%, rgba(0, 0, 0, .85) 100%)',
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.white,
        lineHeight: 1.2,
        fontSize: rem(32),
        marginTop: theme.spacing.xs,
    },

    category: {
        color: theme.white,
        // opacity: 0.7,
        fontWeight: 700,
        textTransform: 'uppercase',
        marginRight: "0.5rem"
    },
}));

interface CarouselInterface {
    data: PerformanceResponse[] | undefined
}

function Card(cardProp: PerformanceResponse) {
    const { classes } = useStyles();
    const { genre, name, poster } = cardProp;

    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            sx={{ backgroundImage: `url(${poster})` }}
            className={classes.card}
        >
            <div style={{ zIndex: 10 }}>
                {
                    genre.map((g) => (
                        <Badge variant='filled' className={classes.category} size="xs" key={g.id}>
                            {g.label}
                        </Badge>
                    ))
                }
                <Title order={3} className={classes.title}>
                    {name}
                </Title>
            </div>
            {/* <Button variant="filled" color="green" style={{ zIndex: 10 }} onClick={ }>
                <IconTicket style={{ marginRight: '0.5rem' }} />
                Buy Ticket
            </Button> */}

            <div className={classes.overlay} />
        </Paper>
    );
}

// const data = [
//     {
//         image:
//             'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
//         title: 'Best forests to visit in North America',
//         category: 'nature',
//     },
//     {
//         image:
//             'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
//         title: 'Hawaii beaches review: better than you think',
//         category: 'beach',
//     },
//     {
//         image:
//             'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
//         title: 'Mountains at night: 12 best locations to enjoy the view',
//         category: 'nature',
//     },
//     {
//         image:
//             'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
//         title: 'Aurora in Norway: when to visit for best experience',
//         category: 'nature',
//     },
//     {
//         image:
//             'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
//         title: 'Best places to visit this winter',
//         category: 'tourism',
//     },
//     {
//         image:
//             'https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
//         title: 'Active volcanos reviews: travel at your own risk',
//         category: 'nature',
//     },
// ];

export default function PerformanceCarousel({ data }: CarouselInterface) {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const navigate = useNavigate();

    const slides = data?.map((item) => (
        <Carousel.Slide key={item._id} onClick={() => navigate("/browse-performance/booking", { state: { pId: item._id } })}>
            <Card {...item} />
        </Carousel.Slide>
    ));

    return (
        <>
            <Text
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                sx={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: '2rem', marginBottom: '0.5rem' }}
                // ta="center"
                // fz=""
                fw={700}
            >Trending Shows</Text>
            <Carousel
                slideSize="33.33%"
                breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
                slideGap="xl"
                align="start"
                loop
                slidesToScroll={mobile ? 1 : 2}
            >
                {slides}
            </Carousel>
        </>
    );
}