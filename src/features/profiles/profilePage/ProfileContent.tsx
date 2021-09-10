import React from "react";
import { Tab } from "semantic-ui-react";

const ProfileContent = (props: any) => {
  const panes = [
    { menuItem: "About", render: () => <Tab.Pane>About User</Tab.Pane> },
    { menuItem: "Photos", render: () => <Tab.Pane>Photos</Tab.Pane> },
    { menuItem: "Event", render: () => <Tab.Pane>Events</Tab.Pane> },
    { menuItem: "Followers", render: () => <Tab.Pane>Followers</Tab.Pane> },
    { menuItem: "Following", render: () => <Tab.Pane>Following</Tab.Pane> },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
};

export default ProfileContent;
