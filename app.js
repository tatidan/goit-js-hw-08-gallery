const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

/*==Создание и рендер разметки по массиву данных galleryItems
===============из app.js и предоставленному шаблону.=====*/

const galleryNode = document.querySelector('.js-gallery');
const gallerySet = createGallerySet(galleryItems);

function createGallerySet(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a class="gallery__link"
            href="${ original }"
        >
          <img class="gallery__image"
            src="${ preview }"
            data-source="${ original }"
            alt="${ description }"
          />
        </a>
      </li>
      `;
    }).join('');
};

galleryNode.insertAdjacentHTML('afterbegin', gallerySet);

/*=======Реализация делегирования на галерее ul.js-gallery 
===============и получение url большого изображения.=====*/

const modalNode = document.querySelector('.lightbox');
const ovrlImageNode = document.querySelector('.lightbox__image');

galleryNode.addEventListener('click', onClickModalOpen);

function onClickModalOpen(event) {
  event.preventDefault();
  console.log(event.target);

/*=======Открытие модального окна по клику на элементе галереи=====*/
  modalNode.classList.add('is-open');
/*=======Подмена значения атрибута src элемента img.lightbox\*\*image.===*/
  ovrlImageNode.src = event.target.dataset.source;
  ovrlImageNode.alt = event.target.alt;

  window.addEventListener('keydown', onEscKeyPress);
}

/*=======Закрытие модального окна по клику на кнопку button=====*/

const closeBtnRef = document.querySelector('button[data-action="close-lightbox"]');
closeBtnRef.addEventListener('click', onClickModalClose);
console.log(closeBtnRef);

function onClickModalClose(event) {
  modalNode.classList.remove('is-open');
/*=====Очистка значения атрибута src элемента img.lightbox\*\*image.====*/
  ovrlImageNode.src = '';
  ovrlImageNode.alt = '';

  window.removeEventListener('keydown', onEscKeyPress);
}

/*=====Закрытие модального окна по клику на div.lightbox\_\_overlay.====*/

const lightboxOverlayNode = document.querySelector('.lightbox__overlay');
lightboxOverlayNode.addEventListener('click', onClickModalClose);

function onOverlayClickModalClose(event) {
  if (event.currentTarget === event.target) {
    onClickModalClose();
  }
}

/*=====Закрытие модального окна по нажатию клавиши ESC.=================*/

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onClickModalClose();
  }
}

/*===Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо" не реализовано.===*/