let tenSach = prompt("Nhập tên sách:");
let namXuatBan = Number(prompt("Nhập năm xuất bản của sách:"));
let namHienTai = Number(prompt("Nhập năm hiện tại:"));

let tuoiSach = namHienTai - namXuatBan;

console.log("Sách: " + tenSach);
console.log("Năm xuất bản: " + namXuatBan);
console.log("Tuổi của sách: " + tuoiSach + " năm");
