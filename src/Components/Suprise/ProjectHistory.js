import React from 'react'
import "./ProjectHistory.css"
import Logs from './Logs.json'
import SocketHelper from '../../SocketHelper'

class ProjectHistory extends React.Component {
  constructor(props) {
    super(props)

    this.cursor = 0

    this.state = {
      activeCommit: { date: '-', commit: '' }
    }

  }

  getMessage = (index) => {
    this.cursor++
    if (this.cursor === Logs.length - 1) {
      this.cursor = 0
    }
    const date = new Date(Logs[index].date * 1000)

    this.setState({
      activeCommit: { date: date.toLocaleString(), commit: Logs[index].commit, }
    })
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)

  }

  componentWillUnmount() {
    clearInterval(this.interval)
    SocketHelper.detach()
  }

  handleSocket = (data) => {
    if (data.type === 'button' && data.payload === 'back') {
      this.props.navigateTo('lockerScreen')
    }
  }

  render() {
    return (
      <div className="project-history component">
        <div className="commit" onAnimationIteration={(a) => this.getMessage(this.cursor)}>
          <div className="commit-date">{this.state.activeCommit.date}</div>
          <div className="commit-message">{this.state.activeCommit.commit}</div>

        </div>
      </div>
    )
  }
}

export default ProjectHistory