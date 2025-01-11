import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onLoginForm = async event => {
    event.preventDefault()
    const apiUrl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const creds = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(creds),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.setState({
        username: '',
        password: '',
        showErrorMsg: true,
        errorMsg: data.error_msg,
      })
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <form className="login-form" onSubmit={this.onLoginForm}>
          <img
            className="login-page-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <label className="login-label" htmlFor="username" value={username}>
            USERNAME
          </label>
          <input
            className="login-page-input-box"
            type="text"
            placeholder="Username"
            id="username"
            value={username}
            onChange={this.onChangeUsername}
          />
          <label className="login-label" htmlFor="password" value={password}>
            PASSWORD
          </label>
          <input
            className="login-page-input-box"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={this.onChangePassword}
          />
          <button className="login-button" type="submit">
            Login
          </button>
          {showErrorMsg && <p className="login-error">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
