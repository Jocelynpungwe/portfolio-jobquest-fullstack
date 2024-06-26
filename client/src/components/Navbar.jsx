import React from 'react'
import Wrapper from '../assets/wrapper/Navbar'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import Logo from './Logo'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSideBar, clearStore } from '../features/user/userSlice'

const Navbar = () => {
  const { user } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const [showLogout, setShowLogout] = useState(false)

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => dispatch(toggleSideBar())}
        >
          <FaAlignLeft />
        </button>
        <div>
          <div className="logo">
            <Logo page="navbar" />
          </div>
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout((prevData) => !prevData)}
          >
            <img
              src={user.profile}
              alt="user profile"
              className="profile-picture"
            />
            {user.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(clearStore('Logout Successful...'))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
