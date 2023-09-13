import React from "react";
import { Button, Container, createStyles, Group, rem, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    paddingBottom: rem(80)
  },

  inner: {
    position: "relative"
  },

  content: {
    position: "relative",
    zIndex: 1,

    [theme.fn.smallerThan("sm")]: {
      paddingTop: rem(120)
    }
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32)
    }
  },

  description: {
    maxWidth: rem(540),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`
  }
}));

interface InfoPageProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

const InfoPage: React.FC<InfoPageProps> = ({ title, description, buttonText, buttonHref }) => {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>{title}</Title>
          <Text color="dimmed" size="lg" align="center" className={classes.description}>
            {description}
          </Text>
          <Group position="center">
            <Link to={buttonHref}>
            <Button size="md">{buttonText}</Button>
            </Link>
          </Group>
        </div>
      </div>
    </Container>
  );
};

export default InfoPage;
