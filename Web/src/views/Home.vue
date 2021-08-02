<template>
  <div class="home">
    <b-col>
      <section>
        <h1>{{$t("home.home")}}</h1>
        <br>
        <Card variant="glass" v-if="!$store.getters.hasNotificationsConfigured">
          <template v-slot:header>
            <h4>{{$t("home.notifications.title")}}</h4>
          </template>
          <template>
            <p>{{$t("home.notifications.description")}}</p>
            <br>
            <router-link to="/settings">
              <b-button variant="primary" class="w-100">{{$t("home.notifications.goTo")}}</b-button>
            </router-link>
          </template>
        </Card>

        <br>
        <Card variant="glass" v-if="!$store.getters.hasMaxGradesConfigured">
          <template v-slot:header>
            <h4>{{$t("home.maxNewGrades.title")}}</h4>
          </template>
          <template>
            <p>{{$t("home.maxNewGrades.description")}}</p>
            <br>
            <router-link to="/settings">
              <b-button variant="primary" class="w-100">{{$t("home.maxNewGrades.goTo")}}</b-button>
            </router-link>
          </template>
        </Card>
      </section>
    </b-col>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    Card: () => import("@/components/shared/Card"),
  }
}
</script>
