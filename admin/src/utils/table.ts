export const getTableHeader = (type: string) => {
  switch(type) {
    case 'article':
      return {
        title: { label: '标题', width: '200px' },
        desc: { label: '描述', width: '350px' },
        cover: { label: '封面图', width: '160px' },
        view: { label: '浏览数', width: '80px'},
        good: { label: '点赞数', width: '80px'},
        message: { label: '留言数', width: '80px'},
        category: { label: '分类', width: '160px' },
        tag: { label: '标签', width: '200px' },
        updateTime: { label: '修改时间', width: '120px' },
        createTime: { label: '创建时间', width: '120px' }
      }
  }
}