const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 提供静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 模拟体测数据
let projects = {
    'male-1000m': {
        name: '男生1000米跑',
        unit: '分:秒',
        students: [
            { id: '2024001', name: '张三', class: '计算机2101', score: '3:25', rank: 1, previousRank: 1 },
            { id: '2024002', name: '李四', class: '软件工程2102', score: '3:28', rank: 2, previousRank: 2 },
            { id: '2024003', name: '王五', class: '物联网2101', score: '3:30', rank: 3, previousRank: 3 },
            { id: '2024004', name: '赵六', class: '计算机2101', score: '3:32', rank: 4, previousRank: 5 },
            { id: '2024005', name: '钱七', class: '软件工程2102', score: '3:35', rank: 5, previousRank: 4 },
            { id: '2024006', name: '孙八', class: '物联网2101', score: '3:38', rank: 6, previousRank: 6 },
            { id: '2024007', name: '周九', class: '计算机2101', score: '3:40', rank: 7, previousRank: 9 },
            { id: '2024008', name: '吴十', class: '软件工程2102', score: '3:42', rank: 8, previousRank: 7 },
            { id: '2024009', name: '郑十一', class: '物联网2101', score: '3:45', rank: 9, previousRank: 8 },
            { id: '2024010', name: '王十二', class: '计算机2101', score: '3:48', rank: 10, previousRank: 10 }
        ]
    },
    'female-800m': {
        name: '女生800米跑',
        unit: '分:秒',
        students: [
            { id: '2024101', name: '刘小芳', class: '英语2101', score: '2:58', rank: 1, previousRank: 1 },
            { id: '2024102', name: '陈小雨', class: '中文2102', score: '3:02', rank: 2, previousRank: 2 },
            { id: '2024103', name: '杨小梅', class: '历史2101', score: '3:05', rank: 3, previousRank: 3 },
            { id: '2024104', name: '黄小丽', class: '英语2101', score: '3:08', rank: 4, previousRank: 5 },
            { id: '2024105', name: '赵小雅', class: '中文2102', score: '3:10', rank: 5, previousRank: 4 },
            { id: '2024106', name: '周小婷', class: '历史2101', score: '3:12', rank: 6, previousRank: 6 },
            { id: '2024107', name: '吴小倩', class: '英语2101', score: '3:15', rank: 7, previousRank: 7 },
            { id: '2024108', name: '郑小慧', class: '中文2102', score: '3:18', rank: 8, previousRank: 8 },
            { id: '2024109', name: '王小琳', class: '历史2101', score: '3:20', rank: 9, previousRank: 9 },
            { id: '2024110', name: '孙小璐', class: '英语2101', score: '3:22', rank: 10, previousRank: 10 }
        ]
    },
    'standing-long-jump': {
        name: '立定跳远',
        unit: '米',
        students: [
            { id: '2024201', name: '陈大力', class: '体育2101', score: '2.85', rank: 1, previousRank: 1 },
            { id: '2024202', name: '王跃进', class: '体育2102', score: '2.80', rank: 2, previousRank: 2 },
            { id: '2024203', name: '李飞跃', class: '体育2101', score: '2.75', rank: 3, previousRank: 3 },
            { id: '2024204', name: '赵跳远', class: '体育2102', score: '2.70', rank: 4, previousRank: 4 },
            { id: '2024205', name: '孙腾空', class: '体育2101', score: '2.65', rank: 5, previousRank: 5 },
            { id: '2024206', name: '周远航', class: '体育2102', score: '2.60', rank: 6, previousRank: 6 },
            { id: '2024207', name: '吴飞跃', class: '体育2101', score: '2.55', rank: 7, previousRank: 7 },
            { id: '2024208', name: '郑跳高', class: '体育2102', score: '2.50', rank: 8, previousRank: 8 },
            { id: '2024209', name: '刘跃进', class: '体育2101', score: '2.45', rank: 9, previousRank: 9 },
            { id: '2024210', name: '黄腾飞', class: '体育2102', score: '2.40', rank: 10, previousRank: 10 }
        ]
    },
    'sit-up': {
        name: '仰卧起坐',
        unit: '个/分钟',
        students: [
            { id: '2024301', name: '刘小燕', class: '体育2101', score: '62', rank: 1, previousRank: 1 },
            { id: '2024302', name: '陈小玲', class: '体育2102', score: '60', rank: 2, previousRank: 2 },
            { id: '2024303', name: '杨小芳', class: '体育2101', score: '58', rank: 3, previousRank: 3 },
            { id: '2024304', name: '黄小梅', class: '体育2102', score: '56', rank: 4, previousRank: 4 },
            { id: '2024305', name: '赵小丽', class: '体育2101', score: '54', rank: 5, previousRank: 5 },
            { id: '2024306', name: '孙小雅', class: '体育2102', score: '52', rank: 6, previousRank: 6 },
            { id: '2024307', name: '周小婷', class: '体育2101', score: '50', rank: 7, previousRank: 7 },
            { id: '2024308', name: '吴小倩', class: '体育2102', score: '48', rank: 8, previousRank: 8 },
            { id: '2024309', name: '郑小慧', class: '体育2101', score: '46', rank: 9, previousRank: 9 },
            { id: '2024310', name: '王小琳', class: '体育2102', score: '44', rank: 10, previousRank: 10 }
        ]
    },
    'pull-up': {
        name: '引体向上',
        unit: '个',
        students: [
            { id: '2024401', name: '张强', class: '体育2101', score: '25', rank: 1, previousRank: 1 },
            { id: '2024402', name: '李力', class: '体育2102', score: '23', rank: 2, previousRank: 2 },
            { id: '2024403', name: '王壮', class: '体育2101', score: '21', rank: 3, previousRank: 3 },
            { id: '2024404', name: '赵刚', class: '体育2102', score: '20', rank: 4, previousRank: 4 },
            { id: '2024405', name: '孙强', class: '体育2101', score: '19', rank: 5, previousRank: 5 },
            { id: '2024406', name: '周力', class: '体育2102', score: '18', rank: 6, previousRank: 6 },
            { id: '2024407', name: '吴壮', class: '体育2101', score: '17', rank: 7, previousRank: 7 },
            { id: '2024408', name: '郑刚', class: '体育2102', score: '16', rank: 8, previousRank: 8 },
            { id: '2024409', name: '刘强', class: '体育2101', score: '15', rank: 9, previousRank: 9 },
            { id: '2024410', name: '黄力', class: '体育2102', score: '14', rank: 10, previousRank: 10 }
        ]
    }
};

