let tenSach = prompt("Nhập tên sách:");
let soThuTu = prompt("Nhập số thứ tự của sách:");

let tenSachChuanHoa = tenSach.trim();

tenSachChuanHoa = tenSachChuanHoa.toUpperCase();

let maSach = "LIB- " + tenSachChuanHoa + " - " + soThuTu;

console.log("Tên sách gốc: " + tenSach);
console.log("Mã sách sau chuẩn hóa: " + maSach);
