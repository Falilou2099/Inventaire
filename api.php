<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');
header('Access-Control-Allow-Headers: Content-Type');

$db = new Database();

function validateProduct($data) {
    $errors = [];
    
    if (empty($data['nom'])) {
        $errors[] = "Le nom est requis";
    }
    if (!is_numeric($data['prix']) || $data['prix'] < 0) {
        $errors[] = "Le prix doit être un nombre positif";
    }
    if (!is_numeric($data['stock']) || $data['stock'] < 0) {
        $errors[] = "Le stock doit être un nombre positif";
    }
    
    return $errors;
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['action'])) {
            throw new Exception('Action non spécifiée');
        }

        switch ($data['action']) {
            case 'add':
                $errors = validateProduct($data);
                if (!empty($errors)) {
                    echo json_encode(['success' => false, 'errors' => $errors]);
                    exit;
                }
                
                $result = $db->addProduct(
                    $data['nom'],
                    $data['description'],
                    $data['prix'],
                    $data['stock']
                );
                echo json_encode(['success' => true, 'id' => $result]);
                break;

            case 'update':
                $errors = validateProduct($data);
                if (!empty($errors)) {
                    echo json_encode(['success' => false, 'errors' => $errors]);
                    exit;
                }
                
                $result = $db->updateProduct(
                    $data['id'],
                    $data['nom'],
                    $data['description'],
                    $data['prix'],
                    $data['stock']
                );
                echo json_encode(['success' => true]);
                break;

            case 'delete':
                $result = $db->deleteProduct($data['id']);
                echo json_encode(['success' => true]);
                break;

            case 'search':
                $results = $db->searchProducts($data['term']);
                echo json_encode($results);
                break;

            case 'filter':
                $results = $db->filterByStock($data['minStock']);
                echo json_encode($results);
                break;

            default:
                throw new Exception('Action non reconnue');
        }
    } else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $products = $db->getAllProducts();
        echo json_encode($products);
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
