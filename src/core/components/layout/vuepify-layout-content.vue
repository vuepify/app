<template>
  <div v-if="vuepify.isSSR">
    <vuepify-internal-layout-content v-vuepify-internal-hidden />
  </div>
  <div v-else><component :is="vuepify.EntityApp" /></div>
</template>

<script>
import {vuepifyInternalHidden} from '../../directives';

export default {
  name: "vuepify-layout-content",
  directives: {
    vuepifyInternalHidden
  },
  inject: ['vuepify']
}
</script>
