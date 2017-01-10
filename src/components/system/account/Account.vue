<template>
    <sunset-layout title="管理账户">
        <sunset-crud :options="options"></sunset-crud>
    </sunset-layout>
</template>
<script>
    import AccountStore from './AccountStore.js';

    const now = new Date().getTime();

    export default {
        methods: {

        },
        data() {
            return {
                options: {
                    title: '管理账户',
                    //表格
                    tableOptions: {
                        columns: [{
                            title: '登录名',
                            name: 'account'
                        }, {
                            title: '昵称',
                            name: 'nickname'
                        }],
                        showIndex: true,
                        pageSize: 10,
                        localPage: false,
                        multiCheck: true,
                        sortable: true,
                        format: {
                            list: 'rows',
                            count: 'count',
                            pageSize: 'pageSize',
                            currentPage: 'pageNumber'
                        },
                        //表格工具栏
                        toolbar: [{
                            label: '新增',
                            icon: 'plus-round',
                            color: 'success',
                            permission: 'SYSTEM_MANAGER_DICTIONARY_ADD',
                            signal: 'ADD'
                        }],
                        //表格搜索
                        filter: false,
                        //数据条目操作
                        recordTools: [{
                            label: '修改',
                            icon: 'edit',
                            color: 'warning',
                            permission: 'SYSTEM_MANAGER_DICTIONARY_UPDATE',
                            signal: 'MODIFY'
                        }, {
                            label: '删除',
                            icon: 'trash-a',
                            color: 'error',
                            permission: 'SYSTEM_MANAGER_DICTIONARY_DELETE',
                            signal: 'DELETE'
                        }],
                        store: AccountStore
                    },
                    //表格表单
                    formOptions: {
                        cols: 3,
                        store: AccountStore,
                        fields: [{
                            label: '登录名',
                            name: 'account',
                            widget: 'input',
                            validate: {
                                required: true,
                                maxlength: 32
                            }
                        }, {
                            label: '密码',
                            name: 'password',
                            widget: 'input',
                            premise(model) {
                                return !model.id;
                            },
                            validate: {
                                required: true,
                                maxlength: 32
                            }
                        }, {
                            label: '昵称',
                            name: 'nickname',
                            widget: 'input',
                            validate: {
                                required: true,
                                maxlength: 32
                            }
                        }],
                        format: (model) => {
                            model.type = 1;
                            return model;
                        },
                        validate: (model) => {
                            return true;
                        },
                        tools: null
                    }
                }
            }
        }
    };
</script>