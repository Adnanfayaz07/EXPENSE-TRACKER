function savetolocaltostorage(event){
    event.preventDefault();
    const name=event.target.name.value;
    const email=event.target.email.value;
    const phonenumber=event.target.categories.value;
    const obj = {
    name,
    email,
    phonenumber
    }
    axios
  .post("http://localhost:3000/expense/add-expense", obj)
  .then((response) => {
    console.log(response);
    ShowUserOnScreen(response.data.newuserdetail);
  })
  .catch((err) => {
    console.error(err);
  });
}

window.addEventListener("DOMContentLoaded", () => {
axios
  .get("http://localhost:3000/expense/get-expense")
  .then((response) => {
    for (var i = 0; i < response.data.alluser.length; i++) {
      ShowUserOnScreen(response.data.alluser[i]);
    }
  })
  .catch((err) => {
    console.error(err);
  });
});


function   ShowUserOnScreen(user){
const parentnode = document.getElementById("listofitems");
const childhtml = `<li id=${user.id}>${user.name}-${user.email}-${user.phonenumber}
    <button onclick="deleteuser('${user.id}')">Delete</button>
    <button onclick="edituserdetails('${user.email}', '${user.name}', '${user.phonenumber}', '${user.id}')">Edit</button>
    </li>`;
parentnode.innerHTML = parentnode.innerHTML + childhtml;
}

function edituserdetails(email, name, phonenumber, userid) {
document.getElementById('nameusertag').value = name;
document.getElementById('emailusertag').value = email;
document.getElementById('categories').value = phonenumber;
deleteuser(userid);
}

function deleteuser(userid) {
axios
  .delete(`http://localhost:3000/expense/delete-expense/${userid}`)
  .then((response) => {
    removeuserfromscreen(userid);
  })
  .catch((err) => {
    console.error(err);
  });
}

function removeuserfromscreen(userid) {
const parentnode = document.getElementById('listofitems');
const childnodetobedeleted = document.getElementById(userid);
if (childnodetobedeleted) {
  parentnode.removeChild(childnodetobedeleted);
}
}