const express = require('express');
const app = express();
const path = require('node:path');
const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

// ビューエンジンの設定
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // ビューのディレクトリを設定

// スタティックファイルの提供
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logMiddleware = (req, res, next) => {
    console.log(req.method, req.path);
    next();
};

app.get('/user/:id', logMiddleware, (req, res) => {
    res.status(200).send(req.params.id);
});

app.get('/hoge', (req, res) => {
    res.status(200).send('hogehoge\n');
});

async function main() {
    await client.connect();
    const db = client.db('my-app');

    app.get('/', async (req, res) => {
        try {
            const posts = await db.collection('posts').find().toArray();
            res.render('posts', { posts });
        } catch (e) {
            console.error(e);
            res.status(500).send('Internal Server Error');
        }
    });

    app.get('/posts/new', (req, res) => {
        res.render('new_post');
    });

    app.post('/posts', async (req, res) => {
        const { title, content, author } = req.body;
        if (!title || !content || !author) {
            console.log('Invalid data:', req.body);
            res.status(400).send('Bad Request');
            return;
        }
        await db.collection('posts').insertOne({ title, content, author, createdAt: new Date() });
        res.status(200).send('Created');
    });

    app.get('/posts/:id', async (req, res) => {
        try {
            const post = await db.collection('posts').findOne({ _id: new ObjectId(req.params.id) });
            if (!post) {
                res.status(404).send('Not Found');
                return;
            }
            res.render('post', { post });
        } catch (e) {
            console.error(e);
            res.status(500).send('Internal Server Error');
        }
    });

    // ポート: 3000でサーバーを起動
    app.listen(3000, () => {
        console.log('start listening');
    });
}

main();