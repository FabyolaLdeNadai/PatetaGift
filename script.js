const videoQueue = [
  "https://i.ibb.co/DHGByKMf/Whats-App-Image-2025-05-11-at-03-09-33.jpg", // Foto 1
  "https://www.youtube.com/embed/2iYUpq573zE",                              // Vídeo 1
  "https://i.ibb.co/xKmzXZqZ/Whats-App-Image-2025-05-11-at-03-11-07.jpg",  // Foto 2
  "https://www.youtube.com/embed/CK2ZKMrLXCc"                               // Vídeo final
];

let encontrados = new Set();
let revealCount = 0;

function reveal(_, element) {
  if (encontrados.has(element) || revealCount >= videoQueue.length) return;

  encontrados.add(element);
  element.style.display = 'none';

  const link = videoQueue[revealCount];
  revealCount++;

  const videoModal = document.getElementById("videoModal");
  const modalContainer = document.getElementById("modalVideoContainer");

  let contentHTML = "";

  if (link.match(/\.(jpeg|jpg|png|gif)$/i) || link.includes("ibb.co") || link.includes("imgur")) {
    // Mostrar como imagem
    contentHTML = `<img src="${link}" alt="Imagem" style="max-width:100%; max-height:100%; border-radius: 10px;">`;
  } else {
    // Mostrar como vídeo
    contentHTML = `
      <iframe width="100%" height="100%" 
        src="${link}?autoplay=1" 
        frameborder="0" 
        allow="autoplay; encrypted-media" 
        allowfullscreen>
      </iframe>`;
  }

  modalContainer.innerHTML = contentHTML;
  videoModal.style.display = "flex";

  if (revealCount === videoQueue.length) {
    const cards = document.getElementById("cardsArea");
    cards.style.visibility = 'visible';
    cards.style.opacity = "1";
    cards.style.display = "grid";
    void cards.offsetWidth;
  }
}

function closeModal() {
  document.getElementById("videoModal").style.display = "none";
  document.getElementById("modalVideoContainer").innerHTML = ""; // Remove conteúdo para parar vídeo
  document.querySelectorAll('.heart').forEach((heart) => {
    if (!encontrados.has(heart)) {
      heart.style.display = 'inline-block';
    }
  });
}

document.getElementById("startButton").addEventListener("click", function () {
  document.getElementById("intro").remove();
  document.getElementById("gameArea").style.display = "block";
});
