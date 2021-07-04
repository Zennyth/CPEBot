<template>
  <div class="card" :class="classComputed">
    <div class="card-header" v-if="hasHeaderSlot">
      <slot name="header"/>
    </div>
    <b-col class="p-0">
      <p>{{grade.label}}</p>
      <div class="agrades">
        <p>{{grade.type}}</p>
        <p>{{grade.mark}}/20</p>
        <p>{{grade.coeff}}%</p>
      </div>
    </b-col>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    variant: {
      type: String, 
      default: 'primary'
    },
    boxShadow: Boolean,
    grade: {
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

<style scoped lang="scss">
.agrades {
  display: flex;
  justify-content: space-between;
}
.card {
  margin-bottom: 0.25em;
}
</style>