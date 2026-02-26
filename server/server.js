const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes de démonstration (sans base de données)
app.get('/api/health', (req, res) => {
  res.json({ status: 'Serveur actif (mode déconnecté de la BD)' });
});

// ==================== DÉMARRAGE DU SERVEUR ====================

app.listen(PORT, () => {
  console.log(`✓ Serveur API lancé sur http://localhost:${PORT}`);
  console.log(`✓ CORS activé pour http://localhost:5174`);
  console.log(`⚠ Mode déconnecté: La base de données a été supprimée`);
});
