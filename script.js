// script.js
const API_URL = '/api'; 

// 获取游戏列表
async function getGames() {
    try {
        const res = await fetch(`${API_URL}/games`);
        if (!res.ok) throw new Error('Network response was not ok');
        return await res.json();
    } catch (error) {
        console.error('获取游戏失败:', error);
        return [];
    }
}

// 添加游戏
async function addGame(data) {
    const res = await fetch(`${API_URL}/games`, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data) 
    });
    return await res.json();
}

// 更新游戏
async function updateGame(id, data) {
    const res = await fetch(`${API_URL}/games/${id}`, { 
        method: 'PUT', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data) 
    });
    return await res.json();
}

// 删除游戏
async function deleteGame(id) {
    const res = await fetch(`${API_URL}/games/${id}`, { method: 'DELETE' });
    return await res.json();
}

// 检查登录状态
function checkLogin() { 
    return sessionStorage.getItem('galgame_admin_session') === 'true'; 
}

// 【修复重点】登录函数
async function login(username, password) {
    try {
        const res = await fetch(`${API_URL}/login`, { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ username: username, password: password }) 
        });
        
        const data = await res.json();
        
        if (data.success) {
            // 只有成功后才写入 Session
            sessionStorage.setItem('galgame_admin_session', 'true');
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('登录请求出错:', error);
        return false;
    }
}

// 退出登录
function logout() { 
    sessionStorage.removeItem('galgame_admin_session'); 
    window.location.href = 'login.html'; 
}
