<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model.trim="name"
            :class="{invalid: $v.name.$error}"
        >
        <label for="description">Имя</label>
        <span class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Введите имя.</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit" :disabled="this.sending">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      sending: false,
      name: this.$store.getters.info.name
    }
  },
  validations: {
    name: {
      required
    }
  },
  async mounted() {
    if (Object.keys(this.$store.getters.info).length === 0) {
      try {
        await this.$store.dispatch('fetchInfo')
      } catch (e) {
        // 
      }
    }
    this.$nextTick( () => window.M.updateTextFields() )
  },
  methods: {
    async submitHandler() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      this.sending = true
      try {
        await this.$store.dispatch('updateInfo', { name: this.name })
      } catch (e) {
        //
      }
      this.$message('Профиль обновлен')
      this.sending = false
    }
  }
}
</script>