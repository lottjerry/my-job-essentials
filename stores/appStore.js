import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
  const termsAndConditionsOverlay = ref(false)
  const acceptTermsAndConditions = ref(false)

  return {
    termsAndConditionsOverlay,
    acceptTermsAndConditions
  }
})
