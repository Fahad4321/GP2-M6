import React from 'react'
import { Box, Button, TextField } from '@mui/material'
import { getToken } from '../../../helper/sessionStorage';
import axios from 'axios';
import withAuth from "../../../middleware/withAuth";
import {message} from "antd";

const ChangePassword = ()=> {
  const [inputs, setInputs] = React.useState({});
  const [token, setToken] = React.useState('')
  const [helder, setHelder] = React.useState('')

  const pushPasswordChange = async () => {
    try {
      const AuthToken = { headers: { 'Authorization': `Bearer ${token}` } }
      await axios.patch(`${process.env.NEXT_PUBLIC_URL}/auth/password`, inputs, AuthToken)

      message.success(data?.message)
      
    } catch (err) {

      message.error(err?.response?.data?.error)

      console.error(err?.response?.data?.error)
    }
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    pushPasswordChange(inputs);
  }

  React.useEffect(() => {
    const gettoken = getToken()
    setToken(gettoken)
  }, [])




  return (
    <div>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl leading-tight text-blue-700">Change Password</h1>
          </div>
        </header>
        <main>
          <div className="max-w-xl mx-auto py-6 lg:px-8">
            <div className="sm:px-0 lg:flex md:flex sm:block">
              <Box>
                <Box>
                  <Box onSubmit={handleSubmit} component='form' sx={{ maxWidth: '500px' }} className='space-y-4'>
                    <TextField
                      type='password'
                      name="oldPassword"
                      value={inputs.oldPassword || ""}
                      onChange={handleChange}
                      label='Old Password' fullWidth size='medium' required />
                    <TextField
                      type='password'
                      name="password"
                      value={inputs.password || ""}
                      onChange={handleChange}
                      label='New Password' fullWidth size='medium' />
                    <TextField
                      type='password'
                      name="confirmPassword"
                      value={inputs.confirmPassword || ""}
                      onChange={handleChange}
                      label='Confirm Password' fullWidth size='medium' />
                    <Button className='block' variant='outlined' type='submit'>Update</Button>
                  </Box>
                </Box>
              </Box>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default withAuth(ChangePassword)