<template>
  <div class="icon" :class="classComputed">
    <b-icon :variant="variant" :scale="scale" :icon="icon"></b-icon>
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
    scale: Number,
    icon: String
  },
  computed: {
    classComputed: function() {
      // glass, primary, colorfull, transparent
      return `${this.boxShadow ? 'icon-shadow' : ''}`;
    }
  }
}
</script>
