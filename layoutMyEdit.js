import axios from 'axios';
import {
    Calendar,
    confirm,
    Layout as LayoutDHX,
    Pagination,
    TreeCollection,
    TreeGrid as TreeGridDHX,
} from "dhx-suite-package";
import { Tabbar as TabbarDHX } from "dhx-suite-package";
import { Toolbar as ToolbarDHX } from "dhx-suite-package";
import { Grid as GridDHX } from "dhx-suite-package";
import { Tree as TreeDHX } from "dhx-suite-package";
import { DataView as DataviewDHX } from "dhx-suite-package";
import { List as ListDHX } from "dhx-suite-package";
import { Popup as PopupDHX } from "dhx-suite-package";
import { forEach } from 'lodash';
/*
TODO 左侧页面顶端为工具栏
TODO 左侧页面下部设置list，显示试卷列表
TODO 右侧页面第一个tab，展示题目列表
TODO 右侧页面第二个tab，进行预览
*/

var LayoutMyEdit = ({
    // 0
    layoutMyEdit: null,//总体布局

    //1.cellCol1
    layoutPaperList: null,
    //1.1 工具栏
    toolbarPaperList: null,
    datatoolbarPaperList: new TreeCollection(),
    //1.2 试卷列表
    listPaperList: null,

    //2 cellCol2
    tabbarQues: null,
    //2.1 题目以及預覽
    layoutListQues: null,
    //2.1.1 工具欄
    toolbarListQues: null,
    datatoolbarListQues: new TreeCollection(),
    //2.1.2 題目列表
    ListQues: null,
    //2.2 预览
    layoutPreview: null,


    init() {
        this.layoutMyEdit = this.layoutMyEdit_create();
        this.layoutMyEdit_event();
        this.layoutMyEdit_reload();
        return this.layoutMyEdit;
    },
    //0

    layoutMyEdit_create() {
        var mylayout = new LayoutDHX(null, {
            type: "space",
            cols: [
                { id: "PaperList", width: "25%", header: "试卷列表", resizable: true, collapsable: true, },
                { id: "ControlPage", width: "75%" },

            ],
        });
        return mylayout;
    },
    layoutMyEdit_event() { },
    layoutMyEdit_reload() {
        //1 layoutPaperList
        this.layoutPaperList = this.layoutPaperList_create();
        this.layoutPaperList_event();
        this.layoutPaperList_reload();
        this.layoutMyEdit.getCell("PaperList").attach(this.layoutPaperList);
        //2
        this.tabbarQues = this.tabbarQues_create();
        this.tabbarQues_event();
        this.tabbarQues_reload();
        this.layoutMyEdit.getCell("ControlPage").attach(this.tabbarQues);
    },
    //1 layoutPaperList
    layoutPaperList_create() {
        var mylayout = new LayoutDHX(null, {
            type: "line",
            rows: [
                { id: "toolbarPaperList", height: "content" },
                { id: "listPaperList" },
            ],
        });
        return mylayout;
    },
    layoutPaperList_event() { },
    layoutPaperList_reload() {
        //1.1 工具栏初始化
        this.toolbarPaperList = this.toolbarPaperList_create();
        this.toolbarPaperList_event();
        this.toolbarPaperList_reload();
        this.layoutPaperList.getCell("toolbarPaperList").attach(this.toolbarPaperList);

        //1.2 试题列表初始化
        this.listPaperList = this.listPaperList_create();
        this.listPaperList_event();
        this.listPaperList_reload();
        this.layoutPaperList.getCell("listPaperList").attach(this.listPaperList); //error 1
    },
    //1.1 工具栏
    toolbarPaperList_create() {
        const mytoolbar = new ToolbarDHX(null, {
            data: this.datatoolbarPaperList,
        });
        return mytoolbar;
    },
    toolbarPaperList_event() {
        const that = this;
        const events = ["click"];
        events.forEach(function (event) {
            that.toolbarPaperList.events.on(event, function () {
                getEvent(event, arguments);
            });
        });

        function getEvent(event, args) {
            switch (event) {
                case "click":
                    click(args);
                    break;
            }
        }

        function click(args) {
            switch (args[0]) {
                case "add":
                    // 处理添加按钮点击事件
                    that.handleAdd();
                    break;
                case "save":
                    // 处理保存按钮点击事件
                    that.handleSave();
                    break;
                case "delete":
                    // 处理删除按钮点击事件
                    that.handleDelete();
                    break;
            }
        }
    },
    toolbarPaperList_reload() {
        const toolbarData = [
            {
                id: "add",
                type: "button",
                value: "Add",
                icon: "dxi dxi-plus",
                size: "small",
            },
            {
                id: "save",
                type: "button",
                value: "Save",
                icon: "dxi dxi-checkmark",
                size: "small",
            },
            {
                id: "delete",
                type: "button",
                value: "Delete",
                icon: "dxi dxi-trash",
                size: "small",
            },
        ];
        this.datatoolbarPaperList.parse(toolbarData);
    },
    handleAdd() {
        // 处理添加按钮点击事件的逻辑
        console.log("Add button clicked");
    },
    handleSave() {
        // 处理保存按钮点击事件的逻辑
        console.log("Save button clicked");
    },
    handleDelete() {
        // 处理删除按钮点击事件的逻辑
        console.log("Delete button clicked");
    },
    //1.2 试卷列表
    listPaperList_create() {
        function template(item) {
            let template = "";
            template += "<div class='item_name'>" + item.name + "</div>";
            template += "</div>";
            return template;
        };
        const list = new ListDHX(null, { template: template });
        return list;
    },
    listPaperList_event() { },
    listPaperList_reload() {
        //TODO get list 
        let that = this;
        axios.get('/Paper/PaperList/action')
            .then(function (response) {
                // 成功获取数据后的处理
                const res = response.data;
                console.log(res);
                if (res.type === 'success') {
                    // 更新列表对象的数据
                    that.listPaperList.data.removeAll(); // 清除现有数据
                    that.listPaperList.data.parse(response.data.data); // 解析并加载新数据
                } else {
                    // 处理失败情况
                    console.error('else请求失败：', error);
                }
            })
            .catch(function (error) {
                // 处理请求失败的情况
                console.error('请求失败：', error);
            });
        /* this.listPaperList.data.parse([
            {
                "name": "集合章节测试",
            },
            {
                "name": "复数章节测试",
            },
            {
                "name": "平面向量章节测试",
            },
            {
                "name": "不等式章节测试",
            }

        ]); */
    },
    //2 tabbarQues
    tabbarQues_create() {
        var views = [
            { tab: "试题列表", id: "layoutListQues" },
            { tab: "预览", id: "layoutPreview" },
        ];
        var tabbarQues = new TabbarDHX(null, { //error 2
            mode: "top",
            views: views,
            tabAutoWidth: true,
        });
        return tabbarQues;
    },
    tabbarQues_event() {

    },
    tabbarQues_reload() {
        //2.1 layoutListQues
        this.layoutListQues = this.layoutListQues_create();
        this.layoutListQues_event();
        this.layoutListQues_reload();
        this.tabbarQues.getCell("layoutListQues").attach(this.layoutListQues);

        //2.2 layoutPreview
        this.layoutPreview = this.layoutPreview_create();
        this.layoutPreview_event();
        this.layoutPreview_reload();
        this.tabbarQues.getCell("layoutPreview").attach(this.layoutPreview);
    },
    //2.1 layoutListQues

    layoutListQues_create() {
        var mylayout = new LayoutDHX(null, {
            type: "none",
            rows: [
                {
                    id: "toolbarListQues",
                    height: "content",
                },
                {
                    id: "ListQues",
                }
            ]
        });
        return mylayout;
    },
    layoutListQues_event() {

    },
    layoutListQues_reload() {
        //2.1.1
        this.toolbarListQues = this.toolbarListQues_create();
        this.toolbarListQues_event();
        this.toolbarListQues_reload();
        this.layoutListQues.getCell("toolbarListQues").attach(this.toolbarListQues);

        //2.1.2
        this.ListQues = this.ListQues_create();
        this.ListQues_event();
        this.ListQues_reload();
        this.layoutListQues.getCell("ListQues").attach(this.ListQues);
    },
    //2.1.1
    toolbarListQues_create() {
        var mytoolbar = new ToolbarDHX(null, {
            data: this.datatoolbarListQues,
        })
        return mytoolbar;
    },
    toolbarListQues_event() {

    },
    toolbarListQues_reload() {
        var mydata = [
            {
                id: "search",
                type: "input",
                placeholder: "Search",
                icon: "mdi mdi-magnify",
                width: "content",
            },
            {
                id: "empty",
                type: "button",
                value: "清空",
                color: "secondary",
                size: "small",
                view: "flat",
            },
        ];
        this.datatoolbarListQues.parse(mydata);
    },
    //2.1.2
    ListQues_create() {
        const dataset = [
            { "value": "设集合 M={-1,0,1}，N={x^2 < x}，则M∩N=()", "id": "1" },
            { "value": "用列举法表示集合{x|x^2-2x+1=0}为()", "id": "2" },
            { "value": "设集合A={12，3，5，71，B={1，2，3，5，8，则A∩B=()", "id": "3" },
            { "value": "如果A = {1, 2, 3, 4, 5}，B = {3, 4, 5, 6, 7}，求A和B的交集和并集", "id": "4" },
            { "value": "什么是集合的补集？如果U是全集，A是U的子集，如何表示A的补集？", "id": "5" },
            { "value": "解释集合的基本运算：并集、交集和补集。给出一个具体的示例说明它们的应用。", "id": "6" },
            { "value": "使用集合符号表示以下集合：所有小于10的正偶数。", "id": "7" },
            { "value": "给定集合C = {a, b, c, d, e} 和集合D = {c, d, e, f, g}，找出C和D的交集和差集。", "id": "8" },
            { "value": "假设集合R = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}，定义一个子集合S，包括所有的素数。列出S的元素。", "id": "9" },
            { "value": "设定一个全集U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}，定义两个集合A和B，其中A包含所有的奇数，B包含所有的质数。列出A和B的元素", "id": "10" }
        ]
        var listQues = new ListDHX(null, {
            data: dataset,
        });
        return listQues;
    },
    ListQues_event() { },
    ListQues_reload() { },

    /*
    layoutListQues_create() { //error 3
        const dataset = [
            { "value": "设集合 M={-1,0,1}，N={x^2 < x}，则M∩N=()", "id": "1" },
            { "value": "用列举法表示集合{x|x^2-2x+1=0}为()", "id": "2" },
            { "value": "设集合A={12，3，5，71，B={1，2，3，5，8，则A∩B=()", "id": "3" },
            { "value": "如果A = {1, 2, 3, 4, 5}，B = {3, 4, 5, 6, 7}，求A和B的交集和并集", "id": "4" },
            { "value": "什么是集合的补集？如果U是全集，A是U的子集，如何表示A的补集？", "id": "5" },
            { "value": "解释集合的基本运算：并集、交集和补集。给出一个具体的示例说明它们的应用。", "id": "6" },
            { "value": "使用集合符号表示以下集合：所有小于10的正偶数。", "id": "7" },
            { "value": "给定集合C = {a, b, c, d, e} 和集合D = {c, d, e, f, g}，找出C和D的交集和差集。", "id": "8" },
            { "value": "假设集合R = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}，定义一个子集合S，包括所有的素数。列出S的元素。", "id": "9" },
            { "value": "设定一个全集U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}，定义两个集合A和B，其中A包含所有的奇数，B包含所有的质数。列出A和B的元素", "id": "10" }
        ]
        var listQues = new ListDHX(null, {
            data: dataset,
        });
        return listQues;
    },
    layoutListQues_event() { }, //error 4
    layoutListQues_reload() { }, //error 5
    */
    //2.2 layoutPreview
    //error 6
    layoutPreview_create() {

    },
    layoutPreview_event() {

    },
    layoutPreview_reload() {

    }

});
var layoutMyEdit = LayoutMyEdit.init();
export {
    layoutMyEdit
}
