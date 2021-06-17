import React from "react";
import "./EventPage.scss";
import CreateEventPage from "./CreateEventPage";
import EventList from "./ListEvent"
import Popup from "./popup"
import { useState } from 'react';
import Calendar from './Calendar'





function EventPage(props) {

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }


  return (
    <div>


      <div className="text-center">
        <h4>Event Page</h4>
      </div>


      <hr />

      <input
        type="button"
        value="Create"
        onClick={togglePopup}
      />


      {isOpen && <Popup
        content={<>

          <CreateEventPage closePopUp={togglePopup} title="" location="" description="" date="" price=""></CreateEventPage>

        </>}
        handleClose={togglePopup}
      />}

      <EventList></EventList>

    </div>
  );
}



export default EventPage;
