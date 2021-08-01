<template>
  <div class="home">
    <b-col>
      <section class="w-100">
        <h1>{{$t('grades.grades')}}</h1>
        <b-tabs content-class="mt-3 w-100" style="width: 100%;">
          <b-tab :title="$t('grades.allGrades')">
            <Tree :array="$store.getters.grades"/>
          </b-tab>
          <b-tab :title="$t('grades.recent')" active>
            <Recent :array="$store.getters.newGrades"/>
          </b-tab>
        </b-tabs>
      </section>
    </b-col>
  </div>
</template>

<script>
import Tree from "@/components/shared/Tree";
import Recent from "@/components/shared/Recent"
//import gradeService from "@/services/grade.service";

export default {
  name: 'Grades',
  components: {
    Tree,
    Recent
  },
  async mounted() {
    this.$store.commit("setNewGradesIcon", false);
  },
  updated() {
    // this.$store.commit("setNewGradesIcon", false);
  }
}
</script>