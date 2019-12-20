<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading" />
    
    <p v-else-if="!categories.length" class="center">
      Категорий пока нет. <router-link to="/categories">Добавить новую</router-link>
    </p>
    
    <form v-else class="form" method="post" @submit.prevent="submitHandler">
      <div class="input-field" >
        <select v-model="category" ref="select">
          <option v-for="c in categories" :key="c.id" :value="c.id"
          >{{ c.type === 'income' ? '➕' : '➖' }} {{c.name}}</option>
        </select>
        <label>Выберите категорию</label>
        <span class="helper-text invalid" v-if="$v.category.$error">
          Несуществующая категория.
        </span>
      </div>

      <p>
        <span>{{ type === 'income' ? 'Доход' : 'Расход' }}</span>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: $v.amount.$error}"
        >
        <label for="amount">Сумма</label>
        <span class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.required">Введите сумму.</span>
        <span class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.minValue">
          Минимальное значение {{ $v.amount.$params.minValue.min | currency }}.
        </span>
      </div>

      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: $v.name.$error}"
        >
        <label for="description">Описание</label>
        <span class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Введите описание.</span>
        <span class="helper-text invalid" v-else-if="$v.name.$dirty && !$v.name.minLength">
          Минимальная длина {{$v.name.$params.minLength.min}} символа.
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit" :disabled="this.sending">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required, minLength, minValue } from 'vuelidate/lib/validators'
import messages from '@/lang/messages'

export default {
  data() {
    return {
      categories: [],
      category: null,
      name: '',
      amount: null,
      type: null,
      loading: true,
      sending: false
    }
  },
  validations: {
    name: { required, minLength: minLength(2) },
    amount: { required, minValue: minValue(10) },
    category: {
      required
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if (this.categories.length) {
      this.category = this.categories[0].id
      this.$nextTick(() => {
        window.M.FormSelect.init(this.$refs.select)
      })
    }
  },
  watch: {
    category(categoryId) {
      if (categoryId) {
        this.type = this.categories.find( c => c.id === this.category).type
      }
    }
  },
  computed: {
    ...mapState({
      info: state => state.info.info
    }),
    canCreateRecord() {
      if (this.categories.length === 0) {
        return false
      }
      if (this.type !== 'income') {
        return this.info.bill >= this.amount
      }
      return true
    }
  },
  methods: {
    async submitHandler() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      this.sending = true
      if (this.canCreateRecord) {
        const recordData = {
          name: this.name,
          amount: this.amount,
          categoryId: this.category,
          date: new Date().toJSON()
        }
        await this.$store.dispatch('createRecord', recordData)
        this.$message(messages['record-created'])
        this.$v.$reset()
        this.amount = 10
        this.name = ''

      } else {
        this.$message('Недостаточно средств')
      }
      this.sending = false
    }
  }
}
</script>