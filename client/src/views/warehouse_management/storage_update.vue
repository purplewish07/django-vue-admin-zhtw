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
      <el-table-column align="center" label="批號" width="220">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="儲位">
        <template slot-scope="scope">{{ scope.row.storage_spaces }}</template>
      </el-table-column>
      <el-table-column align="center" label="確認者">
        <template slot-scope="scope">{{ scope.row.user }}</template>
      </el-table-column>
      <el-table-column align="center" label="更新時間">
        <template slot-scope="scope">{{ scope.row.update_time }}</template>
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
      <el-form :model="batch_list" label-width="80px" label-position="left">
        <el-form-item label="批號">
          <el-input v-model="batch_list.name" placeholder="批號" :maxlength="10" show-word-limit />
        </el-form-item>
        <el-form-item label="儲位">
          <el-input v-model="batch_list.storage_spaces" placeholder="儲位" />
        </el-form-item>
        <el-form-item label="確認者">
          <el-input v-model="batch_list.user" placeholder="確認者" />
        </el-form-item>
          <el-form-item label="更新時間" prop="timeline">
            <el-date-picker type="datetime" v-model="batch_list.update_time" format="yyyy-MM-ddTHH:mm:ssZ" value-format="yyyy-MM-ddTHH:mm:ssZ"
              :style="{width: '100%'}" placeholder="開始時間"
              clearable></el-date-picker>
          </el-form-item>
        
      </el-form>
      <span slot="footer">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmBatch_list">確認</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { genTree, deepClone } from "@/utils";
import checkPermission from "@/utils/permission";
import {
  getRoutes,
  getAll_Batch_list,
  create_Batch_list,
  update_Batch_list,
  delete_Batch_list,
} from "@/api/storage_list";


const defaultStorage_list = {
  id: "",
  name: "",
  storage_spaces:"",
  user:"",
  update_time:'',
  //start_time:"",
  //end_time:"",
//  timeline:{
//    start_time:"",
//    end_time:"",},
};

export default {
  data() {
    return {
      search: "",
      batch_list: Object.assign({}, defaultStorage_list),
      routes: [],
      tableData: [],
      batchList: [],
      dialogVisible: false,
      dialogType: "new",
      listLoading: true,
    };
  },
  computed: {},
  created() {
    // Mock: get all routes and work list from server
    this.getRoutes();
    this.getAll_Batch_list();
  },
  methods: {
    checkPermission,
    handleFilter() {
      const newData = this.batchList.filter(
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
    async getAll_Batch_list() {
      this.listLoading = true;
      const res = await getAll_Batch_list();
      this.tableData = res.data;
      this.batchList = res.data;
      this.listLoading = false;
    },

    handleAdd() {
      this.batch_list = Object.assign({}, defaultStorage_list);
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([]);
      }
      this.dialogType = "new";
      this.dialogVisible = true;
	  this.batch_list.update_time = new Date().toISOString();
    },
    handleEdit(scope) {
      this.dialogType = "edit";
      this.dialogVisible = true;
      this.batch_list = deepClone(scope.row);
	  this.batch_list.update_time = new Date().toISOString();
      
    },
    handleDelete({ $index, row }) {
      this.$confirm("確認刪除?", "警告", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await delete_Batch_list(row.id);
          this.tableData.splice($index, 1);
          this.$message.success("成功");
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async confirmBatch_list() {
      const isEdit = this.dialogType === "edit";
      //this.role.perms = this.$refs.tree.getCheckedKeys();
      //this.batch_list.start_time = this.batch_list.timeline[0];
      //this.batch_list.end_time = this.batch_list.timeline[1];
      
      if (isEdit) {
        await update_Batch_list(this.batch_list.id, this.batch_list);
        for (let index = 0; index < this.tableData.length; index++) {
          if (this.tableData[index].id === this.batch_list.id) {
            this.tableData.splice(index, 1, Object.assign({}, this.batch_list));
            break;
          }
        }
      } else {
        //this.role.perms = this.$refs.tree.getCheckedKeys();
        // const { data } = await create_Batch_list(this.batch_list)
        await create_Batch_list(this.batch_list);
        this.getAll_Batch_list();
      }
      
      const { storage_spaces, name} = this.batch_list;
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
