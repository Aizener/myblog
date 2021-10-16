<template>
  <div class="b-table">
    <el-table
      :data="data"
      border
    >
      <el-table-column prop="id" type="selection" width="55" />
      <el-table-column
        v-for="(item, key) in tableHeader"
        :key="key"
        :width="item.width"
      >
        <template v-slot:header="scope">
          <slot name="header" :row="scope.row" :col="key">{{ item.label }}</slot>
        </template>
        <template v-slot="scope">
          <slot :row="scope.row" :col="key">{{ scope.row[key] }}</slot>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
        fixed="right"
      >
        <template v-slot="scope">
          <el-button size="mini" type="primary" @click="$emit('edit', scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="$emit('remove', scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <template v-slot:append>
        <slot name="append"></slot>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { getTableHeader } from '@/utils/table';
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => []
    },
    type: {
      type: String,
      required: true
    }
  },
  setup(props, { slots }) {
    const tableHeader = getTableHeader(props.type);
    return {
      tableHeader
    }
  }
})
</script>

<style lang="scss">
.b-table {
  width: 100%;
  padding: 30px;
  .page {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  .el-table__body-wrapper {
    padding-bottom: 10px;
    &::-webkit-scrollbar {
      height: 12px;
      background: rgb(247, 247, 247);
    }
    &::-webkit-scrollbar-thumb {
      background: #ddd;
      height: 12px;
      border-radius: 5px;
      &:active {
        background: #ccc;
      }
    }
  }
}
</style>