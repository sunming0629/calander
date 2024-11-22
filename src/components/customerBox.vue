<!--
 * Copyright(C) Beijing Oil Trading Interconnection Technology Co., Ltd. 
 * @Author: sunming
 * @Date: 2024-08-13 10:56:13
 * @LastEditors: sunming
 * @LastEditTime: 2024-08-14 11:39:08
 * @Description: 
-->
<template>
  <div class="customer-cox">
    <div class="left"
      :style="`background:hsla(${props.background},70%,80%,1);height:${props.height};`"></div>
    <div class="text"
      :style="`color:${props.color};background:hsla(${props.background},70%,80%,0.2);width:${props.width};height:${props.height};line-height:${height};font-size:${props.fontSize};
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;${props.finished ? 'text-decoration-line:line-through;color:#bcbec5;' : ''}}`">
      {{ props.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch } from "vue";
const props = defineProps({
  name: {
    type: String,
    default: '配置名称',
  },
  color: {
    type: String,
    default: '#000000',
  },
  background: {
    type: String,
    default: '#ffffff',
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '32px',
  },
  fontSize: {
    type: String,
    default: '14px',
  },
  finished: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.customer-cox {
  display: flex;
  background-color: #ffffff;

  .left {
    width: 5px;
    border-radius: 3px 0 0 3px;
  }

  .text {
    padding-left: 5px;
    border-radius: 0 3px 3px 0;
  }
}
</style>
