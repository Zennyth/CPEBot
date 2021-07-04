<template>
  <div class="home">
    <b-col>
      <section>
        <h1>Grades</h1>
        <Tree :array="nestedSemesters"/>
      </section>
    </b-col>
  </div>
</template>

<script>
import Tree from "@/components/shared/Tree";

import gradeService from "@/services/grade.service";

export default {
  name: 'Grades',
  components: {
    Tree
  },
  data() {
    return {
      nestedSemesters: [],
    }
  },
  async mounted() {
    if(this.$store.getters.hasGrades) {
      this.nestedSemesters = this.$store.getters.grades;
    } else {
      this.nestedSemesters = await gradeService.getAll();
    }
    console.log(this.nestedSemesters)
  }
}
</script>