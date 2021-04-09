<template>
  <vuepify-internal-layout-head v-if="vuepify.isSSR">
    <slot/>
  </vuepify-internal-layout-head>
</template>

<script>
export default {
  name: "vuepify-layout-head",
  inject: ['vuepify']
}
</script>
