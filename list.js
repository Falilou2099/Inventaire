document.addEventListener('DOMContentLoaded', function() {
    loadProducts();

    function loadProducts() {
        fetch('api.php')
            .then(response => response.json())
            .then(products => {
                const productsList = document.getElementById('productsList');
                productsList.innerHTML = '';
                
                products.forEach(product => {
                    const row = document.createElement('tr');
                    
                    // Définir la classe de stock
                    let stockClass = '';
                    if (product.stock <= 5) {
                        stockClass = 'stock-low';
                    } else if (product.stock <= 20) {
                        stockClass = 'stock-medium';
                    } else {
                        stockClass = 'stock-high';
                    }
                    
                    row.innerHTML = `
                        <td>${product.nom}</td>
                        <td>${product.description}</td>
                        <td>${parseFloat(product.prix).toFixed(2)} €</td>
                        <td><span class="stock-indicator ${stockClass}">${product.stock}</span></td>
                        <td class="actions">
                            <button onclick="editProduct(${product.id})" class="edit-btn">
                                Modifier
                            </button>
                            <button onclick="deleteProduct(${product.id})" class="delete-btn">
                                Supprimer
                            </button>
                        </td>
                    `;
                    
                    productsList.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert('Erreur lors du chargement des produits');
            });
    }

    // Fonction pour éditer un produit
    window.editProduct = function(id) {
        window.location.href = `add.html?id=${id}`;
    }

    // Fonction pour supprimer un produit
    window.deleteProduct = function(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            fetch('api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'delete',
                    id: id
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Produit supprimé avec succès!');
                    loadProducts(); // Recharger la liste
                } else {
                    alert('Erreur lors de la suppression du produit');
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert('Erreur lors de la suppression du produit');
            });
        }
    }
});
