import React, { Fragment } from "react";
import { Anchor, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

interface FormHeaderProps {
  title: string;
  subtitle: string;
  linkTitle: string;
  linkPath: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, subtitle, linkTitle, linkPath }) => {
  return (
    <Fragment>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        {title}
      </Title>
      <Text
        color="dimmed"
        size="sm"
        align="center"
        mt={5}
      >
        {subtitle}{" "}
        <Link to={linkPath}>
        <Anchor
          size="sm"
          component="button"
        >
          {linkTitle}
        </Anchor>
        </Link>
      </Text>
    </Fragment>
  );
};

export default FormHeader;
