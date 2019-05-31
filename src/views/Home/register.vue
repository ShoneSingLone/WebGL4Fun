<template>
  <div class="register">
    <el-form
      :model="busiProjectmaster"
      :rules="rules"
      ref="busiProjectmaster"
      label-width="100px"
      class="demo-busiProjectmaster"
      size="mini"
    >
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="busiProjectmaster.name"></el-input>
      </el-form-item>
      <el-form-item label="建设单位全称" prop="name">
        <el-input v-model="busiProjectmaster.name"></el-input>
      </el-form-item>
      <el-form-item label="总包单位全称" prop="name">
        <el-input v-model="busiProjectmaster.name"></el-input>
      </el-form-item>
      <el-form-item label="农民工工资专项账号" prop="name">
        <el-input v-model="busiProjectmaster.name"></el-input>
      </el-form-item>
      <el-form-item label="项目所在区域" prop="name">
        <el-select v-model="busiProjectmaster.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目所属行业" prop="name">
        <el-select v-model="busiProjectmaster.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('busiProjectmaster')">立即注册</el-button>
        <el-button @click="resetForm('busiProjectmaster')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      busiProjectmaster: {
        name: "",
        region: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" >
.register {
  @include elevation2();
  width: 500px;
  background-color: white;
  padding: 20px;
  margin: 10px auto;
  border-radius: 4px;
}
</style>
