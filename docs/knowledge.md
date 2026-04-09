---
layout: page
---

<div class="grid-3">
  <div class="stat-card" v-for="item in [{title:'SQL', desc:'聚合、分组、窗口、留存、用户分析', tag:'blue'},{title:'统计学', desc:'描述统计、估计、检验、AB 测试', tag:'purple'},{title:'Python 数据分析', desc:'pandas、清洗、可视化、建模基础', tag:'cyan'},{title:'业务指标体系', desc:'AARRR、电商、零售、金融', tag:'green'},{title:'Power Query / Excel', desc:'数据清洗、逆透视、匹配、透视表', tag:'blue'},{title:'可视化', desc:'图表、仪表盘、叙事表达', tag:'purple'}]">
    <div style="height: 4px; background: linear-gradient(90deg, #7C9BFF, #5DE2E7, #A78BFA); margin: -24px -24px 20px -24px;"></div>
    <span :class="['tag', item.tag==='cyan'?'tag-cyan':item.tag==='purple'?'tag-purple':item.tag==='green'?'tag-green':'']">{{item.title}}</span>
    <div style="font-size: 24px; margin: 16px 0 8px; color: #E7ECFF;">{{item.title}}</div>
    <div style="color: #9AA7C7;">{{item.desc}}</div>
  </div>
</div>