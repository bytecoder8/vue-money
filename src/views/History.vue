<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <Loader v-if="loading" />
    
    <div v-else-if="records.length">
      <div class="history-chart">
        <canvas></canvas>
      </div>

      <section>
        <HistoryTable :records="pagination.items" :sort="sort" @sortChanged="handleSortChange" />

        <Paginate 
          v-model="pagination.page"
          :page-count="pagination.pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="'<i class=\'material-icons\'>chevron_left</i>'"
          :next-text="'<i class=\'material-icons\'>chevron_right</i>'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
        />
      </section>
    </div>

    <p class="center" v-else>
      Записей пока нет. <router-link to="/record">Создать новую</router-link>
    </p>

  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination'
import HistoryTable from '@/components/HistoryTable'

export default {
  mixins: [paginationMixin],
  data() {
    return {
      records: [],
      categories: [],
      loading: true,
      sort: {
        column: null,
        dir: 1
      },
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
  watch: {
    records() {
      this.setupPagination(this.records)
    }
  },
  methods: {
    handleSortChange(column) {
      if (this.sort.column === column) {
        this.sort.dir = -this.sort.dir
      }
      this.sort.column = column

      this.records.sort( (a, b) => {
        if (a[column] > b[column]) {
          return +this.sort.dir * 1
        }
        if (a[column] < b[column]) {
          return -this.sort.dir * 1
        }
        return 0
      })
    }
  },
  components: {
    HistoryTable
  }
}
</script>