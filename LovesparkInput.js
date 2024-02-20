const express = require('express');
const { google } = require('googleapis');

const app = express();
const PORT = 3000;

const credentials = require('./credentials.json');
const { client_email, private_key } = credentials;
const auth = new google.auth.JWT(client_email, null, private_key, ['https://www.googleapis.com/auth/spreadsheets']);
const sheets = google.sheets({ version: 'v4', auth });

app.post('/addData', express.json(), async (req, res) => {
    const { data } = req.body;

    try {
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: '1yw4opm-z5d_na3NbqZSmXS66SEUc1h13Oc19JlyL0bw',
            range: 'Sheet1!A1:A20',
            valueInputOption: 'RAW',
            requestBody: {
                values: [[data]]
            }
        });
        

        console.log('Data added to spreadsheet:', response.data);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error adding data to spreadsheet:', error);
        res.sendStatus(500);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});
