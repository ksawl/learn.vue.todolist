<template>
  <div class="row">
    <h1>List</h1>

    <div class="row">
      <div class="input-field col s6">
        <select ref="filter" v-model="filter">
          <option value="" disabled selected>Choose status</option>
          <option value="active">Active</option>
          <option value="outdated">Outdated</option>
          <option value="completed">Completed</option>
        </select>
        <label>Status filter</label>
      </div>
      <div class="input-field col s3">
        <button v-if="filter" class="btn btn-small red" @click="filter = null">
          Clear filter
        </button>
      </div>
    </div>

    <hr />
    <table v-if="tasks" class="full-width">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Date</th>
          <th>Description</th>
          <th>Status</th>
          <th>Open</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in filterTasks" :key="task.id">
          <td>{{ index + 1 }}</td>
          <td>{{ task.title }}</td>
          <td>{{ new Date(task.date).toLocaleDateString() }}</td>
          <td>
            <div class="text">
              <div class="text-wrap">{{ task.description }}</div>
            </div>
          </td>
          <td>{{ task.status }}</td>
          <td>
            <router-link
              tag="button"
              class="btn btn-small"
              :to="'/task/' + task.id"
              >Open</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No tasks</p>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      filter: null,
      formSelect: null,
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    filterTasks() {
      return this.tasks.filter((t) => {
        if (!this.filter) {
          return true;
        }
        return t.status === this.filter;
      });
    },
  },
  mounted() {
    this.formSelect = window.M.FormSelect.init(this.$refs.filter);
  },
  methods: {
    destroyed() {
      if (this.formSelect && this.formSelect.destroy) {
        this.formSelect.destroy();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text {
  max-width: 400px;
}
.text-wrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
