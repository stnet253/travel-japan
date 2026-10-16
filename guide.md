---
layout: default
title: 交通・票券・購票指南
permalink: /guide/
---
{% assign g = site.data.guide %}
{% assign gs = site.data.guide_static %}
{% assign all_sections = g.sections | concat: gs.sections %}
<section class="hero hero--plain hero--short">
  <div class="hero-inner wrap">
    <p class="kicker">Practical Guide · 2026-10 查證</p>
    <h1 class="display">{{ g.title }}</h1>
    <p class="hero-lede">{{ g.lede }}</p>
  </div>
</section>

<nav class="wrap guide-toc" aria-label="本頁目錄">
  {% for s in all_sections %}<a href="#{{ s.id }}">{{ s.label }}</a>{% endfor %}
</nav>

{% for s in all_sections %}
<section class="chapter wrap" id="{{ s.id }}">
  <div class="chapter-head">
    <span class="vertical-label">{{ s.label }}</span>
    <h2 class="serif">{{ s.title }}</h2>
    {% if s.intro %}<p class="chapter-sub">{{ s.intro }}</p>{% endif %}
  </div>

  {% if s.figures %}
  <div class="fig-grid fig-grid--{{ s.figures | size }}">
    {% for f in s.figures %}<figure class="tl-fig"><img src="{{ f.img | relative_url }}" alt="{{ f.caption }}" loading="lazy"><figcaption>{{ f.caption }}</figcaption></figure>{% endfor %}
  </div>
  {% endif %}

  {% if s.verdict %}<div class="verdict"><span class="kicker">結論</span><p>{{ s.verdict }}</p></div>{% endif %}

  {% if s.rows %}
  <div class="tbl-scroll">
  <table class="tbl tbl--guide">
    <thead><tr><th>項目</th><th>內容</th><th class="num">價格</th><th>怎麼買／怎麼用</th></tr></thead>
    <tbody>
    {% for r in s.rows %}
      <tr>
        <td class="tbl-item">{{ r.item }}{% if r.url %}<br><a class="textlink small" target="_blank" rel="noopener" href="{{ r.url }}">官網</a>{% endif %}</td>
        <td data-label="內容">{{ r.detail }}</td>
        <td class="num mono" data-label="價格">{{ r.price }}</td>
        <td data-label="怎麼買／怎麼用">{{ r.how }}</td>
      </tr>
    {% endfor %}
    </tbody>
  </table>
  </div>
  {% endif %}

  {% if s.steps %}
  <div class="steps">
    {% if s.steps_title %}<h3 class="serif">{{ s.steps_title }}</h3>{% endif %}
    <ol>{% for st in s.steps %}<li>{{ st }}</li>{% endfor %}</ol>
  </div>
  {% endif %}

  {% if s.tips %}
  <ul class="checklist checklist--tips">{% for t in s.tips %}<li>{{ t }}</li>{% endfor %}</ul>
  {% endif %}

  {% if s.sources %}
  <p class="caption">來源：{% for src in s.sources %}<a href="{{ src.url }}" target="_blank" rel="noopener">{{ src.name }}</a>{% unless forloop.last %}、{% endunless %}{% endfor %}（{{ g.checked }} 查詢）</p>
  {% endif %}
</section>
{% endfor %}

{% if g.unverified %}
<section class="chapter wrap">
  <div class="chapter-head">
    <span class="vertical-label">注意</span>
    <h2 class="serif">出發前一個月要再確認的事</h2>
  </div>
  <ul class="checklist">{% for u in g.unverified %}<li>{{ u }}</li>{% endfor %}</ul>
</section>
{% endif %}
