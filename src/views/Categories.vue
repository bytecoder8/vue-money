<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addCategory" />
        <CategoryEdit v-if="categories.length" 
          :categories="categories" @updated="updateCategories" :key="categories.length + updatesCounter" />
        <p v-else>Категорий нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  data() {
    return {
      categories: [],
      loading: true,
      updatesCounter: 0
    }
  },
  async mounted() {
    try {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false
    } catch(e) {
      console.warn(e)
    }
  },
  methods: {
    addCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const index = this.categories.findIndex(c => c.id === category.id)
      this.$set(this.categories, index, category)
      this.updatesCounter++
    }
  },
  components: {
    CategoryCreate, CategoryEdit
  }
}
</script>