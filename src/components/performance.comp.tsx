import { createStyles, Paper, Title, Button, rem, Badge } from '@mantine/core';

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
        position: 'relative'
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
        fontFamily: `Greycliff CF ${theme.fontFamily}`,
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

interface PerformanceCardProps {
    image: string;
    title: string;
    category: { id: string, label: string }[];
    handleOnClick?: () => void,
    noAction?: Boolean
}

export function PerformanceCard({ image, title, category, handleOnClick, noAction = false }: PerformanceCardProps) {
    const { classes } = useStyles();

    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            sx={{ backgroundImage: `url(${image})` }}
            className={classes.card}
        >
            <div style={{ zIndex: 10 }}>
                {
                    category.map((g) => (
                        <Badge variant='filled' className={classes.category} size="xs" key={g.id}>
                            {g.label}
                        </Badge>
                    ))
                }
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
            </div>
            {
                handleOnClick && (
                    <Button variant="filled" color="green" style={{ zIndex: 10 }} onClick={handleOnClick}>
                        <IconTicket style={{ marginRight: '0.5rem' }} />
                        Buy Ticket
                    </Button>
                )
            }

            <div className={classes.overlay} />
        </Paper>
    );
}