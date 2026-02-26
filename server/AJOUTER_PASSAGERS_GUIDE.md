# 📝 Guide: Comment Ajouter des Passagers et Chauffeurs

## 🚀 3 Méthodes pour Ajouter des Données

---

## **Méthode 1: Script Interactif (Plus Facile)** ⭐

### Ajouter un Passager
```bash
cd C:\Users\HP\trading\server
node add-passenger.js
```

**Exemple d'exécution:**
```
✅ AJOUTER UN NOUVEAU PASSAGER
============================================================

Entrez les informations du passager:
(ID sera auto-généré: PASS006)

Nom complet: Marie Dupont
Email: marie.dupont@student.um.tg
Mot de passe (défaut: password123): monpassword
Téléphone (ex: +228 91 23 45 67): +228 91 55 66 77
Université (optionnel): Université de Locutu

✅ Passager ajouté avec succès!

Détails du passager:
  ID: PASS006
  Nom: Marie Dupont
  Email: marie.dupont@student.um.tg
  Mot de passe: monpassword
  Téléphone: +228 91 55 66 77
  Université: Université de Locutu
```

### Ajouter un Chauffeur
```bash
cd C:\Users\HP\trading\server
node add-driver.js
```

---

## **Méthode 2: API REST (Par Endpoint)**

### Ajouter un Passager via API

```bash
curl -X POST http://localhost:5000/api/passengers \
  -H "Content-Type: application/json" \
  -d '{
    "id": "PASS006",
    "name": "Marie Dupont",
    "email": "marie.dupont@student.um.tg",
    "password": "password123",
    "phone": "+228 91 55 66 77",
    "university": "Université de Locutu"
  }'
```

### Ajouter un Chauffeur via API

```bash
curl -X POST http://localhost:5000/api/drivers \
  -H "Content-Type: application/json" \
  -d '{
    "id": "CH005",
    "name": "Yaw Asante",
    "email": "yaw.asante@email.com",
    "password": "password123",
    "phone": "+228 92 11 22 33",
    "vehicle": "Honda Odyssey",
    "licensePlate": "TG-2024-005"
  }'
```

---

## **Méthode 3: Modification Directe de la BD**

### Avec SQLite Studio ou CLI

```sql
INSERT INTO passengers (id, name, email, password, phone, university) 
VALUES ('PASS006', 'Marie Dupont', 'marie.dupont@student.um.tg', 'password123', '+228 91 55 66 77', 'Université de Locutu');

INSERT INTO drivers (id, name, email, password, phone, vehicle, licensePlate) 
VALUES ('CH005', 'Yaw Asante', 'yaw.asante@email.com', 'password123', '+228 92 11 22 33', 'Honda Odyssey', 'TG-2024-005');
```

---

## 📋 Format des Données

### Passager (Minimum Requis)
```json
{
  "id": "PASS006",                          // Format: PASS + numéro
  "name": "Jean Martin",                    // Nom complet
  "email": "jean.martin@student.um.tg",     // Email unique
  "password": "password123",                // Au moins 4 caractères
  "phone": "+228 91 23 45 67",              // Optionnel
  "university": "Université de Lomé"        // Optionnel
}
```

### Chauffeur (Minimum Requis)
```json
{
  "id": "CH005",                            // Format: CH + numéro
  "name": "Kofi Mensah",                    // Nom complet
  "email": "kofi@email.com",                // Email unique
  "password": "password123",                // Au moins 4 caractères
  "phone": "+228 91 23 45 67",              // Requis
  "vehicle": "Toyota Hiace",                // Modèle du véhicule
  "licensePlate": "TG-2024-005"             // Plaque d'immatriculation
}
```

---

## ✅ Vérifier les Ajouts

### Afficher tous les passagers
```bash
cd C:\Users\HP\trading\server
node view-db.js
```

Vous verrez le nouveau passager/chauffeur dans la section "👤 PASSAGERS" ou "👨‍💼 CHAUFFEURS"

---

## 🔒 Points Importants

1. **ID unique**: Chaque ID doit être unique (PASS006, PASS007, CH005, etc.)
2. **Email unique**: Chaque email doit être unique
3. **Mot de passe par défaut**: Vous pouvez utiliser `password123`
4. **Format ID**: 
   - Passagers: `PASS` + chiffres (PASS001, PASS002, etc.)
   - Chauffeurs: `CH` + chiffres (CH001, CH002, etc.)

---

## 🎯 Recommandation

**Utilisez la Méthode 1 (Script Interactif)** car elle:
- ✅ Valide les données
- ✅ Génère les IDs automatiquement
- ✅ Est facile à utiliser
- ✅ Évite les doublons

---

**Bon ajout!** 🎉
