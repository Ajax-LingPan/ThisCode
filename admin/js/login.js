$(function () {
  // 获取到submit提交按钮
  var $subtn = $('#subtn');
  $subtn.on('click', function () {
    //   发送ajax请求
    $.ajax({
      type: 'post',
      url: 'http://localhost:8080/api/v1/admin/user/login', //提交的地址 主要要加上基地址
      data: $('.login_form').serialize(), //提交表单数据 注意表单每项必须要有name属性
      success: function (info) {
        $('#myModal p').text(info.msg);
        $('#myModal').modal('show');
        
        console.log(info);
        if (info.code === 200) {
          $('#btn').on('click', function () {
            location.href = 'index.html';
            
          });
          window.localStorage.setItem('token',info.token)
        }
      },
    });
    return false;
  });
});
