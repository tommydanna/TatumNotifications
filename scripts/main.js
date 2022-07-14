const subscribeButton = document.getElementById('subscribe');
const listSubscriptionsButton = document.getElementById('listSubscriptions');
const cancelSubscriptionButton = document.getElementById('cancelSubscription');

const statusDiv = document.getElementById('status');
const subscriptionsDiv = document.getElementById('subscriptions');

const inputAddress = document.getElementById('addy');



const apiKey = 'edb47ab3-1838-458f-86a3-26d813a2a073';
const webHook = 'https://webhook.site/4bfb030d-5487-4aef-bfba-8cbbcae16403';
const region = 'us-west1';
const blockChain = 'SOL'

//F8Vyqk3unwxkXukZFQeYyGmFfTG3CAX4v24iyrjEYBJV //0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
//const walletAddress = '8BGAoZprnrdgimycVYkAokhX8hSPTqNVtTJDsXZR7Esf';

function subscribe(walletAddress) {
    fetch(`https://api-${region}.tatum.io/v3/subscription`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-api-key': apiKey,
        },
        body: JSON.stringify({
            type: 'ADDRESS_TRANSACTION',
            attr: {
                address: walletAddress,
                chain: blockChain,
                url: webHook,
            },
        }),
    })
        .then((data) => data.json())
        .then((data) => {
            statusDiv.textContent = JSON.stringify(data, null, 2);
        });
}

function listSubscriptions() {
    fetch(`https://api-${region}.tatum.io/v3/subscription?pageSize=10&offset=0`, {
        method: 'GET',
        headers: {
            'x-api-key': apiKey,
        },
    })
        .then((data) => data.json())
        .then((subscriptionList) => {
            subscriptionsDiv.innerHTML = '';
            if (subscriptionList.length > 0) {
                for (const subscription of subscriptionList) {
                    const html = `<pre>
                    ${subscription.id}
                    ${subscription.type}
                    ${subscription.attr.address}
                    ${subscription.attr.chain}
                    ${subscription.attr.url}
                    <button onclick="cancelSubscription('${subscription.id}')">Cancel</button>
                    </pre>`;
                    subscriptionsDiv.innerHTML += html;
                }
            } else {
                subscriptionsDiv.innerHTML = 'No Subscriptions';
            }
        });
}

function cancelSubscription(id) {
    fetch(`https://api-${region}.tatum.io/v3/subscription/${id}`, {
        method: 'DELETE',
        headers: {
            'x-api-key': apiKey,
        },
    })
        .then((data) => data.json())
        .then((data) => {
            statusDiv.textContent = JSON.stringify(data, null, 2);
        });
}

subscribeButton.addEventListener('click', () => {
    subscribe(inputAddress.value);
});

listSubscriptionsButton.addEventListener('click', () => {
    listSubscriptions();
});