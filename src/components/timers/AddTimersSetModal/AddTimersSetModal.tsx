import type React from 'react'
import './AddTimersSetModal.scss'
import ModalWindow from '@/components/ui/ModalWindow/ModalWindow'
import TimersSet from '@/types/timersSet'
import Button from '@/components/ui/Button/Button'
import Timer from '@/types/timer'
import { useState } from 'react'
import Input from '@/components/ui/Input/Input'
import IconButton from '@/components/ui/IconButton/IconButton'
import { parseSecondsToTimeString, parseTimeStringToNumber } from '@/utils/timeUtils'

interface Props {
    isOpened: boolean
    onClose: () => void
    addTimerSetCallback: (timerSet: TimersSet) => void
}

type AddedTimerEntry = {
    id: number
    timer: Timer
    removing?: boolean
}

const ANIMATION_REMOVE_MS = 260


const AddTimerSetModal: React.FC<Props> = ({ isOpened, onClose, addTimerSetCallback }) => {
    const [addedTimers, setAddedTimers] = useState<AddedTimerEntry[]>([])
    const [timerToAddName, setTimerToAddName] = useState('Timer')
    const [timerToAddTime, setTimerToAddTime] = useState('00:00:00')

    const addTimer = () => {
        const timer = new Timer(timerToAddName, parseTimeStringToNumber(timerToAddTime))
        const entry: AddedTimerEntry = {
            id: Math.random(),
            timer
        }
        setAddedTimers(prev => [...prev, entry])
    }

    const removeTimer = (id: number) => {
        setAddedTimers(prev => prev.map(e => e.id === id ? { ...e, removing: true } : e))

        setTimeout(() => {
            setAddedTimers(prev => prev.filter(e => e.id !== id))
        }, ANIMATION_REMOVE_MS)
    }

    const addTimersSet = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const values = new FormData(e.currentTarget)
        const name = values.get('name')?.toString() ?? 'TimerSet'
        const timersSet = new TimersSet(name, addedTimers.map(e => e.timer))
        addTimerSetCallback(timersSet)
        onClose()
    }

    return (
        <ModalWindow isOpened={isOpened} onClose={onClose} className="add-timer-set-modal">
            <h2>Add timer set</h2>
            <form onSubmit={addTimersSet}>
                <Input labelText='Timer set name' name='name' placeholder="Timer set name" defaultValue={'TimerSet'} />
                <div className="timers-list">
                    <div className='added-timers'>
                        {
                            addedTimers.map((entry) => (
                                <div
                                    key={entry.id}
                                    className={`added-timer-row ${entry.removing ? 'removing' : 'added'}`}
                                >
                                    <div className="added-timer-info">
                                        <span className="timer-name-text">{entry.timer.name}</span>
                                        <span className="timer-time-text">{parseSecondsToTimeString(entry.timer.timeInSec)}</span>
                                    </div>

                                    <IconButton
                                        onClick={() => removeTimer(entry.id)}
                                        title='Remove timer'
                                        aria-label={`Remove ${entry.timer.name}`}
                                    >
                                        <svg viewBox='0 0 24 24' fill='currentColor' width="18" height="18" aria-hidden>
                                            <path d="M19 13H5v-2h14v2z" />
                                        </svg>
                                    </IconButton>
                                </div>
                            ))
                        }
                    </div>

                    <Input labelText='Timer name' name='timer-name' placeholder="Timer name" value={timerToAddName}
                        onChange={(e) => setTimerToAddName(e.target.value)} />
                    <Input labelText='Timer time' name='timer-time' placeholder="Timer time" value={timerToAddTime}
                        onChange={(e) => setTimerToAddTime(e.target.value)} />
                    <Button type="button" onClick={addTimer}>Add timer</Button>
                </div>

                <Button type='submit'>Add</Button>
            </form>
        </ModalWindow>
    )
}

export default AddTimerSetModal
