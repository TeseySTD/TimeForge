import TimersSet from '@/types/timersSet'
import {z} from 'zod'
import { timerSchema } from '@/validation/timerShemas'

export const timersSetSchema = z.object({
    name: z.string()
        .nonempty('Timer set name is required')
        .min(TimersSet.MIN_NAME_LENGTH, `Name should contain at least ${TimersSet.MIN_NAME_LENGTH} symbols`)
        .max(TimersSet.MAX_NAME_LENGTH, `Name cannot exceed ${TimersSet.MAX_NAME_LENGTH} symbols`)
        .trim()
})

export const timersSetWithTimersSchema = timersSetSchema.extend({
  timers: z.array(timerSchema)
    .superRefine((timers, ctx) => {
      const normalizedNames = new Map<string, number[]>()
      
      timers.forEach((timer, index) => {
        const normalizedName = timer.timerName.trim().toLowerCase()
        if (!normalizedNames.has(normalizedName)) {
          normalizedNames.set(normalizedName, [])
        }
        normalizedNames.get(normalizedName)!.push(index)
      })
      
      normalizedNames.forEach((indices) => {
        if (indices.length > 1) {
          indices.forEach(index => {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [index, 'timerName'],
              message: 'Timers names must be unique',
            })
          })
        }
      })
    })
})