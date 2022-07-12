<template>
  <div class="daily-change">
    <v-img v-if="bearMarket == true" class="arrow-image"
           max-height="12" max-width="12" src="../assets/small_arrow_down.png"></v-img>
    <v-img v-if="bullMarket == true" class="arrow-image"
           max-height="12" max-width="12" src="'../assets/small_arrow_up.png"></v-img>
    <p :class="{'green-text': bullMarket,'red-text':bearMarket }">
      {{ parseFloat(price_change_percentage).toFixed(2) }}</p>
  </div>
</template>

<script>
export default {
  name: "dailyChangeRow",
  props: ['price_change_percentage'],
  data() {
    return {
      bearMarket: false,
      bullMarket: false
    }
  },
  watch: {
    'item': function (item) {
      this.setColors();
    },
  },
  mounted() {
    this.setColors();

  },
  methods: {
    setColors() {
      if (this.price_change_percentage< 0) {
        this.bearMarket = true;
        this.bullMarket = false;
        this.changeColor = '#FF9696';
      } else {
        this.bearMarket = false;
        this.bullMarket = true;
        this.changeColor = '#4CB294';
      }
    }
  }
}
</script>

<style scoped lang="scss">
.green-text {
  color: #0DEAA9;
}

.red-text {
  color: #FF9696;
}

.daily-change {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-items: center;
  gap: 3px;
}
</style>
