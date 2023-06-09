import React from 'react'
import logo from '../images/logo.svg';


export const Header = () => {
  return (
    <>
     <header className="header">
      <img alt='Место' src={logo} className="header__image"/>
      </header>
    </>
  )
}
