<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form method="post" @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="selectedCategory">
            <option v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.type === 'income' ? '➕' : '➖' }} {{c.name}}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
              id="editName"
              type="text"
              v-model.trim="name"
              :class="{invalid: $v.name.$error}"
          >
          <label for="editName">Название</label>
          <span class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Введите название.</span>
          <span class="helper-text invalid" v-else-if="$v.name.$dirty && !$v.name.minLength">Минимальная длина 2 символа.</span>
        </div>

        <div class="input-field">
          <input
              id="editLimit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.$error}"
          >
          <label for="editLimit">Лимит</label>
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
          Обновить
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
      select: null,
      selectedCategory: null,
      name: '',
      limit: 100,
      type: 'income',
      sending: false
    }
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  validations: {
    name: { required, minLength: minLength(2) },
    limit: { minValue: minValue(100) },
    type: {
      type: v => ['income', 'charge'].includes(v)
    }
  },
  watch: {
    selectedCategory(value) {
      const category = this.categories.find(c => c.id === value)
      if (category) {
        this.name = category.name
        this.type = category.type
        this.limit = category.limit

        setTimeout(() => window.M.updateTextFields())
      }
    }
  },
  methods: {
    async submitHandler() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      this.sending = true
      try {
        const categoryData = {
          name: this.name,
          limit: this.limit,
          type: this.type,
          id: this.selectedCategory
        }
        await this.$store.dispatch('updateCategory', categoryData)

        this.$message('Категория была обновлена')
        this.$emit('updated', categoryData)
      } catch (e) {
        //
      }
      this.sending = false
    }
  },
  mounted() {
    if (this.categories.length) {
      this.selectedCategory = this.categories[0].id
    }
    setTimeout(() => window.M.FormSelect.init(this.$refs.select))
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
}
</script>