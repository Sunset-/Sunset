<style lang="sass">
    .mdds-login-container {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background: #199fcf;
    }

    .mdds-login-logo{
        position: absolute;
        top: 50px;
        left: 40px;
    }
    
    .mdds-login-content {
        width: 1280px;
        height: 750px;
        margin: 100px auto 0px auto;
        background-image: url(/assets/img/mdds/bg.png);
        background-size: contain;
        background-repeat: no-repeat;
        overflow: hidden;
    }
    
    .mdds-login-box {
        width: 390px;
        height: 390px;
        margin: 100px auto 0px auto;
        background: #EBEBEB;
        border-radius: 20px;
    }
    
    .mdds-login-box>.mdds-login-title {
        font-size: 18px;
        text-align: center;
        height: 80px;
        line-height: 80px;
        font-family: 微软雅黑;
        font-size: 18px;
        border-bottom: 1px solid #cdcdcd;
    }
    
    .mdds-login-msg {
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: red;
        text-align: center;
    }
    
    .mdds-login-form {}
    
    .mdds-login-form .input-group {
        display: table;
        width: 275px;
        height: 45px;
        margin: 0px auto 25px auto;
        border-radius: 50px;
        background: #FFF;
        overflow: hidden;
        border: 1px solid #cdcdcd;
    }
    
    .mdds-login-form .input-group div {
        display: table-cell;
        width: 45px;
        text-align: center;
        color: #cdcdcd;
        margin: 0px;
    }
    
    .mdds-login-form .input-group div i {
        position: relative;
        top: 6px;
        left: 5px;
        font-size: 24px;
        margin-top: 5px;
    }
    
    .mdds-login-form .input-group input {
        display: table-cell;
        width: 100%;
        height: 100%;
        border: none;
        font-size: 14px;
        padding: 0px 5px;
        background-color: #FFF !important;
        outline:none;
    }
    .mdds-login-other {
        width: 275px;
        margin: 15px auto;
    }
    
    .mdds-login-button {
        display: block;
        border: 0px;
        width: 275px;
        height: 55px;
        margin: 0px auto;
        color: #FFF;
        background: #189FCE;
        font-size: 16px;
    }
    
    input:-webkit-autofill,
    textarea:-webkit-autofill,
    select:-webkit-autofill {
        background-color: #FFF !important;
    }
    
    .mdds-login-footer {
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        height: 40px;
        background: #0185B5;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        color: #FFF;
    }
</style>
<template>

<div class="mdds-login-container" ng-controller="HospitalLoginController">
    <img class="mdds-login-logo" src="/assets/img/mdds/logo.png">
    <div class="mdds-login-content">
        <div class="mdds-login-box">
            <div class="mdds-login-title">用户登录</div>
            <div class="mdds-login-msg">{{message}}</div>
            <div class="mdds-login-form">
                <form @submit.prevent="login();return false;">
                    <div class="input-group">
                        <div>
                            <i class="fa fa-user"></i>
                        </div>
                        <input type="text" @input="message=''" placeholder="用户名" v-model="model.acc" required />
                    </div>
                    <div class="input-group" style="margin-bottom:0px;">
                        <div>
                            <i class="fa fa-lock"></i>
                        </div>
                        <input type="password" @input="message=''" placeholder="密码" v-model="model.pwd" required />
                    </div>
                    <div class="mdds-login-other">
                        <label><input type="checkbox" style="position:relative;top:2px;"  v-model="model.autoLogin"> 一月内自动登录</label>
                    </div>
                    <button type="submit" class="mdds-login-button">登 录</button>
                </form>
            </div>
        </div>
    </div>
    <div class="mdds-login-footer">
        售后电话：029-88151360&nbsp;&nbsp;&nbsp;&nbsp;技术支持：西安诸子信息技术有限责任公司
    </div>
</div>
</template>
<script>
	import SignStore from './SignStore';

	export default {
		data() {
			return {
				model: {
					acc: '',
					pwd: ''
				},
                message : ''
			}
		},
		methods: {
			login() {
				SignStore.loginOpc(this.model).then(function (data) {
					Router.go('/');
				}).catch(e=>{
                    this.message = e&&e.message||'登录失败';
                });
                return false;
			},
            autoLogin(){

            }
		},
		ready() {
		}
	}
</script>