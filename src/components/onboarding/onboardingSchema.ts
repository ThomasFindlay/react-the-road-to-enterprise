import * as z from 'zod'

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_enum_value) {
    return {
      message: 'Select one of the options.',
    }
  }
  return {
    message: ctx.defaultError,
  }
}

z.setErrorMap(customErrorMap)

export const onboardingFormSchema = z
  .object({
    email: z
      .string({ required_error: 'Please enter your email' })
      .email({
        message: 'Invalid email address',
      })
      .min(1),
    password: z
      .string({
        required_error: 'Please enter password',
      })
      .min(8, {
        message: 'Password must have at least 8 characters',
      }),
    name: z.string().min(1, {
      message: 'Please enter your name',
    }),
    dateOfBirth: z.string().min(1, {
      message: 'Please enter your date of birth.',
    }),
    gender: z.enum(['male', 'female']),
    weightGoal: z.enum(['maintain-weight', 'lose-weight', 'gain-weight']),
    activityLevel: z.enum([
      'not-very-active',
      'lightly-active',
      'active',
      'very-active',
    ]),
    height: z.union([
      z.object({
        unit: z.literal('cm'),
        value: z.object({
          cm: z
            .number({
              required_error: 'Please provide centimiters',
              invalid_type_error: 'Please provide a number',
            })
            .min(1),
        }),
      }),
      z.object({
        unit: z.literal('feet/inches'),
        value: z.object({
          feet: z
            .number({
              required_error: 'Please provide feet',
              invalid_type_error: 'Please provide a number',
            })
            .min(1),
          inches: z
            .number({
              required_error: 'Please provide inches',
              invalid_type_error: 'Please provide a number',
            })
            .min(1),
        }),
      }),
    ]),

    // z.object({
    //   unit: z.enum(['cm', 'feet/inches']),
    //   value: z.union([
    //     z.object({
    //       cm: z
    //         .number({
    //           required_error: 'Please provide centimiters',
    //           invalid_type_error: 'Please provide a number',
    //         })
    //         .min(1),
    //     }),
    //     z.object({
    //       feet: z
    //         .number({
    //           required_error: 'Please provide feet',
    //           invalid_type_error: 'Please provide a number',
    //         })
    //         .min(1),
    //       inches: z
    //         .number({
    //           required_error: 'Please provide inches',
    //           invalid_type_error: 'Please provide a number',
    //         })
    //         .min(1),
    //     }),
    //   ]),
    // }),
    weight: z.union([
      z.object({
        unit: z.literal('kg'),
        value: z.object({
          kg: z
            .number({
              required_error: 'Please provide kilograms',
              invalid_type_error: 'Please provide a number',
            })
            .min(1),
        }),
      }),
      z.object({
        unit: z.literal('st/lbs'),
        value: z.object({
          st: z
            .number({
              required_error: 'Please provide stones',
              invalid_type_error: 'Please provide a number',
            })
            .min(1),
          lbs: z
            .number({
              required_error: 'Please provide pounds',
              invalid_type_error: 'Please provide a number',
            })
            .min(1),
        }),
      }),
    ]),
    targetWeight: z
      .object({
        value: z.union([
          z.object({
            kg: z
              .number({
                required_error: 'Please provide stones',
                invalid_type_error: 'Please provide a number',
              })
              .min(1),
            // .refine((value) => {
            //   console.log('in refine', value, this)
            //   return true
            // }),
          }),
          z.object({
            st: z
              .number({
                required_error: 'Please provide stones',
                invalid_type_error: 'Please provide a number',
              })
              .min(1),
            lbs: z
              .number({
                required_error: 'Please provide feet',
                invalid_type_error: 'Please provide a number',
              })
              .min(1),
          }),
        ]),
      })
      .superRefine((val, ctx) => {
        console.log('in refine target weight', { val, ctx })
        return true
      }),
  })
  .superRefine((val, ctx) => {
    console.log('in refine whole form', { val, ctx })
    return true
  })

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>
