<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="製令" prop="work_order_id">
        <el-input v-model="formData.work_order_id" placeholder="請輸入製令" :maxlength="10" show-word-limit
          clearable prefix-icon='el-icon-mobile' :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="時程" prop="timeline">
        <el-time-picker v-model="formData.timeline" is-range format="HH:mm:ss" value-format="HH:mm:ss"
          :style="{width: '100%'}" start-placeholder="開始時間" end-placeholder="結束時間" range-separator="至"
          clearable></el-time-picker>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        work_order_id: undefined,
        timeline: ["now", "now"],
      },
      rules: {
        work_order_id: [{
          required: true,
          message: '請輸入製令',
          trigger: 'blur'
        }, {
          pattern: /\d{10}$/,
          message: '製令格式錯誤',
          trigger: 'blur'
        }],
        timeline: [{
          required: true,
          type: 'array',
          message: '请至少选择一个時程',
          trigger: 'change'
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
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
  }
}

</script>
<style>
</style>
