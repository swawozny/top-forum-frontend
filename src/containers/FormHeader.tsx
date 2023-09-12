import React, { Fragment } from "react";
import { Anchor, Text, Title } from "@mantine/core";

interface FormHeaderProps {
  title: string;
  subtitle: string;
  link: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, subtitle, link }) => {
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
        <Anchor
          size="sm"
          component="button"
        >
          {link}
        </Anchor>
      </Text>
    </Fragment>
  );
};

export default FormHeader;
