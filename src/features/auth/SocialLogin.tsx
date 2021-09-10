import React from "react";
import { Button } from "semantic-ui-react";

const SocialLogin = () => {
  return (
    <>
      <Button
        icon="facebook"
        fluid
        color="facebook"
        content="Login with Facebook"
        style={{ marginBottom: 10 }}
      />
      <Button
        icon="google"
        fluid
        color="google plus"
        content="Login with Google"
      />
    </>
  );
};

export default SocialLogin;
