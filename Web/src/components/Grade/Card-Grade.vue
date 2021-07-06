<template>
  <div class="card" :class="classComputed">
    <div class="card-header" v-if="hasHeaderSlot">
      <slot name="header"/>
    </div>
    <b-col class="p-0">
      <p>{{grade.label}}</p>
      <div class="agrades">
        <p class="type">{{grade.type}}</p>
        <p class="coeff">{{grade.coeff}}%</p>
        <p class="mark1" :class="aboveAverage ? 'successfull' : 'failed'">{{grade.mark}}/20</p>
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
    },
    aboveAverage() {
      return this.grade.mark >= 10;
    }
  }
}
</script>

<style scoped lang="scss">
.agrades {
  display: flex;

  .type {
    width: 60%;
  }
  .mark1, .coeff {
    width: 20%;
    text-align: right;
  }
}
.card {
  margin-bottom: 0.25em;
}
</style>