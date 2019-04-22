import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTraining: [],
      title: "",
      start: "",
      end: "",
      allDay: false,
      resource: ""
    };
  }

  componentDidMount = () => {
    this.getAllTrainings();
  };

  getAllTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(response =>
        response.map((response, index) => {
          const training = {
            title: response.activity,
            start: new Date(response.date),
            end: new Date(response.date),
            allDay: false,
            resource: ""
          };
          this.setState({ allTraining: [...this.state.allTraining, training] });
        })
      )
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div style={{ height: 700 }}>
        <BigCalendar
          localizer={localizer}
          events={this.state.allTraining}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    );
  }
}
