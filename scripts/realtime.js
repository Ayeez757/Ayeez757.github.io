// 在支持 pjax 的环境中监听完成事件
document.addEventListener('pjax:complete', function () {
  initRealTime(); // 重新初始化
});

function initRealTime() {
  const el = document.getElementById('realtime_duration');
  if (!el) return;

  dayjs.extend(window.dayjs_plugin_duration);
  const date = dayjs('2025-09-14 18:31:57');

  setInterval(() => {
    const dur = dayjs.duration(dayjs().diff(date));
    const days = String(Math.floor(dur.asDays()));
    el.innerHTML = '本站已运行' + days + dur.format('天HH时mm分ss秒');
  }, 1000);
}

// 首次加载也需要调用
initRealTime();