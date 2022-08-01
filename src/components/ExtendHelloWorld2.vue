<template>
  <div></div>
</template>

<script lang="ts">
import { Component } from '@/components/custom-decorator';
import ExtendHelloWorld from '@/components/ExtendHelloWorld.vue';
import axios from 'axios';

@Component({
  extendConfig: {
    chained: ['created'],
    // override: ['created'],
  }
})
export default class ExtendHelloWorld2 extends ExtendHelloWorld {
  async created() {
    const data = await axios('https://jsonplaceholder.typicode.com/todos/3');
    console.log(3);
  }
}
</script>
