<template>
  <el-upload
    class="upload-demo"
    action=""
    accept="video/*, image/*"
    multiple
    :style="styleObject"
    :auto-upload="false"
    :on-change="handleChange"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    list-type="picture"
  >
    <el-button size="medium" type="primary">點擊新增檔案</el-button>
    <div slot="tip" class="el-upload__tip">
      jpg/png files with a size less than 500kb
    </div>
  </el-upload>
</template>
<script>
export default {
  name: 'UploadFileBtn',
  data () {
    return {
      fileList: [],
      styleObject: {
        width: 'inherit'
      },
      totalFileSize: 0
    }
  },
  watch: {
    totalFileSize: function (val, oldVal) {
      // console.log('new: %s, old: %s', val, oldVal)
    },
    fileList: function () {
      this.$emit('push-files')
    }
  },
  methods: {
    handleChange (file, fileList) {
      this.totalFileSize = 0
      fileList.forEach(element => {
        this.totalFileSize += element.size
      })
      this.$emit('add-size', this.totalFileSize)
      this.fileList = fileList
    },
    handleRemove (file, fileList) {
      this.$emit('delete-element', file.size)
      this.$emit('remove-from-filelist', file)
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>
