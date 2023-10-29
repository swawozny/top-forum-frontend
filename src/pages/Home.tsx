import { Container, Grid, Group, Loader } from "@mantine/core";
import { useQuery } from "react-query";

import Forums, { SubForumData } from "../containers/Forums";
import ErrorAlert from "../containers/ErrorAlert";
import { getForums } from "../api/forums";

export interface MainForumData {
  id: string;
  title: string;
  subForums: SubForumData[];
}

const Home = () => {
  const { status, data: response } = useQuery("forums", getForums);

  if (status === "loading") {
    return (
      <Group position={"center"}>
        <Loader size={50} />
      </Group>
    );
  }

  if (status === "error" || !response) {
    return (
      <ErrorAlert
        title="Something went wrong!"
        description="It is not possible to download data from the server at this time."
      />
    );
  }

  const forums: MainForumData[] = response.data;

  return (
    <Container>
      <Grid>
        <Grid.Col span={10}>
          <Forums forumList={forums} />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Home;
