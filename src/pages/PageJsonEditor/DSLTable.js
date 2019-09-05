const ProjectDetail = {};

ProjectDetail.DSLTable = [
    /* row1 */
    [{
        type: "img",
        rowspan: 6
    }, {
        prop: "name",
        colspan: 2,
        label: "title"
    }],
    /* row2 */
    [{
        prop: "address",
        label: "项目地址"
    }, {
        prop: "corpname",
        label: "施工方名称"
    }],
    /* row3 */
    [{
        prop: "totalpeople",
        label: "工人数量"
    }, {
        prop: "totalteam",
        label: "班组数量"
    }],
    /* row4 */
    [{
        prop: "wageflow",
        label: "当月工资流水（万元）"
    }, {
        prop: "attendance",
        label: "当日考勤情况"
    }],
    /* row5 */
    [{
        prop: "prjsize",
        label: "建设规模",
        type: "dict",
        dictType: "PRJSIZE"
    }, {
        prop: "industry",
        label: "所属行业",
        type: "dict",
        dictType: "INDUSTRY"
    }],
    /* row6 */
    [{
        prop: "invest",
        label: "总投资（万元）"
    }, {
        prop: "category",
        label: "项目分类",
        type: "dict",
        dictType: "CATEGORY"
    }],
    /* row7 */
    [{
        prop: "linkphone",
        label: "联系人电话"
    }, {
        prop: "none",
        label: "开工日期"
    }, {
        prop: "completedate",
        label: "竣工日期"
    }],
    /*row8 */
    [{
        prop: "none",
        label: "银行账户名称"
    }, {
        prop: "completedate",
        label: "银行账户"
    }, {
        prop: "prjstatus",
        label: "项目状态",
        type: "dict",
        dictType: "PRJSTATUS"
    }],
    /* row9 */
    [{
        prop: "linkman",
        label: "联系人姓名"
    }, {
        prop: "propertynum",
        label: "建设性质",
        type: "dict",
        dictType: "PROPERTYNUM"
    }, {
        prop: "prjplannum",
        label: "建设工程规划许可证编号"
    }],
    /* row10 */
    [{
        prop: "buildplannum",
        label: "建设用地规划许可证编号"
    }, {
        prop: "buildingarea",
        label: "总面积"
    }, {
        prop: "buildinglength",
        label: "总长度"
    }],
    /* row11 */
    [{
        prop: "nationnum",
        label: "国籍或地区",
        type: "dict",
        dictType: "NATIONNUM"
    }, {
        prop: "isdeposit",
        label: "是否缴纳保证金",
        type: "isOrNot"
    }, {
        prop: "isgovernment",
        label: "是否政府投资项目",
        type: "isOrNot"
    }],
];
/*  */
function TabPane(label, prop, tableHeader, url) {
    this.prop = prop;
    this.label = label;
    this.tableHeader = tableHeader;
    this.tableData = [];
    this.url = url;
    this.paginationInfo = {
        total: 0,
        page: 1,
        limit: 10
    };
}

/* 参建单位 */
var cjdwTableHeader = [{
    prop: "corpname",
    label: " 企业名称",
    /* 如果没有fn 默认使用url */
    url: "",
    type: "goTo",
    fn: function (row, col) {
        console.log("row", row);
        var url = [
            "/statics/modules/Quzhou/sub-page.html?page=PartUnitDetails",
            "&pj0101=", row.pj0101,
            "&cp0201=", row.cp0201
        ];
        window.open(url.join(""), "_blank");
    }
}, {
    prop: "none",
    label: " 企业类型"
}, {
    prop: "none",
    label: " 参建项目"
}, {
    prop: "corpintype",
    label: " 参建企业类型",
    type: "dict",
    dictType: "CORPINTYPE"
}];

/* 班组 */
var bzTableHeader = [{
    prop: "teamname",
    label: "班组名称",
    type: "goTo",
    fn: function (row, col) {
        console.log("row", row);
        var url = [
            "/statics/modules/Quzhou/sub-page.html?page=TeamInfo",
            "&pj0101=", row.pj0101,
            "&tm0101=", row.tm0101
        ];
        window.open(url.join(""), "_blank");
    }
}, {
    prop: "none",
    label: "所属企业"
}, {
    prop: "ps0201",
    label: "班组长（建筑工人主键ID）",
    width: 220
}, {
    prop: "entrytime",
    label: "进场日期"
}, {
    prop: "exittime",
    label: "出场日期"
}, {
    prop: "payrollruletype",
    label: "工资支付方式",
    type: "dict",
    dictType: "PAYROLLRULETYPE"
}, {
    prop: "none",
    label: "工时制度"
}];

/* 工人列表 */

