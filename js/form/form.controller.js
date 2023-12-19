import getRandomData from "./form.test-data.js";
import * as view from "./form.view.js";
import * as model from "./../model.js";

function init() {
  renderTastData();
  setUpEventListener();
}

function renderTastData() {
  const rendomData = getRandomData();
  console.log(rendomData);
  view.insertTestData(rendomData);
}



function setUpEventListener (){
      view.elements.form. addEventListener('submit', formSubmitHandler)
}

function formSubmitHandler(e){
      e.preventDefault()
      const formData = view.getFormInput()
      console.log(formData)
      model.addRequest(formData)
      view.clearForm()
      renderTastData()
}



init();
