class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._container = containerSelector;
        this._renderer = renderer;
    }

    renderItems() {
        this._renderedItems.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(element, isArray) {
        if (isArray) {
            this._container.append(element);
        } else {
            this._container.prepend(element);
        }
    }
}

export { Section };
