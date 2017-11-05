// @flow
import path from 'path'
import fs from 'fs'

type Path = string

export function log(msg: string) {
  console.log(msg)
}

// eslint-disable-next-line flowtype/no-weak-types
export function toErrorStack(err: Object) {
  if (err._babel && err instanceof SyntaxError) {
    return `${err.name}: ${err.message}\n${err.codeFrame}`
  }
  return err.stack
}

export function getOutputPath(output: Path, input: Path): Path {
  if (path.isAbsolute(output)) {
    return output
  }

  return path.resolve(path.dirname(input), output)
}

export function writeFileSync(outputPath: Path, code: string) {
  fs.writeFileSync(outputPath, code, 'utf-8')
}

export function relativeFromCwd(input: Path) {
  return path.relative(process.cwd(), input)
}

export function getDirAndBaseName(testPath: string) {
  const dirname = path.dirname(testPath)
  const basename = path.basename(testPath)

  return {
    dirname,
    basename,
  }
}

export function isAlreadyExist(input: Path) {
  try {
    const code = fs.readFileSync(input, 'utf-8')
    if (code.length === 0 || code.trim() === '') {
      return false
    }
    return true
  } catch (err) {
    return false
  }
}

export function resolveInputPath(input: ?string, eventPath: Path): Path {
  if (!input) {
    return eventPath
  }

  if (path.isAbsolute(input)) {
    return input
  }

  return path.resolve(path.dirname(eventPath), input)
}