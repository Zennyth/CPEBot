<template>
  <div class="home">
    <b-col>
      <section>
        <h1>Grades</h1>
        <b-tabs content-class="mt-3 w-100" style="width: 100%;">
          <b-tab title="All" active>
            <Tree :array="nestedSemesters"/>
          </b-tab>
          <b-tab title="Recent"><p>I'm the second tab</p></b-tab>
        </b-tabs>
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