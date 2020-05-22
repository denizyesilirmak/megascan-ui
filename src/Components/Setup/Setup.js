import React, { Component } from 'react'
import './Setup.css'
import ChangeLanguage from '../ChangeLanguage/SetupChangeLanguage'
import DateSelection from '../Settings/SettingsPopups/Date/DatePopup'
import TimeSelection from '../Settings/SettingsPopups/Time/TimePopup'
import socketHelper from '../../SocketHelper'


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

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== "button") return
    switch (socketData.payload) {
      case 'up':

        break;
      case 'down':

        break;
      case 'left':

        break;
      case 'right':

        break;

      default:
        break;
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