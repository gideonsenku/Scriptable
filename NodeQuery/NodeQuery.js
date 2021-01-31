const $ = importModule("Env")

let title = 'NodeQuery'
const preview = 'small' // 预览大小 可选:small,medium,large
const spacing = 3 // 间隙大小
// 填入你自己NodeQuery的API
const api = ""

const res = await getinfo()
await render()

async function render() {
  // create and show widget
  if (config.runsInWidget) {
    let widget = await createWidget(res)
    Script.setWidget(widget)
    Script.complete()
  } else {
    await createWidget(res)
  }
}

async function createWidget(server) {
  title = server.name
  const infoLine = []
  const load = server.load_percent
  const processes_array = server.processes_array
  const ram_total = Math.round(server.ram_total / Math.pow(1024, 2))
  const ram_usage = Math.round(server.ram_usage / Math.pow(1024, 2))
  const disk_total = Math.round(server.disk_total / Math.pow(1024, 3))
  const disk_usage = Math.round(server.disk_usage / Math.pow(1024, 3))
  const swap_total = Math.round(server.swap_total / Math.pow(1024, 2))
  const swap_usage = Math.round(server.swap_usage / Math.pow(1024, 2))
  infoLine[0] = `Load: ${load}%`
  infoLine[1] = `Swap: ${swap_usage}M of ${swap_total}M`
  infoLine[2] = `RAM: ${ram_usage}M of ${ram_total}M`
  infoLine[3] = `DISK: ${disk_usage}G of ${disk_total}G`
  processes_array.forEach(ele => {
    const command = ele.command.substr(0, 6)
    const count = ele.count
    const cpu = ele.cpu
    const memory = Math.round(ele.memory / Math.pow(1024, 2))
    infoLine.push(`${command}  ${count}  ${cpu}%  ${memory}M`)
  })
  const opts = {
    title,
    texts: {
      Line0: infoLine[0],
      Line1: infoLine[1],
      Line2: infoLine[2],
      Line3: infoLine[3],
      Line4: infoLine[4],
      Line5: infoLine[5],
      Line6: infoLine[6]
    },
    preview,
    spacing
  }
  let widget = await $.createWidget(opts)
  return widget
}

async function getid() {
  const url = "https://nodequery.com/api/servers?api_key=" + api
  const res = await $.get({ url })
  const id = res?.data[0][0]?.id
  return id
}

async function getinfo() {
  const id = await getid()
  const url = `https://nodequery.com/api/servers/${id}?api_key=` + api
  const res = await $.get({ url })
  return res?.data[0]
}
