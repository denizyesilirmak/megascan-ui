import React, { Component } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Power.css'


import PowerSavingIcon from '../../../../Assets/MenuIcons/power-saving.png'
import Switch from '../../SettingsElements/Switch';

class Power extends Component {
  constructor(props) {
    super(props)
    this.state = {
      percentage: 50
    }
  }
  componentDidMount() {
    // setInterval(() => {      
    //   this.setState({
    //     percentage: Math.trunc(Math.random()*100)
    //   })
    // }, 1000);
  }

  render() {
    return (
      <div className="power-settings-component">
        <div className="progress">
          <CircularProgressbar
            value={this.state.percentage}
            text={`${this.state.percentage}%`}
            counterClockwise
            styles={{
              path: {
                stroke: `#d3be7b`,
                transition: 'stroke-dashoffset 0.5s ease 0s',
                strokeLinecap: 'butt'
              },
              trail: {
                stroke: 'rgba(255,255,255,0)',
              },
              text: {
                fill: '#d3be7b',
                fontSize: '18px',
              }
            }}
          />
        </div>
        <section>
          <img src={PowerSavingIcon} alt="power-saver"></img>
          <div className="power-saver-title"> Power Saving </div>
        </section>
        <section>
          <Switch on={false} />
        </section>
      </div>
    )
  }
}

export default Power