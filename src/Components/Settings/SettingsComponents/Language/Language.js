import React, { Component } from 'react'
import './Language.css'
import Carousel from '../../../Carousel/Carousel'


import Flag_en from '../../../../Assets/Flags/en.png'
import Flag_ar from '../../../../Assets/Flags/ar.png'
import Flag_fr from '../../../../Assets/Flags/fr.png'
import Flag_fa from '../../../../Assets/Flags/fa.png'
import Flag_tr from '../../../../Assets/Flags/tr.png'

class Language extends Component {



  constructor(props) {
    super(props)

    this.state = {
      index: -1
    }

    this.buttons = [
      {
        name: "English",
        icon: Flag_en,
        screenName: "english"
      },
      {
        name: "Turkish",
        icon: Flag_tr,
        screenName: "turkish"
      },
      {
        name: "Arabic",
        icon: Flag_ar,
        screenName: "arabic"
      },
      {
        name: "French",
        icon: Flag_fr,
        screenName: "french"
      },
      {
        name: "Persian",
        icon: Flag_fa,
        screenName: "persian"
      },
    ]
  }

  componentDidMount(){
    setInterval(() => {
      this.setState({
        index: this.state+1
      })
    }, 1500);
  }

  render() {
    return (
      <div className="language-component">
        <div>
          <Carousel buttons={this.buttons} index={this.state.index} />
        </div>
      </div>
    )
  }

}
export default Language