import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button } from "../../../../components";
import Calendar from "react-calendar";
import { setCurrentDate } from "../../../../action";
import { getTodayDate } from "../../../../utils";
import "react-calendar/dist/Calendar.css";

class ProgramsComponent extends Component {
  onChange = (date) => {
    // let dateTime = moment(date.getTime())
    //   .add(moment().hour(), "h")
    //   .add(moment().minute(), "m")
    //   .add(moment().second(), "s")
    //   .add(moment().millisecond(), "ms")
    //   .valueOf();
    this.props.setCurrentDate(date.getTime());
  };
  changeToday = () => {
    this.props.setCurrentDate(getTodayDate());
  };
  render() {
    return (
      <div className="programs-component">
        <Button
          align="left"
          lastFix={<i className="fa fa-sort-down"></i>}
          onClick={this.changeToday}
        >
          Programme du jour
        </Button>
        <Calendar
          onChange={this.onChange}
          value={new Date(this.props.mainPage.currentDate)}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ mainPage }) => ({
  mainPage,
});
export default withRouter(
  connect(mapStateToProps, {
    setCurrentDate,
  })(ProgramsComponent)
);
