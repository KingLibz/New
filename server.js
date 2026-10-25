
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 10000;
const distPath = path.join(__dirname, 'dist');
app.use(express.json());
app.use(express.static(distPath));
let proposals = [];
app.get('/api/pipeline',(req,res)=>res.json({proposals}));
app.post('/api/proposal',(req,res)=>{const p={id:Date.now(),...req.body}; proposals.push(p); res.json(p);});
app.get('/health',(req,res)=>res.send('DEMASH REAL LIVE 10000 TEKCE 24I5893858 AHM mnpixfvf V3 FULL'));
app.get('*',(req,res)=>{const index=path.join(distPath,'index.html'); if(fs.existsSync(index)) res.sendFile(index); else res.send('Building...');});
app.listen(PORT,()=>console.log(`DEMASH REAL LIVE ${PORT} TEKCE 24I5893858 AHM mnpixfvf V3 FULL FUNCTIONAL`));
