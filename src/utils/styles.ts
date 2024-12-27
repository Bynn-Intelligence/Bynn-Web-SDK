export function applyStyles(element: HTMLElement, styles: Partial<CSSStyleDeclaration> | Record<string, string>): void {
  Object.assign(element.style, styles);
}