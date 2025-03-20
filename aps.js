const tg = window.Telegram.WebApp;
tg.expand();

const connectBtn = document.getElementById('connect-btn');
const submitBtn = document.getElementById('submit-btn');
const walletInput = document.getElementById('wallet-input');
const status = document.getElementById('status');

connectBtn.addEventListener('click', () => {
    walletInput.hidden = false;
    submitBtn.hidden = false;
    connectBtn.hidden = true;
});

submitBtn.addEventListener('click', () => {
    const wallet = walletInput.value.trim();
    const regex = /^(?:EQ|UQ|0:)[a-zA-Z0-9_-]{46,64}$/;

    if (regex.test(wallet)) {
        status.innerText = '✅ TON Cüzdan başarıyla bağlandı!';
        tg.MainButton.setText('Uygulamayı Kapat').show();
        tg.sendData(JSON.stringify({wallet}));
    } else {
        status.innerText = '❌ TON adresi geçersiz. Lütfen kontrol edin.';
    }
});

tg.MainButton.onClick(() => {
    tg.close();
});
