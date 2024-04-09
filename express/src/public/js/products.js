
document.getElementById("nextPageBtn").onclick = () =>{
    const nextPageValue = document.getElementById("nextPageValue").value
    const currentLimit = document.getElementById("currentLimit").value
    const currentQuery = document.getElementById("currentQuery").value

    const url = `/products/?page=${nextPageValue}&limit=${currentLimit}&query=${currentQuery}`
    document.location.href = url 
}

document.getElementById("prevPageBtn").onclick = () =>{
    const prevPageValue = document.getElementById("prevPageValue").value
    const currentLimit = document.getElementById("currentLimit").value
    const currentQuery = document.getElementById("currentQuery").value

    const url = `/products/?page=${prevPageValue}&limit=${currentLimit}&query=${currentQuery}`
    document.location.href = url
}

document.getElementById("limit").addEventListener("keyup", (e) =>{
    if(e.key === "Enter"){
        const limit = document.getElementById("limit").value
        const currentPage = document.getElementById("currentPage").value
        const currentQuery = document.getElementById("currentQuery").value

        const url = `/products/?page=${currentPage}&limit=${limit}&query=${currentQuery}`
        document.location.href = url
    }
})

document.getElementById("toPage").addEventListener("keyup", (e) =>{
    if(e.key === "Enter"){
        const currentLimit = document.getElementById("currentLimit").value
        const page = document.getElementById("toPage").value
        const currentQuery = document.getElementById("currentQuery").value
        
        const url = `/products/?page=${page}&limit=${currentLimit}&query=${currentQuery}`
        document.location.href = url
    }
})

document.getElementById("button-addon1").onclick = () =>{
    const currentLimit = document.getElementById("currentLimit").value
    const currentPage = document.getElementById("currentPage").value  
    const query = document.getElementById("query").value  

    const url = `/products/?page=${currentPage}&limit=${currentLimit}&query=${query}`
    document.location.href = url
}

document.getElementById("sort").onchange = () =>{
    const order = document.getElementById("sort").value
    console.log(order)
    const currentLimit = document.getElementById("currentLimit").value
    const currentPage = document.getElementById("currentPage").value 
    const currentQuery = document.getElementById("currentQuery").value

    const url = `/products/?page=${currentPage}&limit=${currentLimit}&query=${currentQuery}&sort=${order}`
    document.location.href = url
}

document.querySelectorAll(".addToCartBtn").forEach(button => {
    button.onclick = () => {
        const productId = button.parentElement.querySelector(".productId").value;
        const stock = button.parentElement.querySelector(".stock").value

        const counterContainer = button.parentElement.querySelector(".counterContainer") 
        const counterElement = counterContainer.querySelector(".counter")
        const counterValue = parseInt(counterElement.textContent)
        
        if (stock >0) {
            fetch(`/api/carts/cartId/product/${productId}`, { 
                method: "post",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ counterValue: counterValue })
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.status === "fail") {
                        const message = data.message
                        const small = document.createElement("small");
                        small.textContent = message;
                        small.classList.add("text-center")
                        button.insertAdjacentElement("afterend", small)
                        setTimeout(() => {
                            small.remove();
                        }, 4500)
                        return
                    }
                    const small = document.createElement("small");
                    small.textContent = "Product has been added to cart";
                    small.classList.add("text-center")
                    button.insertAdjacentElement("afterend", small)
                    setTimeout(() => {
                        small.remove();
                    }, 3500)
                })
                .catch(error => {
                    console.log("Error: " + error);
                });
        } else{
            const small = document.createElement("small")
            small.textContent = "Product couldnt be added to cart, no stock for the moment";
            small.classList.add("text-center")
            button.insertAdjacentElement("afterend", small)
        }
    };
});

document.querySelectorAll(".counterContainer").forEach(counterContainer => {
    const counterElement = counterContainer.querySelector(".counter")
    const incrementBtn = counterContainer.querySelector(".increment")
    const decrementBtn = counterContainer.querySelector(".decrement")

    const stock = counterContainer.parentElement.querySelector(".stock").value

    currentCount = parseInt(counterElement.textContent)
    currentStock = parseInt(stock)

    if (currentStock == 0){
        incrementBtn.disabled = true
        decrementBtn.disabled = true
        counterElement.textContent = "No Stock"
    } else {
        incrementBtn.disabled = false
        decrementBtn.disabled = false
    }

    incrementBtn.addEventListener("click", () =>{
        if (stock <= currentCount) { 
            return }
        currentCount++
        counterElement.textContent = currentCount
    })

    decrementBtn.addEventListener("click", () =>{
        if (currentCount == 1) { return }
        currentCount--
        counterElement.textContent = currentCount
    })
})

