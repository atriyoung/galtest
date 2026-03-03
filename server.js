const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(__dirname));

if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([
        { id: 1, title: "示例游戏", image: "https://via.placeholder.com/300x200?text=Demo", tags: ["纯爱"], downloadUrl: "#" }
    ], null, 2));
}

app.get('/api/games', (req, res) => res.json(JSON.parse(fs.readFileSync(DATA_FILE))));
app.post('/api/games', (req, res) => {
    const games = JSON.parse(fs.readFileSync(DATA_FILE));
    const newGame = { ...req.body, id: Date.now() };
    games.push(newGame);
    fs.writeFileSync(DATA_FILE, JSON.stringify(games, null, 2));
    res.json({ success: true });
});
app.put('/api/games/:id', (req, res) => {
    const games = JSON.parse(fs.readFileSync(DATA_FILE));
    const idx = games.findIndex(g => g.id == req.params.id);
    if (idx !== -1) {
        games[idx] = { ...games[idx], ...req.body };
        fs.writeFileSync(DATA_FILE, JSON.stringify(games, null, 2));
        res.json({ success: true });
    } else res.status(404).json({ success: false });
});
app.delete('/api/games/:id', (req, res) => {
    let games = JSON.parse(fs.readFileSync(DATA_FILE));
    const len = games.length;
    games = games.filter(g => g.id != req.params.id);
    if (games.length < len) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(games, null, 2));
        res.json({ success: true });
    } else res.status(404).json({ success: false });
});
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '123456') res.json({ success: true });
    else res.status(401).json({ success: false });
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));