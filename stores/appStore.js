import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
  const termsAndConditionsOverlay = ref(false)
  const acceptTermsAndConditions = ref(false)


  const privacyPolicyOverlay = ref(false)
  const acceptPrivacyPolicy = ref(false)

  return {
    termsAndConditionsOverlay,
    acceptTermsAndConditions,
    privacyPolicyOverlay,
    acceptPrivacyPolicy,
  }
})
