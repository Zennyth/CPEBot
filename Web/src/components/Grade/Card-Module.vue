<template>
  <div class="card" :class="classComputed">
    <div class="card-header p-0 flex-column" style="margin-bottom: 1em;">
      <span>{{moduleN.rank}}</span>
      <h6>{{moduleN.label}}</h6>
    </div>
    <b-col class="p-0">
      <div v-for="(subject, index) of moduleN.subjects" :key="index" style="margin-bottom: .75em;">
        <p class="subject">{{subject.label.replace(/[0-9]/g, '').toLowerCase()}}</p>
        <CardGrade v-for="(grade, index) of subject.notes" :key="index" :grade="grade" variant="transparent" />
      </div>
    </b-col>
  </div>
</template>

<script>
export default {
  name: 'Card',
  components: {
    CardGrade: () => import("@/components/Grade/Card-Grade"),
  },
  props: {
    variant: {
      type: String, 
      default: 'primary'
    },
    boxShadow: Boolean,
    moduleN: {
      type: Object,
      required: true
    }
  },
  computed: {
    classComputed: function() {
      // glass, primary, colorfull, transparent
      return `${this.variant} ${this.boxShadow ? 'card-shadow' : ''}`;
    },
    hasHeaderSlot () {
      return !!this.$slots['header'];
    },
    hasFooterSlot () {
      return !!this.$slots['footer'];
    }
  }
}
</script>

<style lang="scss" scoped>
.subject {
  color: #bebebe;
  text-transform: capitalize;
}

</style>