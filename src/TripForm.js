import React from 'react';

class TripForm extends React.Component {

    constructor() {
        super()
        state = {
            name: '',
            budget: 0
        }
    }

    saveTrip = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/trips", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Token": localStorage.getItem("token")
          },
          body: JSON.stringify(this.state)
        }).then(res => res.json())
        .then(json => {
          if (json.errors) {
            this.setState({ errors: json.errors })
            console.log("oops, didn't work")
          } else {
            // add addTrip to DayCard
            // this.props.addDog(json)
          }
        })
      }

    displayErrors = () => {
        if (this.state.errors.length > 0) {
          debugger;
          return (
            <div className='trip-form-errors'>
              <p>Invalid!</p>
              <ul>
                { this.state.errors.map(err => <li>{err}</li>) }
              </ul>
            </div>
          )
        } else {
          return null;
        }
      }

    render() {
        return (
            <form className="trip-form" onSubmit={this.saveTrip}>
            { this.displayErrors() }
            <div class="field">
              <label>Name</label>
              <input type="text" name="name" placeholder="Name"
                onChange={(e) => this.setState({ name: e.target.value })} />
            </div>
            <div class="field">
              <label>Budget</label>
              <input type="text" name="budget" placeholder="Budget"
                onChange={(e) => this.setState({ description: e.target.value })} />
            </div>
            
            <button class="ui button" type="submit">Submit</button>
          </form>
        )
    }
}

export default TripForm;