var grlbTableHeader = [{
    prop: "name",
    label: "姓名",
    type: "goTo",
    fn: function (row, col) {
        var url = [
            "/statics/modules/Quzhou/sub-page.html?page=WorkerDetails",
            "&pj0101=", row.pj0101,
            "&ps0101=", row.ps0101,
        ];
        window.open(url.join(""), "_blank");
    }
}, {
    prop: "none",
    label: "身份证号码"
}, {
    prop: "none",
    label: "民族"
}, {
    prop: "none",
    label: "性别"
}, {
    prop: "none",
    label: "手机号码"
}, {
    prop: "entrytime",
    label: "进场时间"
}, {
    prop: "issuecardpicurl",
    type: "showImg",
    label: "查看头像"
}];
/* 考勤 */
var kqTableHeader = [{
    prop: "name",
    label: "姓名",
    type: "goTo",
    fn: function (row, col) {
        var url = [
            "/statics/modules/Quzhou/sub-page.html?page=WorkerDetails",
            "&pj0101=", row.pj0101,
            "&ps0101=", row.ps0101,
            "&activeName=", "workerAttendance"
        ];
        window.open(url.join(""), "_blank");
    }

}, {
    prop: "none",
    label: "身份证号码"
}, {
    prop: "none",
    label: "所属班组"
}, {
    prop: "none",
    label: "所属企业"
}, {
    prop: "checkdate",
    label: "考勤时间"
}, {
    prop: "imageurl",
    type: "showImg",
    label: "查看头像"
}];
/* 月工资发放情况 */
var ygzffTableHeader = [{
    prop: "bankNumber",
    label: "账户",
    type: "goTo",
    fn: function (row, col) {
        debugger;
        /* //todo */
        // var url = [
        //     "/statics/modules/Quzhou/sub-page.html?page=MonthData",
        //     "&pj0101=", row.pj0101,
        //     "&ps0101=", row.ps0101,
        // ];
        // window.open(url.join(""), "_blank");
    }
}, {
    prop: "none",
    label: "交易时间"
}, {
    prop: "lumpSum",
    label: "发放金额"
}, {
    prop: "years",
    label: "发放月"
}];

/* 项目专户流水 */
var xmzhlsTableHeader = [{
    prop: "bankserialno",
    label: "账户",
    type: "goTo",
    fn: function (row, col) {
        debugger;
        /* //todo */
        // var url = [
        //     "/statics/modules/Quzhou/sub-page.html?page=MonthData",
        //     "&pj0101=", row.pj0101,
        //     "&ps0101=", row.ps0101,
        // ];
        // window.open(url.join(""), "_blank");
    }
}, {
    prop: "dealtime",
    label: "交易日期"
}, {
    prop: "none",
    label: "收入金额（元）"
}, {
    prop: "none",
    label: "支出金额（元）"
}, {
    prop: "balance",
    label: "余额"
}, {
    prop: "dealtype",
    label: "交易类型",
    type: "dict",
    dictType: "dealtype"
}];

/* 预警信息 */
var yjxxTableHeader = [{
        prop: "nowwarinfo",
        label: "当前预警信息"
    },
    {
        prop: "warstatus",
        label: "状态",
        type: "dict",
        type: "dict",
        dictType: "WARSTATUS"
    },
    {
        prop: "wartype",
        label: "预警类型",
        type: "dict",
        type: "dict",
        dictType: "WARTYPE"
    }, {
        prop: "none",
        label: "查看详情",
        type: "goTo",
        fn: function (row, col) {
            var url = [
                "/statics/modules/Quzhou/sub-page.html?page=WarningInfoDetails",
                "&pj0101=", row.pj0101,
                "&jg0301=", row.jg0301
            ];
            window.open(url.join(""), "_blank");
        }
    }
];

ProjectDetail.cjdwTableHeader = cjdwTableHeader;
ProjectDetail.bzTableHeader = bzTableHeader;
ProjectDetail.grlbTableHeader = grlbTableHeader;
ProjectDetail.kqTableHeader = kqTableHeader;
ProjectDetail.ygzffTableHeader = ygzffTableHeader;
ProjectDetail.xmzhlsTableHeader = xmzhlsTableHeader;
ProjectDetail.yjxxTableHeader = yjxxTableHeader;

ProjectDetail.DSLTabPane = [
    new TabPane("参建单位", "cjdw", cjdwTableHeader, "/quzhou/home/partUnitInfo"),
    new TabPane("班组", "bz", bzTableHeader, "/quzhou/home/teamInfo"),
    new TabPane("工人列表", "grlb", grlbTableHeader, "/quzhou/home/projectWorkerInfo"),
    new TabPane("考勤", "kq", kqTableHeader, "/quzhou/home/attendanceInfo"),
    new TabPane("月工资发放情况", "ygzff", ygzffTableHeader, "/quzhou/home/monthSalaryInfo"),
    new TabPane("项目专户流水", "xmzhls", xmzhlsTableHeader, "/quzhou/home/wageInfo"),
    new TabPane("预警信息", "yjxx", yjxxTableHeader, "/quzhou/home/warningInfo")
];

export default ProjectDetail;