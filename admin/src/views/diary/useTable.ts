import { reactive } from 'vue';

const useTable = () => {
  const tableState = reactive({
    tableHeader: {
      title: { label: '标题', width: '200px', search: true, type: 'input' },
      desc: { label: '描述', search: true, type: 'input' },
      cover: { label: '封面图', width: '160px' },
      createTime: { label: '创建时间', width: '200px' }
    },
    tableData: [
      { title: 'aaa', desc: '是发送到发送到发送到发', cover: 'FiVwhpOvV7nh6p4xbD1VsEO_SHzY', createTime: '2012-12-12 24:23' },
      { title: 'aaa', desc: '是发送到发送到发送到发', cover: 'FiVwhpOvV7nh6p4xbD1VsEO_SHzY', createTime: '2012-12-12 24:23' },
      { title: 'aaa', desc: '是发送到发送到发送到发', cover: 'FiVwhpOvV7nh6p4xbD1VsEO_SHzY', createTime: '2012-12-12 24:23' }
    ]
  })

  return {
    tableState
  }
}

export default useTable;