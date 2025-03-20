const tg = window.Telegram.WebApp;
tg.expand();

const connector = new TonConnectSDK.TonConnect({
    manifestUrl: 'https://cashup28.github.io/ton-mini-app/tonconnect-manifest.json'
});

const connectBtn = document.getElementById('connect-btn');
const walletButtonsContainer = document.getElementById('wallet-buttons');
const status = document.getElementById('status');

// Kullanılabilir cüzdanları getir ve listele
connectBtn.onclick = async () => {
    const walletsList = await connector.getWallets();

    walletButtonsContainer.innerHTML = '';

    walletsList.forEach(wallet => {
        const walletBtn = document.createElement('button');
        walletBtn.textContent = wallet.name;
        walletBtn.onclick = () => {
            connector.connect({
                bridgeUrl: wallet.bridgeUrl,
                universalLink: wallet.universalLink
            });
        };
        walletButtonsContainer.appendChild(walletBtn);
    });
};

// Bağlantıyı algıla ve sonucu göster
connector.onStatusChange(wallet => {
    if (wallet) {
        status.innerText = `✅ Cüzdan bağlandı:\n${wallet.account.address}`;
        walletButtonsContainer.innerHTML = '';
        tg.MainButton.setText('Kapat').show();
        tg.sendData(JSON.stringify({ wallet: wallet.account.address }));
    }
});

tg.MainButton.onClick(() => tg.close());
