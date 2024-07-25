import {ref, watch} from 'vue'
import {fetchServerAPI} from "@/scripts/lib";

export const isLoginPage = ref(true)
export const msg = ref({
    color: 'red',
    value: '',
    show: false
})
export const loginForm=ref({
    email: '',
    password: '',
})
export const registerForm=ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})
watch(isLoginPage, () => {
    msg.value.show = false
})

export async function login() {
    msg.value.color = 'red'
    msg.value.show = false
    if (loginForm.value.email === "") {
        msg.value.value = "请输入邮箱账号"
        msg.value.show = true
    } else if (loginForm.value.password === "") {
        msg.value.value = "请输入密码"
        msg.value.show = true
    } else {
        let postData = {...loginForm.value}
        const response = await fetchServerAPI('users', 'login', 'POST', postData)
        if (response.code !== 200){
            msg.value.value = response.msg
            msg.value.show = true
            return
        }

        sessionStorage.setItem("token", response.data["token"])
        window.location.href = '/home'

        // localStorage.setItem('N_BSIManage_IS_Login', 'Yes')

    }
}
export function register() {
    msg.value.color = 'red'
    msg.value.show = false
    if (registerForm.value.name === "") {
        msg.value.value = "请输入用户名"
        msg.value.show = true
    }else if (registerForm.value.email === "") {
        msg.value.value = "请输入邮箱地址"
        msg.value.show = true
    }else if (registerForm.value.password === "") {
        msg.value.value = "请输入密码"
        msg.value.show = true
    }else if (registerForm.value.password !== registerForm.value.password_confirmation){
        msg.value.value = "两次密码输入不一致"
        msg.value.show = true
    }else {
        // 输出账号密码
        console.log(registerForm.value.name)
        console.log(registerForm.value.email)
        console.log(registerForm.value.password)
        msg.value.show = false
        localStorage.setItem('N_BSIManage_IS_Login', 'Yes')

    }
}
