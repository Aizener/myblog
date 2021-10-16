<template>
  <div>
    <b-table
      type="article"
      :data="tableData"
      :table-header="tableHeader"
      @edit="handleEdit"
      @remove="handleRemove"
    >
      <template v-slot="scope">
        <el-image 
          v-if="scope.col === 'cover'"
          class="cover"
          :src="scope.row.cover" 
          :preview-src-list="[scope.row.cover]">
        </el-image>
        <div
          v-if="['title', 'desc'].includes(scope.col)"
        >
          <el-tooltip :content="scope.row[scope.col]" placement="top">
            <p class="line-2">{{ scope.row[scope.col] }}</p>
          </el-tooltip>
        </div>
      </template>
      <template v-slot:append>
        <el-pagination
          class="page"
          background
          layout="prev, pager, next"
          :total="30"
          @current-change="$emit('changePage', $event)"
        ></el-pagination>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BTable from '@/components/b-table.vue';

export default defineComponent({
  components: {
    BTable
  },
  setup(props) {
    const handleEdit = (row: any) => {
      console.log(row)
    }

    const handleRemove = (row: any) => {
      console.log(row)
    }


    return {
      handleEdit,
      handleRemove
    }
  },
  data() {
    return {
      tableHeader: {
        title: { label: '标题', width: '200px', search: true },
        desc: { label: '描述', width: '350px', search: true },
        cover: { label: '封面图', width: '160px' },
        view: { label: '浏览数', width: '80px'},
        good: { label: '点赞数', width: '80px'},
        message: { label: '留言数', width: '80px'},
        category: { label: '分类', width: '160px', search: true },
        tag: { label: '标签', width: '200px', search: true },
        updateTime: { label: '修改时间', width: '120px' },
        createTime: { label: '创建时间', width: '120px' }
      },
      tableData: [
        {
          id: 1,
          title: '这是文章剪短发说的说的这是文章剪短发说的说的这是文章剪短发说的说的',
          desc: '阿斯顿发送到副科级爱上了打开房间阿里斯顿解放啦时代峻峰阿斯顿发送到副科级爱上了打开房间阿里斯顿解放啦时代峻峰',
          cover: 'https://img1.baidu.com/it/u=649919626,516769249&fm=26&fmt=auto',
          view: 23,
          good: 12,
          message: 3,
          category: '分类',
          tag: '标签',
          updateTime: '2021-10-16 12:10',
          createTime: '2021-10-16 12:10'
        },
        {
          id: 2,
          title: '这是文章剪短发说的说的',
          desc: '阿斯顿发送到副科级爱上了打开房间阿里斯顿解放啦时代峻峰',
          cover: 'https://img2.baidu.com/it/u=3043039063,2684560819&fm=26&fmt=auto',
          view: 23,
          good: 12,
          message: 3,
          category: '分类',
          tag: '标签',
          updateTime: '2021-10-16 12:10',
          createTime: '2021-10-16 12:10'
        },
        {
          id: 3,
          title: '这是文章剪短发说的说的',
          desc: '阿斯顿发送到副科级爱上了打开房间阿里斯顿解放啦时代峻峰',
          cover: 'https://img1.baidu.com/it/u=649919626,516769249&fm=26&fmt=auto',
          view: 23,
          good: 12,
          message: 3,
          category: '分类',
          tag: '标签',
          updateTime: '2021-10-16 12:10',
          createTime: '2021-10-16 12:10'
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.cover {
  width: 100%;
  height: 100%;
}

.line-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>