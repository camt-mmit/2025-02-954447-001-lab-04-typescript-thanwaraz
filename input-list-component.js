/**
 * Create input-list component.
 *
 * @param componentElem - container element ที่จะใส่ input list
 * @returns component element
 */
export function createComponent(componentElem) {
    // เลือก template ของ input component
    const templateElem = componentElem.querySelector('.app-tmp-number-component');
    if (!templateElem) {
        throw new Error('Template .app-tmp-number-component is not found');
    }
    // container สำหรับเก็บ input component ทั้งหมด
    const inputListContainer = templateElem.parentElement;
    if (!inputListContainer) {
        throw new Error('Template .app-tmp-number-component does not have parent');
    }
    // อัปเดตหมายเลข label และสถานะปุ่มลบ
    const regenerateTitleNumbersAndStatus = () => {
        const items = Array.from(inputListContainer.querySelectorAll('.app-cmp-number'));
        items.forEach((inputContainer, index) => {
            inputContainer
                .querySelectorAll('.app-title-number')
                .forEach((elem) => {
                elem.textContent = `${index + 1}`;
            });
            inputContainer
                .querySelectorAll('.app-cmd-remove-number-input')
                .forEach((elem) => {
                elem.disabled = items.length === 1;
            });
        });
    };
    // คำนวณผลรวม input ทั้งหมด
    const recalculateResult = () => {
        const result = Array.from(inputListContainer.querySelectorAll('.app-inp-number')).reduce((sum, elem) => {
            const input = elem;
            return sum + (Number.isNaN(input.valueAsNumber) ? 0 : input.valueAsNumber);
        }, 0);
        componentElem
            .querySelectorAll('.app-out-number')
            .forEach((elem) => {
            elem.textContent = result.toLocaleString();
        });
    };
    // สร้าง input component ใหม่จาก template
    const createInputComponent = () => {
        const fragment = templateElem.content.cloneNode(true);
        const inputContainer = fragment.firstElementChild;
        if (!inputContainer)
            return;
        inputContainer.addEventListener('click', (ev) => {
            const target = ev.target;
            if (target === null || target === void 0 ? void 0 : target.matches('.app-cmd-remove-number-input')) {
                inputContainer.remove();
                regenerateTitleNumbersAndStatus();
                recalculateResult();
            }
        });
        inputListContainer.append(inputContainer);
        regenerateTitleNumbersAndStatus();
        recalculateResult();
    };
    // Event delegation: change input
    inputListContainer.addEventListener('change', (ev) => {
        const target = ev.target;
        if (target === null || target === void 0 ? void 0 : target.matches('.app-inp-number')) {
            recalculateResult();
        }
    });
    // Event delegation: add input
    componentElem.addEventListener('click', (ev) => {
        const target = ev.target;
        if (target === null || target === void 0 ? void 0 : target.matches('.app-cmd-add-number-input')) {
            createInputComponent();
        }
    });
    // สร้าง input แรก
    createInputComponent();
    return componentElem;
}
