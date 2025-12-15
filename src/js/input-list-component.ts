/**
 * Create input-list component.
 *
 * @param componentElem - container element ที่จะใส่ input list
 * @returns component element
 */
export function createComponent(componentElem: HTMLElement): HTMLElement {
  // เลือก template ของ input component
  const templateElem = componentElem.querySelector(
    '.app-tmp-number-component'
  ) as HTMLTemplateElement | null;

  if (!templateElem) {
    throw new Error('Template .app-tmp-number-component is not found');
  }

  // container สำหรับเก็บ input component ทั้งหมด
  const inputListContainer = templateElem.parentElement as HTMLElement | null;

  if (!inputListContainer) {
    throw new Error('Template .app-tmp-number-component does not have parent');
  }

  // อัปเดตหมายเลข label และสถานะปุ่มลบ
  const regenerateTitleNumbersAndStatus = (): void => {
    const items = Array.from(
      inputListContainer.querySelectorAll('.app-cmp-number')
    ) as HTMLElement[];

    items.forEach((inputContainer, index) => {
      inputContainer
        .querySelectorAll('.app-title-number')
        .forEach((elem) => {
          (elem as HTMLElement).textContent = `${index + 1}`;
        });

      inputContainer
        .querySelectorAll('.app-cmd-remove-number-input')
        .forEach((elem) => {
          (elem as HTMLButtonElement).disabled = items.length === 1;
        });
    });
  };

  // คำนวณผลรวม input ทั้งหมด
  const recalculateResult = (): void => {
    const result = Array.from(
      inputListContainer.querySelectorAll('.app-inp-number')
    ).reduce((sum, elem) => {
      const input = elem as HTMLInputElement;
      return sum + (Number.isNaN(input.valueAsNumber) ? 0 : input.valueAsNumber);
    }, 0);

    componentElem
      .querySelectorAll('.app-out-number')
      .forEach((elem) => {
        (elem as HTMLElement).textContent = result.toLocaleString();
      });
  };

  // สร้าง input component ใหม่จาก template
  const createInputComponent = (): void => {
    const fragment = templateElem.content.cloneNode(true) as DocumentFragment;
    const inputContainer = fragment.firstElementChild as HTMLElement | null;

    if (!inputContainer) return;

    inputContainer.addEventListener('click', (ev: MouseEvent) => {
      const target = ev.target as HTMLElement | null;
      if (target?.matches('.app-cmd-remove-number-input')) {
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
  inputListContainer.addEventListener('change', (ev: Event) => {
    const target = ev.target as HTMLElement | null;
    if (target?.matches('.app-inp-number')) {
      recalculateResult();
    }
  });

  // Event delegation: add input
  componentElem.addEventListener('click', (ev: MouseEvent) => {
    const target = ev.target as HTMLElement | null;
    if (target?.matches('.app-cmd-add-number-input')) {
      createInputComponent();
    }
  });

  // สร้าง input แรก
  createInputComponent();

  return componentElem;
}
