$(function () {
    //一跳转就发送ajax请求
    $.ajax({
        type: 'get',
        url: BigNew.user_detail,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                // 将请求回来的当前登陆用户的信息显示在用户页面上
                // $('#form .username').val(res.data.username)
                // $('#form .nickname').val(res.data.nickname)
                // $('#form .email').val(res.data.email)
                // $('#form .password').val(res.data.passwor)
                $('#form .user_pic').attr('src', res.data.userPic) //图片的格式不太一样 所以不能参加对象遍历 要单独写出


                // 简化写法 可以遍历这个对象
                for (var key in res.data) {
                    $(`#form .${key}`).val(res.data[key]) // 遍历对象!等价于form中的每一项 点上  数据对象中的每一项
                }

            }
        }
    });

    // 修改上传头像
    $('#exampleInputFile').on('change', function () {
        // console.dir(this.files[0])
        console.dir(this.files[0]); //files 是一个伪数组,用dir方法打印可以看到
        var file = this.files[0] //拿到伪数组中的第一张图片
        var url = URL.createObjectURL(file) //拿到图片的地址   URL.createObjectURL 是
        console.log(url); //打印出来是修改图片的地址
        $('.user_pic').attr('src', url)
    });
    // 更新新的用户数据 /再一次发送ajax 请求
    //给修改按钮注册事件.随后发送ajax
    $('#form').on('submit', function (e) {
        e.preventDefault(); //主体form表单默认提交的行为

        // console.log(111);
        var data = new FormData(this) // 使用大对象二进制提交  是个Dow对象
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            data: data,
            contentType: false, // 不要进行其它编码 不需要额外编码就是二进制
            processData: false,
            success: function (res) {
                console.log(res);
                // if (res.code == 200) {
                //     // 刷新数据的第一二种方式
                //     parent.window.location.reload() // 会让页面刷新
                //     // window.parent.window.location.reload();  会让整个页面重新刷新
                // }

                // 刷新页面的第三种方式(不会刷新整个页面) 
                // 3.1 重新发送ajax 请求
                if (res.code == 200) {
                    $.ajax({
                        type: 'get',
                        url: BigNew.user_info,
                        data: data,
                        contentType: false, // 不要进行其它编码 不需要额外编码就是二进制
                        processData: false,
                        success: function (res) {
                            parent.$('.user_info span ').text(res.data.nickname);
                            parent.$('.user_info img').attr('src', res.data.userPic);
                            parent.$('.user_center_link img').attr('src', res.data.userPic);
                            // alert('修改成功')
                        }
                    })

                }
            }
        })
    })



})