const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

//  (PROTECTED)
router.get('/', auth, async (req, res) => {
    try {
        console.log(' Getting cart for user:', req.userId);
        
        // RELATION
        let cart = await Cart.findOne({ user: req.userId })
            .populate('items.product', 'name title price image');

        if (!cart) {
            return res.json({ items: [], totalPrice: 0 });
        }

        res.json(cart);
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/add', auth, async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        console.log('Add to cart request:', { 
            userId: req.userId, 
            productId, 
            quantity 
        });

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            console.error(' Product not found:', productId);
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log(' Product found:', product.name);

        // İstifadəçinin səbətini tap
        let cart = await Cart.findOne({ user: req.userId });

        if (!cart) {
            console.log('Creating new cart for user:', req.userId);
            cart = new Cart({
                user: req.userId,
                items: []
            });
        }
        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if (existingItem) {
            console.log(' Updating existing item quantity');
            existingItem.quantity += quantity;
        } else {
            console.log(' Adding new item to cart');
            cart.items.push({
                product: productId,
                quantity,
                price: product.isOnSale && product.salePrice ? product.salePrice : product.price
            });
        }

        cart.calculateTotal();
        await cart.save();

        console.log('Cart saved successfully');

        await cart.populate('items.product', 'name title price image');

        res.json(cart);
    } catch (error) {
        console.error(' Add to cart error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.put('/update/:productId', auth, async (req, res) => {
    try {
        const { quantity } = req.body;
        const { productId } = req.params;

        console.log('🔄 Update cart item:', { productId, quantity });

        if (quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }

        const cart = await Cart.findOne({ user: req.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        item.quantity = quantity;
        cart.calculateTotal();
        await cart.save();

        await cart.populate('items.product', 'name title price image');
        res.json(cart);
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.delete('/remove/:productId', auth, async (req, res) => {
    try {
        const { productId } = req.params;

        console.log(' Remove from cart:', productId);

        const cart = await Cart.findOne({ user: req.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        cart.calculateTotal();
        await cart.save();

        await cart.populate('items.product', 'name title price image');
        res.json(cart);
    } catch (error) {
        console.error(' Remove from cart error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.delete('/clear', auth, async (req, res) => {
    try {
        console.log(' Clearing cart for user:', req.userId);

        const cart = await Cart.findOne({ user: req.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.json({ message: 'Cart cleared', cart });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;