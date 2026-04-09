---
layout: page
---

<div class="grid-4">
  <div class="stat-card">
    <div style="color: #9AA7C7; font-size: 14px;">学习天数</div>
    <div style="color: #E7ECFF; font-size: 36px; font-weight: 600;">81</div>
    <div style="color: #7C9BFF;">最近90天</div>
  </div>
  <div class="stat-card">
    <div style="color: #9AA7C7; font-size: 14px;">累计时长</div>
    <div style="color: #E7ECFF; font-size: 36px; font-weight: 600;">236h</div>
    <div style="color: #7C9BFF;">估算值</div>
  </div>
  <div class="stat-card">
    <div style="color: #9AA7C7; font-size: 14px;">知识主题</div>
    <div style="color: #E7ECFF; font-size: 36px; font-weight: 600;">12</div>
    <div style="color: #7C9BFF;">持续扩展</div>
  </div>
  <div class="stat-card">
    <div style="color: #9AA7C7; font-size: 14px;">输出内容</div>
    <div style="color: #E7ECFF; font-size: 36px; font-weight: 600;">34</div>
    <div style="color: #7C9BFF;">笔记/文章</div>
  </div>
</div>

<div class="grid-2" style="margin-top: 24px;">
  <div class="stat-card">
    <h3>📈 学习分类分布</h3>
    <div v-for="item in [{name:'SQL', val:72, color:'#7C9BFF'},{name:'Python', val:58, color:'#5DE2E7'},{name:'统计学', val:36, color:'#A78BFA'},{name:'可视化', val:41, color:'#34D399'}]" style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; color: #E7ECFF;">
        <span>{{item.name}}</span>
        <span style="color: #9AA7C7;">{{item.val}}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{width: item.val+'%', background: item.color}"></div>
      </div>
    </div>
  </div>
  <div class="stat-card">
    <h3>📅 最近学习时间轴</h3>
    <div v-for="item in [{date:'04.10', title:'完成 Power Query 清洗练习', desc:'修正字段格式、逆透视、透视统计'},{date:'04.09', title:'做业务 SQL 题 8 道', desc:'留存、复购、TopN、用户分群'},{date:'04.08', title:'整理 AB 测试与统计推断笔记', desc:'补全核心概念与公式'}]" style="display: grid; grid-template-columns: 70px 1fr; gap: 16px; margin-bottom: 16px; background: #0F1630; border-radius: 16px; padding: 16px;">
      <div style="color: #BFD0FF; background: rgba(124,155,255,0.1); border-radius: 12px; padding: 8px; text-align: center;">{{item.date}}</div>
      <div>
        <div style="color: #E7ECFF;">{{item.title}}</div>
        <div style="color: #9AA7C7; font-size: 14px;">{{item.desc}}</div>
      </div>
    </div>
  </div>
</div>