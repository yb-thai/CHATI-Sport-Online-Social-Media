import React, {Component} from 'react';
import getCookie from 'js-cookie';

// CSRF ...
// https://docs.djangoproject.com/en/3.0/ref/csrf/#ajax
var csrftoken = getCookie( 'csrftoken' );

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};

export default class App extends Component {
  constructor( props, context ){
    super( props, context );
    this.state = {
      username: ''
    };

    this.onChange = this.onChange.bind( this )
    this.onSubmit = this.onSubmit.bind( this )
  }

  onChange = ( e )=> {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit = ( e )=> {
    e.preventDefault();

    fetch( 'http://127.0.0.1:8000/user/', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.username + "@none.com"
      })
    });
  }

  render() {
    return (
      <div>
        <form onSubmit = { this.onSubmit }>
          <label>Name:
          <input
            type="text"
            value={this.state.value}
            name="username"
            onChange={this.onChange}
          />
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}