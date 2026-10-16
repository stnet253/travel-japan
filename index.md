---
layout: default
title: 行程總覽
---
{% assign trip = site.data.trip %}

<section class="hero {% if trip.hero == nil or trip.hero == "" %}hero--plain{% endif %}" {% if trip.hero and trip.hero != "" %}style="--hero: url('{{ trip.hero | relative_url }}')"{% endif %}>
  <div class="hero-inner wrap">
    <p class="kicker">{{ trip.subtitle }}</p>
    <h1 class="display">{{ trip.title }}</h1>
    <p class="hero-lede">{{ trip.lede }}</p>
    <dl class="hero-facts">
      <div><dt>日期</dt><dd>{{ trip.start | date: "%-m月%-d日" }} — {{ trip.end | date: "%-m月%-d日" }}</dd></div>
      <div><dt>天數</dt><dd>{{ site.days | size }} 天 {{ site.days | size | minus: 1 }} 夜</dd></div>
      <div><dt>同行</dt><dd>{{ trip.travelers }} 人</dd></div>
      <div><dt>住</dt><dd>{{ trip.hotels[0].city }}</dd></div>
    </dl>
  </div>
  {% if trip.hero_caption and trip.hero_caption != "" %}<p class="hero-caption">{{ trip.hero_caption }}</p>{% endif %}
</section>

{% if trip.sakura %}
<section class="wrap band">
  <div class="band-inner">
    <p class="kicker">櫻花前線</p>
    <p class="band-text">東京標本木平均開花 <strong>{{ trip.sakura.avg_bloom }}</strong>、滿開 <strong>{{ trip.sakura.avg_full }}</strong>。{{ trip.sakura.last_year }}。{{ trip.sakura.note }}</p>
    <p class="caption">{{ trip.sakura.source }}</p>
  </div>
</section>
{% endif %}

<section class="chapter wrap">
  <div class="chapter-head">
    <span class="vertical-label">目次</span>
    <h2 class="serif">五天怎麼走</h2>
    <p class="chapter-sub">每一天點進去都有分鐘級的時間軸、地圖與備案。</p>
  </div>
  <ol class="toc-grid">
  {% for d in site.days %}
    <li class="toc-card {% if forloop.first %}toc-card--lead{% endif %}">
      <a href="{{ d.url | relative_url }}">
        <figure class="toc-figure">
          {% if d.cover and d.cover != "" %}<img src="{{ d.cover | relative_url }}" alt="{{ d.cover_caption }}" loading="lazy">{% else %}<span class="toc-figure--empty serif">{{ d.city | slice: 0 }}</span>{% endif %}
          <span class="toc-day">Day {{ forloop.index | prepend: "0" | slice: -2, 2 }}</span>
        </figure>
        <div class="toc-body">
          <p class="toc-meta mono">{{ d.date | date: "%m.%d" }}（{{ d.date | date: "%a" | replace: "Sat","六" | replace: "Sun","日" | replace: "Mon","一" | replace: "Tue","二" | replace: "Wed","三" | replace: "Thu","四" | replace: "Fri","五" }}）<span class="dot">·</span>{{ d.city }}</p>
          <h3 class="serif">{{ d.title }}</h3>
          <p class="toc-excerpt">{{ d.lede | truncate: 88 }}</p>
          <p class="toc-stats mono">步行 {{ d.walk_km }} km<span class="dot">·</span>¥{{ d.cost_total }}<span class="dot">·</span>{{ d.weather }}</p>
        </div>
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
  <p class="caption">虛線為每日活動區域的順序，圖釘為住宿。各日路線請看每日頁的地圖。</p>
</section>

