window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault(); // デフォルトのフォーム送信を防ぐ

        const title = document.querySelector('#title').value;
        const content = document.querySelector('#content').value;
        const author = document.querySelector('#author').value;

        fetch('/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, author })
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'Created') {
                alert('投稿が成功しました');
                window.location.href = '/';
            } else {
                alert('投稿に失敗しました');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});