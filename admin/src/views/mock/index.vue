<template>
  <p class="mock-title">数据模拟是通过<a href="http://mockjs.com/i" target="_blank">mock.js</a>生成，请求是通过<a href="http://www.axios-js.com/" target="_blank">axios</a>完成</p>
  <div class="mock">
    <div class="left">
      <h3>数据模拟</h3>
      <div class="mock-box">
        <el-form ref="form1Ref" :model="form1" :rules="rules1">
          <el-form-item label="请求接口" prop="reqUrl">
            <el-input placeholder="例如：/demo" v-model="form1.reqUrl"></el-input>
          </el-form-item>
          <el-form-item label=" 响应数据：" prop="resData">
            <el-input :rows="4" type="textarea" placeholder='例如：{ "code": 200, "msg": "ok" }' v-model="form1.resData"></el-input>
          </el-form-item>
          <el-form-item style="text-align: right;">
            <el-button type="primary" @click="handleMock">生成数据</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="list">
        <p>临时生成接口：</p>
        <p v-for="(item, idx) in apis" :key="Number(idx)">
          接口名称：{{ item.url }}
        </p>
      </div>
    </div>

    <div class="right">
      <h3>数据请求</h3>
      <div class="mock-req">
        <el-form ref="form2Ref" :model="form2" :rules="rules2">
          <el-form-item prop="reqUrl" label="请求地址">
            <el-input v-model="form2.reqUrl" placeholder="例如：/demo"></el-input>
          </el-form-item>
          <el-form-item label=" 响应数据：">
            <el-input :rows="4" readonly type="textarea" placeholder='例如：{ "code": 200, "msg": "ok" }' :value="JSON.stringify(form2.resData)"></el-input>
          </el-form-item>
          <el-form-item style="text-align: right;">
            <el-button type="primary" @click="handleReq">请求数据</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Mock from 'mockjs'
import { ref, reactive, getCurrentInstance } from 'vue'
import axios from '@/utils/request'

interface StateType {
  form1: any,
  rules1: any,
  form2: any,
  rules2: any,
  apis: any
}

export default {
  setup() {
    const { proxy }: any = getCurrentInstance()

    const state = reactive<StateType>({
      form1: {
        reqUrl: '',
        resData: ''
      },
      rules1: {
        reqUrl: { required: true, message: '请输入请求接口' },
        resData: { required: true, message: '请输入模拟的响应数据' }
      },
      form2: {
        reqUrl: '',
        resData: ''
      },
      rules2: {
        reqUrl: { required: true, message: '请输入请求接口' }
      },
      apis: []
    })

    const form1Ref = ref()
    const form2Ref = ref()

    const handleMock = () => {
      form1Ref.value.validate().then((isValidate: boolean) => {
        if (isValidate) {
          const reqUrl = state.form1.reqUrl.replace('\/', '\\\/')
          if (state.form1.resData.indexOf('[') || state.form1.resDate.indexOf('{')) {
            try {
              state.form1.resData = JSON.parse(state.form1.resData)
            } catch (err) {
              proxy.$message.error({
                type: 'error',
                message: '请检查数据格式'
              })
              return
            }
          }
          Mock.mock(new RegExp(reqUrl), 'get', state.form1.resData)
          state.apis.push({
            url: state.form1.reqUrl,
            data: state.form1.resData
          })
          form1Ref.value.resetFields()
        }
      })
    }

    const handleReq = () => {
      form2Ref.value.validate().then((isValidate: boolean) => {
        axios.get(state.form2.reqUrl).then(res => {
          state.form2.resData = res
        }).catch(err => {
          state.form2.resData = err.message
        })
      })
    }

    return {
      ...state,
      form1Ref,
      form2Ref,
      handleReq,
      handleMock
    }
  }
}
</script>

<style lang="scss" scoped>
.mock {
  padding: 30px;
  display: flex;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
  &-title {
    margin: 30px;
    padding: 10px;
    background: skyblue;
    color: #fff;
    a {
      color: green;
    }
  }
  &-box, &-req {
    margin-top: 30px;
  }
  .right {
    margin-left: 60px;
  }
  .list > p:nth-child(1) {
    margin-bottom: 15px;
  }
}
</style>