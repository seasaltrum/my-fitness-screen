// 连接服务器
const socket = io();

// 当前选中的项目
let currentProject = 'male-1000m';
let projectsData = {};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 项目选择事件
    document.getElementById('project-select').addEventListener('change', function() {
        currentProject = this.value;
        updateRankingDisplay();
    });
    
    // 初始化更新时间
    updateTime();
});

// 接收服务器发送的项目数据
socket.on('projects', function(projects) {
    projectsData = projects;
    updateRankingDisplay();
});

// 接收服务器发送的更新数据
socket.on('update', function(projects) {
    projectsData = projects;
    updateRankingDisplay();
    updateTime();
    
    // 添加更新动画效果
    document.querySelector('.ranking-container').classList.add('highlight');
    setTimeout(() => {
        document.querySelector('.ranking-container').classList.remove('highlight');
    }, 2000);
});

// 更新排名显示
function updateRankingDisplay() {
    const project = projectsData[currentProject];
    if (!project) return;
    
    // 更新项目标题
    document.getElementById('project-title').textContent = project.name + '成绩排行榜';
    
    // 更新排名表格
    const tbody = document.getElementById('ranking-body');
    tbody.innerHTML = '';
    
    project.students.forEach(student => {
        const row = document.createElement('tr');
        
        // 排名变化指示
        let changeIndicator = '';
        if (student.rank < student.previousRank) {
            changeIndicator = `<span class="rank-change up">↑${student.previousRank - student.rank}</span>`;
        } else if (student.rank > student.previousRank) {
            changeIndicator = `<span class="rank-change down">↓${student.rank - student.previousRank}</span>`;
        }
        
        // 为前三名添加特殊样式
        let rankClass = '';
        if (student.rank === 1) rankClass = 'rank-1';
        else if (student.rank === 2) rankClass = 'rank-2';
        else if (student.rank === 3) rankClass = 'rank-3';
        
        row.innerHTML = `
            <td class="rank-col ${rankClass}">${student.rank}</td>
            <td class="name-col">${student.name}</td>
            <td class="id-col">${student.id}</td>
            <td class="score-col">${student.score} ${project.unit}</td>
            <td class="class-col">${student.class}</td>
            <td class="change-col">${changeIndicator}</td>
        `;
        
        tbody.appendChild(row);
    });
    
    // 更新统计数据
    updateStatistics(project);
}

// 更新统计数据
function updateStatistics(project) {
    const students = project.students;
    
    // 参与学生数
    document.getElementById('total-students').textContent = students.length;
    
    // 平均成绩
    let avgScore = 0;
    if (project.unit === '分:秒') {
        // 跑步项目：计算平均时间（秒）
        const totalSeconds = students.reduce((sum, student) => {
            const parts = student.score.split(':');
            return sum + parseInt(parts[0]) * 60 + parseInt(parts[1]);
        }, 0);
        const avgSeconds = totalSeconds / students.length;
        const minutes = Math.floor(avgSeconds / 60);
        const seconds = Math.round(avgSeconds % 60);
        document.getElementById('avg-score').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    } else if (project.unit === '米') {
        // 跳远项目
        const avg = students.reduce((sum, student) => sum + parseFloat(student.score), 0) / students.length;
        document.getElementById('avg-score').textContent = avg.toFixed(2) + '米';
    } else {
        // 计数项目
        const avg = students.reduce((sum, student) => sum + parseInt(student.score), 0) / students.length;
        document.getElementById('avg-score').textContent = Math.round(avg) + project.unit;
    }
    
    // 最佳成绩
    if (project.unit === '分:秒') {
        // 跑步项目：时间最短为最佳
        const bestStudent = students[0]; // 已经按成绩排序，第一个是最佳
        document.getElementById('best-score').textContent = bestStudent.score;
    } else {
        // 其他项目：数值最大为最佳
        const bestStudent = students[0];
        document.getElementById('best-score').textContent = bestStudent.score + project.unit;
    }
    
    // 今日更新次数（模拟数据）
    document.getElementById('updated-count').textContent = Math.floor(Math.random() * 50) + 10;
}

// 更新时间显示
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('update-time').textContent = timeString;
}