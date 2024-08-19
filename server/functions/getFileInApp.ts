import { dirname } from 'path'

export const getFileInApp = (pathFromApp: string): string => {
    const filePath = dirname(__filename).replace("\\build\\functions", "").replace("server", pathFromApp)
    return filePath
}
