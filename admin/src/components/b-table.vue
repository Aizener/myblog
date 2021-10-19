<template>
  <div class="b-table">
    <div class="b-table-header">
      <template
        v-for="(item, idx) in searchs"
        :key="idx"
      >
        <el-input
          size="small"
          :placeholder="`请输入${item.label}`"
          v-model="item.value"
          v-if="item.type === 'input'"
        ></el-input>
        <el-select
          size="small"
          v-else-if="item.type === 'select'"
          v-model="item.value"
          :placeholder="`请选择${item.label}`"
        >
          <el-option
            v-for="_item in item.options"
            :key="_item.value"
            :label="_item.label"
            :value="_item.value"
          ></el-option>
        </el-select>
      </template>
      <el-button type="primary" size="small" @click="handleSearch" v-if="Object.keys(searchs).length">搜索</el-button>
      <el-button type="success" size="small" @click="$emit('add')">添加</el-button>
      <el-button type="danger" size="small" @click="handleRemove" :disabled="!ids.length">批量删除</el-button>
    </div>
    <el-table
      :data="data"
      @select="selectOne"
      @select-all="selectAll"
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
import { defineComponent, toRefs, ref, watch } from 'vue';

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

    const searchs = ref<any>({});
    
    watch(() => props.tableHeader, () => {
      for (const key in props.tableHeader) {
        if (props.tableHeader[key].search) {
          searchs.value[key] = { value: '', ...props.tableHeader[key] }
        }
      }
    }, { deep: true })

    const handleSearch = () => {
      const conditions: any = {}
      for (const key in searchs.value) {
        conditions[key] = searchs.value[key].value;
      }
      
      emit('search', conditions);
    }

    const ids = ref<Array<number>>([]);

    const selectOne = (selection: any) => {
      ids.value = selection.map((item: any) => item.id);
    }
    const selectAll = (selection: any) => {
      ids.value = selection.map((item: any) => item.id);
    }
    const clearSelect = (_ids: Array<number>) => {
      ids.value = _ids.filter((item: number) => !_ids.includes(item));
    }

    const handleRemove = () => {
      emit('removeMulti', ids.value);
    }

    return {
      ids,
      searchs,
      handleSearch,
      clearSelect,
      selectOne,
      handleRemove,
      selectAll
    }
  }
})
</script>

<style lang="scss">
.b-table {
  width: 100%;
  padding: 30px;
  &-header {
    margin-bottom: 15px;
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