import React from "react";
import { Container, Group, Text } from "@mantine/core";

interface Props {
  content: string;
  createdAt: string;
}

const PostContent: React.FC<Props> = ({ content, createdAt }) => {
  const addedDate = new Date(createdAt).toLocaleString("en-US");

  return (
    <Group position={"apart"}>
      <Container ml={0}>
        <Text
          size="sm"
          c="dimmed"
          fw={400}
        >
          Added on {addedDate}
        </Text>
        <Text>
          {content}
        </Text>
      </Container>
    </Group>
  );
};

export default PostContent;
