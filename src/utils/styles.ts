type CSSProperties = {
      [K in keyof CSSStyleDeclaration]?: string;
    };

    type StyleObject = CSSProperties | Record<string, string>;

    export function applyStyles(element: HTMLElement, styles: StyleObject): void {
      Object.entries(styles).forEach(([property, value]: [string, string | undefined]) => {
        if (value !== undefined && value !== null) {
          element.style.setProperty(
            property.replace(/([A-Z])/g, '-$1').toLowerCase(),
            value
          );
        }
      });
    }
