import React, { useState } from 'react'
import './AddTimersSetModal.scss'
import { ModalWindow, type Props as ModalWindowProps } from '@/components/ui/ModalWindow/ModalWindow'
import TimersSet from '@/types/timersSet'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import IconButton from '@/components/ui/IconButton/IconButton'
import Timer from '@/types/timer'
import { parseTimeStringToNumber } from '@/utils/timeUtils'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { timersSetWithTimersSchema } from '@/validation/timersSetSchemas'

type FormData = z.infer<typeof timersSetWithTimersSchema>

const TIMERS_SET_NAME_DEFAULT = 'Timers Set'
const TIMER_NAME_DEFAULT = 'Timer'
const TIMER_TIME_DEFAULT = '00:01:00'
const ANIMATION_REMOVE_MS = 260

interface Props extends ModalWindowProps {
    addTimerSetCallback: (timerSet: TimersSet) => void
}

const AddTimerSetModal: React.FC<Props> = (
    { isOpened, onClose, addTimerSetCallback }
) => {
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(timersSetWithTimersSchema),
        defaultValues: {
            name: TIMERS_SET_NAME_DEFAULT,
            timers: []
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'timers'
    })
    const [removingIds, setRemovingIds] = useState<Set<string>>(new Set())
    const onSubmit = (data: FormData) => {
        if (data.timers.length === 0) {
            alert('Add at least one timer')
            return
        }

        const timers = data.timers.map(t => new Timer(t.timerName.trim(), parseTimeStringToNumber(t.timerTime)))
        addTimerSetCallback(new TimersSet(data.name.trim(), timers))
        reset()
        onClose()
    }
    const handleRemoveWithAnimation = (id: string) => {
        setRemovingIds(prev => {
            const next = new Set(prev)
            next.add(id)
            return next
        })

        setTimeout(() => {
            const idx = fields.findIndex(f => f.id === id)
            if (idx !== -1) {
                remove(idx)
            }
            setRemovingIds(prev => {
                const next = new Set(prev)
                next.delete(id)
                return next
            })
        }, ANIMATION_REMOVE_MS)

    }
    return (
        <ModalWindow isOpened={isOpened} onClose={onClose} className="add-timer-set-modal">
            <h2>Add timer set</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    labelText="Timer set name"
                    {...register('name')}
                    error={errors.name?.message}
                />

                <div className="timers-list">
                    <div className="added-timers">
                        {fields.map((field, index) => (
                            <div key={field.id} className={`added-timer-row ${removingIds.has(field.id) ? 'removing' : 'added'}`}>
                                <div className="added-timer-info">
                                    <Controller
                                        control={control}
                                        name={`timers.${index}.timerName`}
                                        render={({ field }) => (
                                            <Input {...field} error={errors.timers?.[index]?.timerName?.message} />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name={`timers.${index}.timerTime`}
                                        render={({ field }) => (
                                            <Input {...field} error={errors.timers?.[index]?.timerTime?.message} />
                                        )}
                                    />
                                </div>
                                <IconButton onClick={() => handleRemoveWithAnimation(field.id)} title="Remove">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
                                        <path d="M19 13H5v-2h14v2z" />
                                    </svg>
                                </IconButton>
                            </div>
                        ))}
                    </div>

                    <Button type="button" onClick={() => append({ timerName: TIMER_NAME_DEFAULT, timerTime: TIMER_TIME_DEFAULT })}>
                        Add timer
                    </Button>
                </div>

                <Button type="submit">Add</Button>
            </form>
        </ModalWindow>
    )
}

export default AddTimerSetModal