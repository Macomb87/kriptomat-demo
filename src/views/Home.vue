<template>
  <div>
    <mobile-layout class="hidden-md-and-up">
      <mobile-table-component></mobile-table-component>
    </mobile-layout>
    <main-layout class="hidden-sm-and-down">
      <CryptoCurrencyTable></CryptoCurrencyTable>
    </main-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import CryptoCurrencyTable from "@/components/CryptoCurrencyTable";
import MainLayout from "@/Layouts/MainLayout";
import {mapActions} from "vuex";
import MobileTableComponent from "@/components/MobileTableComponent";
import MobileLayout from "@/Layouts/MobileLayout";

export default {
  name: 'Home',
  mounted() {

  },
  methods: {
    ...mapActions(['isMobile'])
  },
  components: {
    MobileLayout,
    MobileTableComponent,

    MainLayout,
    CryptoCurrencyTable,

  }
}
</script>

