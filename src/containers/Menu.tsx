import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { Burger, createStyles, Group, Paper, rem, Transition } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { MenuLink } from "../constants/menuLinks";

const HEADER_HEIGHT = rem(90);

const useStyles = createStyles((theme) => ({
  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none"
    }
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md
    }
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color
    }
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none"
    }
  },
  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none"
    }
  }

}));

type MenuProps = {
  links: MenuLink[];
};

const Menu: React.FC<MenuProps> = ({ links }) => {
  const { pathname } = useLocation();
  const { classes, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map(({ link, label }) => (
    <Link
      to={link}
      key={link}
      className={cx(classes.link, { [classes.linkActive]: pathname === link })}
    >
      {label}
    </Link>
  ));

  return (
    <Fragment>
      <Group
        spacing={5}
        className={classes.links}
      >
        {items}
      </Group>

      <Burger
        opened={opened}
        onClick={toggle}
        className={classes.burger}
        size="sm"
      />

      <Transition
        transition="pop-top-right"
        duration={200}
        mounted={opened}
      >
        {(styles) => (
          <Paper
            className={classes.dropdown}
            withBorder
            style={styles}
          >
            {items}
          </Paper>
        )}
      </Transition>
    </Fragment>
  );
};

export default Menu;
