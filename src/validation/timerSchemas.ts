import Timer from "@/types/timer"
import { parseTimeStringToNumber } from "@/utils/timeUtils"
import { z } from "zod"

export const timerSchema = z.object({
    timerName: z.string()
        .nonempty('Timer name is required')
        .min(Timer.MIN_NAME_LENGTH, `Timer name should contain at least ${Timer.MIN_NAME_LENGTH} symbols`)
        .max(Timer.MAX_NAME_LENGTH, `Timer name cannot exceed ${Timer.MAX_NAME_LENGTH} symbols`)
        .trim(),
    timerTime: z.string()
        .nonempty('Timer time is required')
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, 'Invalid time format (HH:MM:SS)')
        .refine((value) => parseTimeStringToNumber(value) > Timer.MIN_TIME_IN_SEC, `Timer time must be greater than ${Timer.MIN_TIME_IN_SEC} seconds`)
})