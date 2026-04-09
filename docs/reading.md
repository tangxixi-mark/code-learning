---
layout: page
---

<div class="grid-2">
  <div class="stat-card">
    <h3>📚 书墙视图</h3>
    <div class="grid-4" style="margin-top: 16px;">
      <div v-for="i in 8" style="border-radius: 22px; border: 1px solid rgba(255,255,255,0.1); background: #121A30; overflow: hidden;">
        <div style="height: 120px; background: linear-gradient(145deg, rgba(124,155,255,0.2), rgba(167,139,250,0.15));"></div>
        <div style="padding: 12px;">
          <div style="color: #E7ECFF;">书名</div>
          <div style="color: #9AA7C7; font-size: 12px;">在读/已读</div>
        </div>
      </div>
    </div>
  </div>
  <div class="stat-card">
    <h3>📖 当前在读</h3>
    <div style="background: #0F1630; border-radius: 24px; padding: 24px; margin-top: 16px;">
      <div style="height: 160px; border-radius: 20px; background: linear-gradient(145deg, rgba(124,155,255,0.28), rgba(93,226,231,0.14));"></div>
      <div style="margin-top: 20px; font-size: 24px; color: #E7ECFF;">《某本正在读的书》</div>
      <div style="color: #9AA7C7;">作者名 · 阅读进度 65%</div>
      <div style="margin-top: 16px; padding: 16px; background: rgba(167,139,250,0.08); border-radius: 16px; border: 1px solid rgba(167,139,250,0.2); color: #CFC6F8;">
        摘录：真正的发现之旅不在于寻找新风景，而在于拥有新的眼睛。
      </div>
    </div>
  </div>
</div>

<div class="grid-3" style="margin-top: 24px;">
  <div class="stat-card">
    <span class="tag tag-green">想读</span>
    <div style="font-size: 36px; font-weight: 600; color: #E7ECFF; margin-top: 12px;">12 本</div>
  </div>
  <div class="stat-card">
    <span class="tag">在读</span>
    <div style="font-size: 36px; font-weight: 600; color: #E7ECFF; margin-top: 12px;">4 本</div>
  </div>
  <div class="stat-card">
    <span class="tag tag-purple">读完</span>
    <div style="font-size: 36px; font-weight: 600; color: #E7ECFF; margin-top: 12px;">19 本</div>
  </div>
</div>