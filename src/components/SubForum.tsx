import React from "react";
import { Card, Center, Container, createStyles, Grid, rem, Text } from "@mantine/core";
import { IconMessages } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: 0,
    "&:hover": {
      backgroundColor: theme.colors.gray[1],
      cursor: "pointer"
    }
  },

  cardTitle: {
    "&::after": {
      content: "\"\"",
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2)
    }
  }
}));

interface Props {
  title: string;
  description: string;
  subForumId: string;
}

const SubForum: React.FC<Props> = ({ title, description, subForumId }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleOnClick = () => navigate(`/forum/${subForumId}`);

  return (
    <Card
      key={title}
      className={classes.card}
      onClick={handleOnClick}
      withBorder
    >
      <Grid>
        <Center>
          <Grid.Col span={2}>
            <IconMessages
              size={30}
            />
          </Grid.Col>
        </Center>
        <Grid.Col span={10}>
          <Container>
            <Text
              fz="lg"
              fw={500}
              className={classes.cardTitle}
            >
              {title}
            </Text>
            <Text
              fz="sm"
              c="dimmed"
              mt="sm"
            >
              {description}
            </Text>
          </Container>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default SubForum;
