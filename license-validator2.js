// ============================================
// LISENSI SCRIPT - FLAMBONS KODE
// JANGAN UBAH KODE INI TANPA IZIN
// ============================================
(function() {
    'use strict';
    
    const VALID_HASH = 'a7f3b9c2d8e1f4a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1';
    const DEVELOPER_NAME = "Flambons Kode";
    const DEVELOPER_PHONE = "0838-6253-9034";
    
    function createHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16);
    }
    
    function validateLicense() {
        const scripts = document.querySelectorAll('script');
        let hasModification = false;
        
        for (let script of scripts) {
            const content = script.innerHTML || script.textContent;
            if (content.includes('Flambons Kode') || content.includes('0838-6253-9034')) {
                if (content.includes('VALID_HASH') || content.includes('DEVELOPER_NAME')) {
                    continue;
                }
                
                if (content.includes('Flambons Kode') && !content.includes('VALID_HASH')) {
                    if (!content.includes('Flambons Kode') || 
                        content.includes('Flambons Kode') && content.split('Flambons Kode').length > 2) {
                        hasModification = true;
                    }
                }
            }
        }
        
        return !hasModification;
    }
    
    function checkLicense() {
        if (typeof window.CONFIG === 'undefined') {
            showLicenseError('Konfigurasi tidak ditemukan! Script ini dilindungi lisensi.');
            return false;
        }
        
        if (window.CONFIG && window.CONFIG.DEVELOPER_NAME) {
            if (window.CONFIG.DEVELOPER_NAME !== DEVELOPER_NAME) {
                showLicenseError('Peringatan: Nama pengembang telah diubah! Script ini milik ' + DEVELOPER_NAME);
                return false;
            }
        }
        
        if (window.CONFIG && window.CONFIG.DEVELOPER_PHONE) {
            if (window.CONFIG.DEVELOPER_PHONE !== DEVELOPER_PHONE) {
                showLicenseError('Peringatan: Nomor WhatsApp telah diubah! Hubungi ' + DEVELOPER_PHONE + ' untuk lisensi resmi.');
                return false;
            }
        }
        
        if (!validateLicense()) {
            showLicenseError('Lisensi tidak valid! Script ini dilindungi hak cipta Flambons Kode.');
            return false;
        }
        
        console.log('✅ Lisensi valid - Script oleh Flambons Kode');
        return true;
    }
    
    function showLicenseError(message) {
        console.error('❌ ' + message);
        
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: monospace;
        `;
        
        errorDiv.innerHTML = `
            <div style="background: #ff0000; color: white; padding: 30px; border-radius: 10px; text-align: center; max-width: 90%;">
                <h2 style="margin:0 0 20px 0;">⚠️ LISENSI TIDAK VALID ⚠️</h2>
                <p style="margin: 10px 0;">${message}</p>
                <hr style="margin: 20px 0; border-color: rgba(255,255,255,0.3);">
                <p style="margin: 10px 0; font-size: 14px;">
                    Script ini sepenuhnya dikembangkan oleh:<br>
                    <strong>"Flambons Kode"</strong>
                </p>
                <p style="margin: 10px 0; font-size: 12px;">
                    Ada pertanyaan atau butuh jasa bisa hubungi kami di:<br>
                    <strong>WhatsApp: 0838-6253-9034</strong>
                </p>
                <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: white; color: #ff0000; border: none; border-radius: 5px; cursor: pointer;">
                    Reload Halaman
                </button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        throw new Error(message);
    }
    
    window.LicenseValidator = {
        check: checkLicense,
        getDeveloper: () => ({ name: DEVELOPER_NAME, phone: DEVELOPER_PHONE })
    };
    
    setTimeout(() => {
        if (!checkLicense()) {
            const containers = document.querySelectorAll('#produkContainer, .produk-grid');
            containers.forEach(container => {
                if (container) container.innerHTML = '';
            });
        }
    }, 100);
})();
