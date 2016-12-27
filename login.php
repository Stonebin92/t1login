<?php
/**
 * 假设账户名和密码都是admin
 * 如果用户输入账户和密码正确，返回正确信息。否则返回错误信息。
 * 注意：密码需要使用 MD5 加密验证。
 */
$name = $_POST['name'];
$psw = $_POST['psw'];

// 验证用户名是否为空
if(trim($name) == '') {
    echo json_encode(array('success' => false, 'error' => '用户名不能为空'));
    exit();
}
// 验证密码是否为空
if(trim($psw) == '') {
    echo json_encode(array('success' => false, 'error' => '密码不能为空'));
    exit();
}

// 验证用户名或者密码是否正确
if(trim($name) == 'admin' && trim($psw) == md5('admin')) {
    echo json_encode(array('success' => true, 'data' => 1));
    exit();
} else {
    echo json_encode(array('success' => false, 'error' => '用户名或者密码错误'));
    exit();
}


?>