// 路由：首页
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.io 实时通信
io.on('connection', (socket) => {
    console.log('用户已连接');
    
    // 发送当前数据给新连接的客户端
    socket.emit('projects', projects);
    
    socket.on('disconnect', () => {
        console.log('用户已断开连接');
    });
});

// 模拟实时更新数据
setInterval(() => {
    // 更新每个项目的数据
    Object.keys(projects).forEach(projectKey => {
        const project = projects[projectKey];
        
        // 记录当前排名
        project.students.forEach(student => {
            student.previousRank = student.rank;
        });
        
        // 随机更新一些学生的成绩
        project.students.forEach(student => {
            if (Math.random() > 0.7) { // 30%的概率更新
                if (projectKey === 'male-1000m' || projectKey === 'female-800m') {
                    // 跑步项目：时间可能减少（成绩提高）或增加（成绩下降）
                    const parts = student.score.split(':');
                    let seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
                    
                    // 随机变化 -3到+3秒
                    const change = Math.floor(Math.random() * 7) - 3;
                    seconds += change;
                    
                    // 确保时间在合理范围内
                    seconds = Math.max(150, Math.min(360, seconds));
                    
                    const minutes = Math.floor(seconds / 60);
                    const secs = seconds % 60;
                    student.score = `${minutes}:${secs < 10 ? '0' + secs : secs}`;
                } else if (projectKey === 'standing-long-jump') {
                    // 跳远项目
                    let value = parseFloat(student.score);
                    const change = (Math.random() * 0.1) - 0.05; // -0.05到+0.05的变化
                    value += change;
                    value = Math.max(2.0, Math.min(3.0, value));
                    student.score = value.toFixed(2);
                } else {
                    // 引体向上和仰卧起坐
                    let count = parseInt(student.score);
                    const change = Math.floor(Math.random() * 3) - 1; // -1, 0, 或+1
                    count += change;
                    
                    if (projectKey === 'pull-up') {
                        count = Math.max(10, Math.min(30, count));
                    } else {
                        count = Math.max(30, Math.min(70, count));
                    }
                    
                    student.score = count.toString();
                }
            }
        });
        
        // 根据成绩重新排序
        project.students.sort((a, b) => {
            if (projectKey === 'male-1000m' || projectKey === 'female-800m') {
                // 时间越短越好
                return parseFloat(a.score.replace(':', '.')) - parseFloat(b.score.replace(':', '.'));
            } else {
                // 数值越大越好
                return parseFloat(b.score) - parseFloat(a.score);
            }
        });
        
        // 更新排名
        project.students.forEach((student, index) => {
            student.rank = index + 1;
        });
    });
    
    // 广播更新给所有连接的客户端
    io.emit('update', projects);
    console.log('数据已更新', new Date().toLocaleTimeString());
}, 5000); // 每5秒更新一次

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`济南大学体测实时排名系统运行在端口 ${PORT}`);
});