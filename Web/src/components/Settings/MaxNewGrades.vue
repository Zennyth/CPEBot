<template>
    <Card variant="glass">
        <template v-slot:header>
            <h3>{{$t('settings.maxNewGrades')}}</h3>
        </template>
        <template>
            <validation-observer ref="observer" v-slot="{ handleSubmit }">
                <b-form @submit.stop.prevent="handleSubmit(change)">
                <validation-provider
                    :name="$t('settings.maxNewGrades')"
                    v-slot="validationContext"
                >
                    <b-form-group id="example-input-group-10" :label="$t('settings.maxNewGrades')" label-for="example-input-10">
                    <b-form-input
                        id="example-input-10"
                        name="example-input-10"
                        v-model="form.maxNewGrades"
                        :state="getValidationState(validationContext)"
                        aria-describedby="input-10-live-feedback"
                        type="number"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-10-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
                <br>
                <b-button type="submit" variant="primary" class="w-100">{{$t('settings.changeMaxNewGrades')}}</b-button>
                </b-form>
            </validation-observer>
        </template>
    </Card>
</template>

<script>
export default {
  name: 'MaxNewGrades',
  components: {
    Card: () => import("@/components/shared/Card"),
  },
  data: function() {
    return {
      form: {
        maxNewGrades: this.$store.getters.hasMaxGradesConfigured ? this.$store.state.userModule.maxNewGrades : 5,
      }
    } 
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    change() {
      this.form.maxNewGrades = parseInt(this.form.maxNewGrades);
      if(Number.isInteger(this.form.maxNewGrades)) {
        this.$store.commit("modifyMaxNewGrades", this.form.maxNewGrades);
      } else {
        this.$notify({
            group: 'global',
            type: 'alert-danger',
            title: this.$t('settings.maxNewGrades'),
            text: this.$t('settings.maxNewGrades'),
            ignoreDuplicates: true
        });
      }
    }
  }
}
</script>