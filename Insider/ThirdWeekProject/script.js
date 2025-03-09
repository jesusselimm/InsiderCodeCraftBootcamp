$(document).ready(function() {
    const css = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f8f9fa;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px 0;
            background: linear-gradient(135deg, #6e45e2, #88d3ce);
            color: white;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .filters {
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .filter-btn {
            padding: 8px 16px;
            background-color: white;
            border: 1px solid #dee2e6;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
        }
        
        .filter-btn:hover, .filter-btn.active {
            background-color: #6e45e2;
            color: white;
            border-color: #6e45e2;
        }
        
        .products {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 25px;
        }
        
        .product-card {
            background-color: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        
        .product-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
        }
        
        .product-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .product-info {
            padding: 20px;
        }
        
        .product-name {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #333;
        }
        
        .product-category {
            display: inline-block;
            font-size: 12px;
            padding: 4px 10px;
            background-color: #f0f0f0;
            color: #666;
            border-radius: 30px;
            margin-bottom: 10px;
        }
        
        .product-price {
            font-size: 20px;
            font-weight: 700;
            color: #6e45e2;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .view-details {
            background-color: #6e45e2;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 13px;
            transition: background-color 0.3s;
        }
        
        .view-details:hover {
            background-color: #5a36c9;
        }
        
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
        }
        
        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal {
            background-color: white;
            border-radius: 10px;
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            transform: translateY(50px);
            transition: transform 0.5s;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .modal-overlay.active .modal {
            transform: translateY(0);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .modal-title {
            font-size: 22px;
            font-weight: 600;
            color: #333;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #999;
            transition: color 0.3s;
        }
        
        .close-modal:hover {
            color: #333;
        }
        
        .modal-body {
            padding: 20px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }
        
        .modal-image {
            width: 100%;
            border-radius: 8px;
            object-fit: cover;
        }
        
        .modal-details h3 {
            margin-bottom: 15px;
            color: #333;
            font-size: 20px;
        }
        
        .modal-price {
            font-size: 24px;
            font-weight: 700;
            color: #6e45e2;
            margin-bottom: 15px;
        }
        
        .modal-description {
            color: #666;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .features-list {
            list-style-type: none;
            margin-bottom: 20px;
        }
        
        .features-list li {
            padding: 8px 0;
            border-bottom: 1px dashed #f0f0f0;
            color: #666;
        }
        
        .features-list li:before {
            content: '✓';
            color: #6e45e2;
            margin-right: 10px;
        }
        
        .stock-info {
            display: inline-block;
            padding: 5px 10px;
            background-color: #e3f2fd;
            color: #1565c0;
            border-radius: 5px;
            font-size: 14px;
            margin-top: 10px;
        }
        
        .modal-footer {
            padding: 20px;
            border-top: 1px solid #f0f0f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .add-to-cart {
            background-color: #6e45e2;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .add-to-cart:hover {
            background-color: #5a36c9;
        }
        
        .specifications {
            margin-top: 20px;
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
        }
        
        .specifications p {
            margin: 5px 0;
            font-size: 14px;
            color: #666;
        }
        
        .spec-label {
            font-weight: bold;
            display: inline-block;
            width: 80px;
        }
        
        @media (max-width: 768px) {
            .modal-body {
                grid-template-columns: 1fr;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .header p {
                font-size: 1rem;
            }
        }
    `;
    
    $('<style>').text(css).appendTo('head');
    
    $('body').append(`
        <div class="container">
            <header>
                <h1>Ürün Kataloğu</h1>
                <p>En yeni ve en popüler ürünlerimizi keşfedin</p>
            </header>
            
            <div class="filters">
                <button class="filter-btn active" data-category="all">Tümü</button>
                <!-- Kategoriler dinamik olarak doldurulacak -->
            </div>
            
            <div class="products">
                <!-- Ürünler dinamik olarak doldurulacak -->
            </div>
        </div>
        
        <div class="modal-overlay">
            <div class="modal">
                <div class="modal-header">
                    <h2 class="modal-title">Ürün Detayı</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <!-- Ürün detayları dinamik olarak doldurulacak -->
                </div>
                <div class="modal-footer">
                    <div class="stock-info"></div>
                    <button class="add-to-cart">Sepete Ekle</button>
                </div>
            </div>
        </div>
    `);
    
    $.getJSON('products.json', function(data) {
        const products = data.products;
        const categories = ['all'];
        
        products.forEach(product => {
            if (!categories.includes(product.category)) {
                categories.push(product.category);
                $('.filters').append(`
                    <button class="filter-btn" data-category="${product.category}">${product.category}</button>
                `);
            }
        });
        
        products.forEach(product => {
            $('.products').append(`
                <div class="product-card" data-id="${product.id}" data-category="${product.category}">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-price">
                            <span>${product.price.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY'})}</span>
                            <button class="view-details">Detaylar</button>
                        </div>
                    </div>
                </div>
            `);
        });
        
        $('.filter-btn').click(function() {
            const category = $(this).data('category');
            
            $('.filter-btn').removeClass('active');
            $(this).addClass('active');
            
            if (category === 'all') {
                $('.product-card').show();
            } else {
                $('.product-card').hide();
                $(`.product-card[data-category="${category}"]`).show();
            }
        });
        
        $('.products').on('click', '.product-card, .view-details', function(e) {
            const productId = $(this).closest('.product-card').data('id');
            const product = products.find(p => p.id === productId);
            
            $('.modal-title').text(product.name);
            $('.modal-body').html(`
                <div>
                    <img src="${product.image}" alt="${product.name}" class="modal-image">
                </div>
                <div class="modal-details">
                    <div class="modal-price">${product.price.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY'})}</div>
                    <p class="modal-description">${product.details.description}</p>
                    
                    <h3>Özellikler</h3>
                    <ul class="features-list">
                        ${product.details.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    
                    <div class="specifications">
                        <p><span class="spec-label">Marka:</span> ${product.details.specifications.brand}</p>
                        <p><span class="spec-label">Model:</span> ${product.details.specifications.model}</p>
                        <p><span class="spec-label">Garanti:</span> ${product.details.specifications.warranty}</p>
                    </div>
                </div>
            `);
            
            $('.stock-info').text(`Stok Durumu: ${product.details.stock} adet`);
                
            $('.modal-overlay').addClass('active');
            
            $('body').css('overflow', 'hidden');
        });
        
        $('.close-modal, .modal-overlay').click(function(e) {
            if (e.target === this) {
                $('.modal-overlay').removeClass('active');
                $('body').css('overflow', 'auto');
            }
        });
        
        $('.add-to-cart').click(function() {
            alert('Ürün sepete eklendi!');
        });
        
        $('.product-card').hover(
            function() {
                $(this).find('.product-name').css('color', '#6e45e2');
            },
            function() {
                $(this).find('.product-name').css('color', '#333');
            }
        );
    }).fail(function() {
        $('.products').html('<p>Ürünler yüklenirken bir hata oluştu.</p>');
    });
}); 