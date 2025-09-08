import type TimersSet from '@/types/timersSet';
import './EditTimersSetModal.scss'
import { ModalWindow, type Props as ModalWindowProps } from '@/components/ui/ModalWindow/ModalWindow'
import type React from 'react';
import TimersSetForm from '../TimersSetForm/TimersSetForm';

interface Props extends ModalWindowProps {
    editTimersSetCallback: (timerSet: TimersSet) => void;
    timersSet: TimersSet
}

const EditTimersSetModal: React.FC<Props> = (
    {
        isOpened,
        onClose,
        editTimersSetCallback,
        timersSet
    }
) => {
    const onSubmit = (timerSet: TimersSet) => {
        editTimersSetCallback(timerSet)
        onClose()
    }

    return (
        <ModalWindow isOpened={isOpened} onClose={onClose} className="edit-timer-set-modal">
            <h2>Edit timer set</h2>
            <TimersSetForm initData={timersSet} submitCallback={onSubmit} submitLabel="Edit" />
        </ModalWindow>
    )
}

export default EditTimersSetModal;