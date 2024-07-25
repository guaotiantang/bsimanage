
import { ElMessage, ElMessageBox } from 'element-plus'

const apiUrl = import.meta.env.VITE_API_URL;

export const upload_url = apiUrl + "/upload/";

export async function showMsg(msg, type="success", duration=3000, showClose=true, center=true, offset=100) {
    // 显示消息提示
    // type: success, warning, info, error, inquire(询问消息)
    // duration: 显示时间（毫秒）
    // showClose: 是否显示关闭按钮
    // center: 是否居中显示
    // offset: 偏移量（像素）

    try {
        if (type === 'inquire') {
            try {
                await ElMessageBox.confirm(msg, 'Tip', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                });
                return true;  // 用户点击了“确定”
            } catch {
                return false;  // 用户点击了“取消”或关闭了对话框
            }
        } else {
            ElMessage({
                message: msg,
                type: type,
                duration: duration,
                showClose: showClose,
                center: center,
                offset: offset
            });
            return true;
        }
    } catch {
        return false;
    }
}

export async function fetchServerAPI(module = "", api = '', method = "GET", data, headers = {'Content-Type': 'application/json'}) {
    // 发送请求到服务器API
    // module: 模块名
    // api: API名
    // method: 请求方法
    // data: 请求数据（JSON格式）
    // headers: 请求头
    let url = apiUrl + '/' + module + (api === '' ? '' : '/') + api;
    console.log(url);

    try {
        const token = getCookie('token'); // 获取 cookies 中的 token
        if (token) {
            headers['Authorization'] = `Bearer ${token}`; // 将 token 添加到请求头
        }

        const response = await fetch(url, {
            method: method,
            headers: headers,
            mode: 'cors', // 允许跨域请求
            body: data == null ? null : JSON.stringify(data),
            credentials: 'include' // 包含 cookies 信息
        });

        if (!response.ok) {
            await showMsg('后台服务掉线', 'error');
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        await showMsg('通讯错误！', 'error');
        return null;
    }
}

// 获取 cookies 中的指定 token
function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}
