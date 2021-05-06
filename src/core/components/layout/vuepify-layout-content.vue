<template>
  <div>
    <component v-bind="childAttrs" />
  </div>
</template>

<script>
export default {
  name: "vuepify-layout-content",

  computed: {
    childAttrs() {
      if (this.$vuepify.isSSR) {
        return { is: 'div', 'data-vuepify-layout-content': '' };
      }
      return { is: this.$vuepify.EntityApp }
    }
  }
}
</script>
