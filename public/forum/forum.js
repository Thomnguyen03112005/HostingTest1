const postsContainer = document.getElementById('posts');
const submitPostButton = document.getElementById('submitPost');

// Lấy danh sách bài viết từ server
function fetchPosts() {
    fetch('/api/posts')
        .then(response => response.json())
        .then(data => {
            postsContainer.innerHTML = ''; // Xóa nội dung cũ
            data.Forum.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post');
                postDiv.innerHTML = `
                    <strong>${post.Title}</strong> <em>${new Date(post.time).toLocaleString()}</em>
                    <p>${post.Noidung}</p>
                `;
                postsContainer.appendChild(postDiv);
            });
        });
}

// Đăng bài mới
submitPostButton.onclick = function() {
    const username = document.getElementById('username').value;
    const content = document.getElementById('postContent').value;

    const newPost = {
        username: username,
        content: content
    };

    fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        document.getElementById('username').value = '';
        document.getElementById('postContent').value = '';
        fetchPosts(); // Cập nhật danh sách bài viết
    })
    .catch(error => alert(error));
};

// Hiển thị bài viết khi trang được tải
window.onload = fetchPosts;
