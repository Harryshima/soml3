document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");
  
    function fadeInOnScroll() {
      fadeElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
  
       
        if (rect.top < windowHeight - 100) {
          element.classList.add("show");
        } else {
          element.classList.remove("show"); 
        }
      });
    }
  
    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll(); 
  });


document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close");

  modal.style.display = "none"; 
  
  document.querySelectorAll(".zoomable").forEach(img => {
    img.addEventListener("click", function () {
      modal.style.display = "flex";
      modalImg.src = this.src;
    });
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close modal when clicking outside the image
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

  

  
  