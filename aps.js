const tg = window.Telegram.WebApp;
tg.expand();

const connector = new TonConnectSDK.TonConnect({
    manifestUrl: 'https://cashup28.github.io/ton-mini-app/tonconnect-manifest.json'
});

const connectBtn = document.getElementById('connect-btn');
const walletList = document.getElementById('wallet-list');
const status = document.getElementById('status');

connectBtn.onclick = async () => {
    walletList.innerHTML = '';
    const wallets = await connector.getWallets();

    wallets.forEach(wallet => {
        const walletButton = document.createElement('button');
        walletButton.textContent = wallet.name;

        walletButton.onclick = () => {
            connector.connect({
                bridgeUrl: wallet.bridgeUrl,
                universalLink: wallet.universalLink
            });
        };

        walletList.appendChild(walletButton);
    });

    status.innerText = 'Lütfen bağlanmak istediğiniz cüzdanı seçin.';
};

connector.onStatusChange(wallet => {
    if (wallet) {
        status.innerText = `✅ Cüzdan bağlandı:\n${wallet.account.address}`;
        walletList.innerHTML = '';
        tg.MainButton.setText('Kapat').show();
        tg.sendData(JSON.stringify({ wallet: wallet.account.address }));
    }
});

tg.MainButton.onClick(() => tg.close());