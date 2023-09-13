import { Fragment, useState } from "react";
import { hasLength, isEmail, matchesField, useForm } from "@mantine/form";
import { Alert, Box, Button, Container, Loader, Paper, PasswordInput, TextInput } from "@mantine/core";
import FormHeader from "../containers/FormHeader";
import { signUp } from "../api/auth";
import { IconAlertCircle } from "@tabler/icons-react";
import InfoPage from "./InfoPage";
import { StatusCodes } from "http-status-codes";

export interface UserData {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [signUpCompleted, setSignUpCompleted] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    },
    validate: {
      email: isEmail("Invalid email"),
      username: hasLength({ min: 2, max: 10 }, "Username must be 2-10 characters long"),
      password: hasLength({ min: 2, max: 10 }, "Password must be 2-10 characters long"),
      confirmPassword: matchesField("password", "Passwords did not match")
    }
  });

  const handleOnSubmit = async (values: UserData) => {
    const { email, username, password } = values;

    setIsLoading(true);

    signUp({ username, email, password } as UserData)
      .then(result => {
        const { status, data } = result;
        if (status !== StatusCodes.CREATED) return setErrorMessage(data.message);
        setSignUpCompleted(true);
      })
      .catch(({ response }) => {
        setErrorMessage(response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (signUpCompleted) {
    return (
      <InfoPage
        title={"Please confirm your email"}
        description={"We have sent a code to the email you provided, which you must enter the first time you log in to confirm your address."}
        buttonText={"Take me to the login page"}
        buttonHref={"/login"}
      />
    );
  }

  return (
    <Fragment>
      <Container size={420} my={40}>
        <FormHeader
          title="Create an account"
          subtitle="Already have an account?"
          linkTitle="Login"
          linkPath="/login"
        />
        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
        >
          {errorMessage &&
            <Alert
              icon={<IconAlertCircle size="1rem" />}
              title="Error!"
              color="red"
            >
              {errorMessage}
            </Alert>
          }
          <Box maw={400} mx="auto">
            <form
              onSubmit={form.onSubmit((values) => handleOnSubmit(values))}
            >
              <TextInput
                label="E-mail"
                placeholder="Your e-mail"
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Username"
                placeholder="Your username"
                {...form.getInputProps("username")}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                {...form.getInputProps("password")}
              />
              <PasswordInput
                label="Confirm password"
                placeholder="Your confirm password"
                {...form.getInputProps("confirmPassword")}
              />
              <Button
                type="submit"
                mt="md"
                disabled={isLoading}
              >
                {isLoading ?
                  <Loader
                    color="white"
                    variant="dots"
                  /> : "Sign Up"
                }
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default SignUp;
