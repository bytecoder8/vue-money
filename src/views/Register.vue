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
        >Обязательное поле</small>
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
        <small class="helper-text invalid"  v-if="$v.password.$error">Обязательное поле, минимальная длина {{$v.password.$params.minLength.min}} символов. 
        {{ password.length ? `Сейчас он ${password.length}` : ''}}
        </small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: $v.name.$error}"
        >
        <label for="name">Имя</label>
        <small class="helper-text invalid" v-if="$v.name.$error">
          Обязательное поле, минимальная длина {{$v.name.$params.minLength.min}} символов. 
        {{ name.length ? `Сейчас он ${name.length}` : ''}}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
      <small class="helper-text invalid" v-if="$v.agree.$error">Вы должны согласиться с правилами</small>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      agree: false
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6)
    },
    name: {
      required,
      minLength: minLength(3)
    },
    agree: {
      checked: v => v
    }
  },
  methods: {
    async submitHandler() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      } else {
        const formData = {
          email: this.email,
          password: this.password,
          name: this.name
        }
        try {
          await this.$store.dispatch('register', formData)
          this.$router.push('/')
        } catch (e) {
          //
        }
      }
    }
  } 
}
</script>