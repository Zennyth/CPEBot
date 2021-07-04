<template>
  <div class="login">
    <b-col>
        <section>
            <h1>Login</h1>
            <Card variant="glass">
                <template>
                    <p>Mail :</p>
                    <b-form-input v-model="mail" placeholder="Enter your mail" type="email"/>
                    <p>Password :</p>
                    <b-form-input v-model="password" placeholder="Enter your Password" type="password"/>
                    <br>
                    <b-button variant="primary" class="w-100" @click="login">Login</b-button>
                </template>
            </Card>
        </section>
    </b-col>
    <span class="absolute">Dont have an account ? <router-link to="register">Register</router-link></span>
  </div>
</template>

<script>

import helper from "@/helpers/check.helper";
import userService from "@/services/user.service";
import gradeService from "@/services/grade.service";

export default {
  name: 'Login',
  data: () => {
    return {
      mail: '',
      password: ''
    } 
  },
  components: {
    Card: () => import("@/components/shared/Card"),
  },
  async mounted () {
    await userService.login('mathis.figuet@cpe.fr', 'O45fWIE4');
    if(this.$store.getters.isLoggedIn) {
      const grades = await gradeService.getAll();
      console.log(grades);
    }
  },
  methods: {
    login: function() {
      if(!helper.checkEmail(this.mail)) {
        this.$notify({
          group: 'global',
          type: 'alert-danger',
          title: 'Login error',
          text: 'Email address must be valid !',
          ignoreDuplicates: true
        });
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