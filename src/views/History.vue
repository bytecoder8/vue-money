<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <Loader v-if="loading" />
    
    <div v-if="records.length">
      <div class="history-chart">
        <canvas></canvas>
      </div>

      <section>
        <HistoryTable :records="records" />
      </section>
    </div>

    <p class="center" v-else>
      Записей пока нет. <router-link to="/record">Создать новую</router-link>
    </p>

  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'

export default {
  data() {
    return {
      records: [],
      categories: [],
      loading: true
    }
  },
  async mounted() {
    try {
      this.categories = await this.$store.dispatch('fetchCategories')
      const records = await this.$store.dispatch('fetchRecords')

      const categoriesById = this.categories.reduce( (res, val) => {
        res[val.id] = val
        return res
      }, {})

      this.records = records.map( record => {
        const category = categoriesById[record.categoryId]
        return {
          ...record,
          categoryName: category.name,
          type: category.type
        }
      })
    } catch (e) {
      //
    }
    this.loading = false
  },
  components: {
    HistoryTable
  }
}
</script>