import { Container, createStyles, Group, rem } from "@mantine/core";

import Menu from "./Menu";
import UserPanel from "./UserPanel";
import { menuLinks } from "../constants/menuLinks";
import logo from "../assets/images/logo.png";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    marginBottom: rem(120)
  },

  mainSection: {
    paddingBottom: theme.spacing.sm
  }
}));

const Header = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <img
            src={logo}
            width={300}
            height={66}
          />
          <Menu links={menuLinks} />
          <UserPanel />
        </Group>
      </Container>
    </div>
  );
};

export default Header;
