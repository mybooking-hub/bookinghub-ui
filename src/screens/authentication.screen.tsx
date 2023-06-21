import { useToggle, upperFirst, useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
    Container,
    LoadingOverlay,
} from '@mantine/core';
import { GoogleButton } from "component/SocialButtons";

import { useSignInWithEmail, useSignUpWithEmail } from 'src/api/auth.api';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/redux/store';
import { setUser } from 'src/redux/slice/auth.slice';

export default function AuthenticationForm(props: PaperProps) {
    const [type, toggle] = useToggle(['login', 'register']);
    const [visible, handler] = useDisclosure(false);
    const user = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch();

    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const handleAuth = async () => {
        if (type === 'login') {
            if (!visible) handler.open();
            const signInUser = await useSignInWithEmail(form.values.email, form.values.password);
            handler.close();
            dispatch(setUser(signInUser?.user ?? null));
        }
        if (type === 'register') {
            if (!visible) handler.open();
            const signUpUser = await useSignUpWithEmail(form.values.email, form.values.password);
            handler.close();
            dispatch(setUser(signUpUser?.user ?? null));
        }
    }

    if (user) {
        return <Navigate to={"/"} />
    }

    return (
        <Container style={{ padding: '5rem 10rem' }}>
            <Paper radius="md" p="xl" withBorder {...props} pos={"relative"}>
                <LoadingOverlay visible={visible} overlayBlur={2} />
                <Text size="lg" weight={500}>
                    Welcome to <b>My Seatings</b>, {type} with
                </Text>

                <Group grow mb="md" mt="md">
                    <GoogleButton radius="xl">Google</GoogleButton>
                    {/* <TwitterButton radius="xl">Twitter</TwitterButton> */}
                </Group>

                <Divider label="Or continue with email" labelPosition="center" my="lg" />

                <form onSubmit={form.onSubmit(handleAuth)}>
                    <Stack>
                        {type === 'register' && (
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                value={form.values.name}
                                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                                radius="md"
                            />
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                            radius="md"
                        />

                        {type === 'register' && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                            />
                        )}
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => toggle()}
                            size="xs"
                        >
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit" radius="xl">
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Paper>

            {/* <Group position="center">
                <Button type='button' onClick={handler.toggle}>Toggle overlay</Button>
            </Group> */}
        </Container>
    );
}