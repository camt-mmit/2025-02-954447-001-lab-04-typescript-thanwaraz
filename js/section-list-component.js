import { createComponent as createInputListComponent } from './input-list-component.js';
// ดึง element + ระบุ type
const sectionContainer = document.querySelector('#section-container');
const sectionTemplate = document.querySelector('#app-tmp-section');
// ฟังก์ชันสร้าง section ใหม่
export function addSection() {
    const fragment = sectionTemplate.content.cloneNode(true);
    const sectionElem = fragment.firstElementChild;
    sectionContainer.append(sectionElem);
    createInputListComponent(sectionElem);
    updateRemoveSectionButtons();
    return sectionElem;
}
// ฟังก์ชันอัปเดตชื่อ section ทั้งหมด
export function regenerateSectionTitles() {
    const sections = Array.from(sectionContainer.querySelectorAll('.app-cmp-section'));
    sections.forEach((section, index) => {
        const titleElem = section.querySelector('.app-section-title');
        if (titleElem) {
            titleElem.textContent = `section ${index + 1}`;
        }
    });
    updateRemoveSectionButtons();
}
// ฟังก์ชันอัปเดตสถานะปุ่มลบ section
function updateRemoveSectionButtons() {
    const sections = Array.from(sectionContainer.querySelectorAll('.app-cmp-section'));
    const disable = sections.length === 1;
    sections.forEach(section => {
        const btn = section.querySelector('.app-cmd-remove-section');
        if (btn)
            btn.disabled = disable;
    });
}
// Event listener ปุ่ม add/remove section
document.addEventListener('click', (ev) => {
    const target = ev.target;
    if (!target)
        return;
    // Add section
    if (target.matches('.app-cmd-add-section')) {
        addSection();
        regenerateSectionTitles();
    }
    // Delete section
    if (target.matches('.app-cmd-remove-section')) {
        const sectionElem = target.closest('.app-cmp-section');
        if (sectionElem) {
            sectionElem.remove();
            regenerateSectionTitles();
        }
    }
});
// โหลด section แรกตอนเริ่มหน้า
addSection();
regenerateSectionTitles();
//# sourceMappingURL=section-list-component.js.map