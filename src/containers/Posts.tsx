import React, { Fragment } from "react";

import Post, { PostInfo } from "./Post";

interface Props {
  posts: PostInfo[];
}

const Posts: React.FC<Props> = ({ posts }) => {
  const postList = posts.map(post => <Post key={post.id} post={post} />);

  return (
    <Fragment>
      {postList}
    </Fragment>
  );
};

export default Posts;
