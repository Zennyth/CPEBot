<template>
  <div class="recent">
    <CardGrade v-for="(grade, index) of array" :key="index" :grade="grade" :isRecent="true" variant="transparent" />
  </div>
</template>

<script>
export default {
  name: 'Recent',
  components: {
      CardGrade: () => import("@/components/Grade/Card-Grade"),
  },
  props: {
    array: Array
  },
}
</script>