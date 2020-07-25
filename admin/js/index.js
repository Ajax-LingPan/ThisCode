//这是一个主页面的相关操作
//登录完成后跳转用户的信息
//实现左侧菜单高亮显示的效果

$(function () {
    // 登录跳转更新用户的信息
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/user/info',
        success: function (res) {
            if (res.code == 200) {
                $('.user_info span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`);
                $('.user_info img').attr('src', res.data.userPic);
                $('.user_center_link img').attr('src', res.data.userPic);
            }
        }
    })
})
$(function () {
    var $divs = $('.menu .level01') //导航栏的div
    var $lis = $('.menu ul') //与div并列的ul
    $divs.on('click', function () {
        //点击当前目标加上高亮效果的类,其他的兄弟移除高亮效果的类
        $(this).addClass('active').siblings('.level01').removeClass('active');
        if ($(this).index() == 1) {
            // 极值判断 给ul一个滑动切换效果
            $lis.stop().slideToggle()
            // ul后面的b标签 旋转切换
            $(this).find('b').toggleClass('rotate0')
        }
    });
    $('.menu ul li').on('click', function () {
        // 给ul里的小li添加并移除类
        $(this).addClass('active').siblings().removeClass('active')
    })

    // ==退出功能
    var $getout = $('.header_bar .logout') //退出按钮
    $getout.on('click', function () {
        // 当点击了该按钮,退出并返回到登陆界面
        location.href = 'login.html';
        // 同时删除本地储存的状态令牌
        localStorage.removeItem('token');
    })

})