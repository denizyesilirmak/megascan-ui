import React, { Component } from 'react'
import './ChangeLanguage.css'
import socketHelper from '../../SocketHelper'

import flag_ar from '../../Assets/Flags/ar.png'
import flag_de from '../../Assets/Flags/de.png'
import flag_en from '../../Assets/Flags/en.png'
import flag_es from '../../Assets/Flags/es.png'
import flag_fa from '../../Assets/Flags/fa.png'
import flag_fr from '../../Assets/Flags/fr.png'
import flag_it from '../../Assets/Flags/it.png'
import flag_tr from '../../Assets/Flags/tr.png'

const LANGUAGES = [
  {
    code: "ar",
    name: "Arabic",
    flag: flag_ar
  },
  {
    code: "de",
    name: "German",
    flag: flag_de
  },
  {
    code: "en",
    name: "English",
    flag: flag_en
  },
  {
    code: "es",
    name: "Spanish",
    flag: flag_es
  },
  {
    code: "fa",
    name: "Persian",
    flag: flag_fa
  },
  {
    code: "fr",
    name: "French",
    flag: flag_fr
  },
  {
    code: "it",
    name: "Italian",
    flag: flag_it
  },
  {
    code: "tr",
    name: "Turkish",
    flag: flag_tr
  }
]

class ChangeLanguage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 8 * 900
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)

  }

  handleKeyDown = (socketData) => {
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
        tempActiveIndex = tempActiveIndex - 4
        break
      case 'down':
        tempActiveIndex = tempActiveIndex + 4
        break
      case 'ok':
        console.log(LANGUAGES[this.state.activeIndex%8].code)
        this.props.setLanguage(LANGUAGES[this.state.activeIndex%8].code)
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
              return (
                <div key={i} className={`language ${this.state.activeIndex % 8 === i ? "selected" : ''}`}>
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