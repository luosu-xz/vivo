<?php
    $id = $_GET['id'];
    // 连接数据库
    mysql_connect('localhost', "root", "root");
    // 选择数据库
    mysql_select_db("gz2006");
    // 定义sql语句
    $sql = "SELECT * FROM goods WHERE goods_id = '$id'";
    // 执行
    $result = mysql_query($sql);
    $data = mysql_fetch_array($result);

    echo json_encode(array("error" => 0, "data" => $data));
   
?>