let employees = [];
let nextId = 1;
let isEditMode = false;
let editId = null;

const form = document.getElementById('employee-form');
const tableBody = document.getElementById('employee-table-body');
const totalCountLabel = document.getElementById('total-count');

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
};


const renderTable = () => {
    tableBody.innerHTML = '';
    employees.forEach(emp => {
        const row = `<tr>
            <td class="col-id">${emp.id}</td>
            <td>${emp.fullname}</td>
            <td>${formatDate(emp.dob)}</td>
            <td>${emp.email}</td>
            <td>${emp.address}</td>
            <td>
                <button class="btn-edit" onclick="prepareEdit(${emp.id})">Sửa</button>
                <button class="btn-delete" onclick="deleteEmployee(${emp.id}, '${emp.fullname}')">Xóa</button>
            </td>
        </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
    totalCountLabel.textContent = employees.length;
};


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullname = document.getElementById('fullname').value.trim();
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!fullname || !dob || !email || !address) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if (isEditMode) {
        const index = employees.findIndex(e => e.id === editId);
        employees[index] = { ...employees[index], fullname, dob, email, address };
    } else {
        employees.push({ id: nextId++, fullname, dob, email, address });
    }

    resetForm();
    renderTable(); 
});

window.prepareEdit = (id) => {
    const emp = employees.find(e => e.id === id);
    isEditMode = true;
    editId = id;
    document.getElementById('fullname').value = emp.fullname;
    document.getElementById('dob').value = emp.dob;
    document.getElementById('email').value = emp.email;
    document.getElementById('address').value = emp.address;
    
    document.getElementById('form-title').textContent = "Chỉnh Sửa Nhân Viên";
    document.getElementById('btn-submit').textContent = "💾 Cập Nhật";
    document.getElementById('btn-cancel').style.display = "inline-block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.deleteEmployee = (id, name) => {
    if (confirm(`Bạn có chắc chắn muốn xóa nhân viên ${name}?`)) {
        employees = employees.filter(emp => emp.id !== id);
        if (isEditMode && editId === id) resetForm();
        renderTable();
    }
};

const resetForm = () => {
    form.reset();
    isEditMode = false;
    document.getElementById('form-title').textContent = "Thêm Nhân Viên Mới";
    document.getElementById('btn-submit').textContent = "➕ Thêm Nhân Viên";
    document.getElementById('btn-cancel').style.display = "none";
};

document.getElementById('btn-cancel').addEventListener('click', resetForm);
renderTable();