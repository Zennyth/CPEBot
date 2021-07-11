<template>
  <div class="home">
    <b-col class="center">
      <h1>{{$t('settings.settings')}}</h1>
      <section>
        <Card variant="glass">
          <template v-slot:header>
            <h3>{{$t('settings.resetPassword')}}</h3>
          </template>
          <template>
            <validation-observer ref="observer" v-slot="{ handleSubmit }">
              <b-form @submit.stop.prevent="handleSubmit(resetPassword)">
                <validation-provider
                  :name="$t('settings.actualPassword')"
                  :rules="{required: true}"
                  v-slot="validationContext"
                >
                  <b-form-group id="example-input-group-1" :label="$t('settings.actualPassword')" label-for="example-input-1">
                    <b-form-input
                      id="example-input-1"
                      name="example-input-1"
                      v-model="form.actualPassword"
                      :state="getValidationState(validationContext)"
                      aria-describedby="input-1-live-feedback"
                      type="password"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-1-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>

                <validation-provider :name="$t('settings.newPassword')" :rules="{ required: true }" v-slot="validationContext">
                  <b-form-group id="example-input-group-2" :label="$t('settings.newPassword')" label-for="example-input-2">
                    <b-form-input
                      id="example-input-2"
                      name="example-input-2"
                      v-model="form.newPassword"
                      :state="getValidationState(validationContext)"
                      aria-describedby="input-2-live-feedback"
                      type="password"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-2-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>

                <validation-provider :name="$t('settings.repeatPassword')" :rules="{ required: true }" v-slot="validationContext">
                  <b-form-group id="example-input-group-3" :label="$t('settings.repeatPassword')" label-for="example-input-3">
                    <b-form-input
                      id="example-input-3"
                      name="example-input-3"
                      v-model="form.repeatNewPassword"
                      :state="getValidationState(validationContext)"
                      aria-describedby="input-3-live-feedback"
                      type="password"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-3-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>

                <br>
                <b-button type="submit" variant="primary" class="w-100">{{$t('settings.sendNewPassword')}}</b-button>
              </b-form>
            </validation-observer>
          </template>
        </Card>
      </section>
    </b-col>
  </div>
</template>

<script>
import userService from "@/services/user.service";

export default {
  name: 'Settings',
  components: {
    Card: () => import("@/components/shared/Card"),
  },
  data: () => {
    return {
      form: {
        actualPassword: null,
        newPassword: null,
        repeatNewPassword: null,
      }
    } 
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    resetPassword: async function() {
      try {
        if(this.form.newPassword == this.form.repeatNewPassword) {
          const res = await userService.resetPassword(this.form);
          if(res.error) {
            this.$notify({
              group: 'global',
              type: 'alert-danger',
              title: 'Reset password error',
              text: res.error.response.data.error,
              ignoreDuplicates: true
            });
          } else {
            this.$notify({
              group: 'global',
              type: 'alert-success',
              title: 'Reset password',
              text: 'Your password has been reset',
              ignoreDuplicates: true
            });
            this.$store.dispatch('logout');
          }
        }
        else {
          this.$notify({
            group: 'global',
            type: 'alert-danger',
            title: 'Reset password error',
            text: 'New passwords doesnt match',
            ignoreDuplicates: true
          });
        }
      } catch (err) {
        this.$notify({
          group: 'global',
          type: 'alert-danger',
          title: 'Login error',
          text: 'Wrong combination',
          ignoreDuplicates: true
        });
      }
    }
  }
}
</script>