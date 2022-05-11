<template>
  <StreamBarcodeReader v-if="isMounted" @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader"

export default {
  name: "ScanBarcode",
  components: {
    StreamBarcodeReader
  },
  methods: {
    onDecode(result) {
      console.log(result);
    },
    onLoaded() {
      console.log("load");
    }
  },
  data() {
    return {
      isMounted: false
    }
  },
  mounted() {
    this.isMounted = true
  },
  unmounted() {
    this.isMounted = false
  }
}
</script>

<style scoped>
</style>