import { z } from 'zod'

// Customer validation schema
export const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().min(1, 'Company is required'),
  status: z.enum(['active', 'pending', 'inactive']),
  notes: z.string().optional(),
})

// Deal validation schema
export const dealSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  company: z.string().min(1, 'Company is required'),
  contact: z.string().min(1, 'Contact is required'),
  value: z.number().positive('Value must be positive'),
  stage: z.enum(['discovery', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost']),
  probability: z.number().min(0).max(100, 'Probability must be between 0 and 100'),
  expectedClose: z.string().optional(),
  notes: z.string().optional(),
})

// Activity validation schema
export const activitySchema = z.object({
  type: z.enum(['call', 'email', 'meeting', 'note']),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  customerId: z.string().min(1, 'Customer is required'),
  scheduledAt: z.string().optional(),
})

// Search filter schema
export const searchFilterSchema = z.object({
  field: z.string(),
  operator: z.enum(['equals', 'contains', 'starts_with', 'ends_with']),
  value: z.string(),
})

// Form validation helper
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown): 
  { success: true; data: T } | { success: false; errors: string[] } => {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        errors: error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`) 
      }
    }
    return { success: false, errors: ['Unknown validation error'] }
  }
}

// Type exports
export type CustomerFormData = z.infer<typeof customerSchema>
export type DealFormData = z.infer<typeof dealSchema>
export type ActivityFormData = z.infer<typeof activitySchema>
export type SearchFilter = z.infer<typeof searchFilterSchema>
