import React from "react";
import { Card, Container, createStyles, Group, Text } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";

import { User } from "../containers/Topics";
import { useNavigate } from "react-router-dom";

interface TopicProps {
  id: string;
  title: string;
  createdAt: string;
  User: User;
}

const useStyles = createStyles((theme) => ({
  button: {
    border: "solid 1px",
    borderColor: theme.colors.gray[3],
    "&:hover": {
      backgroundColor: theme.colors.gray[1],
      cursor: "pointer"
    }
  }
}));

const Topic: React.FC<TopicProps> = ({ id, title, createdAt, User }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleOnClick = () => navigate(`/forum-topic/${id}`);

  const addedData = new Date(createdAt);
  return (
    <Card.Section
      inheritPadding
      py="xs"
      onClick={handleOnClick}
      className={classes.button}
    >
      <Group position={"apart"}>
        <IconMessage
          size={30}
        />
        <Container ml={0}>
          <Text>{title}</Text>
          <Text
            size="sm"
            c="dimmed"
            fw={400}
          >
            added by <b>{User.username}</b>, {addedData.toLocaleDateString()}
          </Text>
        </Container>
      </Group>
    </Card.Section>
  );
};

export default Topic;
