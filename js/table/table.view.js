const elements = {
  table: document.querySelector("#tbody"),
  select: document.querySelector("#productSelect"),
  topStatusBar: document.querySelector("#topStatusBar"),
  leftStatusBar:document.querySelectorAll("[data-role='left-status']"),
  leftPaneNav:document.querySelector(".left-panel__navigation"),
  badgeNew:document.querySelector("#badge-new")
};

function renderRequests(requests) {
  elements.table.innerHTML = "";

  const bages = {
    new: "badge-danger",
    inwork: "badge-warning",
    complete: "badge-success",
  };

  for (let request of requests) {
    const templete = `<tr>
                              <th scope="row">${request.id}</th>
                              <td>${request.date}</td>
                              <td>${request.productName}</td>
                              <td>${request.name}</td>
                              <td>${request.email}</td>
                              <td>${request.phone}</td>
                              <td>
                                    <div class="badge badge-pill ${
                                      bages[request.status]
                                    }">${request.statusName}</div>
                              </td>
                              <td>
                                    <a href="edit.html?id=${
                                      request.id
                                    }">Редактировать</a>
                              </td>
                        </tr>`;

    elements.table.insertAdjacentHTML("beforeend", templete);
  }
}

function upDateStatusLinks(value){
 elements.topStatusBar.querySelectorAll("a").forEach((link)=> {link.classList.remove("active")})
 elements.topStatusBar.querySelector(`a[data-value = "${value}"]`).classList.add("active")


 elements.leftStatusBar.forEach((link)=>link.classList.remove("active"))
 elements.leftPaneNav.querySelector(`a[data-value = "${value}"]`).classList.add("active")


}

function renderNewBadge(num){
  elements.badgeNew.innerText=num
  if (num === 0){ elements.badgeNew.classList.add("none")
  } else{elements.badgeNew.classList.remove("none")
}

}


function updateFilter(filter){

  elements.select.value= filter.products

  elements.topStatusBar.querySelectorAll("a").forEach((link)=> {link.classList.remove("active")})
  elements.topStatusBar.querySelector(`a[data-value = "${filter.status}"]`).classList.add("active")
 
  
 elements.leftStatusBar.forEach((link)=>link.classList.remove("active"))
 elements.leftPaneNav.querySelector(`a[data-value = "${filter.status}"]`).classList.add("active")

}


export { elements, renderRequests,upDateStatusLinks,renderNewBadge,updateFilter };
