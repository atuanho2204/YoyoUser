import React from 'react'
import { NavBar } from './NavBar'

export class Page404 extends React.Component {
  render() {
    return (
      <>
        <NavBar/>
        <h2 className='ml-3'>This page does not exist</h2>
      </>
    )
  }
}
