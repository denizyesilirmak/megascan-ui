import React, { Component } from 'react'
import './ChangeLanguage.css'
import socketHelper from '../../SocketHelper'
import dbStorage from '../../DatabaseHelper'
import TickIcon from '../../Assets/MenuIcons/tick.png'

import flag_ar from '../../Assets/Flags/new/ar.png'
import flag_de from '../../Assets/Flags/new/de.png'
import flag_en from '../../Assets/Flags/new/en.png'
import flag_es from '../../Assets/Flags/new/es.png'
import flag_fa from '../../Assets/Flags/new/fa.png'
import flag_fr from '../../Assets/Flags/new/fr.png'
import flag_it from '../../Assets/Flags/new/it.png'
import flag_tr from '../../Assets/Flags/new/tr.png'
import flag_iw from '../../Assets/Flags/new/iw.png'
import flag_ur from '../../Assets/Flags/new/ur.png'
import flag_zh from '../../Assets/Flags/new/zh.png'
import flag_ru from '../../Assets/Flags/new/ru.png'

import { DeviceContext } from '../../Contexts/DeviceContext'
import availableLanguages from '../../AvailableLanguages.json'


const LANGUAGES = [
  {
    code: "en",
    name: "English",
    flag: flag_en
  },
  {
    code: "de",
    name: "Deutsch",
    flag: flag_de
  },
  {
    code: "es",
    name: "Español",
    flag: flag_es
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
    code: "ru",
    name: "	Русский язык",
    flag: flag_ru
  },
  {
    code: "tr",
    name: "Türkçe",
    flag: flag_tr
  },
  {
    code: "zh",
    name: "Chinese",
    flag: flag_zh
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
    code: "ar",
    name: "العربية",
    flag: flag_ar
  },
  {
    code: "fa",
    name: "فارسی",
    flag: flag_fa
  }
]

class ChangeLanguage extends Component {
  static contextType = DeviceContext

  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 12 * 900,
      popup: false
    }
  }

  async componentDidMount() {
    console.log(availableLanguages)
    socketHelper.attach(this.handleKeyDown)
    const currentLang = (await dbStorage.getItem("lang"))
    const indexOfCurrentLang = LANGUAGES.findIndex(a => a.code === currentLang)
    this.setState({
      activeIndex: 12 * 900 + indexOfCurrentLang
    })
  }

  componentWillUnmount() {
    socketHelper.detach()
  }

  handleKeyDown = async (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempActiveIndex = this.state.activeIndex

    switch (socketData.payload) {
      case 'left':
        if (this.state.popup === false) {
          tempActiveIndex--
        }
        break
      case 'right':
        if (this.state.popup === false) {
          tempActiveIndex++
        }
        break
      case 'up':
        if (this.state.popup === false) {
          tempActiveIndex = tempActiveIndex - 6
        }
        break
      case 'down':
        if (this.state.popup === false) {
          tempActiveIndex = tempActiveIndex + 6
        }
        break
      case 'ok':
        if (this.state.popup === false) {
          if (!availableLanguages.available_languages.includes(LANGUAGES[this.state.activeIndex % 12].code)) {
            return
          }
          this.setState({
            popup: true
          })
          this.props.setLanguage(LANGUAGES[this.state.activeIndex % 12].code)
          await dbStorage.setItem("lang", LANGUAGES[this.state.activeIndex % 12].code)
          try {
            setTimeout(() => {
              this.props.navigateTo("settingsScreen", null, 5)
            }, 3200);
          } catch (error) {
            console.log(error)
          }

        }



        return
      case 'back':
        if (this.state.popup === false) {
          try {
            socketHelper.detach()
            this.props.navigateTo("settingsScreen", null, 5)
          } catch (error) {
            // console.log(error)
          }
        }
        return
      default:
        break
    }

    this.setState({
      activeIndex: tempActiveIndex,
    })
  }

  renderOkPopup = () => {
    return (
      <div className="language-changed-popup">
        <img src={TickIcon} alt="tick"></img>
        <div className="text">
          {
            this.context.strings['languageChanged']
          }
        </div>
      </div>
    )
  }


  render() {
    return (
      <div className="change-language component">
        {
          this.state.popup ?
            this.renderOkPopup() : null
        }

        <div className="languages">
          {
            LANGUAGES.map((e, i) => {
              // console.log(e)
              return (
                <div key={i} style={{ background: this.state.activeIndex % 12 === i ? this.context.theme.button_bg_selected : null }} className={`language ${this.state.activeIndex % 12 === i ? "selected" : ''}`}>
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