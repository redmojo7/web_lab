const express = require('express');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' folder

const base = '/app/files';

app.get('/', (req, res) => {
    const files = fs.readdirSync(base).filter(file => !file.startsWith('.') && file !== '..');
    const prefaceIndex = files.findIndex(file => file.includes("PREFACE"));
    const fileList = files.map(file => file.replace(/\.txt$/, ''));
    const sequencedFiles = files.map((file, index) => {
        file = file.replace(/\.txt$/, '');
        if (file.includes("PREFACE")) {
          return { file, index: 1 };
        } else if (file.includes("CHAPTER")) {
          return { file, index: 2 };
        } else {
          return { file, index: 0 };
        }
      });
    sequencedFiles.sort((a, b) => a.index - b.index);
    res.render('index', { files: sequencedFiles, file: sequencedFiles[0] }); // Render the 'index' view with the list of files
});

app.get('/file', (req, res) => {
    const file = req.query.file;
    const filePath = path.join(base, file);
    if (fs.existsSync(filePath)) {
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        res.render('file', { file: file, fileContents: fileContents }); // Render the 'file' view with the file name and contents
    } else {
        res.render('error', { message: 'File not found' }); // Render the 'error' view with an error message
    }
});

const port = 9300;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
