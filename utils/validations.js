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

export const ForgotPasswordSchema = object({
  email: string()
    .email('Please enter a valid email.')
    .required('Please enter an email.'),
})

export const OrganizationRegistrationSchema = (organizationIDENV, organizationPasswordENV) =>
  object({
    scheduleName: string().required('Please enter a schedule name.'),
    department: string().required('Please select a department.'),
    organizationID: string()
      .required('Please enter a organzationID.')
      .test(
        'isOrganizationIDCorrect',
        'Organization ID is not valid.',
        (value) => {
          return value === organizationIDENV
        },
      ),
    organizationPassword: string()
      .required('Please enter a department password.')
      .test(
        'isOrganizationPasswordCorrect',
        'Organization Password is not valid.',
        (value) => {
          return value === organizationPasswordENV
        },
      ),
  })
