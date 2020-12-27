<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <el-button type="primary">
      選擇收件人<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(recipient, index) in recipients"
        :key="index"
        :command="recipient"
        >{{ recipient }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'RecipientDropdownMenu',
  data () {
    return {
      recipients: [
        'a@gmail.com',
        'b@gmail.com',
        'c@gmail.com',
        'h410018@gmail.com'
      ]
    }
  },
  methods: {
    handleCommand: function (command) {
      this.$message('更換當前收件人: ' + command)
      this.$emit('get-recipient', command)
    }
  }
}
</script>

<style>
</style>
