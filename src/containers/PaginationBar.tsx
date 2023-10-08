import React from "react";
import { Card, Container, createStyles, Group, Pagination } from "@mantine/core";

interface Props {
  actualPage: number;
  totalPages: number;
  handleChangePage: (page: number) => void;
}

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: 0,
    backgroundColor: theme.colors.gray[0]
  }
}));

const PaginationBar: React.FC<Props> = ({ actualPage, totalPages, handleChangePage }) => {
  const { classes } = useStyles();

  return (
    <Container>
      <Card
        className={classes.card}
        withBorder
      >
        <Pagination.Root
          total={totalPages}
          value={actualPage}
          onChange={handleChangePage}
          size="sm"
        >
          <Group position="left">
            <Pagination.First />
            <Pagination.Previous />
            <Pagination.Items />
            <Pagination.Next />
            <Pagination.Last />
          </Group>
        </Pagination.Root>
      </Card>
    </Container>
  );
};

export default PaginationBar;
