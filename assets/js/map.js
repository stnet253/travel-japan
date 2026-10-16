(function () {
  var TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var ATTR = '© OpenStreetMap contributors';

  function numberIcon(n) {
    return L.divIcon({ className: 'num-marker', html: '<span>' + n + '</span>', iconSize: [28, 28], iconAnchor: [14, 14] });
  }

  function drawDay(map, nodes) {
    var pts = [];
    nodes.forEach(function (n, i) {
      if (n.lat == null || n.lng == null) return;
      var ll = [n.lat, n.lng];
      pts.push(ll);
      L.marker(ll, { icon: numberIcon(i + 1) })
        .bindPopup('<strong>' + n.time + '</strong> ' + n.title + '<br><a href="#t' + (i + 1) + '">看時間軸 →</a>')
        .addTo(map);
    });
    if (pts.length > 1) L.polyline(pts, { color: '#b3442c', weight: 2.5, opacity: 0.9 }).addTo(map);
    if (pts.length) map.fitBounds(pts, { padding: [24, 24] });
  }

  function drawTrip(map, trip) {
    var pts = [];
    (trip.cities || []).forEach(function (c) {
      pts.push([c.lat, c.lng]);
      L.circleMarker([c.lat, c.lng], { radius: 7, color: '#2f4858', fillColor: '#2f4858', fillOpacity: 0.9, weight: 2 }).bindPopup(c.name).addTo(map);
    });
    (trip.hotels || []).forEach(function (h) {
      pts.push([h.lat, h.lng]);
      L.marker([h.lat, h.lng]).bindPopup('🏨 ' + h.name + '<br>' + h.checkin + ' ～ ' + h.checkout).addTo(map);
    });
    if (pts.length > 1) L.polyline(pts, { color: '#2f4858', weight: 1.5, dashArray: '4 6' }).addTo(map);
    if (pts.length) map.fitBounds(pts, { padding: [40, 40] });
  }

  document.querySelectorAll('.map').forEach(function (el) {
    var payload;
    try { payload = JSON.parse(el.dataset.payload || 'null'); } catch (e) { payload = null; }
    if (!payload) { el.textContent = '尚無地圖資料'; return; }
    var map = L.map(el, { scrollWheelZoom: false }).setView([35.68, 139.76], 11);
    L.tileLayer(TILE, { attribution: ATTR, maxZoom: 19 }).addTo(map);
    if (el.dataset.mode === 'trip') drawTrip(map, payload); else drawDay(map, payload);
  });
})();
