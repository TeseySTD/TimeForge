import './AddTimersSetModal.scss'
import { ModalWindow, type Props as ModalWindowProps } from '@/components/ui/ModalWindow/ModalWindow'
import TimersSet from '@/types/timersSet'
import TimersSetForm from '../TimersSetForm/TimersSetForm'

interface Props extends ModalWindowProps {
    addTimersSetCallback: (timerSet: TimersSet) => void
}

const AddTimerSetModal: React.FC<Props> = (
    { isOpened, onClose, addTimersSetCallback }
) => {
    const onSubmit = (timerSet: TimersSet) => {
        addTimersSetCallback(timerSet)
        onClose()
    }

    return (
        <ModalWindow isOpened={isOpened} onClose={onClose} className="add-timer-set-modal">
            <h2>Add timer set</h2>
            <TimersSetForm submitCallback={onSubmit} submitLabel="Add" />
        </ModalWindow>
    )
}

export default AddTimerSetModal