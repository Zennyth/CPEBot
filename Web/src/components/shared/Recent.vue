<template>
  <div class="recent">
      <CardGrade v-for="(grade, index) of notes" :key="index" :grade="grade" variant="transparent" />
  </div>
</template>

<script>
import gradeService from "@/services/grade.service";
export default {
  name: 'Recent',
  components: {
      CardGrade: () => import("@/components/Grade/Card-Grade"),
  },
  data() {
    return {
      notes: [],
    }
  },
    props: {
    nbGrades: Number
  },
  async mounted() {
      this.notes = await gradeService.getRecent(this.nbGrades);
      console.log(this.notes)
  }
}
</script>