import { Fragment } from "react";
import { useParams } from "react-router-dom";

const ForumTopic = () => {
  const params = useParams();

  const { id } = params;

  return (
    <Fragment>
    </Fragment>
  );
};

export default ForumTopic;
