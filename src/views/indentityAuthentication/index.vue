<!-- 身份认证 -->
<template>
  <div class='index'>
    <Header />
    <div class="body">
      <div class="flex">
        <div class="name">身份证姓名：</div>
        <el-input v-model="indentityName" maxlength="4" style="width: 400px;" placeholder="请输入店铺名称" />
      </div>
      <div class="flex">
        <div class="name">身份证号码：</div>
        <el-input v-model="indentityCode" maxlength="18" style="width: 400px;" placeholder="请输入店铺名称" />
      </div>
      <div class="flex">
        <div class="name">上传身份证正面图片：</div>
        <el-upload v-model:file-list="fileList1" class="upload-demo" action="#" :on-remove="handleRemove1"
          list-type="picture" style="width: 400px;" :http-request="httpRequest1" :limit="1">
          <el-button size="mini" v-if="fileList1.length == 0" type="primary">点击上传</el-button>
          <div class="tip" v-if="fileList1.length == 0">请上传PNG/JPG格式图片，大小不超过500K</div>
        </el-upload>
      </div>
      <div class="flex">
        <div class="name">上传身份证反面图片：</div>
        <el-upload v-model:file-list="fileList2" class="upload-demo" action="#" :on-remove="handleRemove2"
          style="width: 400px;" :http-request="httpRequest2" :limit="1">
          <el-button size="mini" v-if="fileList2.length == 0" type="primary">点击上传</el-button>
          <div v-if="fileList2.length == 0" class="tip">请上传PNG/JPG格式图片，大小不超过500K</div>
        </el-upload>
      </div>
    </div>
    <div class="btn" @click="save">确定</div>
  </div>
</template>

<script setup lang='ts'>
import Header from '@/components/header.vue'
import http from '@/utils/request'
import { ref, onMounted } from 'vue'
import { getUserINfo } from '@/utils/cookie';
interface file { name: string, id: string, url: string }

onMounted(() => {
  getAuthenticationStatus()
})

const indentityCode = ref(''),
  indentityName = ref(''),
  fileList1 = ref([] as file[]),
  fileList2 = ref([] as file[]),

  getAuthenticationStatus = () => {
    http.post('/indentity/getAuthenticationStatus', {
      userId: JSON.parse(getUserINfo()).userId,
    }).then()

  },

  save = () => {
    http.post('/indentity/addOrUpdate', {
      userId: JSON.parse(getUserINfo()).userId,
      indentityName: indentityName.value,
      indentityCode: indentityCode.value,
      indentityFront: fileList1.value[0].id ? fileList1.value[0].id : '',
      indentityVerso: fileList2.value[0].id ? fileList2.value[0].id : '',
    }).then((res => {

    }))
  },

  handleRemove1 = (e: any) => {
    fileList1.value = []
  },
  handleRemove2 = (e: any) => {
    fileList2.value = []
  },

  httpRequest1 = (e: any) => {
    downLoad(e.file).then((res: any) => {
      if (res.code == 200) {
        fileList1.value.push({
          name: res.data,
          id: res.data,
          url: http.baseURL + '/' + res.data
        })
      }
    })
  },
  httpRequest2 = (e: any) => {
    downLoad(e.file).then((res: any) => {
      if (res.code == 200) {
        fileList2.value.push({
          name: res.data,
          id: res.data,
          url: http.baseURL + '/' + res.data
        })
      }
    })
  },

  downLoad = (file: any): any => {
    let formData = new FormData()
    formData.append('file', file)
    return http.downLoad('/file/uploadFile', formData)
  },
  has = () => {
    return 111
  }



</script>
<style lang='scss' scoped>
:deep(.el-upload) {
  display: table-cell;
  text-align: left;
}

:deep(.el-upload-list--picture .el-upload-list__item) {
  margin-top: 0;
}

.index {
  // height: 100%;
  width: 100%;
  // text-align: right;

  .body {
    padding-top: 100px;
    width: 800px;
    margin: 0 auto;
    // 

    .flex {
      // text-align: right;
      display: flex;
      align-items: flex-start;
      margin: 10px;

      .name {
        width: 200px;
        text-align: right;
        padding-top: 5px;
      }

      .tip {
        font-size: 10px;
      }
    }
  }

  .btn {
    width: 55px;
    background: rgb(50, 60, 201);
    color: #fff;
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin: 10px auto;
    cursor: pointer;
    border-radius: 5px;
  }


}
</style>