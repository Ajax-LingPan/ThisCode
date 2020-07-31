$(function () {
    // 发送请求
    // @1 请求分类
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            // console.log(res);
            var htmlStr = template('text_tmp', res);
            $('#select_tmp').html(htmlStr);
            // console.log(htmlStr);
        },
    });
    //    获取图片
    $('#inputCover').on('change', function () {
        // console.log(111);
        // 先获取到选中图片的属性
        // var file = this.files[0]
        // 转换为图片地址
        // var url = URL.createObjectURL(file)
        // 给img 赋值
        // $('#img_diy').attr('src', url)
        // 简化写法
        $('#img_diy').attr('src', URL.createObjectURL(this.files[0]));
    });
    // 开启日期插件
    jeDate('#testico', {
        zIndex: 99999,
        minDate: '1998-07-04',
        format: 'YYYY-MM-DD',
        isTime: false,
    });
    // 开启富文本插件
    var E = window.wangEditor;
    var editor = new E('#editor');
    editor.create();

    //   发布文章
    $('#form button').on('click', function () {
        console.log(1);
        //阻止默认事件
        //preventDefault()[dom标准写法(ie678不兼容)]
        //ie678用returnValue
        //或者利用return false也能阻止默认行为,没有兼容问题(只限传统注册方式)
        // e.preventDefault();
        var data = new FormData($('#form')[0]);
        // 将富文本编辑器中的数据添加到里面 富文本编辑器是一个div，因此要单独的来获取一下
        data.append('content', editor.txt.html()) //把富文本的内容追加到表单中 (属性,+id.方法)txt方法是插件内置的
        // console.log(data);
        // 判断 是否发布或者草稿
        // if ($(e.target).hasClass('btn-release')) {
        //     console.log(11);
        // } else {
        //     console.log(222);
        // }
        if ($(this).hasClass('btn-release')) {
            // 有的话就是发布
            data.append('state', '已发布')
            console.log('发布');
        } else {
            // 没有就是草稿
            data.append('state', '草稿')
            console.log('草稿');

        }
        console.log(data);
        $.ajax({
            type: 'post',
            url: BigNew.article_publish,
            data: data,
            contentType: false, // 不要进行其它编码 不需要额外编码就是二进制
            processData: false, // 不要转换成字符串
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    // window.history.back()
                    window.location.href = './article_list.html'
                    console.log(111);
                }
            },
            error: function (res) {
                if (res.code == 204) {
                    alert(res.msg)
                }
            }

        })
    });
});