<template>
  <div class="row">
    <div v-if="task" class="col s6 offset-s3">
      <h1>{{ task.title }}</h1>

      <form @submit.prevent="submitHandler">
        <div class="chips" ref="chips"></div>

        <div class="input-field">
          <textarea
            id="description"
            v-model="description"
            class="materialize-textarea"
            ref="description"
          ></textarea>
          <label for="description">Description</label>
          <span
            class="character-counter"
            style="float: right; font-size: 12px;"
            data-length="10"
            >{{ description.length }}/10</span
          >
        </div>

        <input type="text" ref="datepicker" />

        <div v-if="task.status !== 'completed'">
          <button class="btn" type="submit">Edit task</button>
          <button class="btn blue" type="button" @click="completeTask">
            Complete
          </button>
        </div>
      </form>
    </div>
    <p v-else>Task not found</p>
  </div>
</template>

<script>
export default {
  name: "Task",
  computed: {
    task() {
      return this.$store.getters.taskById(+this.$route.params.id);
    },
  },
  data() {
    return {
      description: "",
      chips: null,
      date: null,
    };
  },
  mounted() {
    this.description = this.task.description;
    window.M.textareaAutoResize(this.$refs.description);

    this.chips = window.M.Chips.init(this.$refs.chips, {
      placeholder: "Task tags",
      data: this.task.tags,
    });

    this.date = window.M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(this.task.date),
      setDefaultDate: true,
    });

    setTimeout(() => {
      window.M.updateTextFields();
    }, 0);
  },
  methods: {
    submitHandler() {
      this.$store.dispatch("updateTask", {
        id: this.task.id,
        description: this.description,
        date: this.date.date,
      });
      this.$router.push("/list");
    },
    destroyed() {
      if (this.date && this.date.destroy) {
        this.date.destroy();
      }
      if (this.chips && this.chips.destroy) {
        this.chips.destroy();
      }
    },
    completeTask() {
      this.$store.dispatch("completeTask", this.task.id);
      this.$router.push("/list");
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  min-height: 150px;
}
button[type="submit"] {
  margin-right: 1rem;
}
</style>
