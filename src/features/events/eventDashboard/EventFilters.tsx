import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

const EventFilters = (props: any) => {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%" }}>
        <Header icon="filter" attached color="teal" content="Filter" />
        <Menu.Item
          content="All Events"
          active={props.predicate.get("filter") === "all"}
          onClick={() => props.setPredicate("filter", "all")}
          disabled={props.loading}
        />
        <Menu.Item
          content="I'm going"
          active={props.predicate.get("filter") === "isGoing"}
          onClick={() => props.setPredicate("filter", "isGoing")}
          disabled={props.loading}
        />
        <Menu.Item
          content="I'm hosting"
          active={props.predicate.get("filter") === "isHosting"}
          onClick={() => props.setPredicate("filter", "isHosting")}
          disabled={props.loading}
        />
      </Menu>
      <Header icon="calendar" attached color="teal" content="Select date" />
      <Calendar
        onChange={(date: Date) => props.setPredicate("startDate", date)}
        value={props.predicate.get("startDate") || new Date()}
        tileDisabled={() => props.loading}
      />
    </>
  );
};

export default EventFilters;
