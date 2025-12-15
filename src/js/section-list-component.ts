import { createComponent as createInputListComponent } from './input-list-component.js';

// ดึง element + ระบุ type
const sectionContainer = document.querySelector('#section-container') as HTMLElement;
const sectionTemplate = document.querySelector('#app-tmp-section') as HTMLTemplateElement;

// ฟังก์ชันสร้าง section ใหม่
export function addSection(): HTMLElement {
  const fragment = sectionTemplate.content.cloneNode(true) as DocumentFragment;
  const sectionElem = fragment.firstElementChild as HTMLElement;

  sectionContainer.append(sectionElem);
  createInputListComponent(sectionElem);
  updateRemoveSectionButtons();

  return sectionElem;
}


// ฟังก์ชันอัปเดตชื่อ section ทั้งหมด
export function regenerateSectionTitles(): void {
  const sections = Array.from(
    sectionContainer.querySelectorAll('.app-cmp-section')
  ) as HTMLElement[];

  sections.forEach((section, index) => {
    const titleElem = section.querySelector('.app-section-title') as HTMLElement | null;
    if (titleElem) {
      titleElem.textContent = `section ${index + 1}`;
    }
  });

  updateRemoveSectionButtons();
}

// ฟังก์ชันอัปเดตสถานะปุ่มลบ section
function updateRemoveSectionButtons(): void {
  const sections = Array.from(
    sectionContainer.querySelectorAll('.app-cmp-section')
  ) as HTMLElement[];

  const disable = sections.length === 1;

  sections.forEach(section => {
    const btn = section.querySelector(
      '.app-cmd-remove-section'
    ) as HTMLButtonElement | null;

    if (btn) btn.disabled = disable;
  });
}

// Event listener ปุ่ม add/remove section
document.addEventListener('click', (ev: MouseEvent) => {
  const target = ev.target as HTMLElement | null;
  if (!target) return;

  // Add section
  if (target.matches('.app-cmd-add-section')) {
    addSection();
    regenerateSectionTitles();
  }

  // Delete section
  if (target.matches('.app-cmd-remove-section')) {
    const sectionElem = target.closest('.app-cmp-section') as HTMLElement | null;
    if (sectionElem) {
      sectionElem.remove();
      regenerateSectionTitles();
    }
  }
});

// โหลด section แรกตอนเริ่มหน้า
addSection();
regenerateSectionTitles();
