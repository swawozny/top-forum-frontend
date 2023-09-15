import { useState } from "react";
import { StatusCodes } from "http-status-codes";
import { Alert, Button, Container, createStyles, Group, Loader, Paper, rem, TextInput } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons-react";

import InfoPage from "./InfoPage";
import { tryResetPassword } from "../api/auth";
import FormHeader from "../containers/FormHeader";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(26),
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse"
    }
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center"
    }
  }
}));

const ForgotPassword = () => {
  const { classes } = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: ""
    },
    validate: {
      email: isEmail("Invalid email")
    }
  });

  const handleOnSubmit = async (values: any) => {
    const { email } = values;
    setIsLoading(true);
    try {
      const result = await tryResetPassword(email);
      if (result.status === StatusCodes.OK) {
        setCompleted(true);
      }
    } catch ({ response: { data: { message } } }) {
      setErrorMessage(message as string);
    }
    setIsLoading(false);
  };

  if (completed) {
    return (
      <InfoPage
        title="Email with reset link sent"
        description="A link was sent to the email you provided to reset your password. Click it and enter your new password."
        buttonText="Back to login page"
        buttonHref="/login"
      />
    );
  }

  return (
    <Container
      size={460}
      my={30}
    >
      <FormHeader
        title="Forgot your password?"
        subtitle="Enter your email to get a reset link. Remember the password?"
        linkTitle="Login"
        linkPath="/login"
      />

      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        mt="xl"
      >
        {errorMessage &&
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Error!"
            color="red"
            mb="xl"
          >
            {errorMessage}
          </Alert>
        }
        <form
          onSubmit={form.onSubmit((values) => handleOnSubmit(values))}
        >
          <TextInput
            label="Email address"
            placeholder="Your e-mail"
            size="md"
            {...form.getInputProps("email")}
            required
          />
          <Group
            position="right"
            mt="lg"
            className={classes.controls}
          >
            <Button
              className={classes.control}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader color="white" size="xs" /> : "Reset password"}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
