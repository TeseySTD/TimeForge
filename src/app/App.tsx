import logo from '@/assets/logo.svg'
import './App.scss'
import Header from '@/components/app/Header/Header'
import Footer from '@/components/app/Footer/Footer';
import TimerMenu from '@/components/app/TimerMenu/TimerMenu';

function App() {
  return (
    <>
      <Header />
      <TimerMenu />
      <h1>Time Forge</h1>
      <div>
        <a href="/" target="_blank">
          <img src={logo} className="logo" alt="TimeForge logo" />
        </a>
      </div>
      <h1>Web application for time tracking.</h1>
      <Footer />
    </>
  )
}

export default App
