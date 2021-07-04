<template>
  <div id="web">
    <div id="background">
      <div class="background-gradient">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>
    <div id="app">
      <notifications group="global" classes="alert" animation-type="velocity"/>
      <main>
        <transition name="fade">
          <router-view/>
        </transition>
      </main>
      <Header />
    </div>
  </div>
</template>

<script>
import Header from "@/components/global/Header";

export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>


<style lang="scss">

</style>
