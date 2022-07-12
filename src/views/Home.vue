<template>
    <CryptoCurrencyTable></CryptoCurrencyTable>
</template>

<script>
// @ is an alias to /src
import CryptoCurrencyTable from "@/components/CryptoCurrencyTable";

export default {
  name: 'Home',
  mounted() {

  },
  components: {
    CryptoCurrencyTable,

  }
}
</script>

