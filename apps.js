window.app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    // 引入拆分出去的三大核心模組
    mixins: [authMixin, libraryMixin, adminMixin],
    i18n,
    data: {
        currentLocale: i18n.locale,
    },
    watch: {
        currentLocale(newLang) {
            this.$i18n.locale = newLang;
            localStorage.setItem('lib_lang', newLang);
        },
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeydown);
        window.addEventListener('beforeunload', this.handleBeforeUnload);
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.handleKeydown);
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    },
    methods: {
        handleBeforeUnload(e) {
            // 如果已登入，防止使用者不小心關閉分頁或重整導致斷線
            if (this.isLoggedIn) {
                e.preventDefault();
                e.returnValue = '';
            }
        },
        handleKeydown(e) {
						if (e.key === 'Escape') {
							// ... (前面省略)
							if (this.isModalOpen) this.closeModal();
							if (this.studentManageDialog) this.studentManageDialog = false;
							if (this.editBookDialog) this.editBookDialog = false;
							if (this.adminManageDialog) this.adminManageDialog = false; // 👈 補上這行
							return; 
						}

						// 2. 判斷目前是否有任何對話框開啟
						const isAnyDialogOpen = this.isModalOpen || this.loginDialog || this.logoutDialog || 
																	this.borrowDialog || this.returnDialog || this.newBookDialog || 
																	this.profileDialog || this.borrowHistoryDialog || 
																	this.opendayDialog || this.studentManageDialog ||
																	this.editBookDialog || 
																	this.adminManageDialog; // 👈 補上這行
																	
						const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
            const isUserTyping = activeTag === 'input' || activeTag === 'textarea';

            // 如果有對話框開啟，或是使用者正在輸入文字，就不觸發左右鍵換頁
            if (isAnyDialogOpen || isUserTyping) {
                return;
            }

            // 3. 左右方向鍵切換分頁
            if (e.key === 'ArrowLeft') {
                if (this.page > 1) this.page--;
            } else if (e.key === 'ArrowRight') {
                if (this.page < this.pageCount) this.page++;
            }
        },
    }
});

