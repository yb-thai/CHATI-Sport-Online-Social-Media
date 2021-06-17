import React from "react";
import Button from "react-bootstrap/Button";

export const EventList = ({ title, description }) => {
  return (
    <article className="events">
      <h1> {title} </h1>
      <h4> {description} </h4>
    </article>
  );
};

export default EventList;
