<template>
  <div>
    <div class="mb-12">
      <div class="mb-6 flex">
        <input
          type="text"
          placeholder="Click to add task"
          class="input input-bordered input-secondary w-full max-w-xs"
          onclick="task_modal.showModal()"
        />
        <dialog id="task_modal" class="modal">
          <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg">Add To Do</h3>
            <div class="pt-5">
              <label for="title">Title</label>
              <input
                type="text"
                placeholder="Enter your task (e.g. makan, tido)"
                class="input input-bordered input-secondary block w-full mt-2"
                v-model="title"
              />
            </div>
            <div class="pt-5 flex flex-col">
              <label for="severity">Severity</label>
              <select
                class="select select-bordered w-full block mt-2"
                v-model="severity"
              >
                <option disabled selected>Choose task severity</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div class="modal-action">
              <!-- if there is a button in form, it will close the modal -->
              <button
                class="btn"
                @click="addTask"
                :disabled="title.trim() === ''"
              >
                Add
              </button>
              <button class="btn">Close</button>
            </div>
          </form>
        </dialog>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div class="card">
          <div class="flex items-center gap-2">
            <div
              class="rounded-full h-4 w-4"
              style="background-color: rgb(73, 196, 229)"
            ></div>
            <h2 class="font-bold text-xs uppercase">Todo ({{todoCount}})</h2>
          </div>
          <div
            v-for="task in taskTodo"
            :key="task.id"
            class="p-4 bg-neutral rounded mt-4 flex justify-between items-center"
          >
            <div class="flex flex-col gap-1">
              <p class="capitalize">{{ task.title }}</p>
              <div>
                <div
                  :class="severityClasses[task.severity.toLowerCase()]"
                  class="capitalize"
                >
                  {{ task.severity }}
                </div>
              </div>
              <span class="text-xs opacity-30">{{ task.createdDate }}</span>
            </div>
            <div class="flex gap-3">
              <button @click="updateTaskDone(task.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-green-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </button>
              <button @click="deleteTask(task.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-red-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="flex items-center gap-2">
            <div
              class="rounded-full h-4 w-4"
              style="background-color: rgb(132, 113, 242)"
            ></div>
            <h2 class="font-bold text-xs uppercase">In Progress ({{doingCount}})</h2>
          </div>
          <div
            v-for="task in taskDoing"
            :key="task.id"
            class="p-4 bg-neutral rounded mt-4 flex justify-between items-center"
          >
            <div class="flex flex-col gap-1">
              <p class="capitalize">{{ task.title }}</p>
              <div>
                <div
                  :class="severityClasses[task.severity.toLowerCase()]"
                  class="capitalize"
                >
                  {{ task.severity }}
                </div>
              </div>
              <span class="text-xs opacity-30">{{ task.createdDate }}</span>
            </div>
            <div class="flex gap-3">
              <button @click="updateTaskDone(task.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-green-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </button>
              <button @click="deleteTask(task.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-red-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="flex items-center gap-2">
            <div
              class="rounded-full h-4 w-4"
              style="background-color: rgb(103, 226, 174)"
            ></div>
            <h2 class="font-bold text-xs uppercase">Done ({{completedCount}})</h2>
          </div>
          <div
            v-for="task in taskDone"
            :key="task.id"
            class="p-4 bg-neutral rounded mt-4 flex justify-between items-center"
          >
            <div class="flex flex-col gap-1">
              <p class="capitalize">{{ task.title }}</p>
              <div>
                <div
                  :class="severityClasses[task.severity.toLowerCase()]"
                  class="capitalize"
                >
                  {{ task.severity }}
                </div>
              </div>
              <span class="text-xs opacity-30">{{ task.createdDate }}</span>
            </div>
            <div class="flex gap-3">
              <button @click="deleteTask(task.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-red-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import Dexie from "dexie";
// import draggable from 'vuedraggable'

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    // draggable,
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
      severity: "low",
      severityClasses: {
        low: "badge badge-success badge-sm",
        medium: "badge badge-warning badge-sm",
        high: "badge badge-error badge-sm",
      },
    };
  },
  methods: {
    async initDatabase() {
      this.db = new Dexie("todoDB");
      this.db.version(1).stores({
        tasks: "id,title,completed,status,severity,createdDate",
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
        status: 'todo',
        severity: this.severity,
        createdDate: new Date().toISOString().split("T")[0], // Format the date as "YYYY-MM-DD"
      };
      await this.db.tasks.add(newTask);
      this.tasks.push(newTask);
      this.title = "";
      this.severity = "low";
    },
    async deleteTask(taskId) {
      await this.db.tasks.delete(taskId);
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      console.log(`deleted ${taskId}`);
    },
    async updateTaskDone(taskId) {
      const task = await this.db.tasks.get(taskId);
      task.status = 'completed'; // Update the completed property of the task
      await this.db.tasks.put(task, taskId); // Pass the updated task and the key to put
      await this.loadTasks()
    },
  },
  computed: {
    taskTodo() {
      return this.tasks.filter((task) => task.status === 'todo');
    },
    taskDoing() {
      return this.tasks.filter((task) => task.status === 'doing');
    },
    taskDone() {
      return this.tasks.filter((task) => task.status === 'completed');
    },
    todoCount() {
      return this.tasks.filter((task) => task.status === 'todo').length
    },
    doingCount() {
      return this.tasks.filter((task) => task.status === 'doing').length
    },
    completedCount() {
      return this.tasks.filter((task) => task.status === 'completed').length
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
