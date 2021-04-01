<template>
  <vuepify-internal-layout-content v-if="$vuepifySSR.isSSR" />
  <div v-else>runtime content</div>
</template>

<script>
export default {
  name: "vuepify-layout-content"
}
</script>
