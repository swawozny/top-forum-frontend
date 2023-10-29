import React, { Fragment } from "react";

import MainForum from "./MainForum";
import { MainForumData } from "../pages/Home";

export interface SubForumData {
  id: string;
  title: string;
  description: string;
}

interface ForumsProps {
  forumList: MainForumData[];
}

const Forums: React.FC<ForumsProps> = ({ forumList }) => {
  const mainForums = forumList.map(({ id, title, subForums }) => (
    <MainForum
      key={id}
      title={title}
      subForums={subForums}
    />
  ));

  return (
    <Fragment>
      {mainForums}
    </Fragment>
  );
};

export default Forums;
