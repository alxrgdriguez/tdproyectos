// src/scripts/gallery.js

export class ProjectGallery {
  constructor() {
    this.modal = document.querySelector('[data-modal]');
    this.modalImg = document.querySelector('[data-modal-image]');
    this.prevBtn = document.querySelector('[data-prev]');
    this.nextBtn = document.querySelector('[data-next]');
    this.closeBtn = document.querySelector('[data-close]');
    this.loadMoreBtn = document.querySelector('[data-load-more]');
    this.grid = document.querySelector('[data-gallery-grid]');
    this.items = document.querySelectorAll('[data-gallery-item]');

    this.currentIndex = 0;

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Apertura de modal
    this.items.forEach((item, index) => {
      item.addEventListener('click', () => this.openModal(index));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openModal(index);
        }
      });
    });

    // Cargar más
    if (this.loadMoreBtn) {
      this.loadMoreBtn.addEventListener('click', () => this.loadMore());
    }

    // Modal
    if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.closeModal());
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevImage());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextImage());
    if (this.modal) this.modal.addEventListener('click', (e) => e.target === this.modal && this.closeModal());

    // Teclado
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
  }

  openModal(index) {
    this.currentIndex = index;
    const img = this.items[index].querySelector('img');
    // Versión de alta calidad
    this.modalImg.src = img.src.replace('w-600', 'w-1200').replace('q-80', 'q-95');
    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) < 0 ? this.items.length - 1 : this.currentIndex - 1;
    this.openModal(this.currentIndex);
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.openModal(this.currentIndex);
  }

  loadMore() {
    this.items.forEach(item => {
      if (item.classList.contains('hidden')) {
        item.classList.remove('hidden');
        const img = item.querySelector('img');
        img.src = img.src; // Forzar carga
      }
    });
    this.loadMoreBtn.classList.add('hidden');
  }

  handleKeydown(e) {
    if (this.modal.classList.contains('hidden')) return;
    if (e.key === 'Escape') this.closeModal();
    if (e.key === 'ArrowLeft') this.prevImage();
    if (e.key === 'ArrowRight') this.nextImage();
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('astro:page-load', () => {
  if (document.querySelector('[data-gallery-grid]')) {
    new ProjectGallery();
  }
});