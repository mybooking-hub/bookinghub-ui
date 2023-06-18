import {
    Container,
    Grid,
    Text,
    createStyles,
    NumberInput,
    NumberInputHandlers,
    ActionIcon,
    rem,
    Button,
} from '@mantine/core';
import { NavLink, Outlet, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import { PerformanceResponse, useGetPerformance } from 'src/api/performance.api';
import { PerformanceCard } from 'src/components/performance.comp';
import Spinner from 'src/fallback-ui/spinner.ui';
import { useExtractData } from 'src/hooks/useExtractData';

import { useRef, useState } from 'react';
import { IconPlus, IconMinus } from '@tabler/icons-react';

const useStyles = createStyles((theme) => {
    return {
        root: {
            width: '100%',
            backgroundColor: '#1D1D1D',
            padding: '0 0 5rem 0'
        },
        overlay: {
            position: 'absolute',
            // top: '20%',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "linear-gradient(to bottom, rgba(29,29,29,0.75) 0,rgba(29,29,29,1) 100%)"
        },
        bgImg: {
            // background: "url(https://www.themoviedb.org/t/p/w1280/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg) no-repeat center center",
            backgroundSize: 'cover',
            width: '100%',
            height: '60vh',
            position: 'relative'
        },
        remRoot: {
            marginTop: "-20vh"
        },
        synopsis: {
            // textAlign: "justify",
            color: theme.white
        },

        wrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexGrow: 0,
            padding: `${rem(6)} ${theme.spacing.xs}`,
            borderRadius: theme.radius.sm,
            border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3]
                }`,
            // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,

            '&:focus-within': {
                borderColor: theme.colors[theme.primaryColor][6],
            },
        },

        wrapperCover: {
            maxWidth: "8.75rem",
        },

        control: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3]
                }`,

            '&:disabled': {
                borderColor: theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3],
                opacity: 0.8,
                backgroundColor: 'transparent',
            },
        },

        input: {
            textAlign: 'center',
            paddingRight: `${theme.spacing.sm} !important`,
            paddingLeft: `${theme.spacing.sm} !important`,
            height: rem(28),
            flex: 1,
            color: theme.white
        },

        sectionHead: {
            fontSize: rem("18px"),
            color: theme.white,
            margin: '1rem 0',
            fontWeight: 'bold'
        },

        bookBtn: {
            margin: '1rem 0'
        }
    }
})

const min = 1;
const max = 20;

export default function BookPerformance() {
    // const params = useParams();
    const { pathname, state } = useLocation();
    const { classes } = useStyles();
    const navigate = useNavigate()

    if (!state?.pId) {
        return <Navigate to="/not-found" />
    }

    const { data, isLoading, error } = useGetPerformance(state.pId);
    const { mappedData } = useExtractData<PerformanceResponse>(data);

    const handlers = useRef<NumberInputHandlers>(null);
    const [value, setValue] = useState<number | ''>(1);

    if (isLoading || !mappedData) {
        return (
            <Spinner />
        )
    }

    if (error) {
        return <Navigate to='/not-found' />
    }

    return (
        <div className={classes.root}>
            <div className={classes.bgImg} style={{
                background: `url(${mappedData.poster}) center top / cover no-repeat`,
                // backgroundSize: 'cover',
                // backgroundPosition: 'top'
            }}>
                <div className={classes.overlay} />
            </div>
            <Container className={classes.remRoot}>
                <Grid>
                    <Grid.Col span={4}>
                        <PerformanceCard noAction category={mappedData.genre} image={mappedData.poster!} title={mappedData.name} />
                    </Grid.Col>
                    <Grid.Col span={8} style={{ zIndex: 1, padding: "0 4rem" }}>
                        <Text className={classes.sectionHead}>Synopsis</Text>
                        <Text className={classes.synopsis} lineClamp={4}>{mappedData.synopsis}</Text>

                        <Text className={classes.sectionHead}>Select Number of Seats</Text>
                        <div className={classes.wrapperCover}>
                            <div className={classes.wrapper}>
                                <ActionIcon<'button'>
                                    size={28}
                                    variant="transparent"
                                    onClick={() => handlers.current?.decrement()}
                                    disabled={value === min}
                                    className={classes.control}
                                    onMouseDown={(event) => event.preventDefault()}
                                >
                                    <IconMinus size="1rem" stroke={1.5} />
                                </ActionIcon>

                                <NumberInput
                                    variant="unstyled"
                                    min={min}
                                    max={max}
                                    handlersRef={handlers}
                                    value={value}
                                    onChange={setValue}
                                    classNames={{ input: classes.input }}
                                />

                                <ActionIcon<'button'>
                                    size={28}
                                    variant="transparent"
                                    onClick={() => handlers.current?.increment()}
                                    disabled={value === max}
                                    className={classes.control}
                                    onMouseDown={(event) => event.preventDefault()}
                                >
                                    <IconPlus size="1rem" stroke={1.5} />
                                </ActionIcon>
                            </div>
                        </div>

                        <Button variant='gradient' className={classes.bookBtn}>
                            Book Now
                        </Button>
                    </Grid.Col>
                </Grid>
            </Container>
        </div>
    )
}