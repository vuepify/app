<template>
  <vuepify-internal-layout-content v-if="vuepify.isSSR" />
  <div v-else>runtime content</div>
</template>

<script>
export default {
  name: "vuepify-layout-content",
  inject: ['vuepify']
}
</script>
