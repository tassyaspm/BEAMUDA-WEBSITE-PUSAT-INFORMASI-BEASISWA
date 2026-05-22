<?php
include 'koneksi.php';

$nama     = $_POST['nama'];
$email    = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$cek = mysqli_query($conn, "SELECT * FROM users WHERE email='$email'");
if (mysqli_num_rows($cek) > 0) {
    echo json_encode(['status' => 'error', 'pesan' => 'Email sudah terdaftar!']);
} else {
    $query = "INSERT INTO users (nama, email, password) VALUES ('$nama', '$email', '$password')";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['status' => 'sukses', 'pesan' => 'Pendaftaran berhasil!']);
    } else {
        echo json_encode(['status' => 'error', 'pesan' => 'Gagal mendaftar!']);
    }
}
?>