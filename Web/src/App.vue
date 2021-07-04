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
      <Header />
      <main>
        <transition name="fade">
          <router-view/>
        </transition>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>


<style lang="scss">

</style>
