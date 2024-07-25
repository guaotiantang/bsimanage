import {reactive, ref} from 'vue';
import {fetchServerAPI, showMsg, upload_url} from '@/scripts/lib.js';
import {isEqual} from 'lodash';
import { genFileId } from 'element-plus';

export const dialogVisible = ref(false);
export const upload_cell_url = upload_url + 'cell';
export const upload_script_url = upload_url + 'script';
export const uploadVisible = ref(false);
const pageSize = ref(100);
export const total = ref(0);
export const tableData = ref([]);
export const fields = ref([]);
export const tableMaxHeight = ref(600);  // 默认值
export const dataTable = ref(null);  // 用于获取data-Table的引用
export const loading = ref(false);
export const filter_select = reactive({
    filter: null,
    value: null
})
export const filter = reactive({
    page_size: pageSize.value,
    page_num: 1,
    filter_field: null,
    filter_value: null,
    order_field: null,
    order_type: null
});

export const handleSizeChange = async (val) => {
    filter.page_size = val;
    await getData();
};

export const handleCurrentChange = async (val) => {
    filter.page_num = val;
    await getData();
};
export const cellData = reactive({})
export const old_cellData = reactive({})

async function init_CellData(){
    Object.keys(cellData).forEach(key => delete cellData[key]);
    Object.keys(old_cellData).forEach(key => delete old_cellData[key]);
    for (const field of fields.value) {
        if (field !== 'ID') {
            cellData[field] = '';
            old_cellData[field] = '';
        }else {
            cellData[field] = -1;
            old_cellData[field] = -1;
        }
    }
}

export const getData = async () => {
    loading.value = true;
    const response = await fetchServerAPI('data', 'get_cell_data', 'POST', filter);

    if (response.code !== 200) {
        await showMsg(response.msg, 'error');
        loading.value = false;
        return;
    }
    await init_CellData()
    total.value = response.total;
    tableData.value = response.data;
    fields.value = [];

    for (const field of response.fields) {
        const key = Object.keys(field)[0];
        fields.value.push(key)
    }

    filter_select.filter = fields.value[1];

    loading.value = false;
};

export const handleEdit = (row) => {
    Object.keys(cellData).forEach(key => delete cellData[key]);  // 清空cellData
    Object.keys(old_cellData).forEach(key => delete old_cellData[key]);
    Object.assign(cellData, row);  // 将row的值赋值给cellData
    Object.assign(old_cellData, row);
    dialogVisible.value = true;
};


export const handleDelete = async (row) => {
    select_ids.value = [row["ID"]];
    await batchDelete();
};

export const updateTableMaxHeight = () => {
    if (dataTable.value) {
        tableMaxHeight.value = dataTable.value["clientHeight"] -100;
    }
};


export const searchCellData = async () => {
    if (filter_select.filter && filter_select.value && filter_select.value !== '') {
        filter.filter_field = filter_select.filter;
        filter.filter_value = filter_select.value;
    }else {
        filter.filter_field = null;
        filter.filter_value = null;
    }

    await getData();
}


export const showAddDialog = async () => {
    dialogVisible.value = true;
    await init_CellData()

}

export const changeCellData = async () => {
    if (isEqual(cellData, old_cellData)) { return;}
    if (!await showMsg(
        '确定保存修改?',
        'inquire')
    ) return
    loading.value = true;
    try {
        const response = await fetchServerAPI('data', 'update_cell_data', 'POST', cellData);
        if (response.code === 200) {
            await showMsg('数据更新成功', 'success');
            dialogVisible.value = false;
            await getData();
        } else {
            await showMsg(response.msg, 'error');
        }
    } catch (error) {
        await showMsg('数据更新失败', 'error');
    } finally {
        loading.value = false;
    }
}
export const select_ids = ref([])
export const handleSelectionChange = (val) => {
    select_ids.value = val.map(item => item["ID"]);
}
export const batchDelete = async () => {
    if (select_ids.value.length === 0) {return;}
    if (!await showMsg(
        '确定要删除'+ (select_ids.value.length > 1 ? '选中数据?' : 'ID:'+select_ids.value[0]),
        'inquire')
    ) return
    loading.value = true;

    try {
        let response = {};
        response.msg = undefined;
        response = await fetchServerAPI(
            'data', 'remove_cell_data', 'POST', {ids: select_ids.value}
        );

        if (response.code === 200) {
            dialogVisible.value = false;
            await showMsg(response.msg, 'success');
            await getData();
        } else {
            await showMsg(response.msg, 'error');
        }
    }catch (error) {
        await showMsg('数据更新失败', 'error');
    }finally {
        loading.value = false;
    }
}

export async function cellDataSortable (row){
    const { prop, order} = row;
    console.log(prop, order)
    filter.order_field = prop;
    let order_type = ref('desc')
    if (order === 'ascending') {
        order_type.value = 'asc';
    }else if (order === 'descending') {
        order_type.value = 'desc';
    }else {
        filter.order_field = null;
        order_type.value = null;
    }
    filter.order_type = order_type;
    await getData()

}

// 小区信息表导入
/** @type {import('vue').Ref<import('element-plus').UploadInstance | null>} */
export const upload_cells = ref(null);
export const handleExceedCellFile = (files) => {
    if (upload_cells.value) {
        upload_cells.value.clearFiles();
        const file = files[0]
        file.uid = genFileId();
        upload_cells.value.handleStart(file);
    }
}
/** @type {import('vue').Ref<import('element-plus').UploadInstance | null>} */
export const upload_script = ref(null)
export const handleExceedScriptFile = (files) => {
    if (upload_script.value) {
        upload_script.value.clearFiles();
        const file = files[0]
        file.uid = genFileId();
        upload_script.value.handleStart(file);
    }
}

export const cell_upload = ref(false)
export const script_upload = ref(false)
export const show_crb = ref(false)

export async function upload_cell_file() {
    cell_upload.value = true
    show_crb.value = false

}

