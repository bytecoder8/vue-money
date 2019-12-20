<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form method="post" @submit.prevent="submitHandler">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model.trim="name"
              :class="{invalid: $v.name.$error}"
          >
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Введите название.</span>
          <span class="helper-text invalid" v-else-if="$v.name.$dirty && !$v.name.minLength">Минимальная длина 2 символа.</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.$error}"
          >
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.minValue">
            Минимальное значение {{ $v.limit.$params.minValue.min | currency }}.
          </span>
        </div>

        <p>
          <label>
            <input type="radio" name="type" value="income" v-model="type">
            <span>Доход</span>
          </label>
          <label>
            <input type="radio" name="type" value="charge" v-model="type">
            <span>Расход</span>
          </label>
          <span class="helper-text invalid" v-if="$v.type.$dirty && !$v.type.type">
            Неправильный тип.
          </span>
        </p>

        <button class="btn waves-effect waves-light" type="submit" :disabled="this.sending">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>  
</template>

<script>
import { required, minLength, minValue } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      name: '',
      limit: 100,
      type: 'income',
      sending: false
    }
  },
  validations: {
    name: { required, minLength: minLength(2) },
    limit: { minValue: minValue(100) },
    type: {
      type: v => ['income', 'charge'].includes(v)
    }
  },
  mounted() {
    window.M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.sending = true
      try {
        const category = await this.$store.dispatch('createCategory', {
          name: this.name,
          limit: this.limit,
          type: this.type
        })

        this.name = ''
        this.limit = 100
        this.$v.$reset()

        this.$message('Категория была создана')
        this.$emit('created', category)
      } catch (e) {
        console.warn(e)
      }
      this.sending = false
    }
  }
}
</script>