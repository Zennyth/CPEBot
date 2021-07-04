<template>
  <div class="card" :class="classComputed">
    <div class="card-header" v-if="hasHeaderSlot">
      <slot name="header"/>
    </div>
    <b-col>
      <slot />
    </b-col>
    <div class="card-footer" v-if="hasFooterSlot">
      <slot name="footer"/>
    </div>
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
    boxShadow: Boolean
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
