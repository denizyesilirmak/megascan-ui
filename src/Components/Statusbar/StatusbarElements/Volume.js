import React from 'react';
import volume_icon0 from '../../../Assets/MenuIcons/volume/vol0.png'
import volume_icon1 from '../../../Assets/MenuIcons/volume/vol1.png'
import volume_icon2 from '../../../Assets/MenuIcons/volume/vol2.png'
import volume_icon3 from '../../../Assets/MenuIcons/volume/vol3.png'
import { DeviceContext } from '../../../Contexts/DeviceContext'


class Volume extends React.Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.state = {
      volume: 20
    }
  }

  componentDidMount() {

  }

  setIcon = () => {
    if (this.props.generalVolume > 75)
      return volume_icon3
    else if (this.props.generalVolume > 50)
      return volume_icon2
    else if (this.props.generalVolume >= 1)
      return volume_icon1
    else if (this.props.generalVolume === 0)
      return volume_icon0
    else return volume_icon0
  }

  render() {
    return (
      <div style={{ marginRight: 7 }}>
        <img alt="volume" src={this.setIcon()}></img>
      </div>
    )
  }
}

export default Volume