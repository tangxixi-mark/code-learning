---
layout: page
---

<div style="display: grid; grid-template-columns: 260px 1fr; gap: 24px;">
  <div class="stat-card">
    <h3>筛选</h3>
    <div style="margin-top: 16px;">
      <div style="color: #E7ECFF; margin-bottom: 8px;">题型</div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <span class="tag">SQL</span>
        <span class="tag tag-cyan">Excel</span>
        <span class="tag tag-purple">Python</span>
        <span class="tag tag-green">统计</span>
      </div>
    </div>
    <div style="margin-top: 24px;">
      <div style="color: #E7ECFF; margin-bottom: 8px;">状态</div>
      <div style="color: #9AA7C7;">
        <div><input type="checkbox" /> 已完成</div>
        <div><input type="checkbox" /> 二刷中</div>
        <div><input type="checkbox" /> 易错题</div>
        <div><input type="checkbox" /> 经典题型</div>
      </div>
    </div>
  </div>

  <div>
    <div class="stat-card" v-for="item in [{title:'SQL 留存分析题', tags:'留存 / 回流 / 分层', diff:'中等', desc:'独立完成，关键在于先圈定活跃集合再判断月份归属。'},{title:'Excel 透视 + 同环比', tags:'透视表 / IFERROR / 清洗', diff:'中等', desc:'重点不是公式本身，而是前置清洗和字段标准化。'},{title:'pandas 数据清洗', tags:'缺失值 / 类型转换 / 去重', diff:'基础', desc:'注意时间戳异常和脏数据识别。'}]" style="margin-bottom: 16px;">
      <div style="display: flex; gap: 8px; margin-bottom: 16px;">
        <span class="tag">{{item.tags}}</span>
        <span class="tag tag-green">{{item.diff}}</span>
      </div>
      <div style="font-size: 20px; color: #E7ECFF; margin-bottom: 8px;">{{item.title}}</div>
      <div style="color: #9AA7C7;">{{item.desc}}</div>
    </div>
  </div>
</div>