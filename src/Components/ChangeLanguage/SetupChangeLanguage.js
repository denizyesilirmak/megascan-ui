import React, { Component } from 'react'
import './SetupChangeLanguage.css'
import flag_ar from '../../Assets/Flags/ar.png'
import flag_de from '../../Assets/Flags/de.png'
import flag_en from '../../Assets/Flags/en.png'
import flag_es from '../../Assets/Flags/es.png'
import flag_fa from '../../Assets/Flags/fa.png'
import flag_fr from '../../Assets/Flags/fr.png'
import flag_it from '../../Assets/Flags/it.png'
import flag_tr from '../../Assets/Flags/tr.png'
import select from '../../Assets/MenuIcons/button-indicator.png'

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

class SetupChangeLanguage extends Component {
  render() {
    return (
      <div className="setup-change-language">
        <div className="setup-languages">
          {
            LANGUAGES.map((e, i) => {
              return (
                <div className="setup-language">
                  {
                    <img alt="select" className="setup-lan-selected" src={select} />
                  }
                  <img alt="flag" className="setup-lan-image" src={e.flag} />
                </div>
              )
            })
          }

        </div>
      </div>
    )
  }
}
export default SetupChangeLanguage