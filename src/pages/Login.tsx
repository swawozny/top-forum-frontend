import { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Alert,
  Anchor,
  Button,
  Container,
  createStyles,
  Loader,
  Paper,
  PasswordInput,
  rem,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons-react";
import { StatusCodes } from "http-status-codes";

import { login } from "../api/auth";

const useStyles = createStyles((theme) => ({
  form: {
    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%"
    }
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(40)
  }
}));


const Login = () => {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginCompleted, setLoginCompleted] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: ""
    },
    validate: {
      email: isEmail("Invalid email"),
      password: hasLength({ min: 2, max: 10 }, "Password must be 2-10 characters long")
    }
  });

  const handleOnSubmit = async (values: any) => {
    const { email, password } = values;
    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (result.status === StatusCodes.OK) {
        setLoginCompleted(true);
      }
    } catch ({ response: { data: { message } } }) {
      setErrorMessage(message as string);
    }
    setIsLoading(false);
  };

  if (loginCompleted) {
    return (
      <Navigate
        to="/"
        replace={true}
      />
    );
  }

  return (
    <Fragment>
      <Container size={420}>
        <Paper className={classes.form} radius="md" p={30} withBorder>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={30}>
            Welcome back!
          </Title>
          <form
            onSubmit={form.onSubmit((values) => handleOnSubmit(values))}
          >
            <TextInput
              label="Email address"
              placeholder="Your e-mail"
              size="md"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              size="md"
              {...form.getInputProps("password")}
            />

            {errorMessage &&
              <Alert
                icon={<IconAlertCircle size="1rem" />}
                title="Error!"
                color="red"
                mt={20}
              >
                {errorMessage}
              </Alert>
            }

            <Button
              type="submit"
              mt="xl"
              size="md"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? <Loader color="white" size="sm" /> : "Login"}
            </Button>
          </form>
          <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor<"a"> weight={700} onClick={(event) => event.preventDefault()}>
              <Link to="/signup">
                Register
              </Link>
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default Login;
