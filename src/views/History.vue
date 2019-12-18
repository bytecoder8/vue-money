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
          :click-handler="onPageChanged"
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
        column: this.$route.query['sort.column'] || null,
        dir: this.$route.query['sort.dir'] || 1
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
      if (this.sort.column) {
        this.sortRecords(this.sort.column)
      }
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
    sortRecords(column) {
      this.records.sort( (a, b) => {
        if (a[column] > b[column]) {
          return +this.sort.dir * 1
        }
        if (a[column] < b[column]) {
          return -this.sort.dir * 1
        }
        return 0
      })
    },
    handleSortChange(column) {
      if (this.sort.column === column) {
        this.sort.dir = -this.sort.dir
      }
      this.sort.column = column

      this.sortRecords(this.sort.column)

      // update url
      this.$router.push(`${this.$route.path}?page=${this.pagination.page}&sort.column=${this.sort.column}&sort.dir=${this.sort.dir}`)
    },
    onPageChanged(page) {
      this.pageChangeHandler(page) // from mixin
      this.updateUrl(page)
    },
    updateUrl(page) {
      let newUrl = `${this.$route.path}?page=${page}`
      if (this.sort.column) {
        newUrl += `&sort.column=${this.sort.column}`
        if (this.sort.dir) {
          newUrl += `&sort.dir=${this.sort.dir}`
        }
      }
      this.$router.push(newUrl)
    }
  },
  components: {
    HistoryTable
  }
}
</script>