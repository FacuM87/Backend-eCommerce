import {
  cartService,
  productService,
  ticketService,
} from "../services/index.repositories.js";

export const checkOutProcess = async (req, res) => {
  try {
    const userEmail = req.session.user.email;
    const cartId = req.session.user.cart;
    const cart = await cartService.getPopulatedCart(cartId);

    let totalAmount = 0;
    let productsToBuy = [];
    let otherProducts = [];
    for (const product of cart.products) {
        const productQuantity = product.quantity;
        const productId = product.product;

        const productInDB = await productService.getProductById(productId);

        const productStock = productInDB.stock;
        const productPrice = productInDB.price;

        if (productQuantity <= productStock) {
            const newProductStock = productStock - productQuantity;
            const changes = { stock: newProductStock };
            const updatedProduct = await productService.updateProduct(productId, changes);
            console.log(updatedProduct);

            totalAmount += productQuantity * productPrice;
            productsToBuy.push(product);
        } else {otherProducts.push(product)}
    }

    let ticket;
    if (totalAmount > 0) {
      ticket = await ticketService.createTicket(totalAmount, userEmail);
    } else {
      ticket = "No operation, no ticket";
    }

    const cartUpdated = await cartService.updateCart(cartId, otherProducts);
    console.log(cartUpdated);

    const result = [productsToBuy, otherProducts, ticket];
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const cartId = req.session.user.cart;
    const productId = req.params.pid;

    const cart = await cartService.getCartById(cartId);
    const product = await productService.getProductById(productId);

    if (!product) {
      console.log("Wrong Product ID");
      return;
    }

    if (!cart) {
      console.log("Wrong Cart ID");
      return;
    }

    const productIndex = cart.products.findIndex((p) =>
      p.product.equals(productId)
    );
    console.log(productIndex);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      const newProduct = {
        product: productId,
        quantity: 1,
      };
      cart.products.push(newProduct);
    }
    const result = await cart.save();
    console.log(result);
    res.send(cart);
  } catch (error) {
    console.log(error);
    res.send("Something went wrong while adding products to cart");
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid.toString();
    console.log(cartId);
    const productId = req.params.pid.toString();
    console.log(productId);

    const cart = await cartService.getCartById(cartId);
    console.log("Cart: " + cart);

    const newProducts = cart.products.filter(
      (product) => product.product != productId
    );
    console.log("New products array: " + newProducts);

    const deletingDocument = await cartService.updateCart(cartId, newProducts);

    res.send(deletingDocument);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const emptyCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartService.getCartById(cartId);

    const emptyCart = (cart.products = []);
    const emptyingCart = await cartService.updateCart(cartId, emptyCart);

    console.log(emptyingCart);
    res.send(emptyingCart);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const createCart = async (req, res) => {
  try {
    const cartCreated = await cartService.createNewCart();
    console.log(JSON.stringify(cartCreated));
    res.send("New cart has been created");
  } catch (error) {
    console.log(error);
    res.send("Something went wrong while creating new cart");
  }
};

export const changeProductQuantityInCart = async (req, res) => {
  try {
    const quantityToAdd = parseInt(req.body.quantity);
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const cart = await cartService.getCartById(cartId);

    const productToUpdate = cart.products.find((p) => p.product == productId);

    productToUpdate.quantity += quantityToAdd;
    console.log(productToUpdate);

    console.log(cart);

    const newQuantity = cart.products;

    const updatingCart = await cartService.updateCart(cartId, newQuantity);
    console.log(updatingCart);
    res.send(updatingCart);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const insertProductsToCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const newProducts = req.body;

    const updatedCart = await cartService.updateCart(cartId, newProducts);

    console.log(updatedCart);
    res.send(updatedCart);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
