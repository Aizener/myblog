<template>
  <div class="b-table">
    <div class="b-table-header">
      <el-input
        size="small"
        :placeholder="`请输入${item.label}`"
        v-for="(item, idx) in inputs"
        v-model="item.value"
        :key="idx"
      ></el-input>
      <el-button type="primary" size="small" @click="handleSearch" v-if="Object.keys(inputs).length">搜索</el-button>
    </div>
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
import { defineComponent, toRefs, ref } from 'vue';

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true
    },
    tableHeader: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const keys = Object.keys(props.tableHeader).filter(key => {
      return props.tableHeader[key].search
    });

    const inputs = ref<any>({});
    for (const key in props.tableHeader) {
      if (props.tableHeader[key].search) {
        inputs.value[key] = { value: '', ...props.tableHeader[key] }
      }
    }

    const handleSearch = () => {
      const conditions: any = {}
      for (const key in inputs.value) {
        conditions[key] = inputs.value[key].value;
      }
      
      emit('search', conditions);
    }

    return {
      inputs,
      handleSearch
    }
  }
})
</script>

<style lang="scss">
.b-table {
  width: 100%;
  padding: 30px;
  &-header {
    .el-input {
      width: 200px;
      margin-right: 15px;
      margin-bottom: 15px;
    }
  }
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