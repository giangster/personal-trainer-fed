import React from "react";
import moment from "moment";

export default class Calendar extends React.Component {
  weekdayshort = moment.weekdaysShort();

  showCalendar = () => {
    let weekdayshortname = this.weekdayshort.map(day => {
      return (
        <th key={day} className="week-day">
          {day}
        </th>
      );
    });
  };

  render() {
    return (
      <div>
        <h2>Calendar</h2>
        {this.showCalendar}
      </div>
    );
  }
}
