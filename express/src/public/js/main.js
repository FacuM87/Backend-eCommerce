

document.getElementById("cartIcon").onclick = () =>{
    const mainCartId = document.querySelector(".mainCartId").value
    console.log(mainCartId);

    if (!mainCartId) { return console.log("No cartId is available.") }

    document.location.href = `/cart/${mainCartId}`
}
