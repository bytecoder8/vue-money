<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bill | currency}}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      Категорий пока нет. <router-link to="/categories">Добавить новую</router-link>
    </p>

    <section v-else>
      <div v-for="cat in categories" :key="cat.id" v-tooltip="cat.tooltip">
        <p>
          <strong>{{cat.name}}:</strong>
          {{cat.spend | currency}} из {{cat.limit | currency}}
        </p>
        <div class="progress">
          <div
              class="determinate" :class="cat.color"
              :style="{width: cat.percent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import currencyFilter from '@/filters/currency'

export default {
  data() {
    return {
      loading: true,
      categories: []
    }
  },
  computed: {
    ...mapState({
      info: state => state.info.info
    })
  },
  async mounted() {
    const categories = await this.$store.dispatch('fetchCategories')
    const records = await this.$store.dispatch('fetchRecords')

    this.categories = categories
      .filter(cat => cat.type === 'charge')
      .map( cat => {
        const spend = records
          .filter(record => record.categoryId === cat.id)
          .reduce((total, record) => total += +record.amount, 0)

        const percent = Math.min(spend / cat.limit * 100, 100)
        const color = percent < 60 
          ? 'green'
            : percent < 100
              ? 'yellow'
                : 'red'

        const left = cat.limit - spend
        const tooltip = (left < 0 ? 'Превысили на ' : 'Осталось ') + currencyFilter(Math.abs(left))

        return {...cat, spend, percent, color, tooltip }
      })

    this.loading = false
  }
}
</script>