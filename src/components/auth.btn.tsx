import { useState } from "react";
import {
    createStyles,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    rem,
    px,
    Button,
} from '@mantine/core';
import {
    IconLogout,
    IconHeart,
    IconStar,
    IconMessage,
    IconSettings,
    IconPlayerPause,
    IconTrash,
    IconSwitchHorizontal,
    IconChevronDown,
} from '@tabler/icons-react';
import { useSignOut } from "src/api/auth.api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { invalidateAuthSlice } from "src/redux/slice/auth.slice";

const useStyles = createStyles((theme) => ({
    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        transition: 'background-color 100ms ease',
        // backgroundColor: theme.white,
        borderRadius: theme.radius.lg,
        borderStyle: 'solid',
        borderWidth: px(1),
        borderColor: theme.colors.gray[3],

        // '&:hover': {
        //     backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        // },

        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
}));

interface AuthBtnInterface {
    classFlag: Boolean
}

export default function AuthBtn({ classFlag }: AuthBtnInterface) {
    const { classes, theme, cx } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const handleLogOut = async () => {
        await useSignOut()
        dispatch(invalidateAuthSlice());
    };

    if (!user) {
        return (
            <Button type="button" variant="filled" color="blue" onClick={() => navigate("/authenticate")}>
                Sign in / Register
            </Button>
        )
    }

    return (
        <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton
                    variant='outlined'
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                    <Group spacing={7}>
                        <Avatar src={user.photoURL} alt={user.displayName ?? user.email!} radius="xl" size={20} />
                        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3} color={classFlag && !userMenuOpened ? 'white' : theme.black}>
                            {user.displayName ?? user.email}
                        </Text>
                        {/* <IconChevronDown color={!userMenuOpened ? 'white' : theme.black} size={rem(12)} stroke={1.5} /> */}
                        <IconChevronDown color={classFlag && !userMenuOpened ? 'white' : theme.black} size={rem(12)} stroke={1.5} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                {/* <Menu.Item
                                icon={<IconHeart size="0.9rem" color={theme.colors.red[6]} stroke={1.5} />}
                            >
                                Liked posts
                            </Menu.Item>
                            <Menu.Item
                                icon={<IconStar size="0.9rem" color={theme.colors.yellow[6]} stroke={1.5} />}
                            >
                                Saved posts
                            </Menu.Item>
                            <Menu.Item
                                icon={<IconMessage size="0.9rem" color={theme.colors.blue[6]} stroke={1.5} />}
                            >
                                Your comments
                            </Menu.Item> */}

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
                    Account settings
                </Menu.Item>
                {/* <Menu.Item icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}>
                                Change account
                            </Menu.Item> */}
                <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />} onClick={handleLogOut}>Logout</Menu.Item>

                {/* <Menu.Divider /> */}

                {/* <Menu.Label>Danger zone</Menu.Label>
                            <Menu.Item icon={<IconPlayerPause size="0.9rem" stroke={1.5} />}>
                                Pause subscription
                            </Menu.Item>
                            <Menu.Item color="red" icon={<IconTrash size="0.9rem" stroke={1.5} />}>
                                Delete account
                            </Menu.Item> */}
            </Menu.Dropdown>
        </Menu>
    )
}