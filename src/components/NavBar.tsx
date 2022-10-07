import React from 'react'
import styled from 'styled-components'
import logo from '../assets/images/BubbleLog.png'

const Logo = styled.img`
  width: 150px;
  height: 100px;
  background: url(${logo}) no-repeat center center / 100%;
`
const NavBar: React.FC = () => {
  return (
    <div>
      <a href="/">
        <Logo />
      </a>
    </div>
  )
}

export default NavBar
