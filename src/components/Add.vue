<script setup>
import { onMounted, ref, watchEffect } from 'vue'

let countDone = ref(0)
let taskTitle = ref('')
let taskBody = ref('')

async function fetchCountDone() {
  const result = await fetch('/api')
  const data = await result.json()
  countDone = data.countDone
  console.log(countDone)
}

async function addTask() {

  const formData = {
    title: taskTitle.value,
    body: taskBody.value
  }
  fetch('/api/add', {
    method: 'post',
    body: JSON.stringify(formData),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((response) => response.json())
    .then((result) => {
      taskTitle.value = ''
      taskBody.value = ''
      console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

onMounted(fetchCountDone)

</script>

<template>
  <div class="card">
    <button type="button" @click="fetchCountDone">You have {{ countDone }} tasks done!</button>
    <p>
      Add
    </p>
    <form @submit.stop.prevent="addTask">
      <label>Task Title: <input v-model="taskTitle" placeholder="edit me" /></label><br>
      <label>Task Body: <input v-model="taskBody" placeholder="edit me" /></label><br>
      <button type="submit">Save Task</button>
    </form>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
