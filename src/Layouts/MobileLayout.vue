<template>
  <div>
    <mobile-header-component v-if="!hideHeader"></mobile-header-component>
    <div>
      <slot></slot>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import FooterComponent from "@/components/FooterComponent";
import MobileHeaderComponent from "@/components/MobileHeaderComponent";

export default {
  name: "MobileLayout",
  props: ['hideHeader'],
  components: {MobileHeaderComponent, FooterComponent}
}
</script>

<style scoped>

</style>
