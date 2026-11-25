export const actions = {
    openFilePicker: (_event, matchElement) => {
        const header = matchElement.closest('[data-region="header"]');
        const input = header?.querySelector('.header-file-input');
        if (!input) return;
        input.value = '';
        input.click();
    },

    handleFileSelect: (_event, matchElement) => {
        const header = matchElement.closest('[data-region="header"]');
        const file = matchElement.files?.[0];
        if (!file) return;

        const nameEl = header?.querySelector('.header-file-name');
        if (nameEl) nameEl.textContent = file.name;

        const log = document.getElementById('headerPreviewLog');
        if (log) log.textContent = `Selected file: ${file.name} (${file.size} bytes)`;
    },

    handleSelectChange: (_event, matchElement) => {
        const header = matchElement.closest('[data-region="header"]');
        const nameEl = header?.querySelector('.header-file-name');
        if (nameEl) nameEl.textContent = `${matchElement.value}.json`;

        const log = document.getElementById('headerPreviewLog');
        if (log) log.textContent = `Selected option: ${matchElement.value}`;
    },

    handleHeaderAction: (_event, matchElement) => {
        const actionName = matchElement.dataset.headerAction;
        const header = matchElement.closest('[data-region="header"]');
        const status = header?.querySelector('.header-status-pill');
        if (status) status.textContent = `Triggered: ${actionName}`;

        const log = document.getElementById('headerPreviewLog');
        if (log) log.textContent = `Action button clicked: ${actionName}`;
    }
};

export default actions;
