/**
 * 站点重定向：butterfly.ayeez.cn -> blog.ayeez.cn
 *
 * 与 functions/[[default]].js 相同，处理根路径 "/"（静态 index.html 之外的兜底路由）。
 */

const TARGET_ORIGIN = 'https://blog.ayeez.cn';

export function onRequest(context) {
  const url = new URL(context.request.url);
  const location = TARGET_ORIGIN + url.pathname + url.search;

  return new Response(null, {
    status: 301,
    headers: {
      Location: location,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
