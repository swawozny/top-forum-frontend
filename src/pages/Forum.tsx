import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Container, Group, Loader } from "@mantine/core";

import MainForum from "../containers/MainForum";
import Topics, { TopicData } from "../containers/Topics";
import ErrorAlert from "../containers/ErrorAlert";
import { SubForumData } from "../containers/Forums";
import { getForum } from "../api/forums";

interface ForumData {
  id: string;
  title: string;
  description: string;
  children: SubForumData[];
  Topics: TopicData[];
}

const Forum = () => {
  const params = useParams();
  const forumId = params.id || "";

  const { status, data: response } = useQuery(["forum", forumId], () => getForum(forumId));

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

  const forum: ForumData = response.data;

  return (
    <Container>
      <MainForum
        title={forum.title}
        subForums={forum.children}
      />
      <Topics
        topicList={forum.Topics}
      />
    </Container>
  );
};

export default Forum;
