// ══════════════════════════════════════════════════════════════
//  UptimeFlare 配置 ｜ 共 8 个监控
//
//  怎么用：整段复制 → 覆盖 GitHub 仓库根目录的 uptime.config.ts
//          → Commit changes → 去 Actions 页面等绿勾（1~3 分钟）
//
//  本文件底部有 2 行「示例」是 // 注释掉的，不生效，不用管
//  ⚠️ 顶部 import 和底部 export 不要删、不要改
// ══════════════════════════════════════════════════════════════

// Don't edit this line
import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: 'WRBQ 服务状态',
  links: [{ link: 'https://www.bilibili-wrbq.cn', label: '主站', highlight: true }],
  // 状态页按两个域名分组显示
  group: {
    'bilibili-wrbq.cn': ['www_cn', 'bot_cn', 'botdocs_cn', 'download_cn', 'miao_cn', 'wrbqos_cn'],
    'bilibili-wrbq.top': ['www_top', 'api_top'],
  },
}

const workerConfig: WorkerConfig = {
  monitors: [
    // ── 1/8 ────────────────────────────────────────────────
    { id: 'www_cn', name: '主站', method: 'GET',
      target: 'http://www.bilibili-wrbq.cn',
      statusPageLink: 'http://www.bilibili-wrbq.cn',
      tooltip: 'www.bilibili-wrbq.cn',
      expectedCodes: [200, 301, 302], timeout: 10000 },

    // ── 2/8 ────────────────────────────────────────────────
    { id: 'bot_cn', name: '机器人后台', method: 'GET',
      target: 'http://bot.bilibili-wrbq.cn',
      statusPageLink: 'http://bot.bilibili-wrbq.cn',
      tooltip: 'bot.bilibili-wrbq.cn',
      expectedCodes: [200, 301, 302], timeout: 10000 },

    // ── 3/8 ────────────────────────────────────────────────
    { id: 'botdocs_cn', name: '机器人文档', method: 'GET',
      target: 'http://botdocs.bilibili-wrbq.cn',
      statusPageLink: 'http://botdocs.bilibili-wrbq.cn',
      tooltip: 'botdocs.bilibili-wrbq.cn',
      expectedCodes: [200, 301, 302], timeout: 10000 },

    // ── 4/8 ────────────────────────────────────────────────
    { id: 'download_cn', name: '软件下载站', method: 'GET',
      target: 'http://download.bilibili-wrbq.cn',
      statusPageLink: 'http://download.bilibili-wrbq.cn',
      tooltip: 'download.bilibili-wrbq.cn',
      expectedCodes: [200, 301, 302], timeout: 10000 },

    // ── 5/8 ────────────────────────────────────────────────
    { id: 'miao_cn', name: 'miao 服务', method: 'GET',
      target: 'http://miao.bilibili-wrbq.cn',
      statusPageLink: 'http://miao.bilibili-wrbq.cn',
      tooltip: 'miao.bilibili-wrbq.cn',
      expectedCodes: [200, 301, 302], timeout: 10000 },

    // ── 6/8 ────────────────────────────────────────────────
    { id: 'wrbqos_cn', name: 'WRBQ OS', method: 'GET',
      target: 'http://wrbqos.bilibili-wrbq.cn',
      statusPageLink: 'http://wrbqos.bilibili-wrbq.cn',
      tooltip: 'wrbqos.bilibili-wrbq.cn',
      expectedCodes: [200, 301, 302], timeout: 10000 },

    // ── 7/8 ────────────────────────────────────────────────
    { id: 'www_top', name: '主站（top 域名）', method: 'GET',
      target: 'http://www.bilibili-wrbq.top',
      statusPageLink: 'http://www.bilibili-wrbq.top',
      tooltip: 'www.bilibili-wrbq.top',
      expectedCodes: [200, 301, 302], timeout: 10000 },

    // ── 8/8 ────────────────────────────────────────────────
    { id: 'api_top', name: 'API 接口', method: 'GET',
      target: 'http://api.bilibili-wrbq.top',
      statusPageLink: 'http://api.bilibili-wrbq.top',
      tooltip: 'api.bilibili-wrbq.top',
      expectedCodes: [200, 301, 302], timeout: 10000 },

    // ↓↓↓ 下面两条是注释掉的写法示例，不生效 ↓↓↓
    // { id: 'new_monitor', name: '新站点', method: 'GET', target: 'https://要监控的地址',
    //   expectedCodes: [200, 301, 302], timeout: 10000 },
    // { id: 'my_server_ssh', name: '服务器 SSH', method: 'TCP_PING', target: '1.2.3.4:22', timeout: 5000 },
  ],

  // 告警通知：暂时关闭（只记录，不推消息）。
  // 想开启就把下面整块的 // 去掉，并换成你自己的渠道参数。
  // notification: {
  //   webhook: {
  //     url: 'https://api.telegram.org/bot你的BOT_TOKEN/sendMessage',
  //     payloadType: 'x-www-form-urlencoded',
  //     payload: { chat_id: '你的CHAT_ID', text: '$MSG' },
  //     timeout: 10000,
  //   },
  //   timeZone: 'Asia/Shanghai',
  //   gracePeriod: 3,
  // },
}

// 计划维护：不需要就保持空数组，但这一行不能删
const maintenances: MaintenanceConfig[] = []

// Don't edit this line
export { maintenances, pageConfig, workerConfig }

// ══════════════════════════════════════════════════════════════
//  expectedCodes: [200, 301, 302] 是什么意思？
//  表示「返回 200 / 301 / 302 都算站点正常」。
//  保留 301、302 是为了防止你以后在 Cloudflare 开启「强制 HTTPS」后，
//  http 访问变成跳转而被误报成全站宕机。
//  想更严格（连 HTTPS 证书过期也监控），把 target 改成 https:// 即可。
// ══════════════════════════════════════════════════════════════
