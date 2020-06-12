import React, { Component } from 'react'
import './ChangeLanguage.css'
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

class ChangeLanguage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 12 * 900
    }
  }

  async componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    const currentLang = (await dbStorage.getItem("lang"))
    const indexOfCurrentLang = LANGUAGES.findIndex(a => a.code === currentLang)
    this.setState({
      activeIndex: 12 * 900 + indexOfCurrentLang
    })
  }

  handleKeyDown = async (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempActiveIndex = this.state.activeIndex

    switch (socketData.payload) {
      case 'left':
        tempActiveIndex--
        break
      case 'right':
        tempActiveIndex++
        break
      case 'up':
        tempActiveIndex = tempActiveIndex - 6
        break
      case 'down':
        tempActiveIndex = tempActiveIndex + 6
        break
      case 'ok':
        console.log(LANGUAGES[this.state.activeIndex%12].code)

        this.props.setLanguage(LANGUAGES[this.state.activeIndex%12].code)
        await dbStorage.setItem("lang", LANGUAGES[this.state.activeIndex%12].code)
        this.props.navigateTo("settingsScreen")
        return
      case 'back':
        this.props.navigateTo("settingsScreen")
        break
      default:
        break
    }

    this.setState({
      activeIndex: tempActiveIndex,
    })
  }


  render() {
    return (
      <div className="change-language component">
        <div className="languages">
          {
            LANGUAGES.map((e, i) => {
              // console.log(e)
              return (
                <div key={i} className={`language ${this.state.activeIndex % 12 === i ? "selected" : ''}`}>
                  <img src={e.flag} alt="language"></img>
                  <div className="language-title">{e.name}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default ChangeLanguage