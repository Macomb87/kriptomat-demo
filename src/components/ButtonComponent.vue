<template>

</template>

<script>
export default {
  name: "ButtonComponent",
  props: {
    buttonText: String
  }
}
</script>

<style lang="scss" scoped>

button {
  &.custom-button {
    height: 48px;
    min-width: 343px;
    padding: 0 16px;
    border-radius: 10px;
  }
}
</style>
