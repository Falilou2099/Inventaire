

# 📦 Inventaire - Application CRUD  

Ce projet est une application de gestion d’inventaire développée en **PHP & MySQL** avec une interface en **HTML, CSS et JavaScript**. Il permet d’ajouter, afficher, modifier et supprimer des produits via un système CRUD (Create, Read, Update, Delete).  

## 🚀 Fonctionnalités  

✅ Ajouter de nouveaux produits 📥  
✅ Modifier les informations des produits ✏️  
✅ Supprimer des produits 🗑️  
✅ Afficher la liste complète de l’inventaire 📋  
✅ Interface moderne et responsive avec HTML, CSS et JavaScript 🎨  

## 🛠️ Technologies utilisées  

- **Frontend :** HTML, CSS, JavaScript  
- **Backend :** PHP  
- **Base de données :** MySQL (gérée avec phpMyAdmin)  

## 📸 Aperçu  

![Screenshot 2025-03-09 095059](https://github.com/user-attachments/assets/cbb5ab9d-e2d0-4876-a385-cc2c037c68f3)
![Screenshot 2025-03-09 095117](https://github.com/user-attachments/assets/56a219f7-f694-4bc4-aeee-3f5df0bc6925)
![Screenshot 2025-03-09 095131](https://github.com/user-attachments/assets/74feae20-6d96-46a9-87d5-67cbd3996389)



## 📦 Installation et configuration  

### 1️⃣ Cloner le projet  
```bash
git clone https://github.com/Falilou2099/Inventaire.git
cd nom-du-repo
```

### 2️⃣ Importer la base de données  
1. Ouvrir **phpMyAdmin**  
2. Créer une base de données nommée **inventaire**  
3. Importer le fichier `inventaire.sql` (fourni dans le projet)  

### 3️⃣ Configurer la connexion à la base de données  
Dans `config.php` (ou un fichier similaire), configure tes accès MySQL :  
```php
$host = "localhost";
$dbname = "inventaire";
$username = "root";
$password = ""; // Mets ton mot de passe MySQL si nécessaire
$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
```

### 4️⃣ Lancer le projet  
Place le dossier dans ton serveur local (ex: **XAMPP/WAMP** dans `htdocs`), puis accède-y via :  
```bash
http://localhost/nom-du-projet/
```

## 📜 Licence  
Ce projet est open-source, tu peux l'utiliser et le modifier librement.  

---
