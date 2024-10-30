import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
  const termsAndConditionsOverlay = ref(false)
  const acceptTermsAndConditions = ref(false)
  const previousSchedule = ref([])
  const currentSchedule = ref([])
  const nextSchedule = ref([])



  const privacyPolicyOverlay = ref(false)
  const acceptPrivacyPolicy = ref(false)

  return {
    termsAndConditionsOverlay,
    acceptTermsAndConditions,
    previousSchedule,
    currentSchedule,
    nextSchedule,
    privacyPolicyOverlay,
    acceptPrivacyPolicy,
  }
})
