import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, createStyles, Group, Menu, rem, Text, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";

import { logout } from "../store/slices/authSlice";

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",
    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
    }
  },

  userActive: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
  }
}));

const UserPanel = () => {
  const { classes, theme, cx } = useStyles();
  const { username, isLogged } = useSelector(({ auth }) => auth);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogoutClick = () => dispatch(logout());

  if (!isLogged) {
    return (
      <Fragment>
        <Group>
          <Button
            variant="default"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
          <Button onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </Group>
      </Fragment>
    );
  }

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group spacing={7}>
            <Avatar
              alt={username}
              radius="xl"
              size={20}
            />
            <Text
              weight={500}
              size="sm"
              sx={{ lineHeight: 1 }}
              mr={3}
            >
              {username}
            </Text>
            <IconChevronDown
              size={rem(12)}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          color="red"
          icon={<IconLogout size="0.9rem" stroke={1.5} />}
          onClick={handleLogoutClick}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserPanel;
