import { useState } from 'react';
import {
    createStyles,
    Container,
    Group,
    Burger,
    rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useWindowScroll } from '@mantine/hooks';

// import { MantineLogo } from '@mantine/ds';
import { ReactComponent as BrandLogo } from '../assets/icons/brand2.svg';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import AuthBtn from './auth.btn';

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'transparent',

        backgroundColor: 'transparent',

        // borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
        //     }`,
        // marginBottom: rem(120),
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 20,
        transition: 'background-color 300ms ease',
    },

    positionSticky: {
        position: "sticky",
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    transformHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.95)",
    },

    mainSection: {
        paddingBottom: theme.spacing.sm,
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    pinWhite: {
        color: theme.white,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.white,
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black
        },
    },

    linkOutsideHome: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}));

interface HeaderTabsProps {
    tabs: {
        label: string,
        link: string
    }[];
}

export function HeaderTabs({ tabs }: HeaderTabsProps) {
    const { classes, cx } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);

    const [active, setActive] = useState(tabs[0]);

    const [scroll, scrollTo] = useWindowScroll();

    const urlLocation = useLocation();
    const navigate = useNavigate();
    const isAtHome = urlLocation.pathname === "/" || urlLocation.pathname === "/browse-performance/booking";

    const items = tabs.map((tab, index) => (
        <a
            key={index}
            href={tab.label}
            className={cx(classes.link, {
                [classes.linkActive]: active === tab,
                [classes.linkOutsideHome]: (!isAtHome)
            })}
            onClick={(event) => {
                event.preventDefault();
                navigate(tab.link);
                scrollTo({ y: 0 });
                setActive(tab);
            }}
        >
            {tab.label}
        </a>
    ));

    return (
        <div className={
            cx(classes.header,
                {
                    [classes.transformHeader]: (scroll.y > 100),
                    [classes.positionSticky]: (!isAtHome)
                })
        }>
            <Container className={classes.mainSection}>
                <Group position="apart">
                    {/* <MantineLogo size={28} /> */}
                    <NavLink to={"/"}>
                        <BrandLogo className='' />
                    </NavLink>

                    <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

                    <Group spacing={5} className={classes.links}>
                        {items}
                    </Group>

                    <AuthBtn classFlag={isAtHome} />
                </Group>
            </Container>
        </div>
    );
}