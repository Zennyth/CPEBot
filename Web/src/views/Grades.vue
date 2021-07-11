<template>
  <div class="home">
    <b-col>
      <section class="w-100">>
        <h1>{{$t('grades.grades')}}</h1>
        <b-tabs content-class="mt-3 w-100" style="width: 100%;">
          <b-tab :title="$t('grades.allGrades')" active>
            <Tree :array="nestedSemesters"/>
          </b-tab>
          <b-tab title="Recent">
            <Recent :nbGrades="5" />
          </b-tab>
        </b-tabs>
      </section>
    </b-col>
  </div>
</template>

<script>
import Tree from "@/components/shared/Tree";
import Recent from "@/components/shared/Recent"
import gradeService from "@/services/grade.service";

export default {
  name: 'Grades',
  components: {
    Tree,
    Recent
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

    this.$store.commit("setNewGrades", false);
    console.log(this.nestedSemesters)
  }
}
</script>