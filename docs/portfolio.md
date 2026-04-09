---
layout: page
---

<div class="grid-2">
  <div class="stat-card" v-for="item in [{title:'数学实验可视化网站', tech:'HTML / CSS / JS / Canvas', desc:'交互式概率与统计实验展示'},{title:'个人博客成长站', tech:'React / Tailwind / 内容结构设计', desc:'学习记录、热力图、专题、作品集整合'},{title:'数据分析项目案例', tech:'SQL / Python / BI', desc:'从清洗、建模到图表和业务结论输出'},{title:'自动化小工具', tech:'Python / 文档处理', desc:'提高重复性工作效率的工具型项目'}]">
    <div style="height: 160px; border-radius: 22px; background: linear-gradient(145deg, rgba(124,155,255,0.22), rgba(93,226,231,0.18)); margin-bottom: 20px;"></div>
    <div style="font-size: 22px; color: #E7ECFF;">{{item.title}}</div>
    <div style="color: #7C9BFF; margin: 8px 0;">{{item.tech}}</div>
    <div style="color: #9AA7C7;">{{item.desc}}</div>
  </div>
</div>