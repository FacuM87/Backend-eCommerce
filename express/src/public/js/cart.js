document.querySelectorAll(".delProdIcon").forEach(icon => {
    icon.onclick = () => {
        const cartId = document.querySelector(".cartId").value
        console.log(cartId);

       document.querySelectorAll(".cartProductId").forEach(prodId => {
        const productId = prodId.value;

        fetch(`/api/carts/${cartId}/products/${productId}`, { method: "delete" })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                document.location.href = `/cart/${cartId}`;
            })
            .catch(error => {
                console.log("Error: " + error);
            });
        });
    }
}); 


const trashIcon = document.querySelector(".trashIcon")

if (trashIcon) {
    trashIcon.onclick = () => {
    
        const cartId = document.querySelector(".cartId").value
            console.log(cartId)
        
        fetch(`/api/carts/${cartId}`, { method: "delete" })
        .then(response => {return response.json();})
        .then(data => {
            console.log(data);
            document.location.href = `/cart/${cartId}`
        })
        .catch(error => {
            console.log("Error: " + error);
        });
    
    }
    
}
