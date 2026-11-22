/**
 * 站点重定向：butterfly.ayeez.cn -> blog.ayeez.cn
 *
 * 说明：
 * - 旧站点（Hexo butterfly 主题构建产物）已停止更新，新博客已迁移到 blog.ayeez.cn。
 * - 该 EdgeOne Pages 函数匹配所有路径（functions/[[default]].js = /* 全匹配），
 *   统一返回 301 永久重定向到新站点，并保留原路径与查询参数。
 * - 例如：https://butterfly.ayeez.cn/posts/abc/ -> https://blog.ayeez.cn/posts/abc/
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
