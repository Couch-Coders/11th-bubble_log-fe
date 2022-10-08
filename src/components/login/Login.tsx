import React from 'react'
import { useEffect } from 'react'

const Login: React.FC() {
  function handleCallbackRespose(response) {
    
  }
  useEffect(() => {
    /*global google login*/
    google.accounts.id.initialize({
      client_id: "677203748371-63qvtsvhev9rtfvk6js9qobipa1ugfnp.apps.googleusercontent.com",
      callback: handleCallbackRespose
    })
    google.accounts.id.renderButton(
      document.getElementById("signinDiv"),
      {theme:"outline", size:"large"}
    )
},[])
  return <div>
    <div id="signinDiv"></div>
  </div>
}



export default Login
