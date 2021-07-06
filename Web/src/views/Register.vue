<template>
  <div class="login">
    <b-col>
        <section>
            <h1>Register</h1>
            <Card variant="glass">
                <validation-observer ref="observer" v-slot="{ handleSubmit }">
                    <b-form @submit.stop.prevent="handleSubmit(register)">
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

                      <validation-provider name="Pseudo" :rules="{ required: true }" v-slot="validationContext">
                        <b-form-group id="example-input-group-5" label="Pseudo" label-for="example-input-5">
                          <b-form-input
                            id="example-input-5"
                            name="example-input-5"
                            v-model="form.pseudo"
                            :state="getValidationState(validationContext)"
                            aria-describedby="input-5-live-feedback"
                          ></b-form-input>

                          <b-form-invalid-feedback id="input-5-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                      </validation-provider>

                      <validation-provider name="Promotion" :rules="{ required: true }" v-slot="validationContext">
                        <b-form-group id="example-input-group-3" label="Promotion" label-for="example-input-3">
                          <b-form-select
                            id="example-input-3"
                            name="example-input-3"
                            v-model="form.yearpromotion"
                            :state="getValidationState(validationContext)"
                            :options="promotions"
                            aria-describedby="input-3-live-feedback"
                          ></b-form-select>

                          <b-form-invalid-feedback id="input-3-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                      </validation-provider>

                      <validation-provider name="Sector" :rules="{ required: true }" v-slot="validationContext">
                        <b-form-group id="example-input-group-4" label="Sector" label-for="example-input-3">
                          <b-form-select
                            id="example-input-4"
                            name="example-input-4"
                            v-model="form.lblsector"
                            :state="getValidationState(validationContext)"
                            :options="sectors"
                            aria-describedby="input-4-live-feedback"
                          ></b-form-select>

                          <b-form-invalid-feedback id="input-4-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                      </validation-provider>

                      <br>
                      <b-button type="submit" variant="primary" class="w-100">Register</b-button>
                    </b-form>
                </validation-observer>
            </Card>
        </section>
    </b-col>
    <span class="absolute">You already have an account ? <router-link to="login">Login</router-link></span>
  </div>
</template>

<script>
// import promotionService from "@/services/promotion.service";
import sectorService from "@/services/sector.service";
import userService from "@/services/user.service";

export default {
  name: 'Register',
  data: () => {
    return {
      form: {
        mail: '',
        password: '',
        yearpromotion: '',
        pseudo: '',
        lblsector: ''
      },
      promotions: [],
      sectors: []
    } 
  },
  components: {
    Card: () => import("@/components/shared/Card"),
  },
  async mounted() {
    this.promotions = this.generateArrayOfYears();
    this.sectors = (await sectorService.getAll()).map(sector => sector.label);
    /*
    this.promotions = (await promotionService.getAll()).map(obj => obj.year.substring(0, 4));
    console.log(this.promotions);*/
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    generateArrayOfYears() {
      const max = new Date().getFullYear();
      const min = max - 5;
      const years = [];
      for (var i = max; i >= min; i--) {
        years.push(i);
      }
      return years;
    },
    async register() {
      const response = await userService.signUp(this.form);
      if(response.error) {
        this.$notify({
          group: 'global',
          type: 'alert-danger',
          title: 'Register error',
          text: 'This student already exist.',
          ignoreDuplicates: true
        })
      } else {
        this.$router.push({name: "Grades"});
      }
      return;
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