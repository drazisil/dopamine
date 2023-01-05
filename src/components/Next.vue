<script setup>
import { onMounted, ref, watchEffect } from 'vue'

let countDone = ref(0)
let taskTitle = ref('')
let taskBody = ref('')

async function fetchCountDone() {
  const result = await fetch('/api/next')
  const data = await result.json()
  countDone.value = data.countDone
  taskTitle.value = data.task.title
  taskBody.value = data.task.body
  console.log(data.task)
}
 
onMounted(fetchCountDone )

</script>

<template>
  <div class="card">
    <button type="button" @click="fetchCountDone">You have {{ countDone }} tasks done!</button>
    <p>
      View
    </p>
    <div>
      <label>Task Title: <input v-model="taskTitle" placeholder="edit me" /></label><br>
      <label>Task Body: <input v-model="taskBody" placeholder="edit me" /></label><br>
    </div>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
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
