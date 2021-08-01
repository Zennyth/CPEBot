<template>
  <div class="home">
    <b-col class="center">
      <section class="w-100">
        <div class="header">
          <h1>{{$t('settings.settings')}}</h1>
          <b-form-select v-model="$i18n.locale" :options="['fr', 'en']"></b-form-select>
        </div>
        <br>
        <Notifications />
        <br>
        <MaxNewGrades />
        <br>
        <ResetPassword />
      </section>
    </b-col>
  </div>
</template>

<script>

export default {
  name: 'Settings',
  components: {
    ResetPassword: () => import("@/components/Settings/ResetPassword"),
    Notifications: () => import("@/components/Settings/Notifications"),
    MaxNewGrades: () => import("@/components/Settings/MaxNewGrades"),
  },
  data: () => {
    return {
    } 
  },
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  > select {
    max-width: 80px;
    background-color: transparent;
    color: white;
    border-color: #495057;
    text-transform: uppercase;

    > option {
      color: #495057;
    }
  }
}
</style>