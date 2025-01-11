import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const profileStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class ProfileCard extends Component {
  state = {profileStatus: profileStatusConstants.loading, profileDetails: []}

  componentDidMount() {
    this.getProfileDetails()
  }

  renderProfile = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  onProfileSuccess = profileDetails => {
    this.setState({
      profileDetails,
      profileStatus: profileStatusConstants.success,
    })
  }

  onProfileFailure = () => {
    this.setState({profileStatus: profileStatusConstants.failure})
  }

  getProfileDetails = async () => {
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    this.setState({profileStatus: profileStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        profileImageUrl: data.profile_details.profile_image_url,
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
      }
      this.onProfileSuccess(updatedData)
    } else {
      this.onProfileFailure()
    }
  }

  render() {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case profileStatusConstants.loading:
        return (
          <div className="profile-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case profileStatusConstants.failure:
        return (
          <div className="profile-container">
            <button
              className="profile-button"
              type="button"
              onClick={this.getProfileDetails}
            >
              Retry
            </button>
          </div>
        )
      case profileStatusConstants.success:
        return this.renderProfile()
      default:
        return null
    }
  }
}
export default ProfileCard
