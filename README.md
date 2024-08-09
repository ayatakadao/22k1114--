このアプリケーションは、Node.js、Express、MongoDBを使用して構築したブログアプリケーションです。ユーザーは投稿を作成し、表示し、一覧で見ることができます。

## 機能

- **新規投稿の作成**: タイトル、内容、投稿者名を入力して新しいブログ投稿を作成できます。
- **投稿の表示**: 個別の投稿の詳細を表示できます。ピンク色に変更したタイトルをクリックすると表示されます。
- **投稿一覧の表示**: ホームページで全ての投稿の一覧を表示し、各投稿の詳細ページへリンクしています。
- **デザイン**: CSSデザインを用いて、スタイルの変更を行いました。タイトルをピンク色に変更、投稿者をレインボーに変更などを行いました。他にも、新規投稿画面のカラーやスタイルを変更し見やすくしました。

## 必要条件

- Node.js 
- MongoDB :
例えば、MongoDQで以下を実行できる。
投稿した内容を表示する
my-app> db.posts.find().pretty()
[
  {
    _id: ObjectId('66b5b0fc2cfb308a139a232f'),
    title: 'ninnniku',
    content: 'ニンニク',
    author: 'ninnnikuman',
    createdAt: ISODate('2024-08-09T06:02:36.919Z')
  },
  {
    _id: ObjectId('66b5bcca4e22ec594f124962'),
    title: 'konn',
    content: 'こんばんわ',
    author: 'あい',
    createdAt: ISODate('2024-08-09T06:52:58.784Z')
  },
  {
    _id: ObjectId('66b5bf3d5395e771f9fed45f'),
    title: '集中講義',
    content: 'node.jsなど',
    author: 'SakamotoAyaka',
    createdAt: ISODate('2024-08-09T07:03:25.915Z')
  }
]

投稿を消去する
my-app> db.posts.deleteOne({ _id: ObjectId('66b5c79171497ffbd80d2443') });
{ acknowledged: true, deletedCount: 1 }
my-app> db.posts.find().pretty()

## 表示について
1.ホームページ(投稿一覧)
URL: http://localhost:3000/
動作: ホームページにアクセスすると、サーバーはindex.jsファイルのルートハンドラを実行します。
そして、views/posts.ejsが実行されます。
2.新規投稿ぺージ
URL: http://localhost:3000/posts/new
動作: 「新規投稿」ページにアクセスすると、サーバーはルートハンドラを実行します。
そして、views/new_post.ejsが実行されます。
3.新規投稿の送信
アクション:新規投稿フォームで「投稿する」ボタンをクリック
動作: フォームデータがサーバーにPOSTリクエストとして送信され、ルートハンドラが実行されます。
新しい投稿がデータベースに保存され、クライアントには「投稿が成功しました」と表示されるアラートが出ます。その後、投稿一覧ページ (http://localhost:3000/) にリダイレクトされます。
4.個別投稿の表示
URL: http://localhost:3000/posts/:id （ここで:idは投稿のID）
動作: 特定の投稿にアクセスすると、サーバーはルートハンドラを実行します。
そして、views/post.ejsが実行されます。