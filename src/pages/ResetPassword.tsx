import { Fragment, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { StatusCodes } from "http-status-codes";
import { Alert, Button, Container, createStyles, Loader, Paper, PasswordInput, rem, Title } from "@mantine/core";
import { hasLength, matchesField, useForm } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons-react";

import InfoPage from "./InfoPage";
import { resetPassword } from "../api/auth";

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

const ResetPassword = () => {
  const { classes } = useStyles();
  const [searchParams] = useSearchParams();
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userId = searchParams.get("uid");
  const restoringCode = searchParams.get("restoringCode");

  if (!userId || !restoringCode) {
    return (
      <Navigate to="/forgot-password" />
    );
  }

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validate: {
      password: hasLength({ min: 2, max: 10 }, "Password must be 2-10 characters long"),
      confirmPassword: matchesField("password", "Passwords did not match")
    }
  });

  const handleOnSubmit = async (values: any) => {
    const { password } = values;

    try {
      const result = await resetPassword(password, userId, restoringCode);
      if (result.status === StatusCodes.OK) {
        setCompleted(true);
      }
    } catch ({ response: { data: { message } } }) {
      setErrorMessage(message as string);
    }
  };

  if (completed) {
    return (
      <InfoPage
        title="Password reset"
        description="Your password has been successfully reset and you can log in."
        buttonText="Take me to login page"
        buttonHref="/login"
      />
    );
  }

  return (
    <Fragment>
      <Container size={420}>
        <Paper className={classes.form} radius="md" p={30} withBorder>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={30}>
            Password reset
          </Title>
          <form
            onSubmit={form.onSubmit((values) => handleOnSubmit(values))}
          >
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              size="md"
              {...form.getInputProps("password")}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Your confirm password"
              mt="md"
              size="md"
              {...form.getInputProps("confirmPassword")}
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
              disabled={isLoading}
            >
              {isLoading ? <Loader color="white" size="sm" /> : "Reset password"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default ResetPassword;
