const carsInventory = [
  {
    brand: "Mazda",
    model: "3 HB",
    color: "Azul",
    year: "2018",
    price: "$263,000",
    photo:
      "https://images.kavak.services/images/43717/mazda-3-hb-i-touring2018-frontal-lateral-piloto-cercana-1618462465399.jpg?d=756x434",
    id: 0,
  },
  {
    brand: "Ford",
    model: "Edge Sport",
    color: "Negro",
    year: "2018",
    price: "$445,000",
    photo:
      "https://images.kavak.services/images/43788/EXTERIOR-frontal_lateral_piloto_cercana-16178954215625.jpg?d=540x310",
    id: 1,
  },
];

const d = document,
  w = window,
  $formTitle = d.querySelector(".form-title"),
  $form = d.querySelector(".aside-form"),
  $table = d.querySelector(".table-area"),
  $editorBtn = d.getElementById("add-btn"),
  $fragment = d.createDocumentFragment(),
  $template = d.querySelector("template").content;

let cars = JSON.parse(w.localStorage.getItem("inventory"));
console.log(cars);

//Read-GET
const readInventory = () => {
  cars.forEach((car, index) => {
    $template.querySelector(".brand").textContent = car.brand;
    $template.querySelector(".model").textContent = car.model;
    $template.querySelector(".color").textContent = car.color;
    $template.querySelector(".year").textContent = car.year;
    $template.querySelector(".price").textContent = car.price;
    $template.querySelector(".car-photo").setAttribute("src", `${car.photo}`);
    $template.querySelector(".edit-btn i").dataset.brand = car.brand;
    $template.querySelector(".edit-btn i").dataset.model = car.model;
    $template.querySelector(".edit-btn i").dataset.color = car.color;
    $template.querySelector(".edit-btn i").dataset.year = car.year;
    $template.querySelector(".edit-btn i").dataset.price = car.price;
    $template.querySelector(".edit-btn i").dataset.photo = car.photo;
    $template.querySelector(".edit-btn i").dataset.id = index;
    $template.querySelector(".delete-btn i").dataset.id = index;

    const $clone = $template.cloneNode(true);
    $fragment.appendChild($clone);
  });

  $table.appendChild($fragment);
};

d.addEventListener("DOMContentLoaded", readInventory, stopEvent);

/* Cargamos los usuarios una unica vez en el localStorage */

function stopEvent(e) {
  e.target.removeEventListener(e.type, stopEvent);
  w.localStorage.setItem("inventory", JSON.stringify(carsInventory));
}

/* Formulario */
d.addEventListener("submit", (e) => {
  if (e.target === $form) {
    e.preventDefault();

    let $inputBrand = d.getElementById("brand").value,
      $inputModel = d.getElementById("model").value,
      $inputColor = d.getElementById("color").value,
      $inputYear = d.getElementById("year").value,
      $inputPrice = d.getElementById("price").value,
      $inputPhoto = d.getElementById("photo").value;

    //Create-POST
    if ($formTitle.querySelector("h3").textContent === "Nuevo Auto") {
      $template.querySelector(".brand").textContent = $inputBrand;
      $template.querySelector(".model").textContent = $inputModel;
      $template.querySelector(".color").textContent = $inputColor;
      $template.querySelector(".year").textContent = $inputYear;
      $template.querySelector(".price").textContent = $inputPrice;
      $template
        .querySelector(".car-photo")
        .setAttribute("src", `${$inputPhoto}`);

      let index = 0;
      for (const key in cars) {
        index = Number(key) + 1;
      }

      $template.querySelector(".edit-btn i").dataset.brand = $inputBrand;
      $template.querySelector(".edit-btn i").dataset.model = $inputModel;
      $template.querySelector(".edit-btn i").dataset.color = $inputColor;
      $template.querySelector(".edit-btn i").dataset.year = $inputYear;
      $template.querySelector(".edit-btn i").dataset.price = $inputPrice;
      $template.querySelector(".edit-btn i").dataset.photo = $inputPhoto;
      $template.querySelector(".edit-btn i").dataset.id = index;
      $template.querySelector(".delete-btn i").dataset.id = index;

      const $clone = $template.cloneNode(true);
      $fragment.appendChild($clone);

      cars.push({
        brand: $inputBrand,
        model: $inputModel,
        color: $inputColor,
        year: $inputYear,
        price: $inputPrice,
        photo: $inputPhoto,
        id: index,
      });
    } else {
      //Update-PUT
      cars.forEach((car, index) => {
        if (e.target.id.value == index) {
          car.brand = $inputBrand;
          car.moderl = $inputModel;
          car.color = $inputColor;
          car.year = $inputYear;
          car.price = $inputPrice;
          car.photo = $inputPhoto;
        }
      });
    }

    w.localStorage.setItem("inventory", JSON.stringify(cars));
  }

  $table.appendChild($fragment);
  location.reload();
});

/* Botón Editar/Eliminar */
d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-btn i")) {
    $formTitle.style.background = "#60ec1b";
    $formTitle.querySelector("h3").textContent = "Modificar Auto";
    $editorBtn.value = "Editar Auto";
    $form.brand.value = e.target.dataset.brand;
    $form.model.value = e.target.dataset.model;
    $form.color.value = e.target.dataset.color;
    $form.year.value = e.target.dataset.year;
    $form.price.value = e.target.dataset.price;
    $form.photo.value = e.target.dataset.photo;
    $form.id.value = e.target.dataset.id;
    console.log($form.id.value);
  }

  if (e.target.matches(".delete-btn i")) {
    cars.forEach((car, index) => {
      if (e.target.dataset.id == index) {
        cars.splice(index, 1);
      }
    });

    w.localStorage.setItem("inventory", JSON.stringify(cars));
    location.reload();
  }
});
