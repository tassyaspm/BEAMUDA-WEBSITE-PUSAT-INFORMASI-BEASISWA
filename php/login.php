<?php
include 'koneksi.php';

$email    = $_POST['email'];
$password = $_POST['password'];

$query = mysqli_query($conn, "SELECT * FROM users WHERE email='$email'");
$user  = mysqli_fetch_assoc($query);

if ($user && password_verify($password, $user['password'])) {
    echo json_encode(['status' => 'sukses', 'nama' => $user['nama'], 'id' => $user['id']]);
} else {
    echo json_encode(['status' => 'error', 'pesan' => 'Email atau password salah!']);
}

?>