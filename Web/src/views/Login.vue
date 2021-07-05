<template>
  <div class="login">
    <b-col>
        <section>
            <h1>Login</h1>
            <Card variant="glass">
                <template>
                  <validation-observer ref="observer" v-slot="{ handleSubmit }">
                    <b-form @submit.stop.prevent="handleSubmit(login)">
                      <validation-provider
                        name="Mail"
                        :rules="{email: true, required: true}"
                        v-slot="validationContext"
                      >
                        <b-form-group id="example-input-group-1" label="Mail" label-for="example-input-1">
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

                      <validation-provider name="Password" :rules="{ required: true }" v-slot="validationContext">
                        <b-form-group id="example-input-group-2" label="Password" label-for="example-input-2">
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
                      <b-button type="submit" variant="primary" class="w-100">Login</b-button>
                    </b-form>
                  </validation-observer>
                </template>
            </Card>
        </section>
    </b-col>
    <span class="absolute">Dont have an account ? <router-link to="register">Register</router-link></span>
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
        this.$router.push({name: "Grades"});
      } catch (err) {
        this.$notify({
          group: 'global',
          type: 'alert-danger',
          title: 'Login error',
          text: err,
          ignoreDuplicates: true
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login {
    height: 100vh;
    display: flex;
    align-items: center;
}
.absolute {
    position: absolute;
    bottom: 1em;
    text-align: center;
    width: 100%;
    color: #878484;
}
</style>