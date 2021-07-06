<template>
  <div class="ma-patchimport-history">
    <el-table
      class="ma-table"
      :default-sort = "{prop: 'add_time', order: 'descending'}"
      sortable="True"
      :row-style="{height:0+'px'}"
      :cell-style="{padding:0+'px'}"
      :data="tableData.slice((currentPage - 1)*pagesize, currentPage*pagesize)"
      :height="615">
      <el-table-column
      prop="id"
      label="id">
      </el-table-column>
      <el-table-column
      v-for="item in props"
      :key="item"
      :prop="item.prop"
      :label="item.label">
      </el-table-column>
      <el-table-column
      prop="add_time"
      label="add date"
      :formatter="handleAddDate">
      </el-table-column>
      <el-table-column
      prop="add_time"
      label="add time"
      :formatter="handleAddTime">
      </el-table-column>
      <el-table-column
      prop="status"
      label="status"
      :formatter="handleStatus">
      </el-table-column>
    </el-table>
    <el-pagination
      class="ma-pagination"
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pagesize"
      :pager-count="11"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <router-link to="/patchimport/create"><el-button type="primary">创建任务</el-button></router-link>
  </div>
</template>

<script>
  import { getData } from '@/api'
  export default {
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val
      },
      handleStatus(row) {
        let info = ''
        if (row.status == 2) {
          info='running'
        } else if (row.status == 0) {
          info='success'
        } else if (row.status == 1) {
          info='failure'
        } else {
          info='wrong status'
        }
        return info
      },
      handleAddDate(row) {
        return row.add_time.split(' ')[0]
      },
      handleAddTime(row) {
        return row.add_time.split(' ')[1]
      },
      getInfo() {
        getData('/dsims/patchimport/patches/')
        .then(res=> {
          console.log(res.data)
          this.tableData = res.data
          this.total = res.data.length
          this.pagenum = parseInt(this.total/this.pagesize) + 1
          console.log(this.pagenum)
        })
        .catch(error=>{ 
          alert('获取数据失败！');
          console.log(error)
        });
      },
    },
    data() {
      return {
        currentPage: 1,
        pagesize: 10,
        pagenum: 0,
        total: 0,
        props: [{
            prop: 'project_name',
            label: 'project'
          },{
            prop: 'package_name',
            label: 'package'
          },{
            prop: 'owner',
            label: 'owner'
          },
        ],
        tableData: [],
      }
    },
    mounted() {
      this.getInfo()
    }
  }
</script>

<style>
/* .ma-table .el-table__body-wrapper {
    height: calc(100% - 40px) !important;
} */

.ma-table {
  width: 60%;
  height: 80%;
  margin: 2% auto;
}

.ma-pagination {
  display: block;
  width:400px;
  margin:0 auto;
}

.ma-patchimport-history a{
  float: right;
  margin-right: 10%;
}
</style>

