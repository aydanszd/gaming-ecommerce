const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/best-sellers', async (req, res) => {
    try {
        const products = await Product.find({ isBestSeller: true })
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/new-arrivals', async (req, res) => {
    try {
        const products = await Product.find({ isNewArrival: true })
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/on-sale', async (req, res) => {
    try {
        const products = await Product.find({ isOnSale: true })
            .sort({ discount: -1 })
            .limit(10);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.find({ 
            category: req.params.category 
        }).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const { 
            name, 
            title, 
            description, 
            price, 
            color, 
            image, 
            category,
            stock,
            isBestSeller,
            isNewArrival,
            isOnSale,
            salePrice,
            discount
        } = req.body;

        const product = new Product({
            name,
            title,
            description,
            price,
            color,
            image,
            category,
            stock: stock || 0,
            isBestSeller: isBestSeller || false,
            isNewArrival: isNewArrival || false,
            isOnSale: isOnSale || false,
            salePrice: salePrice || null,
            discount: discount || 0
        });

        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const { 
            name, 
            title, 
            description, 
            price, 
            color, 
            image, 
            category, 
            inStock,
            stock,
            isBestSeller,
            isNewArrival,
            isOnSale,
            salePrice,
            discount
        } = req.body;

        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product = await Product.findByIdAndUpdate(
            req.params.id,
            { 
                name, 
                title, 
                description, 
                price, 
                color, 
                image, 
                category, 
                inStock,
                stock,
                isBestSeller,
                isNewArrival,
                isOnSale,
                salePrice,
                discount
            },
            { new: true }
        );

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;