import React from "react";
import { Card, createStyles, Text } from "@mantine/core";

import Topic from "../components/Topic";

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: "0"
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    marginBottom: 5
  }
}));

export interface TopicData {
  topicCreator: User;
  createdAt: string;
  id: string;
  title: string;
  description: string;
}

export interface User {
  username: string;
}

interface Props {
  topicList: TopicData[];
}

const Topics: React.FC<Props> = ({ topicList }) => {
  const { classes } = useStyles();

  if (!topicList.length) {
    return null;
  }

  const topics = topicList.map((item) => (
    <Topic key={item.id} {...item} />
  ));

  return (
    <Card
      className={classes.card}
      shadow="sm"
      withBorder
    >
      <Text className={classes.title}>Topics</Text>
      <Card>
        {topics}
      </Card>
    </Card>
  );
};

export default Topics;
