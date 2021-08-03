import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
  inverted?: boolean;
  content?: string;
}

const LoadingComponent = (props: Props) => {
  return (
    <Dimmer inverted={!!props.inverted} active={true}>
      <Loader content={props.content || "Loading..."} />
    </Dimmer>
  );
};

export default LoadingComponent;
