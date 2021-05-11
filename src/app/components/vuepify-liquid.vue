<template>
  <span v-html="$vuepify.injectLiquidExpression(expression)" />
</template>

<script>
export default {
  name: "vuepify-liquid",

  props: {
    expression: {
      type: String,
      required: true
    }
  }
}
</script>
