import React from 'react'
import ReactDOM from 'react-dom'
import { GoogleLogin } from 'react-google-login'

const googleLogin = async (response): React.FC => {
  // login 로직 구현
  const option = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: {
      accessToken: response.accessToken
    },
    url: this.serverHost + '/auth/googleLogin'
  }

  try {
    return await axios(option)
  } catch (e) {
    throw e
  }
}

const onFailure = (response) => {
  console.log(response)
}

ReactDOM.render(
  <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={googleLogin}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />,
  document.getElementById('googleButton')
)
