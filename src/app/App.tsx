import logo from '@/assets/logo.svg'
import './App.scss'
import Header from '@/components/app/Header/Header'
import Footer from '@/components/app/Footer/Footer';
import Timers from '@/components/timers/Timers/Timers';
import ToastContainer from '@/components/ui/ToastContainer/ToastContainer';
import { useEffect, useState } from 'react';
import { checkBrowserSupport, checkNotificationPermission, requestNotificationPermission } from '@/utils/notificationUtils';
import { ModalWindow } from '@/components/ui/ModalWindow/ModalWindow';
import Button from '@/components/ui/Button/Button';

function App() {
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  useEffect(() => {
    if(!checkBrowserSupport()) return;
    const permission = checkNotificationPermission();
    console.debug('Current notification permission:', permission);

    if (permission === 'default') {
      setShowNotificationModal(true);
    }
  }, []);

  const handleRequestPermission = async () => {
    try {
      const permission = await requestNotificationPermission();
      console.log('Permission request result:', permission);

      setShowNotificationModal(false);

      if (permission === 'granted')
        console.debug('Notification permission granted');
      else
        console.warn('Notification permission denied');

    } catch (error) {
      console.error('Error requesting notification permission:', error);
      setShowNotificationModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowNotificationModal(false);
    console.debug('User dismissed notification permission modal');
  };

  return (
    <>
      <Header />
      <Timers />
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
      <ModalWindow
        isOpened={showNotificationModal}
        onClose={handleCloseModal}
      >
        <div style={{ textAlign: 'center' }}>
          <h3>Enable Notifications</h3>
          <p>
            Allow notifications to get alerted when your timers finish,
            even when the tab is not active.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <Button onClick={handleRequestPermission}>
              Allow Notifications
            </Button>
            <Button onClick={handleCloseModal}>
              Maybe Later
            </Button>
          </div>
        </div>
      </ModalWindow>
    </>
  )
}

export default App
