document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const stockFilter = document.getElementById('stockFilter');
    const resultsBody = document.getElementById('resultsBody');
    const noResults = document.getElementById('noResults');

    let allProducts = [];
    let categories = new Set();

    // Charger les données initiales
    loadInitialData();

    // Event listeners pour la recherche et les filtres
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    stockFilter.addEventListener('change', filterProducts);

    function loadInitialData() {
        fetch('api.php')
            .then(response => response.json())
            .then(products => {
                allProducts = products;
                
                // Collecter toutes les catégories uniques
                products.forEach(product => {
                    if (product.categorie) {
                        categories.add(product.categorie);
                    }
                });

                // Remplir le filtre des catégories
                
                // Afficher tous les produits initialement
                filterProducts();
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert('Erreur lors du chargement des produits');
            });
    }

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedStock = stockFilter.value;

        const filteredProducts = allProducts.filter(product => {
            // Filtre de recherche
            const matchesSearch = 
                product.nom.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.categorie.toLowerCase().includes(searchTerm);

            // Filtre de catégorie
            const matchesCategory = !selectedCategory || product.categorie === selectedCategory;

            // Filtre de stock
            let matchesStock = true;
            if (selectedStock) {
                const stock = parseInt(product.stock);
                switch (selectedStock) {
                    case 'low':
                        matchesStock = stock <= 5;
                        break;
                    case 'medium':
                        matchesStock = stock > 5 && stock <= 20;
                        break;
                    case 'high':
                        matchesStock = stock > 20;
                        break;
                }
            }

            return matchesSearch && matchesCategory && matchesStock;
        });

        displayResults(filteredProducts);
    }

    function displayResults(products) {
        resultsBody.innerHTML = '';
        
        if (products.length === 0) {
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';
        
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
            
            resultsBody.appendChild(row);
        });
    }

    // Fonctions globales pour les actions
    window.editProduct = function(id) {
        window.location.href = `add.html?id=${id}`;
    }

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
                    loadInitialData(); // Recharger les données
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

    const searchInput = document.getElementById('searchInput');
    const stockFilter = document.getElementById('stockFilter');
    const resultsBody = document.getElementById('resultsBody');
    const noResults = document.getElementById('noResults');

    let allProducts = [];
    let categories = new Set();

    // Charger les données initiales
    loadInitialData();

    // Event listeners pour la recherche et les filtres
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    stockFilter.addEventListener('change', filterProducts);

    function loadInitialData() {
        fetch('api.php')
            .then(response => response.json())
            .then(products => {
                allProducts = products;
                
                // Collecter toutes les catégories uniques
                products.forEach(product => {
                    if (product.categorie) {
                        categories.add(product.categorie);
                    }
                });

                // Remplir le filtre des catégories
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category;
                    option.textContent = category;
                    categoryFilter.appendChild(option);
                });

                // Afficher tous les produits initialement
                filterProducts();
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert('Erreur lors du chargement des produits');
            });
    }

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedStock = stockFilter.value;

        const filteredProducts = allProducts.filter(product => {
            // Filtre de recherche
            const matchesSearch = 
                product.nom.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.categorie.toLowerCase().includes(searchTerm);

            // Filtre de catégorie
            const matchesCategory = !selectedCategory || product.categorie === selectedCategory;

            // Filtre de stock
            let matchesStock = true;
            if (selectedStock) {
                const stock = parseInt(product.stock);
                switch (selectedStock) {
                    case 'low':
                        matchesStock = stock <= 5;
                        break;
                    case 'medium':
                        matchesStock = stock > 5 && stock <= 20;
                        break;
                    case 'high':
                        matchesStock = stock > 20;
                        break;
                }
            }

            return matchesSearch && matchesCategory && matchesStock;
        });

        displayResults(filteredProducts);
    }

    function displayResults(products) {
        resultsBody.innerHTML = '';
        
        if (products.length === 0) {
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';
        
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
            
            resultsBody.appendChild(row);
        });
    }

    // Fonctions globales pour les actions
    window.editProduct = function(id) {
        window.location.href = `add.html?id=${id}`;
    }

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
                    loadInitialData(); // Recharger les données
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
;
