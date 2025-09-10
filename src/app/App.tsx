import logo from '@/assets/logo.svg'
import './App.scss'
import Header from '@/components/app/Header/Header'
import Footer from '@/components/app/Footer/Footer';
import Timers from '@/components/timers/Timers/Timers';
import ToastContainer from '@/components/ui/ToastContainer/ToastContainer';

function App() {
  return (
    <>
      <Header />
      <Timers/>
      {/* TODO: Make routing */}
      {/* <h1>Time Forge</h1>
      <div>
        <a href="/" target="_blank">
          <img src={logo} className="logo" alt="TimeForge logo" />
        </a>
      </div>
      <h1>Web application for time tracking.</h1> */}
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
