<template>
  <div>
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
          :disabled="title.trim() === ''"
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
            <p>{{ task.title }}</p>
            <span class="text-xs opacity-30">{{ task.createdDate }}</span>
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
import { v4 as uuidv4 } from "uuid";
import Dexie from "dexie";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  created() {
    this.initDatabase();
    this.loadTasks();
  },
  data() {
    return {
      db: null,
      tasks: [],
      title: "",
    };
  },
  methods: {
    async initDatabase() {
      this.db = new Dexie("todoDB");
      this.db.version(1).stores({
        tasks: "id,title,completed,createdDate",
      });
    },
    async loadTasks() {
      this.tasks = await this.db.tasks.toArray();
    },
    async addTask() {
      if (this.title.trim() === "") return;
      const newId = uuidv4();
      const newTask = {
        id: newId,
        title: this.title,
        completed: false,
        createdDate: new Date().toISOString().split("T")[0], // Format the date as "YYYY-MM-DD"
      };
      await this.db.tasks.add(newTask);
      this.tasks.push(newTask);
      this.title = "";
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
