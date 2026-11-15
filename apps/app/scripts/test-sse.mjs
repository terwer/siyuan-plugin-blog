import { createSSEParser } from "../utils/sse.ts"

const encoder = new TextEncoder()

const sample = [
  'data: {"choices":[{"delta":{"content":"## 核心摘要\\n\\n"}}]}',
  'data: {"choices":[{"delta":{"content":"- **信息栏**：展示 2–3 句话。"}}]}',
  'data: {"choices":[{"delta":{"content":"\\n\\n## 延伸思考\\n"}}]}',
  "data: [DONE]",
  "",
].join("\n")

const expected = "## 核心摘要\n\n- **信息栏**：展示 2–3 句话。\n\n## 延伸思考\n"

const readStream = (chunks) => {
  const decoder = new TextDecoder()
  const parsed = []
  const parser = createSSEParser((data) => {
    if (data === "[DONE]") {
      return
    }
    const obj = JSON.parse(data)
    parsed.push(obj.choices?.[0]?.delta?.content ?? obj.content ?? "")
  })

  for (const chunk of chunks) {
    parser.push(decoder.decode(chunk, { stream: true }))
  }
  parser.push(decoder.decode())
  parser.flush()

  return parsed.join("")
}

let failed = 0
const check = (name, actual, want) => {
  const ok = actual === want
  if (!ok) {
    failed++
  }
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`)
  if (!ok) {
    console.log(`  expected: ${JSON.stringify(want)}`)
    console.log(`  actual  : ${JSON.stringify(actual)}`)
  }
}

const bytes = encoder.encode(sample)
check("whole stream in one chunk", readStream([bytes]), expected)
check("byte by byte", readStream(Array.from(bytes, (b) => Uint8Array.of(b))), expected)

let splitFailed = 0
for (let cut = 1; cut < bytes.length; cut++) {
  const actual = readStream([bytes.slice(0, cut), bytes.slice(cut)])
  if (actual !== expected) {
    splitFailed++
    if (splitFailed <= 3) {
      console.log(`  split at byte ${cut} => ${JSON.stringify(actual)}`)
    }
  }
}
check(`split at every byte boundary (${bytes.length - 1} cases)`, splitFailed === 0 ? expected : "mismatch", expected)

const crlf = "data: {\"content\":\"第一行\\n第二行\"}\r\n\r\ndata: [DONE]\r\n\r\n"
const crlfExpected = "第一行\n第二行"
const crlfChunks = Array.from(encoder.encode(crlf), (b) => Uint8Array.of(b))
check("CRLF byte by byte", readStream(crlfChunks), crlfExpected)

const noSpace = 'data:{"content":"无空格"}\n\n'
check("data without space", readStream([encoder.encode(noSpace)]), "无空格")

const noTrailingNewline = 'data:{"content":"最后一行"}'
check("last line without newline", readStream([encoder.encode(noTrailingNewline)]), "最后一行")

const multiplePerRead = 'data:{"content":"A"}\n\ndata:{"content":"B"}\n\n'
check("multiple events in one read", readStream([encoder.encode(multiplePerRead)]), "AB")

const commentAndBlank = ': keep-alive\n\ndata:{"content":"C"}\n\n'
check("comment and blank lines ignored", readStream([encoder.encode(commentAndBlank)]), "C")

if (failed === 0) {
  console.log("ALL PASS")
  process.exit(0)
}

console.log(`${failed} FAILED`)
process.exit(1)
