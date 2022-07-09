<template>
  <chart-component></chart-component>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ChartComponent from "@/components/ChartComponent";

export default {
  name: 'Home',

  components: {
    HelloWorld,
    ChartComponent
  }
}
</script>

