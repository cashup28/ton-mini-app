const tg = window.Telegram.WebApp;
tg.expand();

const connector = new TonConnectSDK.TonConnect({ manifestUrl: 'https://cashup28.github.io/ton-mini-app/tonconnect-manifest.json' });

const connectBtn = document.getElementById('connect-btn');
const status = document.getElementById('status');

connectBtn.onclick = async () => {
    const walletsList = await connector.getWallets();
    const tonkeeperWallet = walletsList.find(wallet => wallet.appName === 'tonkeeper');

    if (tonkeeperWallet) {
        connector.connect({ universalLink: tonkeeperWallet.universalLink, bridgeUrl: tonkeeperWallet.bridgeUrl });
    } else {
        status.innerText = "Tonkeeper wallet bulunamadı.";
    }
};

// bağlantı başarılı olduğunda çağrılır
connector.onStatusChange(wallet => {
    if (wallet) {
        status.innerText = `✅ Bağlandı: ${wallet.account.address}`;
        tg.MainButton.setText('Kapat').show();
        tg.sendData(JSON.stringify({ wallet: wallet.account.address }));
    }
});

tg.MainButton.onClick(() => tg.close());
