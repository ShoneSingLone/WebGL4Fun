<template>
  <div :class="['c-upload-id-card',{noupload:noupload}]">
    <el-upload
      v-if="!imageUrl"
      class="avatar-uploader"
      :action="action"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <div v-if="!imageUrl" :class="['img',face]"></div>
    </el-upload>
    <div v-if="!imageUrl" class="el-icon-plus"></div>
    <!--  -->
    <div
      v-if="imageUrl"
      :class="['img']"
      :style="getImgStyle({src:imageUrl})"
      @click="dialogVisible=true"
    ></div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="imageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CUploadIDCard",
  tmp: "#tmp",
  model: {
    prop: "dataList",
    event: "change"
  },
  props: {
    imageSrc: {
      type: String
    },
    options: {
      type: Object,
      required: true
    }
  },
  mounted() {
    try {
      this.imageUrl = this.imageSrc;
      let options = this.options;
      if (options) {
        this.action = options.action;
        if (!this.action) throw new Error("CUploadImg action 必填");
        /* 正反面 */
        this.face = options.face;
        if (!this.face) throw new Error("CUploadImg face 必填");
      } else {
        throw new Error("CUploadImg options 必填");
      }
    } catch (error) {
      alert(error.message);
    }
  },
  data() {
    return {
      face: "",
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      action: ""
    };
  },
  computed: {
    noupload() {
      return (this.options && this.options.noupload) || false;
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submit() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList, index) {
      console.log(file, fileList, index);
      this.fileList.splice(index, 1);
    },
    handlePreview(file) {
      this.dialogImageUrl = file.src;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      var freader = new FileReader();
      freader.readAsDataURL(file.raw);
      freader.onload = event => {
        file.src = event.target.result;
        this.fileList = fileList;
      };
      this.$emit("change", fileList, file);
    },
    getImgStyle(img) {
      return {
        background: `url(${img.src})center center/cover no-repeat`
      };
    },
    changePosition(tag, index) {
      if (tag === -1) {
        let target = this.fileList.splice(index, 1);
        this.fileList.splice(index + tag, 0, target[0]);
      } else {
        let target = this.fileList.splice(index, 1);
        this.fileList.splice(index + tag, 0, target[0]);
      }
    }
  },
  watch: {
    fileList(newFileList) {
      console.log("fileList change in CUploadImg", newFileList);
      this.$emit("change", newFileList);
    }
  }
};
</script>

<style lang="scss" >
.c-upload-id-card {
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  &.noupload {
    &::before {
      content: " ";
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 1;
    }
  }
  .el-upload-list {
    &.el-upload-list--text {
      display: none;
    }
  }
  .avatar-uploader {
  }
  .img {
    height: 128px;
    width: 200px;
    &.front {
      background: url("./back.png") center center/contain no-repeat;
    }
    &.back {
      background: url("./back.png") center center/contain no-repeat;
    }
  }
  > .el-icon-plus {
    position: absolute;
    line-height: 100%;
    font-size: 100%;
    transform: scale(2);
  }
}
</style>

