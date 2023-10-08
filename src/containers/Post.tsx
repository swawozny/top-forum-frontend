import React from "react";
import { Card, Container, createStyles, Divider, Grid } from "@mantine/core";

import PostAuthor, { User } from "../components/PostAuthor";
import PostContent from "../components/PostContent";

export interface PostInfo {
  User: User;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  post: PostInfo;
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.gray[0]
  }
}));


const Post: React.FC<Props> = ({ post }) => {
  const { classes } = useStyles();
  const user = post.User;

  return (
    <Container my="md">
      <Card
        shadow="sm"
        radius={"sm"}
        withBorder
      >
        <Grid>
          <Grid.Col
            sm={2}
            className={classes.card}
          >
            <PostAuthor {...user} />
          </Grid.Col>
          <Divider
            orientation="vertical"
            variant="dotted"
          />
          <Grid.Col sm={9}>
            <PostContent {...post} />
          </Grid.Col>
        </Grid>
      </Card>
    </Container>
  );
};

export default Post;
