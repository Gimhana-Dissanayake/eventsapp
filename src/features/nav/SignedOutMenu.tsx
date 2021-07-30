import React from "react";
import { Button, Menu } from "semantic-ui-react";

interface Props {
  setAuthenticated: (value: boolean) => void;
}

const SignedOutMenu = (props: Props) => {
  return (
    <Menu.Item position="right">
      <Button
        basic
        inverted
        content="Login"
        onClick={() => props.setAuthenticated(true)}
      />
      <Button
        basic
        inverted
        content="Register"
        style={{ marginLeft: "0.5em" }}
      />
    </Menu.Item>
  );
};

export default SignedOutMenu;
