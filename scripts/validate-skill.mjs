import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const skillsRoot = resolve('skills')
const expectedSkills = [
  'starryai',
  'starry-design-create',
  'starry-selection-edit',
  'starry-visual-compare',
  'starry-token-extract',
  'starry-fig-migrate'
]
const errors = []

const entries = await readdir(skillsRoot, { withFileTypes: true })
const skillNames = entries.filter(entry => entry.isDirectory()).map(entry => entry.name).sort()

for (const expected of expectedSkills) {
  if (!skillNames.includes(expected)) errors.push(`Missing skill directory: ${expected}`)
}

for (const skillName of skillNames) {
  const skillPath = resolve(skillsRoot, skillName, 'SKILL.md')
  let contents
  try {
    contents = await readFile(skillPath, 'utf8')
  } catch {
    errors.push(`${skillName}: missing SKILL.md`)
    continue
  }

  if (!contents.startsWith('---\n')) errors.push(`${skillName}: SKILL.md must begin with YAML frontmatter.`)
  if (!new RegExp(`^name:\\s*${skillName}\\s*$`, 'm').test(contents)) {
    errors.push(`${skillName}: frontmatter name must be "${skillName}".`)
  }
  if (!/^description:\s*.+$/m.test(contents)) errors.push(`${skillName}: skill must define a description.`)

  for (const token of ['openpencil', 'OpenPencil', '@open-pencil', 'OPENPENCIL_']) {
    if (contents.includes(token)) errors.push(`${skillName}: legacy OpenPencil token found: ${token}`)
  }

  if (skillName !== 'starry-fig-migrate' && !contents.includes('mcp.starryai.*')) {
    errors.push(`${skillName}: skill must route live-canvas work to mcp.starryai.*.`)
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`error: ${error}`)
  process.exit(1)
}

console.log(`Starry skill validation passed for ${skillNames.length} skill(s).`)
