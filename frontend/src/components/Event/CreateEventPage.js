import React from "react";
import "./CreateEventPage.scss";
import Calendar from "./Calendar";
import { Component } from "react";

class CreateEventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      location: props.location,
      description: props.description,
      date: props.date,
      price: props.price,
    };
    this.closePopUp = props.closePopUp;
  }

  OnCreateEvent = (event) => {
    // add entity - POST
    event.preventDefault();

    console.log("Creating Event");

    fetch( "http://chatispu.herokuapp.com/api/events/",
    {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.token}`,
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        location: this.state.location,
        start: this.state.date.toISOString(),
        price: this.state.price,
        members: [ localStorage.userPK ]
      })
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

  UpdateTitle = (event) => {
    this.state.title = event.target.value;
  };

  UpdateDescription = (event) => {
    this.state.description = event.target.value;
  };

  UpdateDate = (date) => {
    this.state.date = date;
  };

  UpdateLocation = (event) => {
    this.state.location = event.target.value;
  };

  UpdatePrice = (event) => {
    this.state.price = event.target.value;
  };

  render() {
    return (
      <div className="jumbotron" style={{ margin: "1px 5px 0px 6px" }}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter event name"
            name="title"
            onChange={this.UpdateTitle}
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter event description"
            name="description"
            onChange={this.UpdateDescription}
          />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter location"
            name="location"
            onChange={this.UpdateLocation}
          />
        </div>

        <div className="form-group">
          <label>Event Date:</label>

          <Calendar updateDateMethod={this.UpdateDate} > </Calendar>

        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="text"
            className="form-control"
            placeholder="What is Price"
            name="price"
            onChange={this.UpdatePrice}
          />
        </div>

        <div className="eventBtn">
          <button onClick={this.OnCreateEvent} className="btn btn-primary">
            Create Event
          </button>
        </div>

        <div></div>
      </div>
    );
  }
}

export default CreateEventPage;
