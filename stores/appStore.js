import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
  const termsAndConditionsOverlay = ref(false)
  const acceptTermsAndConditions = ref(false)
  const changed = ref(false)

  const newScheduleOverlay = ref(false)

  const toggleNewScheduleOverlay = () => {
    newScheduleOverlay.value = !newScheduleOverlay.value
  }

  const privacyPolicyOverlay = ref(false)
  const acceptPrivacyPolicy = ref(false)

  return {
    changed,
    termsAndConditionsOverlay,
    acceptTermsAndConditions,
    privacyPolicyOverlay,
    acceptPrivacyPolicy,
    newScheduleOverlay,
    toggleNewScheduleOverlay,
  }
})
