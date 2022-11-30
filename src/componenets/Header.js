//  import React from 'react'
import PropTypes from 'prop-types'
// import { Route, Routes, useLocation } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, onAddClick, showAdd }) => {
  const loc = useLocation()
  return (
    <header className='header'>
      <h1>Maik {title}</h1>
        {loc.pathname === '/' && (
        <Button
          color={showAdd ? 'red' : 'green'}
          text={showAdd ? 'Close' : 'Add'}
          onClick={onAddClick} />
        )}
    </header>
  )
}

Header.defaultProps = {
  title: 'Another Tracker'
}

//CSS in js for dinamic styling?
//<h1 style={headingStyle}>Task Tracker {title}</h1>
// const headingStyle = {
//   color: 'red'
// }

// Typescript should replace this
Header.propTypes = {
  title: PropTypes.string
}


export default Header