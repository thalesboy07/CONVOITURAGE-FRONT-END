# 📱 Guide de Connexion - Convoiturage Universitaire

## Identifiants Pré-enregistrés

### 👨‍💼 Chauffeurs

Tous les chauffeurs utilisent le mot de passe: `password123`

| ID       | Nom                      | Véhicule            | Plaque        |
|----------|--------------------------|-------------------|-------------------|
| CH001    | Kofi Mensah              | Toyota Hiace      | TG-2024-001   |
| CH002    | Ama Osei                 | Mercedes Sprinter | TG-2024-002   |
| CH003    | Kwesi Boateng            | Ford Transit      | TG-2024-003   |
| CH004    | Akosua Acheampong        | Nissan Caravan    | TG-2024-004   |

**Exemple de connexion:**
- ID Chauffeur: `CH001`
- Mot de passe: `password123`

---

### 👤 Passagers

Tous les passagers utilisent le mot de passe: `password123`

| Email                              | Nom              | Université              |
|--------------------------------|----|--------------------------------|
| yao.kossivi@student.um.tg          | Yao Kossivi      | Université de Lomé      |
| abena.mensah@student.um.tg         | Abena Mensah     | Université de Kpalimé   |
| kwaku.owusu@student.ust.tg         | Kwaku Owusu      | Université des Sciences |
| nadia.diallo@student.um.tg         | Nadia Diallo     | Université de Lomé      |
| samuel.tete@student.um.tg          | Samuel Tété      | Université de Lomé      |

**Exemple de connexion:**
- Email: `yao.kossivi@student.um.tg`
- Mot de passe: `password123`

---

## 🚀 Trajets Disponibles

| Départ   | Arrivée    | Date         | Heure | Durée | Prix    |
|---------|-----------|------------|-------|--------|---------|
| Lomé    | Kpalimé   | 2026-02-20 | 08:00 | 2h30   | 15000 FCFA |
| Kara    | Kpalimé   | 2026-02-21 | 09:30 | 3h15   | 12000 FCFA |
| Sokodé  | Atakpamé  | 2026-02-22 | 07:00 | 2h00   | 14000 FCFA |
| Bassar  | Lomé      | 2026-02-20 | 10:00 | 4h30   | 18000 FCFA |
| Kpalimé | Mango     | 2026-02-23 | 11:00 | 5h00   | 20000 FCFA |

---

## 🔧 Configuration Serveur

**API Server Port:** `5000`
**Frontend Port:** `5174` (ou 5173)

L'application communique avec la base de données SQLite via l'API Express sur `http://localhost:5000`

---

## 📊 Architecture

```
Frontend (React + Vite)
        ↓
API Server (Express + SQLite)
        ↓
Database (database.db)
```

---

## 🎯 Fonctionnalités Disponibles

✅ Authentification des chauffeurs et passagers
✅ Consulter les trajets disponibles
✅ Rechercher par lieu départ/arrivée  
✅ Réserver un trajet
✅ Gérer les réservations (pour les chauffeurs)
✅ Noter/Évaluer les trajets
✅ Historique des trajets

---

Bon test! 🎉
