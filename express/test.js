const carts = [{id:1, products:[{product:1, quantity:1}, {product:2, quantity:3}]},{id:2, products:[{product:1, quantity:4}, {product:2, quantity:5}]}]

const cartById = carts.find(p => p.id === 2)


console.log(cartById.products); 