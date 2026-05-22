<?php
include 'koneksi.php';
$user_id = $_POST['user_id'];
$scholarship_id = $_POST['scholarship_id'];
$action = $_POST['action'];

if ($action === 'add') {
    $query = "INSERT INTO bookmarks (user_id, scholarship_id) VALUES ('$user_id', '$scholarship_id')";
    mysqli_query($conn, $query);
    echo json_encode(['status' => 'sukses']);
} else {
    $query = "DELETE FROM bookmarks WHERE user_id='$user_id' AND scholarship_id='$scholarship_id'";
    mysqli_query($conn, $query);
    echo json_encode(['status' => 'sukses']);
}
?>