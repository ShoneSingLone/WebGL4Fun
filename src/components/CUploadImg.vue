<template>
  <div class="c-upload-img">
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="action"
      :on-change="handleChange"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :show-file-list="false"
    >
      <div slot="tip" class="el-upload__tip">
        <slot name="tip"></slot>
      </div>
      <el-button slot="trigger" size="small" type="primary">
        <slot name="trigger">选取文件</slot>
      </el-button>
    </el-upload>

    <transition-group
      tag="ul"
      name="list"
      class="img-list el-upload-list el-upload-list--picture-card"
    >
      <li
        tabindex="0"
        :class="['img','el-upload-list__item',imgItem.isSuccess?'is-success':'is-ready']"
        v-for="(imgItem, index) in fileList"
        :key="'img'+index"
      >
        <el-button
          class="btn left el-icon-arrow-left"
          :disabled="0===index"
          @click="changePosition(-1,index)"
        ></el-button>
        <el-button
          class="btn right el-icon-arrow-right"
          :disabled="fileList.length-1===index"
          @click="changePosition(1,index)"
        ></el-button>
        <div
          class="el-upload-list__item-thumbnail"
          :data-alt="imgItem.name"
          :style="getImgStyle(imgItem)"
        ></div>
        <a class="el-upload-list__item-name">
          <i class="el-icon-document"></i>food.jpeg
        </a>
        <label class="el-upload-list__item-status-label">
          <i class="el-icon-upload-success el-icon-check"></i>
        </label>
        <i class="el-icon-close"></i>
        <i class="el-icon-close-tip">按 delete 键可删除</i>
        <!---->
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePreview(imgItem)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(imgItem,fileList,index)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </li>
    </transition-group>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CUploadImg",
  tmp: "#tmp",
  model: {
    prop: "dataList",
    event: "change"
  },
  props: {
    dataList: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  mounted() {
    try {
      this.fileList = this.dataList;
      let options = this.options;
      if (options) {
        this.action = options.action;
        if (!this.action) throw new Error("CUploadImg action 必填");
      } else {
        throw new Error("CUploadImg options 必填");
      }
    } catch (error) {
      alert(error.message);
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      action: ""
    };
  },
  methods: {
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
.c-upload-img {
  height: 100%;
  display: flex;
  flex-flow: column;
  > .img-list {
    position: relative;

    .img {
      position: relative;
      z-index: 2;
      height: 100px;
      width: 100px;
    }
    .btn {
      position: absolute;
      padding: unset;
      z-index: 1;
      color: white;
      font-weight: 700;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
      border: unset;
      background-color: unset;

      &.left {
        top: 50%;
        left: 4px;
      }
      &.right {
        top: 50%;
        right: 4px;
      }
    }
  }
  .el-upload-list {
    &.el-upload-list--text {
      display: none;
    }
  }
  .container {
    width: 100%;
    flex: 1;
    canvas {
    }
  }
  $list-duration: 1s;

  .list {
    &-move {
      transition: all $list-duration;
      outline: 1px solid #c9d2dd;
    }
    &-leave {
      opacity: 1;
    }
    &-leave-to {
      opacity: 0;
      transform: translateY(100%);
    }
    &-leave-active {
      position: absolute;
      transition: all $list-duration;
    }

    &-enter {
      opacity: 0;
      transform: translateX(100%);
    }

    &-enter-to {
      opacity: 1;
    }
    /* leave之后再enter delay duration时长 */
    &-enter-active {
      transition: all $list-duration;
    }
  }
}
</style>

