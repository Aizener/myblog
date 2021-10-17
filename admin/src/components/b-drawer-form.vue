<template>
  <div class="b-drawer-form">
    <el-drawer
      custom-class="addedit"
      :title="title"
      v-model="modelValue"
      size="800px"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-form ref="formRef" :model="model" class="addedit" :rules="formRules">
        <el-form-item
          label-width="95px"
          :label="item.label + '：'"
          :prop="idx"
          v-for="(item, idx) in formData"
          :key="idx"
        >
          <template v-if="item.type === 'input'">
            <el-input v-model="model[idx]" :placeholder="`请输入${item.label}`"></el-input>
          </template>
          <template v-else-if="item.type === 'text'">
            <el-input v-model="model[idx]" type="textarea" :rows="3" :placeholder="`请输入${item.label}`"></el-input>
          </template>
          <template v-else-if="item.type === 'select'">
            <el-select v-model="model[idx]" :placeholder="`请选择${item.label}`">
              <el-option
                v-for="_item in item.options"
                :key="_item.value"
                :label="_item.label"
                :value="_item.value"
              >
              </el-option>
            </el-select>
          </template>
          <template v-else-if="item.type === 'select-multi'">
            <el-select v-model="model[idx]" multiple :placeholder="`请选择${item.label}`">
              <el-option
                v-for="_item in item.options"
                :key="_item.value"
                :label="_item.label"
                :value="_item.value"
              >
              </el-option>
            </el-select>
          </template>
          <template v-else-if="item.type === 'file'">
            <el-upload
              :action="qiniuUpload"
              list-type="picture-card"
              :data="qiniuData"
              accept="image/*"
              :multiple="false"
              :limit="1"
              :on-remove="handleRemove(idx)"
              :on-preview="handlePictureCardPreview"
              :on-success="handleUploaded(idx)"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <img class="preview-img" :src="qiniuPreview + model[idx]" alt="" />
            </el-dialog>
          </template>
          <template v-else-if="item.type === 'md'">
            <md-editor :preview="false" editorClass="b-editor" v-model="model[idx]" />
          </template>
          <template v-else>
            <slot :row="item"></slot>
          </template>
        </el-form-item>
      </el-form>

      <div class="operate">
        <el-button type="primary" @click="handleAdd">添加</el-button>
        <el-button type="info" @click="$emit('update:modelValue', false)">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onBeforeMount, ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { qiniuUpload, qiniuPreview } from '@/config/index';
import { getQiniuToken } from '@/utils/api/upload';

export default defineComponent({
  components: {
    MdEditor
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    formData: {
      type: Object,
      required: true
    },
    formRules: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const formRef = ref();

    const { proxy }: any = getCurrentInstance();
    const qiniuData = ref();
    const previewImage = ref();

    onBeforeMount(async () => {
      const res: any = await getQiniuToken();
      if (res.code !== 200) {
        proxy.$message.error({
          type: 'error',
          message: '获取七牛云Token失败，无法进行文件上传！'
        })
      } else {
        qiniuData.value = {
          token: res.data
        }
      }
    })
    
    // 自定义一份表单model数据
    const model = ref<any>({});
    for (const key in props.formData) {
      model.value[key] = props.formData[key].value;
    }

    // 点击确定按钮
    const handleAdd = () => {
      formRef.value.validate((isValid: boolean) => {
        if (isValid) {
          emit('confirm', model.value)
        }
      })
    }

    // 移除图片
    const handleRemove = (key: string) => {
      return () => {
        model.value[key] = '';
      }
    }

    // 预览图片
    const handlePictureCardPreview = () => {
      dialogVisible.value = true;
    }

    // 上传图片的回调
    const handleUploaded = (key: string) => {
      return (e: any) => {
        model.value[key] = e.hash;
      }
    } 

    const dialogVisible = ref(false);

    return {
      model,
      qiniuUpload,
      qiniuPreview,
      qiniuData,
      formRef,
      dialogVisible,
      handleAdd,
      handlePictureCardPreview,
      handleRemove,
      handleUploaded
    }
  },
})
</script>

<style lang="scss" scoped>
.b-drawer-form {
  & /deep/ .addedit {
    padding: 0 15px;
    overflow-y: scroll;
    padding-bottom: 30px;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  .operate {
    display: flex;
    margin-left: 105px;
  }
  .b-editor {
    & ::v-deep .md-toolbar {
      min-width: unset;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      height: 70px;
      border-bottom: 1px solid #eee;
    }
    & ::v-deep .md-content {
      height: calc(100% - 70px - 2 * 4px - 2px);
    }
  }

  & ::v-deep .preview-img {
    width: 100%;
  }
}
</style>