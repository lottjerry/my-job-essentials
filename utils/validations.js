import { string, object, ref } from 'yup'

export const CreateAccountSchema = object({
  displayName: string().required('Please enter a display name.'),
  email: string()
    .email('Please enter a valid email.')
    .required('Please enter an email.'),
  password: string()
    .required('Please enter a password.')
    .min(6, 'Password must be a minimum of 6 characters.'),
  confirmPassword: string()
    .required('Please confirm password.')
    .min(6, 'Password must be a minimum of 6 characters.')
    .oneOf([ref('password')], 'Passwords must match.'),
})
