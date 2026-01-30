
let rawBookName = prompt("Nhập tên sách:");
let rawAuthor = prompt("Nhập tên tác giả:");
let publishYear = parseInt(prompt("Nhập năm xuất bản:"));
let price = parseFloat(prompt("Nhập giá tiền một cuốn:"));
let quantity = parseInt(prompt("Nhập số lượng nhập kho:"));

let bookName = rawBookName.trim().toUpperCase();
let author = rawAuthor.toUpperCase();

let randomID = Math.floor(Math.random() * 1000) + 1;
let authorPrefix = author.substring(0, 3).replace(/\s/g, "X"); 
let bookID = `${authorPrefix}${publishYear}-${randomID}`;

const CURRENT_YEAR = 2026;
let bookAge = CURRENT_YEAR - publishYear;
let totalValue = price * quantity;

let shelfNumber = Math.floor(Math.random() * 10) + 1;

console.log(`--- PHIẾU NHẬP KHO ---`);
console.log(`Mã sách: ${bookID}`);
console.log(`Tên sách: ${bookName}`);
console.log(`Tác giả: ${author}`);
console.log(`Năm xuất bản: ${publishYear}`);
console.log(`Tuổi sách: ${bookAge} năm`);
console.log(`Tổng giá trị: ${totalValue.toLocaleString('vi-VN')} VNĐ`);
console.log(`Ngăn kệ gợi ý: Kệ số ${shelfNumber}`);