// Khởi tạo mảng dữ liệu
let tasks = [];

// Truy vấn các phần tử DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const completedCountEl = document.getElementById('completedCount');
const totalCountEl = document.getElementById('totalCount');

// CHỨC NĂNG 1: THÊM CÔNG VIỆC
function addTask() {
    const text = taskInput.value.trim();
    if (text === "") {
        alert("Vui lòng nhập tên công việc!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        isEditing: false
    };

    tasks.push(newTask);
    taskInput.value = "";
    taskInput.focus();
    render();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// CHỨC NĂNG 3, 4, 5: XỬ LÝ SỰ KIỆN TRÊN ITEM (Sửa, Xóa, Check)
function render() {
    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <div class="empty-state-text">Chưa có công việc nào. Hãy thêm công việc mới!</div>
            </div>`;
    } else {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            // Chế độ chỉnh sửa (Chức năng 4)
            if (task.isEditing) {
                taskItem.innerHTML = `
                    <input type="text" class="edit-input" value="${task.text}" id="edit-${task.id}">
                    <div class="task-actions">
                        <button class="btn-save" onclick="saveEdit(${task.id})">💾 Lưu</button>
                        <button class="btn-cancel" onclick="toggleEdit(${task.id})">❌ Hủy</button>
                    </div>
                `;
                // Auto focus & Handle Enter/Esc
                setTimeout(() => {
                    const input = document.getElementById(`edit-${task.id}`);
                    input.focus();
                    input.onkeydown = (e) => {
                        if (e.key === 'Enter') saveEdit(task.id);
                        if (e.key === 'Escape') toggleEdit(task.id);
                    };
                }, 0);
            } else {
                // Chế độ hiển thị bình thường (Chức năng 2)
                taskItem.innerHTML = `
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                        onchange="toggleComplete(${task.id})">
                    <span class="task-text">${task.text}</span>
                    <div class="task-actions">
                        <button class="btn-edit" onclick="toggleEdit(${task.id})">✏️ Sửa</button>
                        <button class="btn-delete" onclick="deleteTask(${task.id})">🗑️ Xóa</button>
                    </div>
                `;
            }
            taskList.appendChild(taskItem);
        });
    }
    updateFooter();
}

// Chức năng 3: Đánh dấu hoàn thành
window.toggleComplete = (id) => {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    render();
};

// Chức năng 4: Logic Sửa
window.toggleEdit = (id) => {
    tasks = tasks.map(t => t.id === id ? { ...t, isEditing: !t.isEditing } : t);
    render();
};

window.saveEdit = (id) => {
    const input = document.getElementById(`edit-${id}`);
    const newText = input.value.trim();
    if (newText === "") {
        alert("Tên công việc không được để trống!");
        return;
    }
    tasks = tasks.map(t => t.id === id ? { ...t, text: newText, isEditing: false } : t);
    render();
};

// Chức năng 5: Xóa công việc
window.deleteTask = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
        tasks = tasks.filter(t => t.id !== id);
        render();
    }
};

// CHỨC NĂNG 6: CẬP NHẬT FOOTER
function updateFooter() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    completedCountEl.innerText = completed;
    totalCountEl.innerText = total;

    // Badge "Hoàn thành tất cả"
    const footer = document.querySelector('.footer');
    let badge = document.getElementById('all-done-badge');
    
    if (total > 0 && completed === total) {
        if (!badge) {
            badge = document.createElement('div');
            badge.id = 'all-done-badge';
            badge.innerHTML = '✅ Hoàn thành tất cả';
            footer.appendChild(badge);
        }
    } else if (badge) {
        badge.remove();
    }
}

// Khởi tạo lần đầu
render();