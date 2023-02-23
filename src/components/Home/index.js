import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LocationPlace from '../LocationPlace'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusCall = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    packageList: [],
    apiStatus: apiStatusCall.initial,
  }

  componentDidMount() {
    this.getTravelPlace()
  }

  getTravelPlace = async () => {
    this.setState({apiStatus: apiStatusCall.inProgress})
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const newPackage = data.packages

      const updatePackage = newPackage.map(each => ({
        id: each.id,
        description: each.description,
        name: each.name,
        imageUrl: each.image_url,
      }))
      this.setState({
        packageList: updatePackage,
        apiStatus: apiStatusCall.success,
      })
    }
  }

  renderPackageList = () => {
    const {packageList} = this.state
    console.log(packageList)

    return (
      <div>
        <ul className="list">
          {packageList.map(each => (
            <LocationPlace placeDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailure = () => (
    <div>
      <h1>sudher</h1>
    </div>
  )

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="TailSpin" color="#52bbf0" width={80} height={80} />
    </div>
  )

  renderAplStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusCall.success:
        return this.renderPackageList()
      case apiStatusCall.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="title">Travel Guide</h1>
        <hr className="horizontal-line" />
        {this.renderAplStatus()}
      </div>
    )
  }
}

export default Home
