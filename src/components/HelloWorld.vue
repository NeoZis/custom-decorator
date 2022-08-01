<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class HelloWorld extends Vue {
  async created() {
    const data = await axios('https://jsonplaceholder.typicode.com/todos/1');
    console.log(1);
  }
}
</script>
