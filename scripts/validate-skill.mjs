import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const skillPath = resolve('skills/starryai/SKILL.md')
const contents = await readFile(skillPath, 'utf8')
const errors = []

if (!contents.startsWith('---\n')) errors.push('SKILL.md must begin with YAML frontmatter.')
if (!/^name:\s*starryai\s*$/m.test(contents)) errors.push('Skill name must be "starryai".')
if (!/^description:\s*.+$/m.test(contents)) errors.push('Skill must define a description.')

for (const token of ['openpencil', 'OpenPencil', '@open-pencil', 'OPENPENCIL_']) {
  if (contents.includes(token)) errors.push(`Legacy OpenPencil token found: ${token}`)
}

if (!contents.includes('mcp.starryai.*')) {
  errors.push('Skill must route live-canvas work to mcp.starryai.*.')
}

if (errors.length > 0) {
  for (const error of errors) console.error(`error: ${error}`)
  process.exit(1)
}

console.log('Starry skill validation passed.')
