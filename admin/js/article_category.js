//第一步直接发送ajax请求,因为页面一打开就需要渲染出数据

$(function () {
    // 发送ajax请求
    aj();
    // 把初始ajax的请求封装起来并调用
    function aj() {
        $.ajax({
            type: 'get',
            url: BigNew.category_list,
            success: function (info) {

                if (info.code == 200) {
                    // 声明一个变量去接受模板数据(模板id,函数的形参)
                    var htmlStr = template('tmp', info);
                    // 讲模板的数据添加到表单中
                    $('tbody').html(htmlStr)
                }
            }
        })
    }
    // 给按钮注册显隐事件
    // var $h4 = $('.modal-title') //获取新增按钮
    // $h4.on('click', function () {
    //     // $('#myMldal').show()
    //     $('#myModal').modal(options)
    // })

    //  模态框显示操作
    $('#myModal').on('shown.bs.modal', function () {
        $('#myModal h4').text('新增分类信息')
    })

    //  给表单确认按钮添加新增功能并重新渲染页面
    $('.btn_sure').on('click', function () {
        var id = $('#exampleInputEmail1').val();
        console.log(id);
        $.ajax({
            type: 'post',
            url: id ? BigNew.category_edit : BigNew.category_add,
            data: $('#myForm').serialize(), //.serialize()
            success: function (res) {
                console.log(res);
                if (res.code == 201 || res.code == 200) {

                    $('#myModal').modal('hide')
                    aj();
                }
            }
        })
    })

    //删除分类
    $('#delModal').on('shown.bs.modal', function (e) {
        // console.log(111);
        console.log(e.relatedTarget); //e.relatedTarget  事件源
        //  2.当单击删除按钮的时候，要弹出来模态框，询问一下用户是否要删除此分类，所以需要给删除按钮添加两个data-开头的属性 3
        window.e_id = $(e.relatedTarget).data('id') //想要成功获取到事件源的id  需要要在事件源中添加自定义属性 ==>(data-id)
        // console.log(window.e_id);
    })
    // .给模态框中的确定按钮注册事件，并发送ajax请求
    $('#shanchu').on('click', function () {
        $.ajax({
            type: 'post',
            url: BigNew.category_delete,
            data: {
                id: window.e_id //删除的数据就是对应上面获取来的id
            },
            success: function (res) {
                console.log(res);
                if (res.code == 204) { //极值判断响应码
                    $('#delModal').modal('hide'); //让删除模态框隐藏
                    aj() //重新渲染数据

                }
            }
        })
    })
    //   编辑分类/数据回显
    $('#myModal').on('shown.bs.modal', function (e) {
        if (e.relatedTarget.id == 'xinzengfenlei') {
            $('#myModal h4').text('新增分类信息')
            $('#myForm')[0].reset()
        } else {
            $('#myModal h4').text('编辑分类信息')
            // 4.编辑分类之数据回显
            // 4.1 发送ajax请求获取数据
            $.ajax({
                type: 'get',
                url: BigNew.category_search,
                data: {
                    id: $(e.relatedTarget).data('id')
                },
                success: function (res) {
                    console.log(res);
                    if (res.code == 200) {
                        // 数据回显
                        $('#myForm input[name=name]').val(res.data[0].name)
                        $('#myForm input[name=id]').val(res.data[0].id)
                        $('#myForm input[name=slug]').val(res.data[0].slug)
                    }
                }
            })

        }
    })
})