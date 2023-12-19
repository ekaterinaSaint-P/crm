// let requests = [];
const requests = loadRequests();

class Request {
  constructor(id, name, phone, email, product) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.product = product;
    this.date = new Date().toISOString(); //дата в настояще времени
    this.status = "new";
  }
}

const products = {
  "course-html": "Курс по верстке",
  "course-js": "Курс по JavaScript",
  "course-vue": "Курс по VUE JS",
  "course-php": "Курс по PHP",
  "course-wordpress": "Курс по WordPress",
};

const statuses = {
  new: "Новая",
  inwork: "В работе",
  complete: "Завершена",
};
const filter = loadFilter()

function loadFilter(){
  let filter = {
    products: "all",
    status: "all",
  }
  if (localStorage.getItem("keyFilter")){
   filter = JSON.parse(localStorage.getItem("keyFilter"))
  }

  return filter
}

function changeFilter(prop, value) {
  filter[prop] = value;

  localStorage.setItem("keyFilter", JSON.stringify(filter));
  return filter;
}

function filterRequests(filter) {
  let filteredRequests;

  // products
  if (filter.products !== "all") {
    filteredRequests = requests.filter(
      (request) => request.product === filter.products
    );
  } else {
    filteredRequests = [...requests];
  }
  // status

  if (filter.status !== "all") {
    filteredRequests = filteredRequests.filter(
      (request) => request.status === filter.status
    );
  }
  return prepareRequests(filteredRequests);
}

function addRequest(formData) {
  //находим ID
  let id = requests.length > 0 ? requests[requests.length - 1]["id"] + 1 : 1;
  //если длина >0 то тогда послед элемен массива прибал 1 , иначе равно 0

  const request = new Request(
    id,
    formData.get("name"),
    formData.get("phone"),
    formData.get("email"),
    formData.get("product")
  );

  requests.push(request);

  saveRequests();
}

function saveRequests() {
  localStorage.setItem("keyRequests", JSON.stringify(requests));
}
function loadRequests() {
  return localStorage.getItem("keyRequests")
    ? JSON.parse(localStorage.getItem("keyRequests"))
    : [];
}

function getRequests() {
 const filterStorage= filterRequests(filter)
  return prepareRequests(filterStorage);
}

function prepareRequests(requests) {
  return requests.map((item) => {
    return {
      ...item,
      date: new Date(item.date).toLocaleDateString(),
      productName: products[item.product],
      statusName: statuses[item.status],
    };
  });
}

function getRequestsByID(id) {
  const request = requests.find((item) => {
    return item.id == id;
  });

  request.dateDate = new Date(request.date).toLocaleDateString();
  request.dateTime = new Date(request.date).toLocaleTimeString();

  return request;
}

function updateRequest(formData) {
  const request = getRequestsByID(formData.get("id"));

  request.name = formData.get("name");
  request.email = formData.get("email");
  request.phone = formData.get("phone");
  request.product = formData.get("product");
  request.status = formData.get("status");

  saveRequests();
}

function countNewRequests() {
  const newRequests = requests.filter((el) => el.status === "new");
  return newRequests.length;
}

function getFilter(){
  return {...filter}

}
export {
  addRequest,
  getRequests,
  getRequestsByID,
  updateRequest,
  changeFilter,
  filterRequests,
  countNewRequests,
  getFilter
};
