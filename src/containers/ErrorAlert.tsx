import React from "react";
import { Container, SimpleGrid, Text, Title } from "@mantine/core";
import { IconCircleXFilled } from "@tabler/icons-react";

interface ErrorAlertProps {
  title: string;
  description: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ title, description }) => {
  return (
    <Container>
      <SimpleGrid>
        <div>
          <Title color="red">
            <IconCircleXFilled size={25} />
            {title}
          </Title>
          <Text c="dimmed" size="lg">
            {description}
          </Text>
        </div>
      </SimpleGrid>
    </Container>
  );
};

export default ErrorAlert;
