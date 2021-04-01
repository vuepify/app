<template>
  <vuepify-internal-layout-head v-if="$vuepifySSR.isSSR">
    <slot/>
  </vuepify-internal-layout-head>
</template>

<script>
export default {
  name: "vuepify-layout-head"
}
</script>
