<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link tag="a" to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb" href="#" @click.prevent>
          {{ record.type === 'income' ? 'Доход' : 'Расход' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{'green': record.type === 'income', 'red': record.type === 'charge'}">
            <div class="card-content white-text">
              <p>Описание: {{record.name}}</p>
              <p>Сумма: {{record.amount | currency}}</p>
              <p>Категория: {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">Запись с id: <strong>{{$route.params.id}}</strong> не найдена</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      record: null,
      loading: true
    }
  },
  async mounted() {
    try {
      const record = await this.$store.dispatch('fetchRecordById', this.$route.params.id)
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
      this.record = {...record, type: category.type, categoryName: category.name}
    } catch (e) {
      console.warn(e)
    }
    this.loading = false
  }
}
</script>