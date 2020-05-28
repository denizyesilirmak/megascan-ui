import React, { Component } from 'react'
import './Setup.css'
import ChangeLanguage from '../ChangeLanguage/SetupChangeLanguage'
import DateSelection from '../Settings/SettingsPopups/Date/DatePopup'
import TimeSelection from '../Settings/SettingsPopups/Time/TimePopup'
import FinishSetup from './FinishSetup'
import socketHelper from '../../SocketHelper'
import dbStorage from '../../DatabaseHelper'

import flag_ar from '../../Assets/Flags/ar.png'
import flag_de from '../../Assets/Flags/de.png'
import flag_en from '../../Assets/Flags/en.png'
import flag_es from '../../Assets/Flags/es.png'
import flag_fa from '../../Assets/Flags/fa.png'
import flag_fr from '../../Assets/Flags/fr.png'
import flag_it from '../../Assets/Flags/it.png'
import flag_tr from '../../Assets/Flags/tr.png'
import flag_iw from '../../Assets/Flags/iw.png'
import flag_ur from '../../Assets/Flags/ur.png'
import flag_zh from '../../Assets/Flags/zh.png'
import flag_ru from '../../Assets/Flags/ru.png'

const LANGUAGES = [
  {
    code: "ar",
    name: "العربية",
    flag: flag_ar
  },
  {
    code: "de",
    name: "Deutsch",
    flag: flag_de
  },
  {
    code: "en",
    name: "English",
    flag: flag_en
  },
  {
    code: "es",
    name: "Español",
    flag: flag_es
  },
  {
    code: "fa",
    name: "فارسی",
    flag: flag_fa
  },
  {
    code: "fr",
    name: "Français",
    flag: flag_fr
  },
  {
    code: "it",
    name: "Italiano",
    flag: flag_it
  },
  {
    code: "tr",
    name: "Türkçe",
    flag: flag_tr
  },
  {
    code: "iw",
    name: "עברית",
    flag: flag_iw
  },
  {
    code: "ur",
    name: "	اُردُو",
    flag: flag_ur
  },
  {
    code: "zh",
    name: "Chinese",
    flag: flag_zh
  },
  {
    code: "ru",
    name: "	Русский язык",
    flag: flag_ru
  }
]

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
      month: this.currentDate.getMonth() + 1,
      year: this.currentDate.getFullYear(),
      selectedTimeIndex: 2 * 200,
      selectedDateIndex: 3 * 200,

      languageCursor: 12 * 100
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
  }

  handleKeyDown = async (socketData) => {
    if (socketData.type !== "button") return
    switch (socketData.payload) {
      case 'up':
        if (this.state.currentPage === 0) {
          this.setState({
            languageCursor: this.state.languageCursor - 6
          })
        }
        else if (this.state.currentPage === 1) {
          if (this.state.selectedDateIndex % 3 === 0 && this.state.day < 31) {
            //change day
            this.setState({
              day: this.state.day + 1
            })
          }
          else if (this.state.selectedDateIndex % 3 === 1 && this.state.month < 12) {
            //change month
            this.setState({
              month: this.state.month + 1
            })
          }
          else if (this.state.selectedDateIndex % 3 === 2 && this.state.year < 2200) {
            //change month
            this.setState({
              year: this.state.year + 1
            })
          }
        }
        else if (this.state.currentPage === 2) {
          if (this.state.selectedTimeIndex % 2 === 0 && this.state.hour < 23) {
            //change hour
            this.setState({
              hour: this.state.hour + 1
            })
          }
          else if (this.state.selectedTimeIndex % 2 === 1 && this.state.minute < 59) {
            //change minutes
            this.setState({
              minute: this.state.minute + 1
            })
          }
        }
        break;
      case 'down':
        if (this.state.currentPage === 0) {
          this.setState({
            languageCursor: this.state.languageCursor + 6
          })
        }
        else if (this.state.currentPage === 1) {
          if (this.state.selectedDateIndex % 3 === 0 && this.state.day > 1) {
            //change day
            this.setState({
              day: this.state.day - 1
            })
          }
          else if (this.state.selectedDateIndex % 3 === 1 && this.state.month > 1) {
            //change month
            this.setState({
              month: this.state.month - 1
            })
          }
          else if (this.state.selectedDateIndex % 3 === 2 && this.state.year > 1950) {
            //change year
            this.setState({
              year: this.state.year - 1
            })
          }
        }
        else if (this.state.currentPage === 2) {

          if (this.state.selectedTimeIndex % 2 === 0 && this.state.hour > 0) {
            //change hour
            this.setState({
              hour: this.state.hour - 1
            })
          }
          else if (this.state.selectedTimeIndex % 2 === 1 && this.state.minute > 0) {
            //change minutes
            this.setState({
              minute: this.state.minute - 1
            })
          }
        }
        break;
      case 'left':
        if (this.state.currentPage === 0) {
          this.setState({
            languageCursor: this.state.languageCursor - 1
          })
        }
        else if (this.state.currentPage === 1) {
          this.setState({
            selectedDateIndex: this.state.selectedDateIndex - 1
          })
        }
        else if (this.state.currentPage === 2) {
          this.setState({
            selectedTimeIndex: this.state.selectedTimeIndex - 1
          })
        }
        break;
      case 'right':
        if (this.state.currentPage === 0) {
          this.setState({
            languageCursor: this.state.languageCursor + 1
          })
        }
        else if (this.state.currentPage === 1) {
          this.setState({
            selectedDateIndex: this.state.selectedDateIndex + 1
          })
        }
        else if (this.state.currentPage === 2) {
          this.setState({
            selectedTimeIndex: this.state.selectedTimeIndex + 1
          })
        }
        break;
      case 'ok':
        if (this.state.currentPage === 0) {
          await dbStorage.setItem("lang", LANGUAGES[this.state.languageCursor % 12].code)
          this.props.setLanguage(LANGUAGES[this.state.languageCursor % 12].code)
          console.log(LANGUAGES[this.state.languageCursor % 12].code + " set")
          this.setState({
            currentPage: 1
          })
        }
        else if (this.state.currentPage === 1) {
          console.log(`${this.state.year}.${this.state.month}.${this.state.day}-${this.state.hour}:${this.state.minute}:00`)
          socketHelper.send(`date#${this.state.year}.${this.state.month}.${this.state.day}-${this.state.hour}:${this.state.minute}:00`)
          this.setState({
            currentPage: 2
          })
        }
        else if (this.state.currentPage === 2) {
          console.log(`${this.state.year}.${this.state.month}.${this.state.day}-${this.state.hour}:${this.state.minute}:00`)
          socketHelper.send(`date#${this.state.year}.${this.state.month}.${this.state.day}-${this.state.hour}:${this.state.minute}:00`)
          await dbStorage.setItem('setupCompleted', true)
          this.setState({
            currentPage: 3
          })
        }
        break;
      case 'back':
        if (this.state.currentPage === 1 || this.state.currentPage === 2) {
          this.setState({
            currentPage: this.state.currentPage - 1
          })
        }
        break;

      default:
        break;
    }
  }

  renderSetupScreen = () => {
    switch (this.state.currentPage) {
      case 0: return <ChangeLanguage cursor={this.state.languageCursor % 12} languages={LANGUAGES} />
      case 1: return <DateSelection index={this.state.selectedDateIndex % 3} day={this.state.day} month={this.state.month} year={this.state.year} />
      case 2: return <TimeSelection index={this.state.selectedTimeIndex % 2} hour={this.state.hour} minute={this.state.minute} />
      case 3: return <FinishSetup navigateTo={this.props.navigateTo} />

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