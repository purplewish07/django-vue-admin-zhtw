<template>
  <div class="app-container">
    <div>
      <el-select
        v-model="listQuery.enabled"
        placeholder="是否啟用"
        clearable
        style="width: 200px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in enabledOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>
      <el-input
        v-model="listQuery.search"
        placeholder="任務名"
        style="width: 300px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        size="small"
        >搜索</el-button
      >
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-refresh-left"
        @click="resetFilter"
        size="small"
        >重置</el-button
      >
    </div>
    <div style="margin-top: 6px">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate"
        v-if="checkPermission(['task_create'])"
        size="small"
        >新增</el-button
      >
    </div>
    <el-table
      v-loading="listLoading"
      :data="dataList.results"
      style="width: 100%; margin-top: 10px"
      highlight-current-row
      row-key="id"
      height="100"
      stripe
      border
      v-el-height-adaptive-table="{ bottomOffset: 50 }"
    >
      <el-table-column type="index" width="50" />
      <el-table-column align="center" label="名稱">
        <template slot-scope="scope">{{ scope.row.name }} </template>
      </el-table-column>
      <el-table-column align="center" label="執行代碼">
        <template slot-scope="scope">{{ scope.row.task }} </template>
      </el-table-column>
      <el-table-column align="center" label="定時策略">
        <template slot-scope="scope">{{ scope.row.schedule }} </template>
      </el-table-column>
      <el-table-column align="header-center" label="已執行次數">
        <template slot-scope="scope">{{ scope.row.total_run_count }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="最後執行時間">
        <template slot-scope="scope">{{ scope.row.last_run_at }}</template>
      </el-table-column>
      <el-table-column label="是否啟用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            :disabled="!checkPermission(['task_update'])"
            @change="handleToggle(scope)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            :disabled="!checkPermission(['task_update'])"
            @click="handleUpdate(scope)"
            >編輯</el-button
          >
          <el-button
            type="danger"
            size="small"
            :disabled="!checkPermission(['task_delete'])"
            @click="handleDelete(scope)"
            >刪除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="dataList.count > 0"
      :total="dataList.count"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.page_size"
      @pagination="getList"
    />
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType === 'update' ? '編輯' : '新增'"
    >
      <span>簡單配置,複雜的可以去admin後台操作</span>
      <el-form
        ref="Form"
        :model="ptask"
        label-width="80px"
        :rules="dynamicRules"
      >
        <el-form-item label="名稱" prop="name">
          <el-input v-model="ptask.name" placeholder="名稱" />
        </el-form-item>
        <el-form-item label="執行代碼" prop="task">
          <el-input
            v-model="ptask.task"
            placeholder="例:apps.system.tasks.show"
          />
        </el-form-item>
        <el-form-item label="時間策略">
          <el-radio-group v-model="ptask.timetype">
            <el-radio label="interval">間隔</el-radio>
            <el-radio label="crontab">crontab</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="每隔" v-if="ptask.timetype == 'interval'">
          <el-input-number
            v-model="ptask.interval_.every"
            :min="1"
          ></el-input-number>
          <el-select
            v-model="ptask.interval_.period"
            placeholder="請選擇"
            style="width: 100px"
          >
            <el-option
              v-for="item in periodOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="分鐘"
          prop="crontab_.minute"
          v-if="ptask.timetype == 'crontab'"
        >
          <el-input
            v-model="ptask.crontab_.minute"
            placeholder='Cron Minutes to Run. Use "*" for "all". (Example: "0,30")'
          />
        </el-form-item>
        <el-form-item
          label="小時"
          prop="crontab_.hour"
          v-if="ptask.timetype == 'crontab'"
        >
          <el-input
            v-model="ptask.crontab_.hour"
            placeholder='Cron Hours to Run. Use "*" for "all". (Example: "8,20")'
          />
        </el-form-item>
        <el-form-item
          label="每週的天"
          prop="crontab_.day_of_week"
          v-if="ptask.timetype == 'crontab'"
        >
          <el-input
            v-model="ptask.crontab_.day_of_week"
            placeholder='Cron Days Of The Week to Run. Use "*" for "all". (Example: "0,5")'
          />
        </el-form-item>
        <el-form-item
          label="每月的天"
          prop="crontab_.day_of_month"
          v-if="ptask.timetype == 'crontab'"
        >
          <el-input
            v-model="ptask.crontab_.day_of_month"
            placeholder='Cron Days Of The Month to Run. Use "*" for "all". (Example: "1,15")'
          />
        </el-form-item>
        <el-form-item
          label="每年的月"
          prop="crontab_.month_of_year"
          v-if="ptask.timetype == 'crontab'"
        >
          <el-input
            v-model="ptask.crontab_.month_of_year"
            placeholder='Cron Months Of The Year to Run. Use "*" for "all". (Example: "0,6")'
          />
        </el-form-item>
        <el-form-item label="列表參數" prop="args">
          <el-input
            v-model="ptask.args"
            placeholder='JSON encoded positional arguments,(Example: ["arg1", "arg2"])'
          />
        </el-form-item>
        <el-form-item label="字典參數" prop="kwargs">
          <el-input
            v-model="ptask.kwargs"
            placeholder='JSON encoded keyword arguments,(Example: {"argument": "value"})'
          />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmForm('Form')">確認</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getptaskList,
  createptask,
  updateptask,
  deleteptask,
  toggletask,
} from "@/api/task";
import Pagination from "@/components/Pagination";
import checkPermission from "@/utils/permission";
const defaultptask = {
  timetype: "interval",
  interval_: {
    every: 1,
    period: "minutes",
  },
  crontab_: {},
};
export default {
  components: { Pagination },
  data() {
    return {
      dialogVisible: false,
      dialogType: "create",
      ptask: defaultptask,
      dataList: { count: 0 },
      listLoading: true,
      listQuery: {
        page: 1,
        page_size: 20,
      },
      enabledOptions: [
        { key: "true", display_name: "啟用" },
        { key: "false", display_name: "禁用" },
      ],
      rule1: {
        name: [{ required: true, message: "請輸入", trigger: "blur" }],
        task: [{ required: true, message: "請輸入", trigger: "blur" }],
      },
      rule2: {
        name: [{ required: true, message: "請輸入", trigger: "blur" }],
        task: [{ required: true, message: "請輸入", trigger: "blur" }],
        "crontab_.minute": [
          { required: true, message: "請輸入", trigger: "blur" },
        ],
        "crontab_.hour": [
          { required: true, message: "請輸入", trigger: "blur" },
        ],
        "crontab_.day_of_week": [
          { required: true, message: "請輸入", trigger: "blur" },
        ],
        "crontab_.day_of_month": [
          { required: true, message: "請輸入", trigger: "blur" },
        ],
        "crontab_.month_of_year": [
          { required: true, message: "請輸入", trigger: "blur" },
        ],
      },
      periodOptions: [
        {
          value: "days",
          label: "天",
        },
        {
          value: "hours",
          label: "小時",
        },
        {
          value: "minutes",
          label: "分鐘",
        },
        {
          value: "seconds",
          label: "秒",
        },
      ],
    };
  },
  computed: {
    dynamicRules() {
      return this.timetype == "interval" ? this.rule1 : this.rule2;
    },
  },
  created() {
    this.getList();
  },
  methods: {
    checkPermission,
    getList() {
      this.listLoading = true;
      getptaskList(this.listQuery).then((response) => {
        if (response.data) {
          this.dataList = response.data;
        }
        this.listLoading = false;
      });
    },
    resetFilter() {
      this.listQuery = {
        page: 1,
        page_size: 20,
      };
      this.getList();
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleCreate() {
      this.ptask = Object.assign({}, defaultptask);
      this.dialogType = "create";
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs["Form"].clearValidate();
      });
    },
    handleUpdate(scope) {
      this.ptask = Object.assign({}, scope.row); // copy obj
      if (!this.ptask.interval_) {
        this.ptask.interval_ = {};
      }
      if (!this.ptask.crontab_) {
        this.ptask.crontab_ = {};
      }
      this.dialogType = "update";
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs["Form"].clearValidate();
      });
    },
    handleDelete(scope) {
      this.$confirm("確認刪除?", "警告", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(async () => {
          await deleteptask(scope.row.id);
          this.getList();
          this.$message.success("成功");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleToggle(scope) {
      toggletask(scope.row.id)
        .then((res) => {
          this.$message.success("成功");
        })
        .catch((e) => {
          this.getList();
        });
    },
    confirmForm() {
      this.$refs["Form"].validate((valid) => {
        if (valid) {
          const isEdit = this.dialogType === "update";
          if (isEdit) {
            updateptask(this.ptask.id, this.ptask).then(() => {
              this.getList();
              this.dialogVisible = false;
              this.$message.success("成功");
            });
          } else {
            createptask(this.ptask).then((res) => {
              this.getList();
              this.dialogVisible = false;
              this.$message.success("成功");
            });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
