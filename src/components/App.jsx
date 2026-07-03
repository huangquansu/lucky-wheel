import { useState } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Wheel from './Wheel.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div>
    <Header/>
    <Wheel/>
    <Footer />
  </div>
    
  )
}

export default App
