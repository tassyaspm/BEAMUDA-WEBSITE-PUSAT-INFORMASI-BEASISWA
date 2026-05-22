<?php
include 'koneksi.php';
$user_id = $_GET['user_id'];
$query = mysqli_query($conn, "SELECT scholarship_id FROM bookmarks WHERE user_id='$user_id'");
$result = [];
while ($row = mysqli_fetch_assoc($query)) {
    $result[] = (int)$row['scholarship_id'];
}
echo json_encode($result);
?>