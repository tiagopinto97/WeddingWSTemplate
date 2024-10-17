const fs = require('fs');
import path from 'path';

export function loadFile(filename: string) {
    const filePath = path.join(process.cwd(), 'public', filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return fileContent;
}