import { galleryItems } from "./gallery-items.js";
// Change code below this line
const ulGallery = document.querySelector(".gallery");

ulGallery.innerHTML = createGallery(galleryItems);

ulGallery.addEventListener("click", onImgClick);

function createGallery(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
      <a class="gallery__link" href=${original}>
        <img
          class="gallery__image"
          src=${preview}
          data-source=${original}
          alt=${description}
        />
      </a>
    </li>
    `;
    })
    .join("");
}

function onImgClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  const targetImg = e.target;

  const instance = basicLightbox.create(`
    <img src=${targetImg.dataset.source} alt=${targetImg.alt}></img>
  `);

  instance.show(() => {
    const onModalKeydown = (e) => {
      if (e.code === "Escape") {
        document.removeEventListener("keydown", onModalKeydown);
        instance.close();
        return;
      }
    };

    document.addEventListener("keydown", onModalKeydown);
  });
}
