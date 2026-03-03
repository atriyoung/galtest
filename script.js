// script.js

// --- 配置区域 ---
const CONFIG = {
    adminUser: "admin",      // 自定义管理员账号
    adminPass: "ysy64356205",     // 自定义管理员密码
    storageKey: "galgame_data",
    sessionKey: "galgame_admin_session"
};

// --- 数据管理 ---

// 初始化默认数据（如果本地没有数据）
function initData() {
    if (!localStorage.getItem(CONFIG.storageKey)) {
        const defaultData = [
            {
                id: 1,
                title: "星光咖啡馆与死神之蝶",
                image: "https://picsum.photos/seed/game1/300/200",
                tags: ["纯爱"],
                downloadUrl: "https://example.com/download1"
            },
            {
                id: 2,
                title: "魔女的夜宴",
                image: "https://picsum.photos/seed/game2/300/200",
                tags: ["校园", "纯爱"],
                downloadUrl: "https://example.com/download2"
            },
            {
                id: 3,
                title: "RIDDLE JOKER",
                image: "https://picsum.photos/seed/game3/300/200",
                tags: ["校园", "异能"],
                downloadUrl: "https://example.com/download3"
            }
        ];
        saveData(defaultData);
    }
}

// 获取所有游戏数据
function getGames() {
    const data = localStorage.getItem(CONFIG.storageKey);
    return data ? JSON.parse(data) : [];
}

// 保存游戏数据
function saveData(games) {
    try {
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(games));
        return true;
    } catch (e) {
        alert("存储失败！可能是图片太大导致 LocalStorage 已满。建议压缩图片或使用后端存储。");
        return false;
    }
}

// 添加游戏
function addGame(game) {
    const games = getGames();
    game.id = Date.now();
    games.push(game);
    saveData(games);
}

// 更新游戏
function updateGame(id, updatedGame) {
    const games = getGames();
    const index = games.findIndex(g => g.id === id);
    if (index !== -1) {
        games[index] = { ...games[index], ...updatedGame };
        saveData(games);
        return true;
    }
    return false;
}

// 删除游戏
function deleteGame(id) {
    let games = getGames();
    games = games.filter(g => g.id !== id);
    saveData(games);
}

// --- 登录认证 ---

function checkLogin() {
    return sessionStorage.getItem(CONFIG.sessionKey) === "true";
}

function login(username, password) {
    if (username === CONFIG.adminUser && password === CONFIG.adminPass) {
        sessionStorage.setItem(CONFIG.sessionKey, "true");
        return true;
    }
    return false;
}

function logout() {
    sessionStorage.removeItem(CONFIG.sessionKey);
    window.location.href = "login.html";
}

// 初始化数据
initData();