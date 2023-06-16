import { Button, Group, PasswordInput } from '@mantine/core';
import { useStyles } from './index.styles';
import { useForm } from '@mantine/form';

export const LogIn = (props: { setIsAuth: React.Dispatch<boolean> }) => {
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
          props.setIsAuth(true);
          console.log(values);
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
