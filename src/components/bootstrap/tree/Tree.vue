<template>
    <sunset-layout title="Sunset组件库 - Tree">
		<h4 class="wrapper-y-md">选择</h4>
		<div>
            <p>当前节点:{{selectedNode.value}}</p>
            <p>父节点:{{selectedParentNode&&selectedParentNode.value}}</p>
		</div>
		<h4 class="wrapper-y-md">勾选</h4>
		<div>
            <p>当前节点:{{selectedNode.value}}</p>
            <p>父节点:{{selectedParentNode&&selectedParentNode.value}}</p>
		</div>
		<h4 class="wrapper-y-md">树</h4>
        <div style="border:1px solid #09c;">
            <sunset-tree :options="options.treeOptions" :nodes="options.treeNodes" @selected="selected" @checked="checked"></sunset-tree>
        </div>
    </sunset-layout>
</template>
<script>
    import BootstrapStore from '../BootstrapStore';

    export default {
        methods: {
            selected(node,parentNode) {
               this.selectedNode = node;
               this.selectedParentNode = parentNode;
            },
            checked(checkeds) {
                debugger;
               this.checkeds = checkeds;
            }
        },
        data() {
            return {
                selectedNode : null,
                selectedParentNode : null,
                checkeds : null,
                formModalVisible: false,
                options: {
                    title: '管理账户',
                    store: BootstrapStore,
                    //树
                    treeOptions: {
                        autoExpand : false,
                        check : 'multi',
                        setting: {
                            data: {
                                key: {
                                    name: 'value',
                                    title: 'value'
                                },
                                simpleData: {
                                    enable: true,
                                    idKey: 'key',
                                    pIdKey: 'parent',
                                    rootPId: null
                                }
                            },
                            check: {
                                radioType: 'all'
                            },
                            format: {
                                nodeToValue(treeNode) {
                                    return treeNode && treeNode.data;
                                }
                            }
                        }
                    },
                    treeNodes: BootstrapStore.treeNodes()
                }
            }
        }
    };
</script>