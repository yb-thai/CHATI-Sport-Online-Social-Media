import React from "react";
import { Component } from "react";
import PersonIcon from "@material-ui/icons/Person";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import EventIcon from "@material-ui/icons/Event";
import "./ListEvent.scss";
import CreateEventPage from "./CreateEventPage";
import EditEvent from "./EditEvent";

class ListEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
    };
  }

  async componentDidMount() {
    fetch( "http://chatispu.herokuapp.com/api/events/", {
      "method": "GET",
      "headers": {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.token}`,
      }
    })
      .then((response) => response.json())
      .then((response) => {
        let tmpArray = [];
        for (var i = 0; i < response.results.length; i++) {
          tmpArray.push(response.results[i]);
        }
        this.setState({
          eventList: tmpArray,
        });
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h2>Events:</h2>
        <hr></hr>

        <div className="event-list">
          {this.state.eventList.map((event) => {
            var dateString = new Date(event.start);
            var startTime = dateString.toLocaleString();

            return (
              <ul key={event._id}>
                <h4>Details</h4>
                <li>
                  {" "}
                  <EventIcon></EventIcon> {event.title}{" "}
                </li>
                <li>
                  {" "}
                  <PersonIcon></PersonIcon> {event.owner}{" "}
                </li>
                <li>
                  <LocationOnIcon></LocationOnIcon>
                  {event.location}{" "}
                </li>
                <li>
                  {" "}
                  <WatchLaterIcon></WatchLaterIcon>
                  {startTime}
                </li>
                <li>
                  <ConfirmationNumberIcon></ConfirmationNumberIcon>
                  {event.price}
                </li>
                <div className="button">
                  <EditEvent event={event} id={event._id}></EditEvent>
                </div>
              </ul>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ListEvents;
