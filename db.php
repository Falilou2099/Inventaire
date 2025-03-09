<?php
require_once 'config.php';

class Database {
    private $conn;

    public function __construct() {
        try {
            $this->conn = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
                DB_USER,
                DB_PASS,
                array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            die("Erreur de connexion : " . $e->getMessage());
        }
    }

    public function addProduct($nom, $description, $prix, $stock) {
        try {
            $stmt = $this->conn->prepare(
                "INSERT INTO products (nom, description, prix, stock) 
                 VALUES (:nom, :description, :prix, :stock)"
            );
            
            $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
            $stmt->bindParam(':description', $description, PDO::PARAM_STR);
            $stmt->bindParam(':prix', $prix, PDO::PARAM_STR);
            $stmt->bindParam(':stock', $stock, PDO::PARAM_INT);
            
            $stmt->execute();
            return $this->conn->lastInsertId();
        } catch(PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function updateProduct($id, $nom, $description, $prix, $stock) {
        try {
            $stmt = $this->conn->prepare(
                "UPDATE products 
                 SET nom = :nom, 
                     description = :description, 
                     prix = :prix, 
                     stock = :stock 
                 WHERE id = :id"
            );
            
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
            $stmt->bindParam(':description', $description, PDO::PARAM_STR);
            $stmt->bindParam(':prix', $prix, PDO::PARAM_STR);
            $stmt->bindParam(':stock', $stock, PDO::PARAM_INT);
            
            return $stmt->execute();
        } catch(PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function deleteProduct($id) {
        try {
            $stmt = $this->conn->prepare("DELETE FROM products WHERE id = :id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            return $stmt->execute();
        } catch(PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function getAllProducts() {
        try {
            $stmt = $this->conn->query("SELECT * FROM products ORDER BY created_at DESC");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch(PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function searchProducts($term) {
        try {
            $stmt = $this->conn->prepare(
                "SELECT * FROM products 
                 WHERE nom LIKE :term 
                 OR description LIKE :term"
            );
            
            $searchTerm = "%{$term}%";
            $stmt->bindParam(':term', $searchTerm, PDO::PARAM_STR);
            $stmt->execute();
            
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch(PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function filterByStock($minStock) {
        try {
            $stmt = $this->conn->prepare(
                "SELECT * FROM products 
                 WHERE stock >= :minStock"
            );
            
            $stmt->bindParam(':minStock', $minStock, PDO::PARAM_INT);
            $stmt->execute();
            
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch(PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }
}
