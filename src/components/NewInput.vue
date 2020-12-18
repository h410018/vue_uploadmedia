<template>
  <li :id="id">
    <input
      :id="inputId"
      @change="changeEvent($event)"
      class="info required"
      type="file"
      accept="video/*, image/*"
      name="filetoupload"
    />
    <span class="deletebtn" @click="deleteElement(id)">
      <img :src="require('../assets/images/cancel.png')" alt="" />
    </span>
    <img
      class="previewimg"
      :id="previewImgId"
      :style="previewStyle"
      :src="previewImg"
      alt=""
    />
  </li>
</template>

<script>
export default {
  name: 'NewInput',
  props: ['id'],
  data () {
    return {
      inputId: '',
      previewImgId: '',
      previewStyle: {
        display: 'none'
      },
      previewImg: null,
      currentFileSize: 0
    }
  },
  created () {
    var i = Date.now()
    this.inputId = 'input_' + i
    this.previewImgId = 'previewimg_' + i
  },
  methods: {
    changeEvent (event) {
      const file = event.target.files[0]
      this.previewImg = URL.createObjectURL(file)
      this.previewStyle.display = 'block'
      this.$emit('add-size', file.size, this.currentFileSize)
      this.currentFileSize = file.size
    },
    deleteElement () {
      this.$emit('delete-element', this.currentFileSize)
    }
  }
}
</script>

<style scoped>
li {
  list-style: decimal;
  position: relative;
  margin: 10px;
}

.deletebtn {
  margin: 0;
  padding: 0;
  border: 0;
  position: absolute;
  bottom: 0;
  left: 210px;
  cursor: pointer;
  width: 30px;
  height: 30px;
}

.deletebtn img {
  margin: 0;
  padding: 0;
  width: inherit;
  height: inherit;
}

img.previewimg {
  margin: 0;
  padding: 0;
  width: 150px;
  height: 150px;
  margin-left: 30px;
}
</style>
