const express = require('express');
const Cart = require('../models/cartModel');
const router = express.Router();

// get the car of an user
router.post('/get', async (req, res) => {
    const { username } = req.body;  // Extract userId and item from request body

    try {
      // Find the cart by userId
      let cart = await Cart.findOne({username});
  
      if (!cart) {
        return res.status(404).json({message: 'Cart not found for this user.'});
      }
      res.status(200).json({ message: 'Cart found', cart });
  
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

// add an item to the user's cart
router.post('/add', async (req, res) => {
    const { username, item } = req.body;  // Extract userId and item from request body
  
    try {
      // Find the cart by userId
      let cart = await Cart.findOne({ username });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found for this user.' });
      }
  
      // Check if the item already exists in the cart
      const existingItem = cart.items.find(cartItem => cartItem.title === item.title);
  
      if (existingItem) {
        // Item exists, just increase the quantity
        existingItem.quantity += 1;
      } else {
        // Item doesn't exist, add it to the cart
        cart.items.push({
          title: item.title,
          quantity: 1,
          price: item.price
        });
      }
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({ message: 'Item added to cart', cart });
  
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


// remove an item from the user's cart
router.post('/remove', async (req, res) => {
    const { username, item } = req.body;  // Extract username and item from request body
  
    try {
        // Find the cart by username
        let cart = await Cart.findOne({ username });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user.' });
        }

        // Check if the item exists in the cart
        const existingItem = cart.items.find(cartItem => cartItem.title === item.title);

        if (existingItem) {
            if (existingItem.quantity > 1) {
                // If more than one of the item, decrease the quantity
                existingItem.quantity -= 1;
            } else {
                // If only one, just remove the item from the cart
                cart.items = cart.items.filter(cartItem => cartItem.title !== item.title);
            }

            // Save the updated cart
            await cart.save();

            res.status(200).json({ message: 'Item removed from cart', cart});
        } else {
            res.status(404).json({ message: 'Item not found in the cart' });
        }

    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;