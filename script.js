function showData() {
    fetch('https://api.sirasak-saengaurai.com/product')
    .then(response => response.json())
    .then(data => loadData(data))
    function loadData(data) {
        for(let i = 0; i < data.length; i++) {
                document.getElementById('Mydata').innerHTML += `
            <tr>
                        <td>${data[i].ProductID}</td> 
                        <td>${data[i].ProductName}</td> 
                        <td>${data[i].UnitPrice}</td>
                        <td>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2" onclick="showDataEditID(${data[i].ProductID})">Edit</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal3" onclick="showDataDeleteID(${data[i].ProductID})">Delete</button>
                        </td>
                    </tr>
                `;
            };
    }
}
showData();

const formCreate = document.getElementById('formCreate');
formCreate.addEventListener('submit', function (e) {
    e.preventDefault();

    const prePayload = new FormData(formCreate);
    const payload = new URLSearchParams(prePayload);

    console.log([...payload]);

    fetch('https://api.sirasak-saengaurai.com/product', {
        method: "POST",
        body: payload,
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .then(() => {
            window.location.reload();
        })
        .catch(err => console.log(err));
    document.getElementById("formCreate").reset();
})

function showDataEditID(ProductID){
    fetch('https://api.sirasak-saengaurai.com/product/'+ProductID)
    .then(response => response.json())
    .then(data => loadDataEditID(data))
}

function loadDataEditID(data){
    document.getElementById('formEdit').innerHTML = ' '
    for(let i = 0; i < data.length; i++) {
    document.getElementById('formEdit').innerHTML += `
    
    <div class="mb-3">
              <label for="recipient-name" class="col-form-label">ProductID:</label>
              <input type="text" readonly class="form-control" id="recipient-name" name="ProductID" value="${data[i].ProductID}">
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">ProductName:</label>
              <input type="text" class="form-control" id="recipient-name" name="ProductName" value="${data[i].ProductName}">
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">UnitPrice:</label>
              <input type="text" class="form-control" id="recipient-name" name="UnitPrice" value="${data[i].UnitPrice}">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Edit</button>
            </div>
    `;
    }
}

const formEdit = document.getElementById('formEdit');
formEdit.addEventListener('submit', function (e) {
    e.preventDefault();

    const prePayload = new FormData(formEdit);
    const payload = new URLSearchParams(prePayload);

    console.log([...payload]);

    fetch('https://api.sirasak-saengaurai.com/product', {
        method: "PUT",
        body: payload,
    })
        .then(res => res.json())
        .then(() => {
            window.location.reload();
        })
        .catch(err => console.log(err));
    document.getElementById("formEdit").reset();
})


function showDataDeleteID(ProductID){
    fetch('https://api.sirasak-saengaurai.com/product/'+ProductID)
    .then(response => response.json())
    .then(data => loadDataDeleteID(data))
}

function loadDataDeleteID(data){
    document.getElementById('formDelete').innerHTML = ' '
    for(let i = 0; i < data.length; i++) {
    document.getElementById('formDelete').innerHTML += `
    
    <div class="mb-3">
              <label for="recipient-name" class="col-form-label">ProductID:</label>
              <input type="text" readonly class="form-control" id="recipient-name" name="ProductID" value="${data[i].ProductID}">
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">ProductName:</label>
              <input type="text" readonly class="form-control" id="recipient-name" name="ProductName" value="${data[i].ProductName}">
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">UnitPrice:</label>
              <input type="text" readonly class="form-control" id="recipient-name" name="UnitPrice" value="${data[i].UnitPrice}">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-danger" onclick=deleteProduct(${data[i].ProductID})>Delete</button>
            </div>
    `;
    }
}

function deleteProduct(ProductID){
    fetch('https://api.sirasak-saengaurai.com/product/'+ProductID, {
        method: 'DELETE'
    })
    .then(() => {
        window.location.reload();
    })
    // window.location.reload();
}



