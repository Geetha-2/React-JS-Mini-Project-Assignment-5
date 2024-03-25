import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const homeIcon = <AiFillHome className="icons" />
const jobIcon = <BsFillBriefcaseFill className="icons" />
const logoutBtn = <FiLogOut className="icons" />

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="navbar-bg-container">
      <div className="nav-content-container-lg">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>

        <ul className="nav-menu">
          <Link to="/" className="nav-link">
            <li className="nav-list">Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="nav-list">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>

      <div className="nav-content-container-sm">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="nav-menu">
          <li className="nav-list-sm">
            <Link to="/" className="nav-link">
              {homeIcon}
            </Link>
          </li>
          <li className="nav-list-sm">
            <Link to="/jobs" className="nav-link">
              {jobIcon}
            </Link>
          </li>
          <li className="nav-list-sm">
            <button
              type="button"
              className="logout-button-sm"
              onClick={onClickLogout}
            >
              {logoutBtn}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
