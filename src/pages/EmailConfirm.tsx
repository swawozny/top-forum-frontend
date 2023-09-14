import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  Alert,
  Anchor,
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Loader,
  Paper,
  rem,
  TextInput
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { IconAlertCircle, IconArrowLeft } from "@tabler/icons-react";
import { StatusCodes } from "http-status-codes";

import FormHeader from "../containers/FormHeader";
import { confirmEmail } from "../api/auth";
import InfoPage from "./InfoPage";

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

const EmailConfirm = () => {
  const { email } = useParams();

  if (!email) {
    return (
      <Navigate
        to="/login"
      />
    );
  }

  const { classes } = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  const form = useForm({
    initialValues: {
      activationCode: ""
    },
    validate: {
      activationCode: hasLength({ min: 20, max: 20 }, "Activation code must be 20 characters long")
    }
  });

  const handleOnSubmit = async (values: any) => {
    const { activationCode } = values;
    setIsLoading(true);
    try {
      const result = await confirmEmail(email, activationCode);
      if (result.status === StatusCodes.OK) {
        setEmailConfirmed(true);
      }
    } catch ({ response: { data: { message } } }) {
      setErrorMessage(message as string);
    }
    setIsLoading(false);
  };

  if (emailConfirmed) {
    return (
      <InfoPage
        title={"Email confirmed"}
        description={"The code provided is correct. Your account has been activated. You now need to log in."}
        buttonText={"Take me to the login page"}
        buttonHref={"/login"}
      />
    );
  }

  return (
    <Container size={460} my={30}>
      <FormHeader
        title="Confirm your email"
        subtitle="Enter the code, which we sent to the email address you provided."
        linkTitle={""}
        linkPath={""}
      />

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        {errorMessage &&
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Error!"
            color="red"
            mb={20}
          >
            {errorMessage}
          </Alert>
        }
        <form
          onSubmit={form.onSubmit((values) => handleOnSubmit(values))}
        >
          <TextInput
            label="Activation code"
            size="md"
            {...form.getInputProps("activationCode")}
            required
          />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft size={rem(12)} stroke={1.5} />
                <Link to="/login">
                  <Box ml={5}>Back to the login page</Box>
                </Link>
              </Center>
            </Anchor>
            <Button
              className={classes.control}
              type="submit"
              size="md"
              disabled={isLoading}
            >
              {isLoading ? <Loader color="white" size="sm" /> : "Confirm email"}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default EmailConfirm;
