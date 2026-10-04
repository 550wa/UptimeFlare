// ══════════════════════════════════════════════════════════════
//  UptimeFlare 配置 ｜ 共 9 个监控
//
//  怎么用：整段复制 → 覆盖 GitHub 仓库根目录的 uptime.config.ts
//          → Commit changes → 去 Actions 页面等绿勾（1~3 分钟）
//
//  ⚠️ 顶部 import 和底部 export 不要删、不要改
// ══════════════════════════════════════════════════════════════

// Don't edit this line
import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: 'WRBQ 服务状态',
  links: [{ link: 'https://www.bilibili-wrbq.cn', label: '主站', highlight: true }],
  // 状态页分组显示
  group: {
    'bilibili-wrbq.cn': ['www_cn', 'bot_cn', 'botdocs_cn', 'download_cn', 'miao_cn', 'wrbqos_cn'],
    'bilibili-wrbq.top': ['www_top', 'api_top'],
    'Minecraft 服务器': ['mc_server'],
  },
}

const workerConfig: WorkerConfig = {
  // 【数据写入间隔】单位：分钟。默认值是 3，这里改成 1。
  // 作用：采集器每分钟都会检测一次，但"把结果写进数据库"默认每 3 分钟才做一次
  //       —— 这就是状态页上"最后更新于"总是慢几分钟的原因。
  // 改成 1 之后，页面上的时间最多只滞后 1 分钟。
  // 代价：每天约 1440 次写入，D1 免费额度是 10 万次/天，完全够用。
  kvWriteCooldownMinutes: 1,

  monitors: [
    // ── 1/9 ────────────────────────────────────────────────
    { id: 'www_cn', name: '主站', method: 'GET',
      target: 'http://www.bilibili-wrbq.cn',
      statusPageLink: 'http://www.bilibili-wrbq.cn',
      tooltip: 'www.bilibili-wrbq.cn',
      expectedCodes: [200, 301, 302], timeout: 10000 },

    // ── 2/9 ────────────────────────────────────────────────
    { id: 'bot_cn', name: '机器人后台', method: 'GET',
      target: 'http://bot.bilibili-wrbq.cn',
      statusPageLink: 'http://bot.bilibili-wrbq.cn',
      tooltip: 'bot.bilibili-wrbq.cn',
      expectedCodes: [200, 301, 302], timeout: 10000 },

    // ── 3/9 ────────────────────────────────────────────────
    { id: 'botdocs_cn', name: '机器人文档', method: 'GET',
      target: 'http://botdocs.bilibili-wrbq.cn',
      statusPageLink: 'http://botdocs.bilibili-wrbq.cn',
      tooltip: 'botdocs.bilibili-wrbq.cn',
      expectedCodes: [200, 301, 302], timeout: 10000 },

    // ── 4/9 ────────────────────────────────────────────────
    { id: 'download_cn', name: '软件下载站', method: 'GET',
      target: 'http://download.bilibili-wrbq.cn',
      statusPageLink: 'http://download.bilibili-wrbq.cn',
      tooltip: 'download.bilibili-wrbq.cn',
      expectedCodes: [200, 301, 302], timeout: 10000 },

    // ── 5/9 ────────────────────────────────────────────────
    { id: 'miao_cn', name: 'miao 服务', method: 'GET',
      target: 'http://miao.bilibili-wrbq.cn',
      statusPageLink: 'http://miao.bilibili-wrbq.cn',
      tooltip: 'miao.bilibili-wrbq.cn',
      expectedCodes: [200, 301, 302], timeout: 10000 },

    // ── 6/9 ────────────────────────────────────────────────
    { id: 'wrbqos_cn', name: 'WRBQ OS', method: 'GET',
      target: 'http://wrbqos.bilibili-wrbq.cn',
      statusPageLink: 'http://wrbqos.bilibili-wrbq.cn',
      tooltip: 'wrbqos.bilibili-wrbq.cn',
      expectedCodes: [200, 301, 302], timeout: 10000 },

    // ── 7/9 ────────────────────────────────────────────────
    { id: 'www_top', name: '主站（top 域名）', method: 'GET',
      target: 'http://www.bilibili-wrbq.top',
      statusPageLink: 'http://www.bilibili-wrbq.top',
      tooltip: 'www.bilibili-wrbq.top',
      expectedCodes: [200, 301, 302], timeout: 10000 },

    // ── 8/9 ────────────────────────────────────────────────
    // NewAPI 网关：监控 /api/status 健康接口，并校验返回内容里的 "success":true
    // 注意：不要监控根路径 —— NewAPI 的根路径是前端静态页，
    // 后端服务或数据库挂了它照样返回 200，测不出真实故障。
    { id: 'api_top', name: 'API 接口（NewAPI）', method: 'GET',
      target: 'http://api.bilibili-wrbq.top/api/status',
      statusPageLink: 'http://api.bilibili-wrbq.top',
      tooltip: 'NewAPI 健康检查接口',
      expectedCodes: [200],
      responseKeyword: '"success":true',
      timeout: 15000 },

    // ── 9/9 ────────────────────────────────────────────────
    // Minecraft 服务器（Java 版），监控方式：TCP 端口探测
    //
    // 【为什么这里不写 mc.bilibili-wrbq.cn】
    // 你用的是 SRV 记录：
    //     _minecraft._tcp.mc.bilibili-wrbq.cn  →  frp-sun.com : 21433
    // 玩家在游戏里填 mc.bilibili-wrbq.cn 能连上，是因为客户端会自动查 SRV。
    // 但 UptimeFlare 的检测**不解析 SRV**，它只会直接连你写的那个地址。
    // 而 mc.bilibili-wrbq.cn 本身没有 A 记录（没有真实 IP），
    // 所以这里必须填 SRV 指向的真实地址：frp-sun.com:21433
    // ⚠️ 千万别改成 mc.bilibili-wrbq.cn:25565，那样会一直报宕机。
    { id: 'mc_server', name: 'Minecraft 服务器', method: 'TCP_PING',
      target: 'frp-sun.com:21433',
      tooltip: 'mc.bilibili-wrbq.cn（SRV 转发至 frp-sun.com:21433）',
      timeout: 8000 },

    // ↓↓↓ 下面是注释掉的写法示例，不生效，留着方便你以后照着加 ↓↓↓

    // 【再加一个端口监控】比如 SSH、数据库
    // { id: 'my_server_ssh', name: '服务器 SSH', method: 'TCP_PING', target: '1.2.3.4:22', timeout: 5000 },

    // 【再加一个网页监控】
    // { id: 'new_monitor', name: '新站点', method: 'GET', target: 'https://要监控的地址',
    //   expectedCodes: [200, 301, 302], timeout: 10000 },
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
