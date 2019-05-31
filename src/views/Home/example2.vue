<template>
  <div>
    <c-upload-img :dataList="fileList" :options="{action:'/upload'}" ref="upload">
      <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </c-upload-img>
    <el-button size="small" type="primary" @click="handleUpload">上传</el-button>
    <c-id-card :imageSrc="fileList[0].src" :options="{action:'/upload',face:'front'}" ref="upload"></c-id-card>
    <c-id-card
      :imageSrc="''"
      :options="{action:'/upload',face:'back',noupload:true}"
      ref="uploadback"
    ></c-id-card>
    <div class="form-wrapper">
     
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item label="账号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model.number="form.idcard"></el-input>
        </el-form-item>
        <el-form-item label="短信验证码">
          <el-input v-model="form.validateCod">
            <el-button slot="append" type="primary" @click="getValidateCode">{{validateCodeTips}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option value="1" label="男性"></el-option>
            <el-option value="2" label="女性"></el-option>
            <el-option value="0" label="未知的性别"></el-option>
            <el-option value="9" label="未说明的性别"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">注册</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CUploadImg from "@c/CUploadImg.vue";
import CUploadIDCard from "@c/CUploadIDCard.vue";

export default {
  name: "viewsChapter2Example2",
  mounted() {},
  data() {
    return {
      validateCodeTips: "点击获取验证码",
      form: {
        account: "",
        name: "",
        pass: "",
        checkPass: "",
        gender: "",
        idcard: "",
        validateCod: ""
      },
      fileList: [
        {
          name: "food.jpeg",
          src:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          src:
            "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        }
      ]
    };
  },
  methods: {
    getValidateCode() {
      let vm = this;
      function countDown() {
        let now = Date.now();
        setTimeout(() => {
          let needWait = Math.ceil((window.validateCodeTipsCount - now) / 1000);
          if (needWait > 0) {
            vm.validateCodeTips = needWait + "秒后可再次点击获取验证码";
            countDown();
          } else {
            vm.validateCodeTips = "点击获取验证码";
            window.validateCodeTipsCount = -1;
          }
        }, 1000);
      }
      if (window.validateCodeTipsCount > 0) {
        return;
      } else {
        window.validateCodeTipsCount = Date.now() + 60 * 1000;
        vm.validateCodeTips = "60秒后可再次点击获取验证码";
        countDown();
      }
    },
    handleUpload() {
      this.$refs.upload.submit();
    }
  },
  components: {
    CUploadImg,
    "c-id-card": CUploadIDCard
  },
  watch: {
    fileList(newValue) {
      console.log("fileList change in example2", newValue);
    }
  }
};
</script>

<style lang="scss" >
.form-wrapper {
  display: block;
  width: 600px;
  height: 800px;
  background-color: white;
  @include elevation2();
  padding: 20px;
  border-radius: 4px;
}
</style>

