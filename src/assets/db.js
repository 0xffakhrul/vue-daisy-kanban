import Dexie from "dexie";

export const db = new Dexie("KanbanBoardDB");

db.version(210).stores({
  tasks: "id, title, completed, createdDate",
});
