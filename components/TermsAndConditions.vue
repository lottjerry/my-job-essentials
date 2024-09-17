<template>
  <v-card
    class="mx-auto"
    prepend-icon="mdi-file-document"
    subtitle="Please Read to the bottom to accept."
    width="350"
  >
    <template v-slot:title nav>
      <span class="font-weight-black"> Terms & Conditions </span>
    </template>
    <v-card-text
      class="bg-surface-light pa-5 overflow-y-auto"
      style="max-height: 500px"
      v-scroll.self="onScroll"
    >
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
      corporis, amet accusamus perspiciatis iure iusto quaerat aspernatur cumque
      explicabo officia. Quo ratione consequuntur minus temporibus placeat
      quibusdam adipisci nemo molestias! Eaque vero earum mollitia ut maiores
      soluta voluptas natus architecto molestias modi fuga eos ullam, quasi
      dolor quod magnam impedit consequuntur unde quaerat repellat dolores sed
      esse velit. Nihil aperiam, rem sint vero sit sunt ut amet vitae distinctio
      dolorum officiis totam molestias fugit modi natus a nulla. Error enim
      debitis, iure autem voluptate nemo molestiae. Dolorum excepturi, assumenda
      ex aliquam ea ipsum, sunt asperiores odio voluptatibus quo inventore
      deserunt. Fuga sed expedita harum ullam sequi debitis eum animi odio
      facilis! Earum, amet eligendi corporis a assumenda rem illum expedita
      deleniti, iste, praesentium repellat quam explicabo quisquam. Similique,
      eaque quam, atque optio doloribus beatae facilis amet consequatur,
      repellendus odit commodi culpa in. Impedit fugiat voluptatem illum non,
      dolorum commodi ducimus sequi dignissimos et aspernatur nulla eaque, at
      quaerat temporibus sed natus. Dolor delectus aperiam quisquam iste atque
      quam reprehenderit asperiores corporis ipsum unde doloribus, mollitia aut,
      assumenda possimus. Perferendis perspiciatis dolore magnam. Voluptatum
      nisi nostrum quae nesciunt dolorem ducimus quam, asperiores molestiae
      possimus illum tempore ratione modi placeat quibusdam sequi beatae
      aspernatur laboriosam repudiandae eaque eligendi blanditiis quod dicta
      pariatur! Quidem, recusandae perferendis. Cum laborum officia atque sequi
      dolorem iusto ratione, quas recusandae. At quam quisquam eaque, odio
      accusantium eius corporis impedit, soluta autem iusto voluptatum
      temporibus officiis dolor sed vitae veniam quidem reprehenderit, sequi et?
      Facilis labore aut itaque quas eaque? Blanditiis dicta sapiente atque
      maiores nesciunt. Autem aperiam explicabo tempora inventore iure ipsum
      molestias cum error dolores officia et voluptates, veritatis pariatur enim
      at, fuga corrupti? Sed dignissimos cum eligendi corrupti? Aspernatur sed
      id vitae, minus blanditiis qui ullam sit repellendus. Eligendi vel
      praesentium quasi, quaerat magnam illo.
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn :disabled="offSetTop < 575" variant="plain">I accept</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  const offSetTop = ref(0)
  const read = ref(false)

  const onScroll = (e) => {
    offSetTop.value = e.target.scrollTop
  }
  
</script>
