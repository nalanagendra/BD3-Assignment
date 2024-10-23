const express = require('express');
const { resolve } = require('path');

const app = express();
let cors = require('cors');
const port = 3000;

app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

function addNewTask(tasks, taskId, text, priority) {
  let task = {
    taskId,
    text,
    priority,
  };
  tasks.push(task);
  return tasks;
}

function sortTasksByPriority(task1, task2) {
  return task1.priority - task2.priority;
}

function editPriorityOfTasks(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == taskId) {
      tasks[i].priority = priority;
    }
  }

  return tasks;
}

function editTaskTextbyId(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == taskId) {
      tasks[i].text = text;
    }
  }

  return tasks;
}

function deleteTaskById(task, taskId) {
  return task.taskId !== taskId;
}

function getTaskByPriority(task, priority) {
  return task.priority === priority;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);

  let result = addNewTask(tasks, taskId, text, priority);
  res.json({
    tasks: result,
  });
});

app.get('/tasks', (req, res) => {
  res.json({
    tasks,
  });
});

app.get('/tasks/sort-by-priority', (req, res) => {
  let tasksCopy = tasks.slice();
  tasksCopy.sort((task1, task2) => sortTasksByPriority(task1, task2));
  res.json({
    tasks: tasksCopy,
  });
});

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);

  let result = editPriorityOfTasks(tasks, taskId, priority);
  res.json({
    tasks: result,
  });
});

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;

  let result = editTaskTextbyId(tasks, taskId, text);
  res.json({
    tasks: result,
  });
});

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = tasks.filter((task) => deleteTaskById(task, taskId));
  res.json({
    tasks: result,
  });
});

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((task) => getTaskByPriority(task, priority));
  res.json({
    tasks: result,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
