import type TimersSet from '@/types/timersSet';
import './EditTimerSetModal.scss'
import { ModalWindow, type Props as ModalWindowProps } from '@/components/ui/ModalWindow/ModalWindow'
import type React from 'react';
import TimersSetForm from '../TimersSetForm/TimersSetForm';

interface Props extends ModalWindowProps {
    editTimerSetCallback: (timerSet: TimersSet) => void;
    timersSet: TimersSet
}

const EditTimerSetModal: React.FC<Props> = (
    {
        isOpened,
        onClose,
        editTimerSetCallback,
        timersSet
    }
) => {
    const onSubmit = (timerSet: TimersSet) => {
        editTimerSetCallback(timerSet)
        onClose()
    }

    return (
        <ModalWindow isOpened={isOpened} onClose={onClose} className="edit-timer-set-modal">
            <h2>Edit timer set</h2>
            <TimersSetForm initData={timersSet} submitCallback={onSubmit} submitLabel="Edit" />
        </ModalWindow>
    )
}

export default EditTimerSetModal;