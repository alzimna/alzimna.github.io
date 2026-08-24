function initModal() {
  // Get the modal
  const modal = document.getElementById("myModal");
  const detailElements = document.querySelectorAll(".project-card-button-detail, .carousel-card-button-detail");


  detailElements.forEach((button) => {
    button.addEventListener('click', () => {
      let container = button.closest(".project-card-container, .carousel-card-container");
      let modalheading = modal.querySelector(".modal-heading");
      let modalimagecontainer = modal.querySelector(".modal-image-container");
      let modaltechstackcontainer = modal.querySelector(".modal-techstack-container");
      let modaldesc = modal.querySelector(".modal-desc");
      let modalrepo = modal.querySelector(".modal-repo-btn");

      let cardheading = container.querySelector(".project-card-link, .carousel-card-link");
      modalheading.innerHTML = cardheading.innerHTML;

      let cardimage = container.getElementsByTagName('img')[0];
      let modalimage = cardimage.cloneNode(true);
      modalimage.style.height = "auto";
      modalimagecontainer.appendChild(modalimage);

      let cardtechstack = container.querySelector('.project-card-techstack-container, .carousel-card-techstack-container');
      modaltechstackcontainer.innerHTML = cardtechstack.innerHTML;

      let carddesc = container.querySelector(".project-card-desc, .carousel-card-desc");
      modaldesc.innerHTML = carddesc.innerHTML;

      let cardrepolink = container.querySelector(".project-card-blur-link").getAttribute('href');
      modalrepo.setAttribute('href', cardrepolink);
      modal.style.display = "flex";
    });
  });

  removeContent = () => {
    let modalheading = modal.querySelector(".modal-heading");
    let modalimagecontainer = modal.querySelector(".modal-image-container");
    let modaltechstackcontainer = modal.querySelector(".modal-techstack-container");
    let modaldesc = modal.querySelector(".modal-desc");
    let modalrepo = modal.querySelector(".modal-repo-btn");

    modalheading.innerHTML = "";
    modalimagecontainer.innerHTML = "";
    modaltechstackcontainer.innerHTML = "";
    modaldesc.innerHTML = "";
    modalrepo.setAttribute('href', '');
  }

  var xmark = document.getElementsByClassName("modal-button-x")[0];
  xmark.onclick = function () {
    modal.style.display = "none";
    removeContent();
  }

  var closebtn = document.getElementsByClassName("modal-button-close")[0];
  closebtn.onclick = function () {
    modal.style.display = "none";
    removeContent();
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      removeContent();
    }
  }
}