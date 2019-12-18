<template>
  <form class="card auth-card" @submit.prevent="submitHandler" method="post">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: $v.email.$error}"
        >
        <label for="email">Email</label>
        <small 
          class="helper-text invalid" 
          v-if="$v.email.$dirty && !$v.email.required"
        >Введите email</small>
        <small 
          class="helper-text invalid" 
          v-else-if="$v.email.$dirty && !$v.email.email"
        >Неправильный формат email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model="password"
            :class="{invalid: $v.password.$error}"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="$v.password.$error">Введите пароль</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit" :disabled="this.sending"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import messages from '@/lang/messages'

export default {
  data() {
    return {
      email: '',
      password: '',
      sending: false
    }
  },
  mounted() {
    if (this.$route.query.message in messages) {
      this.$message(messages[this.$route.query.message])
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required
    }
  },
  methods: {
    async submitHandler() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      this.sending = true
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {
        //
      }
      this.sending = false
    }
  }
}
</script>