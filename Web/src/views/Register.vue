<template>
  <div class="login">
    <b-col>
        <section>
            <h1>Register</h1>
            <Card variant="glass">
                <template>
                    <p>Mail :</p>
                    <b-form-input v-model="mail" placeholder="Enter your mail" type="email"/>
                    <p>Password :</p>
                    <b-form-input v-model="password" placeholder="Enter your Password" type="password"/>
                    <br>
                    <b-button variant="primary" class="w-100">Sign up</b-button>
                </template>
            </Card>
        </section>
    </b-col>
    <span class="absolute">You already have an account ? <router-link to="login">Login</router-link></span>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data: () => {
    return {
        mail: '',
        password: ''
    } 
  },
  components: {
    Card: () => import("@/components/shared/Card"),
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