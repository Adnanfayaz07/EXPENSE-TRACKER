// Define the ul variable by selecting the <ul> element by its ID
const ul = document.getElementById("listofitems");

function savetolocaltostorage(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const email = event.target.email.value;
  const phonenumber = event.target.categories.value;
  const obj = {
     name, 
    email, 
    phonenumber
  };
  const token = localStorage.getItem('token');
  axios
    .post("http://localhost:3000/expense/add-expense", obj, { headers: { "Authorization": token } })
    .then((response) => {
      console.log(response)
  
      ShowUserOnScreen(response.data.expense);
    })
    .catch((err) => {
      showError(err);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem('token');
  axios
    .get("http://localhost:3000/expense/get-expense", { headers: { "Authorization": token } })
    .then((response) => {
      response.data.expenses.forEach(expense => {
        ShowUserOnScreen(expense);
      });
    })
    .catch((err) => {
      showError(err);
    });
});

function ShowUserOnScreen(expense) {
  console.log('Expense:', expense);
  if (expense && expense.name) {
    const li = document.createElement('li');
    li.innerHTML = `${expense.name} ${expense.email} ${expense.phonenumber}
      <button class="delete" onClick="deleteuser(${expense.id}, event)">Delete Product</button>`;
    ul.appendChild(li);
  } 
}





function edituserdetails(email, name, category, userid) {
  document.getElementById('nameusertag').value = name;
  document.getElementById('emailusertag').value = email;
  document.getElementById('categories').value = category;
  deleteuser(userid);
}

function deleteuser(id, e) {
  const token = localStorage.getItem('token');
  axios.delete(`http://localhost:3000/expense/delete-expense/${id}`, { headers: { "Authorization": token } }).then((res) => {
    console.log(res.data.message);
    const li = e.target.parentElement;
    ul.removeChild(li);
  }).catch((err) => {
    showError(err);
  });
}

function showError(err) {
  // Handle and display the error message in your UI
  console.error("Error:", err);
}