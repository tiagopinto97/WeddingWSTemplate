import { decrypt } from "../../helpers/crypt";
import { loadFile } from "../../helpers/loadFile";

// API Route
export default function handler(req, res) {
    // Load data
    const encryptedInvites = loadFile('data1')

    try {
        // Decrypt data
        const invitesData = JSON.parse(decrypt(encryptedInvites));
        let invite = invitesData.find((i: any) => (i.code ?? '').toLowerCase() === (req.query.code ?? "").toString().toLowerCase())

        if (invite) {
            res.status(200).json(invite);
        } else {
            res.status(404).json(null);
        }

    } catch (error) {
        console.error('Decryption failed:', error);
        res.status(500).json({ error: 'Decryption failed' });
    }
}
