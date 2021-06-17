import React from "react";
import "./EventPage.scss";
import CreateEventPage from "./CreateEventPage";
import Popup from "./popup";
import { useState } from "react";
import Calendar from "./Calendar";
import Form from "./form";

function EditEvent(props) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const onDeleteEvent = (e) => {
    // add entity - POST
    e.preventDefault();

    // Create event post to backend
    fetch("http://chatispu.herokuapp.com/api/events/" + props.id + "/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.closePopUp();
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  if (
    props.event.owner ==
    JSON.parse(localStorage.getItem("userInfo"))["username"]
  ) {
    return (
      <div>
        <input type="button" value="Edit" onClick={togglePopup} />

        <input type="button" value="Delete" onClick={onDeleteEvent} />

        {isOpen && (
          <Popup
            content={
              <>
                <Form event={props.event} id={props.id}></Form>
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default EditEvent;
