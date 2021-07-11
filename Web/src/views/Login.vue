<template>
  <div class="login">
    <b-col class="center">
        <section>
            <h1>{{$t('login.login')}}</h1>
            <Card variant="glass">
                <template>
                  <validation-observer ref="observer" v-slot="{ handleSubmit }">
                    <b-form @submit.stop.prevent="handleSubmit(login)">
                      <validation-provider
                        :name="$t('login.mail')"
                        :rules="{email: true, required: true}"
                        v-slot="validationContext"
                      >
                        <b-form-group id="example-input-group-1" :label="$t('login.mail')" label-for="example-input-1">
                          <b-form-input
                            id="example-input-1"
                            name="example-input-1"
                            v-model="form.mail"
                            :state="getValidationState(validationContext)"
                            aria-describedby="input-1-live-feedback"
                          ></b-form-input>

                          <b-form-invalid-feedback id="input-1-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                      </validation-provider>

                      <validation-provider :name="$t('login.password')" :rules="{ required: true }" v-slot="validationContext">
                        <b-form-group id="example-input-group-2" :label="$t('login.password')" label-for="example-input-2">
                          <b-form-input
                            id="example-input-2"
                            name="example-input-2"
                            v-model="form.password"
                            :state="getValidationState(validationContext)"
                            aria-describedby="input-2-live-feedback"
                            type="password"
                          ></b-form-input>

                          <b-form-invalid-feedback id="input-2-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                      </validation-provider>

                      <br>
                      <b-button type="submit" variant="primary" class="w-100">{{$t('login.login')}}</b-button>
                    </b-form>
                  </validation-observer>
                </template>
            </Card>
        </section>
    </b-col>
    <span class="absolute">{{$t('login.toRegister')}}<router-link to="register">{{$t('login.register')}}</router-link></span>
  </div>
</template>

<script>
import userService from "@/services/user.service";

export default {
  name: 'Login',
  data: () => {
    return {
      form: {
        mail: null,
        password: null
      }
    } 
  },
  components: {
    Card: () => import("@/components/shared/Card"),
  },
  async mounted () {
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    login: async function() {
      try {
        await userService.login(this.form.mail, this.form.password);
        this.$root.login();
        this.$router.push({name: "Grades"});
      } catch (err) {
        this.$notify({
          group: 'global',
          type: 'alert-danger',
          title: 'Login error',
          text: 'Wrong combination',
          ignoreDuplicates: true
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.absolute {
  position: absolute;
  bottom: 1em;
  text-align: center;
  width: 100%;
  color: #878484;
}
</style>