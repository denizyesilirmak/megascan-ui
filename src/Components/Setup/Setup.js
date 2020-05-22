import React, { Component } from 'react'
import './Setup.css'
import ChangeLanguage from '../ChangeLanguage/ChangeLanguage'
import DateSelection from '../Settings/SettingsPopups/Date/DatePopup'
import TimeSelection from '../Settings/SettingsPopups/Time/TimePopup'


/**
 *
 *
 * @class Setup
 * @extends {Component}
 */

class Setup extends Component {
  constructor(props) {
    super(props)
    this.currentDate = new Date();
    console.log(this.currentDate)

    this.state = {
      currentPage: 0,
      hour: this.currentDate.getHours(),
      minute: this.currentDate.getMinutes(),
      day: this.currentDate.getDate(),
      month: this.currentDate.getMonth(),
      year: this.currentDate.getFullYear(),
      selectedTimeIndex: 2 * 200,
      selectedDateIndex: 3 * 200,
    }
  }



  renderSetupScreen = () => {
    switch (this.state.currentPage) {
      case 0: return <ChangeLanguage />
      case 1: return <DateSelection index={this.state.selectedDateIndex % 3} day={this.state.day} month={this.state.month} year={this.state.year} />
      case 2: return <TimeSelection index={this.state.selectedTimeIndex % 2} hour={this.state.hour} minute={this.state.minute} />

      default:
        break;
    }
  }


  render() {
    return (
      <div className="setup component">
        {
          this.renderSetupScreen()
        }
      </div>
    )
  }
}
export default Setup