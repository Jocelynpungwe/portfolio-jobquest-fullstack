import { useState } from 'react'
import { FormRow } from '../../components'
import Wrapper from '../../assets/wrapper/DashboardFormPage'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updateUser, uploadUserProfile } from '../../features/user/userSlice'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, lastName, location } = userData

    if (!name || !email || !lastName) {
      toast.error('Please Fill Out All Fields')
      return
    }

    dispatch(updateUser({ name, email, lastName, location }))
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setUserData((prevData) => {
      return { ...prevData, [name]: value }
    })
  }

  const handleFileChange = (e) => {
    const imageFile = e.target.files[0]
    const formData = new FormData()
    formData.append('image', imageFile)
    dispatch(uploadUserProfile(formData))
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <img
          src={user.profile}
          alt="user profile"
          className="dashboard-user-profile"
        />
        <div className="form-center">
          <FormRow
            type="file"
            name="profile"
            accept="image/*"
            labelText="Profile Picture"
            handleChange={handleFileChange}
          />
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            handleChange={handleChange}
          />

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile