import { decrypt } from "../../helpers/crypt";
import { loadFile } from "../../helpers/loadFile";

// API Route
export default function handler(req, res) {
    const encryptedData = loadFile('data2')
    try {
        // Decrypt data
        const decryptedData = decrypt(encryptedData);
        res.status(200).json(JSON.parse(decryptedData));
    } catch (error) {
        console.error('Decryption failed:', error);
        res.status(500).json({ error: 'Decryption failed' });
    }
}
