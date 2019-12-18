export default {
  data() {
    return {
      pagination: {
        page: +this.$route.query.page || 1,
        pageSize: 5,
        pageCount: 0,
        allItems: [],
        items: []
      }
    }
  },
  methods: {
    setupPagination(allItems) {
      this.pagination.allItems = chunk(allItems, this.pagination.pageSize)
      this.pagination.pageCount = this.pagination.allItems.length
      this.pagination.items = this.pagination.allItems[this.pagination.page - 1] || this.pagination.allItems[0]
    },
    pageChangeHandler(newPage) {
      this.pagination.items = this.pagination.allItems[newPage - 1] || this.pagination.allItems[0]
    }
  }
}

function chunk(arr, chunkSize = 1, cache = []) {
  const tmp = [...arr]
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}