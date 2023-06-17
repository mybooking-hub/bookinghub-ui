import {
    createStyles,
    Container,
    Title,
    Text,
    Button,
    SimpleGrid,
    Image,
    rem,
    Space,
} from '@mantine/core';
// import image from 'assets/icons/image.svg';
import ErrorLogo from 'src/assets/icons/image.svg';
import { NavLink, Outlet, useNavigate, useLocation, useParams } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: rem(80),
        paddingBottom: rem(80),
    },

    title: {
        fontWeight: 900,
        fontSize: rem(34),
        marginBottom: theme.spacing.md,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(32),
        },
    },

    control: {
        [theme.fn.smallerThan('sm')]: {
            width: '100%',
        },
    },

    mobileImage: {
        // [theme.fn.largerThan('sm')]: {
        //     display: 'none',
        // },
    },

    desktopImage: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },
}));

function ErrorBoundaryUI({
    error,
    resetHandler
}: { error?: any, resetHandler?: (...x: any[]) => void }) {
    const { classes } = useStyles();
    const navigate = useNavigate();

    console.log('ERROR: ', error);

    return (
        <Container className={classes.root}>
            <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
                <Image src={ErrorLogo} className={classes.mobileImage} />
                <div>
                    <Title className={classes.title}>Something is not right...</Title>
                    <Text color="dimmed" size="lg">
                        Page you are trying to open does not exist. You may have mistyped the address, or the
                        page has been moved to another URL. If you think this is an error contact support.
                    </Text>

                    <Space h={"xl"} />

                    <Text size={"md"}>Something went wrong here !</Text>
                    <div role="alert">
                        <pre>
                            <strong>Message: </strong>
                            {error?.message}
                        </pre>
                        <pre>{error?.stack}</pre>
                        {
                            resetHandler && (
                                <Button onClick={() => resetHandler()}>
                                    Try Again
                                </Button>
                            )
                        }

                    </div>
                    <Button onClick={() => navigate("/")} variant="outline" size="md" mt="xl" className={classes.control}>
                        Get back to home page
                    </Button>
                </div>
                {/* <ErrorLogo className={classes.mobileImage} /> */}
            </SimpleGrid>
        </Container>
    );
}

export default ErrorBoundaryUI;