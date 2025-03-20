const tg = window.Telegram.WebApp;
tg.expand();

const connector = new TonConnectSDK.TonConnect({
    manifestUrl: 'https://cashup28.github.io/ton-mini-app/tonconnect-manifest.json'
});

const connectBtn = document.getElementById('connect-btn');
const status = document.getElementById('status');

// Telegram'ın kendi içinde direkt bağlantı açma yöntemi:
connectBtn.onclick = async () => {
    const wallets = await connector.getWallets();
    const tonkeeper = wallets.find(w => w.appName === 'tonkeeper');
    const tonhub = wallets.find(w => w.appName === 'tonhub');
    const myTonWallet = wallets.find(w => w.appName === 'mytonwallet');

    const wallet = tonkeeper || tonhub || myTonWallet || wallets[0];

    if (wallet) {
        connector.connect({
            bridgeUrl: wallet.bridgeUrl,
            universalLink: wallet.universalLink
        });
    } else {
        status.innerText = "Uygun cüzdan bulunamadı!";
    }
};

// Bağlantıyı algıla ve sonucu göster
connector.onStatusChange(wallet => {
    if (wallet) {
        status.innerText = `✅ Cüzdan bağlandı:\n${wallet.account.address}`;
        tg.MainButton.setText('Kapat').show();
        tg.sendData(JSON.stringify({ wallet: wallet.account.address }));
    }
});

tg.MainButton.onClick(() => tg.close());