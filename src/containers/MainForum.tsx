import React, { useState } from "react";
import { Card, createStyles, Group, rem, Text } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

import SubForum from "../components/SubForum";
import { SubForumData } from "./Forums";


const useStyles = createStyles((theme) => ({
  card: {
    marginBottom: "10px",
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
    }`,
    borderRadius: "0"
  },

  cardTitle: {
    "&::after": {
      content: "\"\"",
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      height: rem(2),
      marginTop: theme.spacing.sm
    }
  },
  chevron: {
    size: rem(20)
  }
}));

interface MainForumProps {
  title: string;
  subForums: SubForumData[];
}

const MainForum: React.FC<MainForumProps> = ({ title, subForums }) => {
  const { classes } = useStyles();
  const [visible, setVisible] = useState(true);

  const toggleVisible = () => setVisible(!visible);

  const items = subForums.map(({ id, title, description }) => (
    <SubForum
      key={id}
      title={title}
      description={description}
    />
  ));


  return (
    <Card
      key={title}
      shadow="md"
      radius="md"
      className={classes.card}
    >
      <Group
        position="apart"
        onClick={toggleVisible}
      >
        <Text
          fz="lg"
          fw={500}
          className={classes.cardTitle}
        >
          {title}
        </Text>
        {visible ? <IconChevronDown className={classes.chevron} /> : <IconChevronUp className={classes.chevron} />}
      </Group>
      {visible && items}
    </Card>
  );
};

export default MainForum;
