<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th v-for="col of columns" @click="changeSort(col[0])" :key="col[0]" style="cursor: pointer">
        {{ col[1] }} {{ sort.column === col[0] ? ( sort.dir > 0 ? '&#8593;' : '&#8595;' ) : '' }}
      </th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, index) of records" :key="record.id">
      <td>{{index + 1}}</td>
      <td>{{record.amount | currency}}</td>
      <td>{{record.date | date('datetime')}}</td>
      <td>{{record.categoryName}}</td>
      <td>
        <span v-if="record.type === 'income'" class="white-text badge green">Доход</span>
        <span v-else class="white-text badge red">Расход</span>
      </td>
      <td>
        <button class="btn-small btn" @click="$router.push('/detail/' + record.id)" v-tooltip="'Посмотреть запись'">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      sort: {
        column: null,
        dir: 1
      },
      columns: [
        [ 'amount', 'Сумма' ],
        [ 'date', 'Дата' ],
        [ 'categoryName', 'Категория' ],
        [ 'type', 'Тип' ],
      ]
    }
  },
  methods: {
    changeSort(column) {
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
  }
}
</script>