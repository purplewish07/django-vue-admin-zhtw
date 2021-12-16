<template>
  <div class="app-container">
    <div>
      <el-input
        v-model="search"
        placeholder="輸入製令名稱進行搜索" :maxlength="10" show-word-limit 
        style="width: 200px"
        class="filter-item"
        @keyup.native="handleFilter"
      />
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="handleAdd"
        v-if="checkPermission(['work_create'])"
        size="small"
        >新增</el-button
      >
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%; margin-top: 10px"
      highlight-current-row
      row-key="id"
      height="100"
      stripe
      border
      v-el-height-adaptive-table="{ bottomOffset: 50 }"
    >
      <!-- <el-table-column align="center" label="Role Key" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>-->
      <el-table-column align="center" label="製令名稱" width="220">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="製令狀態">
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
      <el-table-column align="center" label="開始時間">
        <template slot-scope="scope">{{ scope.row.start_time }}</template>
      </el-table-column>
      <el-table-column align="center" label="結束時間">
        <template slot-scope="scope">{{ scope.row.end_time }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="handleEdit(scope)"
            :disabled="!checkPermission(['work_update'])"
          />
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="handleDelete(scope)"
            :disabled="!checkPermission(['work_delete'])"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType === 'edit' ? '編輯製令報工' : '新增製令報工'"
    >
      <el-form :model="work_order" label-width="80px" label-position="left">
        <el-form-item label="製令">
          <el-input v-model="work_order.name" placeholder="製令編號" :maxlength="10" show-word-limit />
        </el-form-item>
        <el-form-item label="狀態">
          <el-input v-model="work_order.status" placeholder="製令狀態" />
        </el-form-item>
          <el-form-item label="時程" prop="timeline">
            <el-time-picker v-model="work_order.timeline" is-range format="yyyy-MM-ddTHH:mm:ssZ" value-format="yyyy-MM-ddTHH:mm:ssZ"
              :style="{width: '100%'}" start-placeholder="開始時間" end-placeholder="結束時間" range-separator="至"
              clearable></el-time-picker>
          </el-form-item>
        
      </el-form>
      <span slot="footer">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmWork_order">確認</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { genTree, deepClone } from "@/utils";
import checkPermission from "@/utils/permission";
import {
  getRoutes,
  getAll_Work_list,
  createWork_order,
  deleteWork_order,
  updateWork_order,
} from "@/api/work_list";


const defaultWork_order = {
  id: "",
  name: "",
  status:"",
  timeline:'',
  start_time:"",
  end_time:"",
//  timeline:{
//    start_time:"",
//    end_time:"",},
};

export default {
  data() {
    return {
      search: "",
      work_order: Object.assign({}, defaultWork_order),
      routes: [],
      tableData: [],
      workList: [],
      dialogVisible: false,
      dialogType: "new",
      listLoading: true,
    };
  },
  computed: {},
  created() {
    // Mock: get all routes and work list from server
    this.getRoutes();
    this.getAll_Work_list();
  },
  methods: {
    checkPermission,
    handleFilter() {
      const newData = this.worksList.filter(
        (data) =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase())
      );
      this.tableData = genTree(newData);
    },
    async getRoutes() {
      const res = await getRoutes();
      // this.serviceRoutes = res.data
      this.routes = genTree(res.data);
    },
    async getAll_Work_list() {
      this.listLoading = true;
      const res = await getAll_Work_list();
      this.tableData = res.data;
      this.worksList = res.data;
      this.listLoading = false;
    },

    handleAdd() {
      this.work_order = Object.assign({}, defaultWork_order);
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([]);
      }
      this.dialogType = "new";
      this.dialogVisible = true;
    },
    handleEdit(scope) {
      this.dialogType = "edit";
      this.dialogVisible = true;
      this.work_order = deepClone(scope.row);
      
    },
    handleDelete({ $index, row }) {
      this.$confirm("確認刪除?", "警告", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await deleteWork_order(row.id);
          this.tableData.splice($index, 1);
          this.$message.success("成功");
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async confirmWork_order() {
      const isEdit = this.dialogType === "edit";
      //this.role.perms = this.$refs.tree.getCheckedKeys();
      
      
      this.work_order.start_time = this.work_order.timeline[0];
      this.work_order.end_time = this.work_order.timeline[1];
      
      if (isEdit) {
        await updateWork_order(this.work_order.id, this.work_order);
        for (let index = 0; index < this.tableData.length; index++) {
          if (this.tableData[index].id === this.work_order.id) {
            this.tableData.splice(index, 1, Object.assign({}, this.work_order));
            break;
          }
        }
      } else {
        //this.role.perms = this.$refs.tree.getCheckedKeys();
        // const { data } = await createWork_order(this.work_order)
        await createWork_order(this.work_order);
        this.getAll_Work_list();
      }
      
      const { status, name} = this.work_order;
      this.dialogVisible = false;
      this.$message.success("成功");
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
