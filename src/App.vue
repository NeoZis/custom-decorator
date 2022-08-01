<template>
  <div id="app">
    <ExtendHelloWorld2 />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ExtendHelloWorld2 from '@/components/ExtendHelloWorld2.vue';
@Component({
  components: {
    ExtendHelloWorld2,
  },
})
export default class App extends Vue {}
</script>
