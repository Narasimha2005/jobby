import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoHome} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickHomeButton = () => {
    const {history} = props
    history.push('/')
  }
  const onClickJobsButton = () => {
    const {history} = props
    history.push('/jobs')
  }
  const onClickLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navbar">
      <Link to="/login" type="button" className="header-button">
        <img
          className="main-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="menu-links-container">
        <Link to="/" className="menu-link">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="menu-link">
          <li>Jobs</li>
        </Link>
      </ul>
      <button
        type="button"
        className="logout-button"
        onClick={onClickLogoutButton}
      >
        Logout
      </button>
      <ul className="menu-buttons-small">
        <li>
          <button
            type="button"
            className="header-button"
            onClick={onClickHomeButton}
          >
            <IoHome className="menu-link-small" />
          </button>
        </li>
        <li>
          <button
            type="button"
            className="header-button"
            onClick={onClickJobsButton}
          >
            <BsBriefcaseFill className="menu-link-small" />
          </button>
        </li>
        <li>
          <button
            type="button"
            className="header-button"
            onClick={onClickLogoutButton}
          >
            <FiLogOut className="menu-link-small" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
