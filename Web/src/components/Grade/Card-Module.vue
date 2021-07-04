<template>
  <div class="card" :class="classComputed">
    <div class="card-header p-0">
      <h6 class="mb-0.25">{{moduleN.label}}</h6>
    </div>
    <b-col class="p-0">
      <CardGrade v-for="(grade, index) of moduleN.notes" :key="index" :grade="grade" variant="transparent" />
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