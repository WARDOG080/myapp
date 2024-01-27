var express = require('express');
var router = express.Router();
const cors = require('cors');// corsミドルウェアを追加
require('dotenv').config();

// 接続情報を設定
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const flatted = require('flatted');

// corsミドルウェアを使用
router.use(cors());

router.get('/', async (req, res) => {
// データベース、コレクションを指定
const database = client.db('notes');
const notes = database.collection('notes');

// 全てのドキュメントを取得
const note = await notes.find({}).toArray();
const simplifiedNoteData = note.map(note => ({ _id: note._id, name: note.name, mail: note.mail, tel: note.tel }));
res.json(simplifiedNoteData);
})

module.exports = router;
