<template>
  <el-main class="main" style="height: 100%" v-loading="loading" element-loading-text="loading...">

    <div ref="dataTable" style="height: 100%;">
      <div class="main-cell-search">
        <div style="align-items: start; width: 100%;">
          <el-select
              v-model="filter_select.filter"
              size="default"
              placeholder="搜索字段"
              style="max-width: 16%"
              prefix-icon="Search">
            <el-option v-for="field in fields" :key="field" :label="field" :value="field"/>
          </el-select>
          <el-input
              v-model="filter_select.value"
              size="default" placeholder="搜索值"
              style="max-width: 32%; width: 28%"
              clearable
              @change="searchCellData"
          />
          <el-button style="margin-left: 10px" type="primary" icon="Search" @click="searchCellData" />
        </div>
        <el-tooltip effect="dark" content="上传数据" placement="top-start">
          <el-button type="warning" icon="Upload" @click="uploadVisible = true" />
        </el-tooltip>
        <el-tooltip effect="dark" content="刷新" placement="top-start">
          <el-button type="success" :loading="loading" icon="Refresh" @click="getData" />
        </el-tooltip>
        <el-button type="primary" icon="CirclePlus" @click="showAddDialog">新增</el-button>
        <el-tooltip effect="dark" content="导出当前数据" placement="top-start">
          <el-button color="#626aef" icon="Download" /></el-tooltip>
      </div>

      <el-table :data="tableData" border
                :fit="true" show-overflow-tooltip
                :max-height="tableMaxHeight"
                @selection-change="handleSelectionChange"
                @sort-change="cellDataSortable">
        <el-table-column type="selection" width="54" />
        <el-table-column
            v-for="field in fields"
            :key="field"
            :prop="field"
            :label="field"
            :width="field.length * 40"
            sortable="custom"
        />
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button link type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
            <el-button link type="primary" size="small">修改记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="main-cell-foot">
        <el-button type="warning"
                   @click="batchDelete"
                   :disabled="select_ids.length === 0"
        >批量删除</el-button>
        <div class="pagination-container">
          <el-pagination
              background
              v-model:page-size="filter.page_size"
              :page-sizes="[100, 200, 300, 400, 500]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          />
        </div>
      </div>

    </div>
  </el-main>

  <el-drawer
      v-model="dialogVisible"
      :title="cellData['ID'] > -1 ? '编辑' : '新增'"
      size="36%"
      :close-on-click-modal="false"
      :show-close="false"
      direction="rtl">
    <el-form :inline="false" :model="cellData">
      <el-form-item v-for="field in fields" :key="field" :label="field">
        <el-input v-model="cellData[field]" :disabled="field === 'ID'" />

      </el-form-item>
    </el-form>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false" :disabled="loading">取消</el-button>
            <el-button
                type="primary"
                @click="changeCellData"
                :disabled="isEqual(cellData, old_cellData)"
                :loading="loading"
            >
              确定
            </el-button>

          </span>
    </template>
  </el-drawer>

  <el-dialog
    v-model="uploadVisible"
    title="上传数据"
    width="480"
    draggable>
    <span style="padding-right: 10px">小区信息表</span>
    <el-button size="small" type="info" style="">下载模板</el-button>
    <el-main style="border: #a0a5a8 solid 1px;">
      <el-upload
          :disabled="cell_upload"
          ref="upload_cells"
          accept=".xlsx"
          :action=upload_cell_url
          :auto-upload="false"
          :limit=1
          :on-exceed="handleExceedCellFile">
        <el-button :disabled="cell_upload" size="default" type="primary">选择小区信息表</el-button>
      </el-upload>
    </el-main>

    <el-main style="display: flex; padding-top: 3px; padding-right: 0;">
      <el-button
          v-if="show_crb"
          size="default"
          style="margin-left: auto"
          type="warning"
      >下载匹配结果</el-button>
      <el-button
          size="default"
          style="margin-left: auto"
          type="success"
          :loading="cell_upload"
          @click="upload_cell_file">
        上传并匹配
      </el-button>

    </el-main>

    <span style="padding-right: 10px">数据录入表</span>
    <el-button size="small" type="info" style="">下载模板</el-button>
    <el-main style="border: #a0a5a8 solid 1px;">
      <el-upload
          :disabled="script_upload"
          ref="upload_script"
          :action=upload_script_url
          :auto-upload="false"
          :limit=1
          :on-exceed="handleExceedScriptFile">
        <el-button :disabled="script_upload" size="default" type="primary">选择数据录入文件</el-button>
      </el-upload>
    </el-main>
    <el-main style="display: flex; padding-top: 3px; padding-right: 0;">
      <el-button :loading="script_upload" size="default" style="margin-left: auto" type="success">确认导入</el-button>
    </el-main>
  </el-dialog>


</template>
<style lang="scss">
@import "../styles/cellPage.scss";
</style>

<script setup>
  import {isEqual} from 'lodash';
  import {
      dialogVisible,
      upload_cell_url,
      upload_script_url,
      uploadVisible,
      total,
      loading,
      dataTable,
      tableData,
      fields,
      tableMaxHeight,
      filter_select,
      filter,
      cellData,
      old_cellData,
      select_ids,
      upload_cells,
      upload_script,
      cell_upload,
      script_upload,
      show_crb,
      handleSizeChange,
      handleCurrentChange,
      getData,
      handleEdit,
      handleDelete,
      updateTableMaxHeight,
      searchCellData,
      showAddDialog,
      changeCellData,
      handleSelectionChange,
      batchDelete,
      cellDataSortable,
      handleExceedCellFile,
      handleExceedScriptFile,
      upload_cell_file

  } from "../scripts/cellpage.js"

  import {onBeforeUnmount, onMounted} from "vue";
  onMounted(() => {
    updateTableMaxHeight();
    window.addEventListener('resize', updateTableMaxHeight);
    getData();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateTableMaxHeight);
  });
</script>

