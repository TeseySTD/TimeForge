import Button from '@/components/ui/Button/Button'
import './DeleteTimersSetModal.scss'
import { ModalWindow, type Props as ModalWindowProps } from '@/components/ui/ModalWindow/ModalWindow'

interface Props extends ModalWindowProps {
    deleteTimersSetCallback: () => void
}

const DeleteTimersSetModal: React.FC<Props> = ({ isOpened, onClose, deleteTimersSetCallback }) => {
    return (
        <ModalWindow isOpened={isOpened} onClose={onClose} className="delete-timer-set-modal">
            <h2 className='dm-title'>Are you sure you want to delete this timer set?</h2>
            <div className="dm-buttons">
                <Button onClick={onClose}>Cancel</Button>
                <Button className='delete' onClick={() => {
                    deleteTimersSetCallback();
                    onClose();
                }}>
                    Delete
                </Button>
            </div>
        </ModalWindow>
    )
}

export default DeleteTimersSetModal