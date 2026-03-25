// ====== KHAI BÁO ======
let songs = JSON.parse(localStorage.getItem("songs")) || [];
let isEdit = false;
let editId = null;

// ====== LẤY ELEMENT ======
const titleInput = document.getElementById("title");
const artistInput = document.getElementById("artist");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const songTable = document.getElementById("songTable");
const searchInput = document.getElementById("search");

// ====== RENDER ======
function render(data = songs) {
    songTable.innerHTML = "";

    data.forEach(song => {
        songTable.innerHTML += `
            <tr>
                <td>${song.id}</td>
                <td>${song.title}</td>
                <td>${song.artist}</td>
                <td>
                    <button onclick="editSong(${song.id})">Sửa</button>
                    <button onclick="deleteSong(${song.id})">Xóa</button>
                </td>
            </tr>
        `;
    });
}

// ====== LƯU LOCAL ======
function saveToLocal() {
    localStorage.setItem("songs", JSON.stringify(songs));
}

// ====== RESET FORM ======
function resetForm() {
    titleInput.value = "";
    artistInput.value = "";
    isEdit = false;
    editId = null;
    formTitle.innerText = "🎵 Thêm bài hát";
    submitBtn.innerText = "Thêm";
}

// ====== THÊM / CẬP NHẬT ======
function handleSubmit() {
    let title = titleInput.value.trim();
    let artist = artistInput.value.trim();

    // VALIDATION
    if (!title || !artist) {
        alert("Không được để trống!");
        return;
    }

    if (isEdit) {
        // ====== CẬP NHẬT ======
        let index = songs.findIndex(s => s.id === editId);
        songs[index].title = title;
        songs[index].artist = artist;
    } else {
        // ====== THÊM ======
        let newSong = {
            id: songs.length ? songs[songs.length - 1].id + 1 : 1,
            title: title,
            artist: artist
        };
        songs.push(newSong);
    }

    saveToLocal();
    render();
    resetForm();
}

// ====== SỬA ======
function editSong(id) {
    let song = songs.find(s => s.id === id);

    titleInput.value = song.title;
    artistInput.value = song.artist;

    isEdit = true;
    editId = id;

    formTitle.innerText = "🎵 Sửa bài hát";
    submitBtn.innerText = "Cập nhật";
}

// ====== XÓA ======
function deleteSong(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        songs = songs.filter(s => s.id !== id);
        saveToLocal();
        render();
    }
}

// ====== TÌM KIẾM ======
function searchSong() {
    let keyword = searchInput.value.toLowerCase();

    let filtered = songs.filter(song =>
        song.title.toLowerCase().includes(keyword)
    );

    render(filtered);
}

// ====== LOAD ======
render();