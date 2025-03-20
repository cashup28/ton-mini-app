const tg = window.Telegram.WebApp;
tg.expand();

const connector = new TonConnectSDK.TonConnect({
    manifestUrl: 'https://cashup28.github.io/ton-mini-app/tonconnect-manifest.json'
});

const connectBtn = document.getElementById('connect-btn');
const status = document.getElementById('status');

connectBtn.onclick = async () => {
    const wallets = await connector.getWallets();
    const wallet = wallets.find(w => w.appName === "tonkeeper") || wallets[0];

    if (wallet) {
        const link = connector.connect({
            bridgeUrl: wallet.bridgeUrl,
            universalLink: wallet.universalLink
        });
        window.open(link, '_blank');
    } else {
        status.innerText = "Cüzdan bulunamadı!";
    }
};

connector.onStatusChange(wallet => {
    if (wallet) {
        status.innerText = `✅ Cüzdan bağlandı:\n${wallet.account.address}`;
        tg.MainButton.setText('Kapat').show();
        tg.sendData(JSON.stringify({ wallet: wallet.account.address }));
    }
});

tg.MainButton.onClick(() => tg.close());
