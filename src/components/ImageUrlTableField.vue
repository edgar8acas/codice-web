<template>
  <th v-if="isHeader"
  >
    Imagen
  </th>
  <td v-else>
    <a v-if="rowData.imageUrl" :href="rowData.imageUrl" target="_blank">Imagen</a>
  </td>
</template>

<script>
import VuetableFieldMixin from 'vuetable-2/src/components/VuetableFieldMixin';

export default {
  mixins: [VuetableFieldMixin]
}
</script>

<style>

</style>