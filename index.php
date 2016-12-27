<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>登录</title>
    <script src="./js/jquery-1.8.0.min.js" type="text/javascript"></script>
    <script src="./js/knockout-3.3.0.js" type="text/javascript"></script>
    <script src="./js/jquery-tecul-lib.js" type="text/javascript"></script>
    <script src="./js/md5.js" type="text/javascript"></script>
</head>
<body>
    <div class="login-container">
        <label for="name">用户名 <input type="text" id="name" name="name" data-bind="attr: {id: CtrlNameID}, event: {keydown: EventEnter, focus: EventOnInput, blur: EventUnInput}"></label>
        <label for="psw">密码 <input type="password" id="psw" name="psw" data-bind="attr: {id: CtrlPswID}, event: {keydown: EventEnter, focus: EventOnInput, blur: EventUnInput}"></label>
        <button type="button" data-bind="click: EventLogin">登录</button>

        <div class="tips" style="display: none; color: red;" data-bind="visible: AttrView() == 1">
            <p data-bind="text: AttrErr"></p>
        </div>
    </div>

    <script type="text/javascript">
        $('#name').focus();
        //this绑定
        function Module_Login() {
            //定义绑定变量
            this.CtrlNameID = tone.sys.guid();
            this.CtrlPswID = tone.sys.guid();
            this.AttrView = ko.observable(0);
            this.AttrErr = ko.observable();
            this.AttrAutoLogin = ko.observable(false);
            
            this.FuncLogin = function() {
                var user = $('#' + this.CtrlNameID).val();
                var psw = $('#' + this.CtrlPswID).val();
                if($.trim(user) == '') {
                    this.AttrErr("请输入帐号");
                    this.AttrView(1);
                    setTimeout(function() {
                        this.FuncSetError();
                    }.bind(this), 2000);
                    return;
                }
                if($.trim(psw) == '') {
                    this.AttrErr("请输入密码");
                    this.AttrView(1);
                    setTimeout(function() {
                        this.FuncSetError();
                    }.bind(this), 2000);
                    return;
                }

                var params = {name: $.trim(user), psw: hex_md5($.trim(psw))};
                $.ajax({
                    url: 'login.php',
                    type: 'POST',
                    dataType: 'JSON',
                    data: params
                }).done(function(data) {
                    if(data.success && data.data == 1) {
                        window.location.href = 'http://www.baidu.com';
                        return;
                    } else {
                        this.AttrErr(data.error);
                        this.AttrView(1);
                        setTimeout(function(){
                            this.FuncSetError();
                        }.bind(this), 2000);
                    }
                }.bind(this));



            }.bind(this);

            this.FuncSetError = function() {
                this.AttrView(this.AttrView() ? 0 : 1);
            }.bind(this);

            this.EventLogin = function() {
                this.FuncLogin();
            }.bind(this);

            this.EventEnter = function(m, e) {
                if(e.which == 13) {
                    this.FuncLogin();
                    return false;
                }
                return true;
            }.bind(this);

            this.EventOnInput = function(m, e) {
                $(e.target).css('border', '3px solid green');
            }.bind(this);

            this.EventUnInput = function(m, e) {
                $(e.target).css('border', '3px solid black');
            }.bind(this);
        }

        var module_Login = new Module_Login();
        ko.applyBindings(module_Login);

    </script>
</body>
</html>
