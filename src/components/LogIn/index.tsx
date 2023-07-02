import { Button, Group, PasswordInput } from '@mantine/core';
import { useStyles } from './index.styles';
import { useForm } from '@mantine/form';
import { LoggedInToken } from '../../pages/Main';

export const LogIn = (props: { setLoggedIn: React.Dispatch<LoggedInToken> }) => {
  const { classes } = useStyles();
  const loginForm = useForm({
    initialValues: {
      password: '',
    },

    validate: {
      password: (value) => (value !== process.env.REACT_APP_PASSWORD ? 'Incorrect password' : null),
    },
  });

  return (
    <form
      onSubmit={loginForm.onSubmit(
        (values) => {
          const loggedIn: LoggedInToken = { time: new Date().toISOString() };
          props.setLoggedIn(loggedIn);
          localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
        },
        (validatorErrors) => {
          console.log(validatorErrors);
          console.log('error');
        }
      )}
    >
      <PasswordInput
        label="Log in"
        placeholder="Password"
        className={classes.logIn}
        {...loginForm.getInputProps('password')}
      />
      <Group position="right" mt="md">
        <Button type="submit">Log In</Button>
      </Group>
    </form>
  );
};
