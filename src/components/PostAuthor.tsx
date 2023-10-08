import React from "react";
import { Avatar, Container, createStyles, rem, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  avatar: {
    border: rem(2)
  }
}));

interface Role {
  name: string;
}

export interface User {
  id: number;
  username: string;
  Role: Role;
}

const PostAuthor = (user: User) => {
  const { classes } = useStyles();

  const { username, Role } = user;

  return (
    <Container>
      <Avatar
        size={"xl"}
        radius={80}
        mx="auto"
        className={classes.avatar}
      />
      <Text
        ta="center"
        fz="lg"
        fw={500}
      >
        {username}
      </Text>
      <Text
        ta="center"
        fz="sm"
        c="dimmed"
      >
        {Role.name}
      </Text>
    </Container>
  );
};

export default PostAuthor;
