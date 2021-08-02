<template>
    <Card variant="glass">
        <template v-slot:header>
            <h3>{{$t('settings.notifications')}}</h3>
        </template>
        <template>
            <b-tabs content-class="mt-3 w-100" style="width: 100%;">
                <b-tab :title="$t('settings.phone')" active>
                    <validation-observer ref="observer" v-slot="{ handleSubmit }">
                        <b-form @submit.stop.prevent="handleSubmit(changeNotification)">
                            <validation-provider
                              name="PushOver Token"
                              v-slot="validationContext"
                            >
                                <b-form-group id="example-input-group-1" label-for="example-input-5">
                                  <div class="form-head">
                                    <span>PushOver Token</span>
                                    <a href="https://pushover.net/" target="blank"><b-icon icon="question-circle-fill"></b-icon></a>
                                  </div>
                                  <b-form-input
                                      id="example-input-5"
                                      name="example-input-5"
                                      v-model="form.notification"
                                      :state="getValidationState(validationContext)"
                                      aria-describedby="input-5-live-feedback"
                                      type="text"
                                  ></b-form-input>

                                  <b-form-invalid-feedback id="input-5-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                </b-form-group>
                            </validation-provider>
                            <br>
                            <b-button type="submit" variant="primary" class="w-100">{{$t('settings.sendNewPassword')}}</b-button>
                        </b-form>
                    </validation-observer>
                </b-tab>
                <b-tab title="Discord">
                    <validation-observer ref="observer" v-slot="{ handleSubmit }">
                        <b-form @submit.stop.prevent="handleSubmit(changeDiscord)">
                            <validation-provider
                                name="Token"
                                v-slot="validationContext"
                            >
                                <b-form-group id="example-input-group-6" label-for="example-input-6">
                                  <div class="form-head">
                                    <span>Discord</span>
                                    <a href="https://discordtips.com/how-to-get-your-discord-token/" target="blank"><b-icon icon="question-circle-fill"></b-icon></a>
                                  </div>
                                  <b-form-input
                                      id="example-input-6"
                                      name="example-input-6"
                                      v-model="form.discord"
                                      :state="getValidationState(validationContext)"
                                      aria-describedby="input-6-live-feedback"
                                      type="text"
                                  ></b-form-input>

                                  <b-form-invalid-feedback id="input-6-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                </b-form-group>
                            </validation-provider>
                            <br>
                            <b-button type="submit" variant="primary" class="w-100">{{$t('settings.sendNewPassword')}}</b-button>
                        </b-form>
                    </validation-observer>
                </b-tab>
            </b-tabs>
        </template>
    </Card>
</template>

<script>
import userService from "@/services/user.service";

export default {
  name: 'ResetPassword',
  components: {
    Card: () => import("@/components/shared/Card"),
  },
  data: function() {
    return {
      form: {
        discord: this.$store.state.userModule.discord || '',
        notification: this.$store.state.userModule.notification || ''
      }
    } 
  },
  mounted: function() {
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    changeDiscord() {
      const res = userService.changeNotifications({
        discord: this.form.discord
      });

      if(res.error) {
        this.$notify({
            group: 'global',
            type: 'alert-danger',
            title: 'Notifications',
            text: res.error.response.data.error,
            ignoreDuplicates: true
        });
      } else {
        this.$notify({
            group: 'global',
            type: 'alert-success',
            title: 'Notifications',
            text: 'Your discord token has been changed !',
            ignoreDuplicates: true
        });
        this.$store.commit("modifyDiscord", this.form.discord);
      }
    },
    changeNotification() {
      const res = userService.changeNotifications({
        notification: this.form.notification
      });

      if(res.error) {
        this.$notify({
            group: 'global',
            type: 'alert-danger',
            title: 'Pushver Token',
            text: res.error.response.data.error,
            ignoreDuplicates: true
        });
      } else {
        this.$notify({
            group: 'global',
            type: 'alert-success',
            title: 'Notifications',
            text: 'Your PushOver token has been changed !',
            ignoreDuplicates: true
        });
        this.$store.commit("modifyNotification", this.form.notification);
      }
    }
  }
}
</script>

<style lang="scss">
.form-head {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>