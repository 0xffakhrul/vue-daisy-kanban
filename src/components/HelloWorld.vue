<template>
  <div>
    <!-- <h1 class="text-3xl mt-12 font-black text-primary">Hello World</h1> -->
    <div class="mb-12">
      <div class="mb-6">
        <input
          type="text"
          placeholder="Enter your task (e.g. makan, tido)"
          class="input input-bordered input-secondary w-full max-w-xs"
          v-model="title"
        />
        <button
          class="btn btn-primary ml-3 text-lg font-black"
          @click="addTask"
        >
          +
        </button>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div class="card">
          <div class="flex items-center gap-2">
            <div
              class="rounded-full h-4 w-4"
              style="background-color: rgb(73, 196, 229)"
            ></div>
            <h2 class="font-bold text-xs uppercase">Todo</h2>
          </div>
          <div
            v-for="task in taskTodo"
            :key="task.id"
            class="p-4 bg-neutral rounded mt-4"
          >
            {{ task.title }}
          </div>
        </div>
        <div class="card">
          <div class="flex items-center gap-2">
            <div
              class="rounded-full h-4 w-4"
              style="background-color: rgb(132, 113, 242)"
            ></div>
            <h2 class="font-bold text-xs uppercase">In Progress</h2>
          </div>
          <div
            v-for="task in taskDoing"
            :key="task.id"
            class="p-4 bg-neutral rounded mt-4"
          >
            {{ task.title }}
          </div>
        </div>
        <div class="card">
          <div class="flex items-center gap-2">
            <div
              class="rounded-full h-4 w-4"
              style="background-color: rgb(103, 226, 174)"
            ></div>
            <h2 class="font-bold text-xs uppercase">Done</h2>
          </div>
          <div
            v-for="task in taskDone"
            :key="task.id"
            class="p-4 bg-neutral rounded mt-4"
          >
            {{ task.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: "Task 1",
          completed: false,
        },
        {
          id: 2,
          title: "Task 2",
          completed: true,
        },
        {
          id: 3,
          title: "Task 3",
          completed: false,
        },
        {
          id: 4,
          title: "Task 4",
          completed: true,
        },
        {
          id: 5,
          title: "Task 5",
          completed: null,
        },
      ],
      title: "",
    };
  },
  methods: {
    addTask() {
      const newId = new Date().toISOString();

      const newTask = {
        id: newId,
        title: this.title,
        completed: false,
      };

      this.tasks.push(newTask);
    },
  },
  computed: {
    taskTodo() {
      return this.tasks.filter((task) => !task.completed);
    },
    taskDoing() {
      return this.tasks.filter((task) => task.completed === null);
    },
    taskDone() {
      return this.tasks.filter((task) => task.completed);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