{% if trip.weather %}
<section class="chapter wrap chapter--two">
  <div>
    <div class="chapter-head">
      <span class="vertical-label">天気</span>
      <h2 class="serif">三月底的東京</h2>
    </div>
    <p class="lead-p">{{ trip.weather.summary }}</p>
    <table class="tbl">
      <thead><tr><th>日期</th><th>2025 實測</th><th>2026 實測</th></tr></thead>
      <tbody>{% for w in trip.weather.table %}<tr><td class="mono">{{ w.date }}</td><td>{{ w.y2025 }}</td><td>{{ w.y2026 }}</td></tr>{% endfor %}</tbody>
    </table>
    <p class="caption">Open-Meteo 再分析資料，2026-10-16 查詢。出發前一週再看 weather MCP 的實際預報。</p>
  </div>
  <div>
    <div class="chapter-head">
      <span class="vertical-label">服</span>
      <h2 class="serif">穿什麼、帶什麼</h2>
    </div>
    <ul class="checklist">
    {% for c in trip.weather.clothing %}<li>{{ c }}</li>{% endfor %}
    </ul>
  </div>
</section>
{% endif %}

{% if trip.tickets %}
<section class="chapter wrap">
  <div class="chapter-head">
    <span class="vertical-label">切符</span>
    <h2 class="serif">出發前先買好的票</h2>
  </div>
  <ul class="ticket-list">
  {% for t in trip.tickets %}
    <li class="ticket">
      <div class="ticket-main">
        <h3 class="serif">{{ t.name }}</h3>
        <p class="muted">{{ t.note }}</p>
        {% if t.url %}<a class="textlink" target="_blank" rel="noopener" href="{{ t.url }}">官網</a>{% endif %}
      </div>
      <div class="ticket-price serif">{{ t.price }}</div>
    </li>
  {% endfor %}
  </ul>
</section>
{% endif %}

<section class="chapter wrap chapter--two">
  <div>
    <div class="chapter-head">
      <span class="vertical-label">宿</span>
      <h2 class="serif">住在哪裡</h2>
    </div>
    <ul class="hotel-list">
    {% for h in trip.hotels %}
      <li>
        <p class="mono small">{{ h.checkin | date: "%m.%d" }} — {{ h.checkout | date: "%m.%d" }}<span class="dot">·</span>{{ h.city }}</p>
        <h3 class="serif">{{ h.name }}</h3>
        {% if h.note %}<p class="muted">{{ h.note }}</p>{% endif %}
        <a class="textlink" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query={{ h.lat }},{{ h.lng }}">地圖</a>
      </li>
    {% endfor %}
    </ul>
    {% if trip.flight %}
    <ul class="footnotes" style="margin-top:20px">
      <li><span class="muted">去程</span><span>{{ trip.flight.arrive }}</span></li>
      <li><span class="muted">回程</span><span>{{ trip.flight.depart }}</span></li>
    </ul>
    {% endif %}
  </div>
  <div>
    {% if trip.budget %}
    <div class="chapter-head">
      <span class="vertical-label">予算</span>
      <h2 class="serif">大概要花多少</h2>
    </div>
    <table class="tbl">
      <tbody>{% for b in trip.budget.rows %}<tr><td>{{ b.item }}</td><td class="mono num">¥{{ b.jpy }}</td></tr>{% endfor %}
      <tr class="total"><td>合計（每人）</td><td class="mono num">¥{{ trip.budget.total }}</td></tr></tbody>
    </table>
    <p class="caption">{{ trip.budget.note }}。匯率 ¥1 ≈ NT${{ trip.currency_rate.jpy_to_twd }}（{{ trip.currency_rate.as_of }}），約 NT${{ trip.budget.total | times: trip.currency_rate.jpy_to_twd | round }}。</p>
    {% endif %}
    <div class="chapter-head" style="margin-top:32px">
      <span class="vertical-label">備</span>
      <h2 class="serif">萬一需要</h2>
    </div>
    <ul class="footnotes">
    {% for e in trip.emergency %}<li><span class="muted">{{ e.label }}</span><span class="mono">{{ e.value }}</span></li>{% endfor %}
    </ul>
  </div>
</section>
