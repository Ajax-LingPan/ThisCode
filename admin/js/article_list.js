// 文章列表页
// 跳转到页面立马发送ajax请求
$(function () {
    // 所有分类
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                // 89860 61905 00636 1584h
                var htmlStr = template('mmp', res) //注意坑! 模板后面传的id 不要加#号
                $('#selCategory').html(htmlStr)
            }
        }
    })
    $.ajax({
        type: 'get',
        url: BigNew.article_query,
        // data: {
        //     pages: 'totalPage',
        //     page: 6,
        // },
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                var htmlStr = template('hmp', res.data) //因为data是data对象里的数组
                $('#mytbody').html(htmlStr)
                // console.log();
                fn(res)
            }
        }
    });
    // 封装分页器
    var currentPage = 1

    function fn(res) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage, //总页数 这里不能写死.动态的
            visiblePages: 7, //显示页数 
            first: '首页',
            last: '尾页',
            prev: '上一页',
            next: '下一页',
            initiateStartPageClick: false,
            onPageClick: function (event, page) { // 事件 页
                currentPage = page
                // $('#page-content').text('Page ' + page) //oage
                $.ajax({
                    type: 'get',
                    url: BigNew.article_query,
                    data: {
                        key: $('#my_form input[name=key]').val(), // 关键词
                        type: $('#my_form select[name=type]').val(), // 分类
                        state: $('#my_form [name=state]').val(), // 文章状态
                        page: page, // 当前页码
                        perpage: 6 // 默认显示的条数
                    },
                    success: function (res) {
                        // console.log(res);
                        //    重新渲染页面
                        var htmlStr = template('hmp', res.data) //因为data是data对象里的数组
                        $('#mytbody').html(htmlStr)
                    }
                })
            }
        })
    }
    // 筛选功能
    $('#btnSearch').on('click', function (e) { //给筛选按钮设置 type="button"  也能阻止表单默认提交行为
        // console.log(11);
        e.preventDefault()
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
                key: $('#my_form  input[name=key]').val(), // 关键词
                type: $('#my_form  select[name=type]').val(), // 分类
                state: $('#my_form sclect[name=state]').val(), // 文章状态
                page: 1, //第几行显示
                perpage: 6, //显示几行
            },
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    // console.log(res);
                    // 再次渲染筛选出来的数据
                    var htmlStr = template('hmp', res.data)
                    $('#tbody').html(htmlStr)
                    // console.log(22);
                    $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1) //change
                    // console.log(333);
                }
            }

        })
    })
    // 如果筛选的分类中没有数据的话，则应该不显示分页控件，而应该显示无数据，否则，会报错的，因此在

    // article_list.html页面中的分页位置加一个标签，来提示有无数据    3

    // 4. 实现筛选功能
    // 4.1 给form表单注册事件submit事件
    $('#btnSearch').on('click', function () {
        // 发送ajax请求
        // e.preventDefault()
        console.log(111);
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
                key: $('#my_form  input[name=key]').val(), // 关键词
                type: $('#my_form  select[name=type]').val(), // 分类
                state: $('#my_form sclect[name=state]').val(), // 文章状态
                page: 1, //第几行显示
                // perpage: 6, //显示几行
            },
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    var htmlStr = template('hmp', res.data)
                    $('#mytbody').html(htmlStr)
                    // 判断是否有筛选出来的数据
                    // console.log(res);
                    console.log(res.data.totalCount);
                    if (res.data.totalCount == 0) {
                        // $('#pagination-demo').hide().next().show();
                        $('#pagination-demo').hide().next().show()

                        // console.log(1111);
                    } else {
                        // $('#pagination-demo').show().next().hide();
                        $('#pagination-demo').show().next().hide()
                        fn(res)
                        // console.log(222);
                        // $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1) //change

                    }

                }
            }
        })
        // 删除设置
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
                key: $('#my_form  input[name=key]').val(), // 关键词
                type: $('#my_form  select[name=type]').val(), // 分类
                state: $('#my_form sclect[name=state]').val(), // 文章状态
                page: 1, //第几行显示
                // perpage: 6, //显示几行
            },
            success: function (res) {
                console.log(res);
            }

        })
    })

})