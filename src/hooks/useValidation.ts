import { useState, useCallback } from 'react'
import { z } from 'zod'

type ValidationErrors<T> = Partial<Record<keyof T, string>>

interface UseValidationOptions<T> {
    schema: z.ZodSchema<T>
}

interface UseValidationReturn<T> {
    errors: ValidationErrors<T>
    validate: (data: T) => boolean
    validateField: (field: keyof T, value: any) => boolean
    clearErrors: () => void
    clearFieldError: (field: keyof T) => void
    isValid: boolean
    hasErrors: boolean
}

export default function useZodValidation<T extends Record<string, any>>({
    schema,
}: UseValidationOptions<T>): UseValidationReturn<T> {
    const [errors, setErrors] = useState<ValidationErrors<T>>({})

    const validate = useCallback((data: T): boolean => {
        const result = schema.safeParse(data)
        
        if (result.success) {
            setErrors({})
            return true
        } else {
            const newErrors: ValidationErrors<T> = {}
            
            result.error.issues.forEach(error => {
                const field = error.path[0] as keyof T
                if (field && !newErrors[field]) {
                    newErrors[field] = error.message
                }
            })
            
            setErrors(newErrors)
            return false
        }
    }, [schema])

    const validateField = useCallback((field: keyof T, value: any): boolean => {
        try {
            const fieldSchema = (schema as any).shape[field]
            if (fieldSchema) {
                fieldSchema.parse(value)
                setErrors(prev => ({ ...prev, [field]: undefined }))
                return true
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessage = error.issues[0]?.message || "Validation failure"
                setErrors(prev => ({ ...prev, [field]: errorMessage }))
            }
        }
        return false
    }, [schema])

    const clearErrors = useCallback(() => {
        setErrors({})
    }, [])

    const clearFieldError = useCallback((field: keyof T) => {
        setErrors(prev => ({ ...prev, [field]: undefined }))
    }, [])

    const hasErrors = Object.values(errors).some(error => error !== undefined)
    const isValid = !hasErrors

    return {
        errors,
        validate,
        validateField,
        clearErrors,
        clearFieldError,
        isValid,
        hasErrors
    }
}