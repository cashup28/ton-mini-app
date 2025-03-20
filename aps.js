const tg = window.Telegram.WebApp;
tg.expand();

const connector = new TonConnectSDK.TonConnect({
    manifestUrl: 'https://cashup28.github.io/ton-mini-app/tonconnect-manifest.json'
});

const connectBtn = document.getElementById('connect-btn');
const status = document.getElementById('status');

connectBtn.onclick = async () => {
    const walletsList = await connector.getWallets();
    const wallet = walletsList.find(w => w.appName === "tonkeeper") || walletsList[0];

    if (wallet) {
        connector.connect({
            bridgeUrl: wallet.bridgeUrl,
            universalLink: wallet.universalLink
        });

        connector.onStatusChange(wallet => {
            if (wallet) {
                status.innerText = `✅ Bağlanan cüzdan:\n${wallet.account.address}`;
                tg.MainButton.setText('Kapat').show();
                tg.sendData(JSON.stringify({ wallet: wallet.account.address }));
            }
        });
    } else {
        status.innerText = "Cüzdan bulunamadı!";
    }
};

tg.MainButton.onClick(() => tg.close());
