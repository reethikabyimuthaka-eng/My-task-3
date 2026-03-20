let users = [];

function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    if (email === "admin@gmail.com" && password === "1234") {
        alert("Login Successful");
    } else {
        alert("Invalid Login");
    }
}

function addUser() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let imageInput = document.getElementById("image");

    let reader = new FileReader();

    reader.onload = function () {
        let user = {
            name: name,
            email: email,
            image: reader.result
        };

        users.push(user);
        displayUsers();
    };

    if (imageInput.files[0]) {
        reader.readAsDataURL(imageInput.files[0]);
    }
}

function displayUsers() {
    let table = document.querySelector("#userTable tbody");
    table.innerHTML = "";

    users.forEach((user, index) => {
        let row = `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><img src="${user.image}"></td>
            <td>
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>
        </tr>
        `;
        table.innerHTML += row;
    });
}

function deleteUser(index) {
    if (confirm("Are you sure?")) {
        users.splice(index, 1);
        displayUsers();
    }
}

function editUser(index) {
    let user = users[index];

    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;

    deleteUser(index);
}