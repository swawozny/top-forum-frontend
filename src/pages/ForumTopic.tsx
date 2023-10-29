import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Group, Loader } from "@mantine/core";

import ErrorAlert from "../containers/ErrorAlert";
import Posts from "../containers/Posts";
import PaginationBar from "../containers/PaginationBar";
import { getTopic } from "../api/topic";
import { PostInfo } from "../containers/Post";

interface TopicData {
  id: string;
  title: string;
  topicPosts: PostInfo[];
  createdAt: string;
  updatedAt: string;
}

interface TopicInfo {
  topic: TopicData;
  page: number;
  totalPages: number;
}

const ForumTopic = () => {
  const params = useParams();
  const [page, setPage] = useState(1);
  const topicId = params.id || "";

  const { status, data: response } = useQuery(["topic", topicId, page], () => getTopic(topicId, page));

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

  const topicInfo: TopicInfo = response.data;
  const { topic, totalPages } = topicInfo;
  const { topicPosts } = topic;

  return (
    <Fragment>
      <PaginationBar
        totalPages={totalPages}
        actualPage={page}
        handleChangePage={setPage}
      />
      <Posts posts={topicPosts} />
      <PaginationBar
        totalPages={totalPages}
        actualPage={page}
        handleChangePage={setPage}
      />
    </Fragment>
  );
};

export default ForumTopic;
