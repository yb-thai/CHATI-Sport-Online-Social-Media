import React from "react";
import "./CreateEventPage.scss";
import Calendar from "./Calendar"
import { Component } from 'react';




class form extends Component {


    constructor(props) {
        super(props);
        this.state = {
          title: props.event.title,
          location: props.event.location,
          description: props.event.description,
          date: new Date(props.event.start),
          price: props.event.price
        }
        this._id = props.id
    
      }



OnEditEvent = (e) => {
// add entity - POST
e.preventDefault();

// Create event post to backend
fetch("http://chatispu.herokuapp.com/api/events/" + this.props.id + "/", {
  "method": "PUT",
  "headers": {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${localStorage.token}`,
  },
  'body': JSON.stringify({
    title: this.state.title,
    description: this.state.description,
    location: this.state.location,
    start: this.state.date.toISOString(),
    price: this.state.price,
    members: [ localStorage.userPK ]
  })
})
.then(response => response.json())
.then(response => {
console.log(response)
this.closePopUp();
})
.catch(err => {
console.log(err);
});

setTimeout(() => {
  window.location.reload();
  }, 500);
}



  UpdateTitle = (event) => {
    this.state.title = event.target.value;
  }

  UpdateDescription = (event) => {
    this.state.description = event.target.value;
  }

  UpdateDate = (date) => {
    this.state.date = date;
  }

  UpdateLocation = (event) => {
    this.state.location = event.target.value;
  }

  UpdatePrice = (event) => {
    this.state.price = event.target.value;
  }

    render(){
        return (
                <div>
                        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter event name"
            name="title"
            defaultValue={this.state.title}
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
            defaultValue={this.state.description}
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
            defaultValue={this.state.location}
            onChange={this.UpdateLocation}
          />
        </div>

        <div className="form-group">
          <label>Event Date:</label>

          <Calendar  updateDateMethod={this.UpdateDate} date={this.state.date}> </Calendar>

        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="text"
            className="form-control"
            placeholder="What is Price"
            name="price"
            onChange={this.UpdatePrice}
            defaultValue={this.state.price}
          />
        </div>


        <div className="eventBtn">
          <button className="btn btn-primary" onClick={this.OnEditEvent}>save change</button>
        </div>


                </div>
        );
    }

}

export default form