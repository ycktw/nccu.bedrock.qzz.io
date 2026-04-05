window.app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    // 引入拆分出去的三大核心模組
    mixins: [authMixin, libraryMixin, adminMixin],
    i18n,
    data: {
        currentLocale: i18n.locale,
        gitHash: (window.__APP_GIT_HASH__ && window.__APP_GIT_HASH__ !== '__APP_GIT_HASH_VALUE__') ? window.__APP_GIT_HASH__ : 'dev',
        deployTime: (window.__APP_DEPLOY_TIME__ && window.__APP_DEPLOY_TIME__ !== '__APP_DEPLOY_TIME_VALUE__') ? window.__APP_DEPLOY_TIME__ : 'local',
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
        closeAllDialogs() {
            if (this.isModalOpen) this.closeModal();
            if (this.loginDialog) this.closeLoginDialog();
            if (this.borrowDialog) this.closeBorrowDialog();
            if (this.returnDialog) this.closeReturnDialog();
            if (this.newBookDialog) this.closeNewBookDialog();
            if (this.profileDialog) this.closeProfileDialog();

            this.logoutDialog = false;
            this.borrowHistoryDialog = false;
            this.opendayDialog = false;
            this.studentManageDialog = false;
            this.editBookDialog = false;
            this.adminManageDialog = false;
        },
        handleBeforeUnload(e) {
            // 如果已登入，防止使用者不小心關閉分頁或重整導致斷線
            if (this.isLoggedIn) {
                e.preventDefault();
                e.returnValue = '';
            }
        },
        handleKeydown(e) {
						if (e.key === 'Escape') {
							this.closeAllDialogs();
							return;
						}

						// 2. 判斷目前是否有任何對話框開啟
                        const isAnyDialogOpen = this.isModalOpen || this.loginDialog || this.logoutDialog ||
                                                            this.borrowDialog || this.returnDialog || this.newBookDialog ||
                                                            this.profileDialog || this.borrowHistoryDialog ||
                                                            this.opendayDialog || this.studentManageDialog ||
                                                            this.editBookDialog || this.adminManageDialog;
																	
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

