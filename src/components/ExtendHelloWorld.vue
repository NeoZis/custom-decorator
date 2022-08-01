<template>
  <div></div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import axios from 'axios';

@Component
export default class ExtendHelloWorld extends HelloWorld {
  async created() {
    const data = await axios('https://jsonplaceholder.typicode.com/todos/2');
    console.log(2);
  }
}
</script>
