import React from 'react'
import './Compass.css'
import SocketHelper from '../../SocketHelper'
import CompassImg from '../../Assets/MenuIcons/compass.png'

class Compass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      compassAngle: 0
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
    this.sensorIntervar = setInterval(() => {
      SocketHelper.send('L')
    }, 120);
  }

  handleSocket = (socketData) => {
    if (socketData.type === 'lrlantenna') {
      this.setState({
        compassAngle: - parseInt(socketData.compass) + 360 + 260
      })
    }
  }

  render() {
    return (
      <div className="compass-calibraion component">
        <img src={CompassImg} alt="comp" className="compass-image" style={{transform: `rotate(${this.state.compassAngle}deg)`}}/> 
      </div>
    )
  }
}

export default Compass