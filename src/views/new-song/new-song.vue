<template>
    <div>

        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple"></div>

                <el-button @click="getDatad">请求数据</el-button>

                <span>数量</span>
                <span>{{count}}</span>

                <br />
                <v-tree ref='tree'
                        :data='treeData'
                        :multiple='true'
                        @node-click="getSelectedNodes"
                        @node-check="getCheckedNodes2"
                        :halfcheck='true' />

                <br />

                <h2>promise的异步回调的使用使用场景，元素的下拉的，编辑的时候，需要显示默认的下拉的值，
                    <br />
                    然而ajax是异步的程序并不知道，请求下拉数据和请求编辑参数的先后99999</h2>

                <el-button @click="getSelectText">获得选中的值</el-button>

                <el-select v-model="value"
                           placeholder="请选择">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>

                <hr>
                <h2>A-b-C组件之间的通信</h2>
                <Child1 :menuData="menuData"
                        v-on:getC="getC">
                    <div slot="title">A标题弹框</div>
                </Child1>
            </el-col>
            <el-col :span="12">
                <div>
                    调取本地的相机和摄像头并回显示到页面中
                </div>

                <input type="file"
                       accept="image/*" />

                <img :src="resultUrl"
                     style="width:50%;height:auto"
                     alt="">
                <hr>

                <el-button @click="toast">自定义taost弹出框插件</el-button>

                <loading :isshow='show'></loading>

            </el-col>

        </el-row>

    </div>
</template>
<script>
import { mapState } from 'vuex'
import { setTimeout } from 'timers';
import Child1 from "./component/Child1"

import axios from 'axios'


export default {
    data () {
        return {
            show: true,
            resultUrl: '',
            menuData: [
                {
                    id: 1,
                    name: 'liqin'
                }, {
                    id: 2,
                    name: 'zhangsan'
                }
            ],
            name: '',
            value: '',
            options: [],
            searchword: '',
            treeData: [
                {
                    title: 'node1',
                    expanded: true,
                    id: 12,
                    children: [{
                        title: 'node 1-1',
                        expanded: true,
                        children: [{
                            title: 'node 1-1-1',
                            children: [{
                                title: 'node 1-1-1-1',
                            }]
                        }, {
                            title: 'node 1-1-2'
                        }, {
                            title: 'node 1-1-3'
                        }]
                    },
                    {
                        title: 'node 1-2',
                        expanded: true,
                        children: [{
                            title: "<span style='color: red'>node 1-2-1</span>"
                        }, {
                            title: "<span style='color: red'>node 1-2-2</span>"
                        }]
                    }]
                }],
            treeData2: [
                {
                    title: 'node2',
                    expanded: true,
                    id: 12,
                    children: [{
                        title: 'node 2-1',
                        expanded: true,
                        children: [{
                            title: 'node 2-1-1',
                            children: [{
                                title: 'node 2-1-1-1',
                            }]
                        }, {
                            title: 'node 2-1-2'
                        }, {
                            title: 'node 2-1-3'
                        }]
                    },
                    {
                        title: 'node 2-2',
                        children: [{
                            title: "<span style='color: red'>node 2-2-1</span>"
                        }, {
                            title: "<span style='color: red'>node 2-2-2</span>"
                        }]
                    }]
                }]
        }
    },
    mounted () {
        //使用promise 控制程序的执行的步骤  
        this.getSelectData().then((data) => {
            this.getEditInfo();
        })

        setTimeout(() => {
            this.show = false
        }, 2000)

        //斐波那契数列


        // console.log(this.fibo(8))

        console.log(this.getMethods(5))





    },
    components: {
        Child1
    },
    computed: {
        ...mapState({
            count: "count"
        })
    },

    beforeRouteLeave (to, from, next) {
        // 设置下一个路由的 meta
        to.meta.keepAlive = true;  // B 跳转到 A 时，让 A 缓存，即不刷新
        next();
    },
    methods: {

        fibo (n) {//求出第n个数组的结果， 从第二项开始，每个数字都是前面两个数字的和
            return n > 2 ? this.fibo(n - 1) + this.fibo(n - 2) : 1
        },

        getMethods (n) {
            if (n <= 0) return 0;
            if (n == 1) return 1;
            if (n == 2) return 2;
            if (n == 3) return 4;
            return this.getMethods(n - 1) + this.getMethods(n - 2) + this.getMethods(n - 3)

        },

        getDatad () {
            axios({
                url: 'https://www.easy-mock.com/mock/59952ae9059b9c566dc18e2d/getData/getRight',
                method: 'get',
                timeout: 1000// 设置超时的处理  超时的时候 catch 一个异常的处理
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.error(error);
            });

        },
        uploadImg (e) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) => {
                this.resultUrl = e.target.result
            };
        },
        getSelectText () {
            let userSelection = "";
            if (window.getSelection) {//一般浏览器
                userSelection = window.getSelection();
            } else if (document.selection) {
                userSelection = document.selection.createRange();
            }
            var strInput = "";
            try {
                strInput += " " + userSelection.toString();
            } catch (e) {//I兼容IE
                strInput += " " + userSelection.text;
            }
            console.log('userSelection', userSelection.toString())

        },
        getC (data) {
            console.log("我在A组件,监听C组件的触发的函数,并得到C传递的值", data)
        },
        getEditInfo () {//获得编辑信息
            setTimeout(() => {
                this.value = 3
            }, 500)
        },
        getSelectData () {//获得下拉数据,放到promise的resolve的里面
            return new Promise((resolve, reject) => {
                setTimeout(() => {//使用settimeout模拟ajax请求数据
                    let data = [
                        {
                            value: 1,
                            label: '篮球'
                        },
                        {
                            value: 2,
                            label: '足球'
                        },
                        {
                            value: 3,
                            label: '排球'
                        }
                    ]
                    this.options = data;
                    resolve(data)
                }, 1000)
            })

        },
        getSelectedNodes (val) {
            console.log(val)
        },
        getCheckedNodes2 (obj, bool) {
            //alert("ok")
            console.log(obj)
            console.log(bool)
        },
        getNodes (val) {
            console.log(val)
        },
        toast () {
            this.$toast("弹出自定义的插件", "地址列表")
        }

    }
}
</script>
<style>
.a {
    border: 1px solid #e3e8f1;
}
</style>


