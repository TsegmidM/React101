import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function PageSharedLayout() {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', }}>
      <div style={{ background: 'lightgray'}}>
        <button onClick={() => navigate('')}>HOME</button>
        <button onClick={() => navigate('todo-list')}>Todo List</button>
        <button onClick={() => navigate('memory-game')}>Memory Game</button>
        <button onClick={() => navigate('tictactoe')}>TIC TAC TOE</button>
        <button onClick={() => navigate('live-clock')}>Live Clock</button>
        <button onClick={() => navigate('airbnb')}>Airbnb Clone</button>
        <button onClick={() => navigate('image-slider')}>Image Slider</button>
        <button onClick={() => navigate('bmi-finder')}>BMI Finder</button>
        <button onClick={() => navigate('color-picker')}>Color Picker</button>
        <button onClick={() => navigate('employees')}>Employee List</button>

        {/* <button onClick={() => navigate('/pages/50', { replace: true })}>
          dynamic
        </button> */}
      </div>
   
        <Outlet />
      
    </div>
  )
}
