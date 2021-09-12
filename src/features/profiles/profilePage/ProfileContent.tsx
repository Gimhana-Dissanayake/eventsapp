import React from "react";
import { Tab } from "semantic-ui-react";
import AboutTab from "./AboutTab";
import EventsTab from "./EventsTab";
import PhotosTab from "./PhotosTab";

const ProfileContent = (props: any) => {
  const panes = [
    {
      menuItem: "About",
      render: () => (
        <AboutTab profile={props.profile} isCurrentUser={props.isCurrentUser} />
      ),
    },
    {
      menuItem: "Photos",
      render: () => (
        <PhotosTab
          profile={props.profile}
          isCurrentUser={props.isCurrentUser}
        />
      ),
    },
    { menuItem: "Events", render: () => <EventsTab /> },
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
