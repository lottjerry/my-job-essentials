<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
  useHead({
    title: 'My Job Essentials',
    meta: [{ name: "My Job Essentials", content: "Web app that contains a user's job tools and schedules.", keywords: "schedule,job,tools", robots: "noindex, nofollow", Language: "english", author: "Jerry Lott" }],
  })

  useSeoMeta({
  title: 'My Job Essentials',
  ogTitle: 'My Job Essentials',
  description:  "Web app that contains a user's job tools and schedules.",
  ogDescription:  "Web app that contains a user's job tools and schedules.",
})
</script>
