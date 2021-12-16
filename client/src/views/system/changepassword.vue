<template>
  <div class="app-container">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
  <el-form-item label="舊密碼" prop="old_password">
    <el-input v-model="formData.old_password" placeholder="請輸入舊密碼" clearable show-password
      :style="{width: '100%'}"></el-input>
  </el-form-item>
  <el-form-item label="新密碼" prop="new_password1">
    <el-input v-model="formData.new_password1" placeholder="請輸入新密碼" clearable show-password
      :style="{width: '100%'}"></el-input>
  </el-form-item>
  <el-form-item label="新密碼" prop="new_password2">
    <el-input v-model="formData.new_password2" placeholder="請再次輸入新密碼" clearable show-password
      :style="{width: '100%'}"></el-input>
  </el-form-item>
  <el-form-item size="large">
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>
      </div>
</template>
<script>
import { changePassword } from "@/api/user"
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        old_password: undefined,
        new_password1: undefined,
        new_password2: undefined,
      },
      rules: {
        old_password: [{
          required: true,
          message: '請輸入舊密碼',
          trigger: 'blur'
        }],
        new_password1: [{
          required: true,
          message: '請輸入新密碼',
          trigger: 'blur'
        }],
        new_password2: [{
          required: true,
          message: '請再次輸入新密碼',
          trigger: 'blur'
        }],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表單
        changePassword(this.formData).then(async(res)=>{
            this.$message({
          message: '密碼修改成功,請重新登陸',
          type: 'success'
        })
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login`)
        })
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
  }
}
</script>