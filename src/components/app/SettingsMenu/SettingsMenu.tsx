import type React from 'react'
import { useState, useEffect, useContext } from 'react'
import './SettingsMenu.scss'
import { ModalWindow } from '@/components/ui/ModalWindow/ModalWindow'
import { SoundContext } from '@/contexts/SoundContext'
import { addNotificationsSetting, addVolumeSetting, DEFAULT_NOTIFICATIONS, DEFAULT_VOLUME, getNotificationsSetting, getVolumeSetting } from '@/utils/settingsUtils'
import Button from '@/components/ui/Button/Button'

interface Props {
    isOpened: boolean
    onClose: () => void
}

const SettingsMenu: React.FC<Props> = ({ isOpened, onClose }) => {
    const [volume, setVolume] = useState<number>(getVolumeSetting())
    const {setGlobalVolume} = useContext(SoundContext);
    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(getNotificationsSetting())

    useEffect(() => {
        addVolumeSetting(volume)
        setGlobalVolume(volume / 25)
    }, [volume])

    useEffect(() => {
        addNotificationsSetting(notificationsEnabled)
    }, [notificationsEnabled])

    const onReset = () => {
        setVolume(DEFAULT_VOLUME)
        setNotificationsEnabled(DEFAULT_NOTIFICATIONS)
    }

    return (
        <div id="settings-menu">
            <ModalWindow isOpened={isOpened} onClose={onClose}>
                <h2 className="sm-title">Settings</h2>

                <section className="sm-section">
                    <label htmlFor="volume" className="sm-label">Volume</label>
                    <div className="sm-volume-row">
                        <input
                            id="volume"
                            className="sm-range"
                            type="range"
                            min={0}
                            max={100}
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            aria-label="Volume"
                        />
                        <span className="sm-range-value">{volume}%</span>
                    </div>
                </section>

                <section className="sm-section">
                    <label className="sm-checkbox">
                        <input
                            type="checkbox"
                            checked={notificationsEnabled}
                            onChange={(e) => setNotificationsEnabled(e.target.checked)}
                        />
                        <span className="sm-checkbox-label">Enable notifications</span>
                    </label>
                    <p className="sm-hint">If enabled, you will receive sound and visual alerts.</p>
                </section>

                <div className="sm-actions">
                    <Button className="sm-btn" type="button" onClick={onReset}>Reset</Button>
                    <Button className="sm-btn sm-btn-primary" type="button" onClick={onClose}>Close</Button>
                </div>
            </ModalWindow>
        </div>
    )
}

export default SettingsMenu
