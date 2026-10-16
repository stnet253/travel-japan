---
layout: default
title: 行程總覽
---
{% assign trip = site.data.trip %}
{% assign first = site.days | first %}
{% assign last = site.days | last %}

<section class="hero {% if trip.hero == nil or trip.hero == "" %}hero--plain{% endif %}" {% if trip.hero and trip.hero != "" %}style="--hero: url('{{ trip.hero | relative_url }}')"{% endif %}>
  <div class="hero-inner wrap">
    <p class="kicker">{{ trip.subtitle }}</p>
    <h1 class="display">{{ trip.title }}</h1>
    <p class="hero-lede">{{ trip.lede }}</p>
    <dl class="hero-facts">
      <div><dt>日期</dt><dd>{{ trip.start | date: "%-m月%-d日" }} — {{ trip.end | date: "%-m月%-d日" }}</dd></div>
      <div><dt>天數</dt><dd>{{ site.days | size }} 日</dd></div>
      <div><dt>同行</dt><dd>{{ trip.travelers }} 人</dd></div>
      <div><dt>路線</dt><dd>{% for c in trip.cities %}{{ c.name }}{% unless forloop.last %} → {% endunless %}{% endfor %}</dd></div>
    </dl>
  </div>
  {% if trip.hero_caption and trip.hero_caption != "" %}<p class="hero-caption">{{ trip.hero_caption }}</p>{% endif %}
</section>

<section class="chapter wrap">
  <div class="chapter-head">
    <span class="vertical-label">目次</span>
    <h2 class="serif">每一天的安排</h2>
  </div>
  <ol class="toc">
  {% for d in site.days %}
    <li class="toc-item">
      <a href="{{ d.url | relative_url }}">
        <span class="toc-num">{{ forloop.index | prepend: "0" | slice: -2, 2 }}</span>
        <div class="toc-body">
          <p class="toc-meta mono">{{ d.date | date: "%m.%d" }} <span class="dot">·</span> {{ d.city }}{% if d.weather and d.weather != "" %} <span class="dot">·</span> {{ d.weather }}{% endif %}</p>
          <h3 class="serif">{{ d.title }}</h3>
          <p class="toc-excerpt">{{ d.excerpt | strip_html | strip_newlines | truncate: 90 }}</p>
          <p class="toc-stats mono">步行 {{ d.walk_km }} km <span class="dot">·</span> 預算 ¥{{ d.cost_total }}</p>
        </div>
        {% if d.cover and d.cover != "" %}<img class="toc-thumb" src="{{ d.cover | relative_url }}" alt="" loading="lazy">{% else %}<span class="toc-thumb toc-thumb--empty serif">{{ d.city | slice: 0 }}</span>{% endif %}
      </a>
    </li>
  {% endfor %}
  </ol>
</section>

<section class="chapter wrap">
  <div class="chapter-head">
    <span class="vertical-label">地図</span>
    <h2 class="serif">這趟路怎麼走</h2>
  </div>
  {% include map.html id="trip-map" mode="trip" %}
  <p class="caption">實線為城市間移動，圖釘為住宿。點擊可看入住日期。</p>
</section>

<section class="chapter wrap chapter--two">
  <div>
    <div class="chapter-head">
      <span class="vertical-label">宿</span>
      <h2 class="serif">住在哪裡</h2>
    </div>
    <ul class="hotel-list">
    {% for h in trip.hotels %}
      <li>
        <p class="mono small">{{ h.checkin | date: "%m.%d" }} — {{ h.checkout | date: "%m.%d" }} <span class="dot">·</span> {{ h.city }}</p>
        <h3 class="serif">{{ h.name }}</h3>
        {% if h.note %}<p class="muted">{{ h.note }}</p>{% endif %}
        <a class="textlink" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query={{ h.lat }},{{ h.lng }}">地圖</a>
      </li>
    {% endfor %}
    </ul>
  </div>
  <div>
    <div class="chapter-head">
      <span class="vertical-label">備</span>
      <h2 class="serif">萬一需要</h2>
    </div>
    <ul class="footnotes">
    {% for e in trip.emergency %}<li><span class="muted">{{ e.label }}</span><span class="mono">{{ e.value }}</span></li>{% endfor %}
    </ul>
    {% if trip.currency_rate %}<p class="caption">匯率參考 ¥1 ≈ NT${{ trip.currency_rate.jpy_to_twd }}（{{ trip.currency_rate.as_of }}）</p>{% endif %}
  </div>
</section>
