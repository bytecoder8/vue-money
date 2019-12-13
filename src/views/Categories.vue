<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate />
        <CategoryEdit @created="addCategory" />
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
      categories: []
    }
  },
  methods: {
    addCategory(category) {
      this.categories.push(category)
    }
  },
  components: {
    CategoryCreate, CategoryEdit
  }
}
</script>