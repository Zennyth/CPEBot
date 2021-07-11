<template>
  <div class="login">
    <b-col class="center">
        <section>
            <h1>{{$t('register.register')}}</h1>
            <Card variant="glass">
                <validation-observer ref="observer" v-slot="{ handleSubmit }">
                    <b-form @submit.stop.prevent="handleSubmit(register)">
                      <validation-provider
                        :name="$t('register.mail')"
                        :rules="{email: true, required: true}"
                        v-slot="validationContext"
                      >
                        <b-form-group id="example-input-group-1" :label="$t('register.mail')" label-for="example-input-1">
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

                      <validation-provider :name="$t('register.password')" :rules="{ required: true }" v-slot="validationContext">
                        <b-form-group id="example-input-group-2" :label="$t('register.password')" label-for="example-input-2">
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

                      <validation-provider :name="$t('register.pseudo')" :rules="{ required: false }" v-slot="validationContext">
                        <b-form-group id="example-input-group-5" :label="$t('register.pseudo')" label-for="example-input-5">
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

                      <validation-provider :name="$t('register.promotion')" :rules="{ required: true }" v-slot="validationContext">
                        <b-form-group id="example-input-group-3" :label="$t('register.promotion')" label-for="example-input-3">
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

                      <validation-provider :name="$t('register.sector')" :rules="{ required: true }" v-slot="validationContext">
                        <b-form-group id="example-input-group-4" :label="$t('register.sector')" label-for="example-input-3">
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
                      <b-button type="submit" variant="primary" class="w-100">{{$t('register.register')}}</b-button>
                    </b-form>
                </validation-observer>
            </Card>
        </section>
    </b-col>
    <span class="absolute">{{$t('register.toLogin')}}<router-link to="login">{{$t('register.login')}}</router-link></span>
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
      //console.log({response});
      if(response.error) {
        if(response.error?.response?.data) {
          this.$notify({
            group: 'global',
            type: 'alert-danger',
            title: 'Register error',
            text: response.error.response.data.error,
            ignoreDuplicates: true
          });
        } else {
          this.$notify({
            group: 'global',
            type: 'alert-danger',
            title: 'Register error',
            text: 'This student already exist.',
            ignoreDuplicates: true
          });
        }
      } else {
        this.$root.login();
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