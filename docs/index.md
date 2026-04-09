---
layout: page
---

<div class="grid-2">
  <div class="stat-card" style="background: radial-gradient(circle at top left, rgba(124,155,255,0.16), transparent 50%);">
    <span class="tag">个人介绍</span>
    <div style="display: flex; align-items: center; gap: 24px; margin-top: 20px;">
      <div style="width: 120px; height: 120px; border-radius: 28px; background: linear-gradient(145deg, rgba(124,155,255,0.35), rgba(93,226,231,0.18)); border: 1px solid rgba(255,255,255,0.1);"></div>
      <div>
        <h2 style="color: #E7ECFF; margin: 0 0 8px;">瑀 · Data / Learning / Portfolio</h2>
        <p style="color: #9AA7C7; margin: 0 0 16px;">这里展示我的学习轨迹、读书记录、刷题进度、知识专题和作品输出。</p>
        <div style="display: flex; gap: 8px;">
          <span class="tag">SQL</span>
          <span class="tag tag-cyan">Python</span>
          <span class="tag tag-purple">可视化</span>
        </div>
      </div>
    </div>
  </div>
  <div class="stat-card">
    <div style="color: #9AA7C7; font-size: 14px;">连续学习</div>
    <div style="color: #E7ECFF; font-size: 42px; font-weight: 600; line-height: 1.2;">18 <span style="font-size: 18px;">天</span></div>
    <div style="color: #7C9BFF; font-size: 13px;">保持稳定输出</div>
    <div style="margin-top: 20px;">
      <div style="color: #9AA7C7; font-size: 14px;">本月读书</div>
      <div style="color: #E7ECFF; font-size: 32px; font-weight: 600;">4 <span style="font-size: 16px;">本</span></div>
    </div>
  </div>
</div>

<div class="grid-2" style="margin-top: 24px;">
  <div class="stat-card">
    <h3 style="margin-top: 0;">📊 学习热力图</h3>
    <p style="color: #9AA7C7;">（后续可嵌入真正的热力图组件）</p>
    <div style="display: grid; grid-template-columns: repeat(13, 1fr); gap: 4px; margin-top: 16px;">
      <!-- 模拟热力图格子 -->
      <div v-for="i in 91" style="aspect-ratio: 1/1; border-radius: 4px; background: #1E2A4A;"></div>
    </div>
  </div>
  <div class="stat-card">
    <h3 style="margin-top: 0;">⚡ 本周状态</h3>
    <div style="margin-top: 16px;">
      <div style="background: #0F1630; border-radius: 16px; padding: 16px; margin-bottom: 12px;">
        <div style="color: #5DE2E7; font-size: 12px; text-transform: uppercase;">最近在读</div>
        <div style="color: #E7ECFF; font-size: 18px; margin: 4px 0;">《数据分析实战》</div>
        <div style="color: #9AA7C7;">读到第 6 章</div>
      </div>
      <div style="background: #0F1630; border-radius: 16px; padding: 16px;">
        <div style="color: #5DE2E7; font-size: 12px; text-transform: uppercase;">最近在做</div>
        <div style="color: #E7ECFF; font-size: 18px; margin: 4px 0;">业务 SQL 练习</div>
        <div style="color: #9AA7C7;">聚合 / 留存 / 排名</div>
      </div>
    </div>
  </div>
</div>

<div class="grid-3" style="margin-top: 24px;">
  <div class="stat-card">
    <span class="tag">读书</span>
    <div style="font-size: 20px; margin: 16px 0 8px; color: #E7ECFF;">封面墙 + 阅读状态</div>
    <div style="color: #9AA7C7;">在读4本，读完19本</div>
  </div>
  <div class="stat-card">
    <span class="tag tag-cyan">刷题</span>
    <div style="font-size: 20px; margin: 16px 0 8px; color: #E7ECFF;">题目卡片 + 标签</div>
    <div style="color: #9AA7C7;">本月完成63题</div>
  </div>
  <div class="stat-card">
    <span class="tag tag-purple">作品集</span>
    <div style="font-size: 20px; margin: 16px 0 8px; color: #E7ECFF;">项目预览 + 技术栈</div>
    <div style="color: #9AA7C7;">4个作品展示</div>
  </div>
</div>
