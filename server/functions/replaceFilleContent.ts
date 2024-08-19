import { arraysEqual } from "./arraysEquals";
import { readFileSync, writeFileSync } from 'fs'

export const replaceFileContent = (filePath: string, oldStartLine: string, newValue: string): void => {
    const fileToRead = readFileSync(filePath, 'utf8')
    const content = fileToRead.split('\n')
    const newContentArray = content.map(line => {
        if (line.startsWith(oldStartLine) && !line.endsWith(newValue)) {
            console.log("\x1b[34mReplacing line:\x1b[0m", line, "\x1b[34mwith:\x1b[0m", `${oldStartLine}${newValue}`);
            console.log("\x1b[34mEnv file will be updated\x1b[0m")
            return `${oldStartLine}${newValue}`
        }
        return line
    })
    if (arraysEqual(content, newContentArray)) {
        console.log("\x1b[34mEnv file is already up to date!\x1b[0m")
    } else {
        console.log("\x1b[34mEnv file has been updated!\x1b[0m")
        writeFileSync(filePath, newContentArray.join('\n'), 'utf8')
    }
}