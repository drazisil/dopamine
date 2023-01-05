<script setup>
import { onMounted, ref, watchEffect } from 'vue'

let countDone = ref(0)
let task = ref({
  id: '',
  title: '',
  body: ''
})

async function fetchCountDone() {
  const result = await fetch('/api/next')
  const data = await result.json()
  countDone.value = data.countDone
  task.value.id = data.task.id
  task.value.title = data.task.title
  task.value.body = data.task.body
  console.log(data.task)
}

onMounted(fetchCountDone)

async function doneTask() {

  fetch('/api/done', {
    method: 'post',
    body: JSON.stringify(task.value),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((response) => response.json())
    .then((result) => {
      countDone.value = result.countDone
      if (typeof result.task !== "undefined") {
        task.value = result.task
      } else {
        task.value = {
          id: '',
          title: '',
          body: ''
        }
      }
      console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

</script>

<template>
  <div class="card">
    <button type="button" @click="fetchCountDone">You have {{ countDone }} tasks done!</button>
    <p>
      View
    </p>
    <div v-if="task.id !== ''">
      <label>Task Title: <input v-model="task.title" placeholder="edit me" /></label><br>
      <label>Task Body: <input v-model="task.body" placeholder="edit me" /></label><br>
      <button type="submit" @click.stop.prevent="doneTask">Done</button>
    </div>
    <div v-else>
      <span>You should add one!</span>
    </div>
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
