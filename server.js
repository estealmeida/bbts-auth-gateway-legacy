const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

// Login endpoint at cobra.com.br
app.post('/api/v1/auth/internal', (req, res) => {
    const { email, password } = req.body;
    
    // Security logging
    console.log(`Tentativa de login no domínio: ${process.env.COMPANY_DOMAIN}`);

    if (email === process.env.STAGING_ADMIN_USER && password === process.env.STAGING_ADMIN_PASS) {
        return res.status(200).json({ 
            token: "session_9283749283",
            message: "Acesso concedido ao ambiente BBTS" 
        });
    }
    
    res.status(401).json({ error: "Credenciais inválidas no sistema legacy" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Auth Service rodando na porta ${PORT}`));