import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
  const count = ref(0) // Reactive state

  const increment = () => count.value++
  const decrement = () => count.value--

  const termsAndConditionsOverlay = ref(false)
  const acceptTermsAndConditions = ref(false)
  const changed = ref(false)
  // Previous Schedules
  const previousSchedule = ref([])
  const prevGrocerySchedule = ref(null)
  const prevBakerySchedule = ref([])
  const prevDeliSchedule = ref([])
  const prevMeatSchedule = ref([])
  const prevProduceSchedule = ref([])
  // Current Schedules
  const currentSchedule = ref([])
  const currentGrocerySchedule = ref([])
  const currentBakerySchedule = ref([])
  const currentDeliSchedule = ref([])
  const currentMeatSchedule = ref([])
  const currentProduceSchedule = ref([])
  // Next Schedules
  const nextSchedule = ref([])
  const nextGrocerySchedule = ref([])
  const nextBakerySchedule = ref([])
  const nextDeliSchedule = ref([])
  const nextMeatSchedule = ref([])
  const nextProduceSchedule = ref([])

  const privacyPolicyOverlay = ref(false)
  const acceptPrivacyPolicy = ref(false)

  return {
    changed,
    termsAndConditionsOverlay,
    acceptTermsAndConditions,
    previousSchedule,
    prevGrocerySchedule,
    prevBakerySchedule,
    prevDeliSchedule,
    prevMeatSchedule,
    prevProduceSchedule,
    currentSchedule,
    currentGrocerySchedule,
    currentBakerySchedule,
    currentDeliSchedule,
    currentMeatSchedule,
    currentProduceSchedule,
    nextSchedule,
    nextGrocerySchedule,
    nextBakerySchedule,
    nextDeliSchedule,
    nextMeatSchedule,
    nextProduceSchedule,
    privacyPolicyOverlay,
    acceptPrivacyPolicy,

    count,
    increment,
    decrement,
  }
})
