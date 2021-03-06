import "regenerator-runtime/runtime";

import * as nearAPI from "near-api-js"

const CONTRACT_NAME = "helloworld.onyr.testnet";
window.nearConfig = {
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    contractName: CONTRACT_NAME,
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org'
}


// Initializing contract
async function initContract() {
    // Initializing connection to the NEAR node.
    window.near = await nearAPI.connect(Object.assign({ deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() } }, nearConfig));

    // Initializing Wallet based Account. It can work with NEAR TestNet wallet that
    // is hosted at https://wallet.testnet.near.org
    window.walletAccount = new nearAPI.WalletAccount(window.near);

    // Getting the Account ID. If unauthorized yet, it's just empty string.
    window.accountId = window.walletAccount.getAccountId();

    // Initializing our contract APIs by contract name and configuration.
    window.contract = await window.near.loadContract(nearConfig.contractName, {
        // NOTE: This configuration only needed while NEAR is still in development
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: [],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: ["hello"],
        // Sender is the account ID to initialize transactions.
        sender: window.accountId,
    });
}

// Using initialized contract
async function doWork() {
    // Based on whether you've authorized, checking which flow we should go.
    if (!window.walletAccount.isSignedIn()) {
        signedOutFlow();
    } else {
        await signedInFlow();
    }
}

// Function that initializes the signIn button using WalletAccount
function signedOutFlow() {
    // Displaying the signed out flow container.
    Array.from(document.querySelectorAll('.signed-out')).forEach(el => el.style.display = '');
    // Adding an event to a sing-in button.
    document.getElementById('sign-in').addEventListener('click', () => {
        window.walletAccount.requestSignIn(
        // The contract name that would be authorized to be called by the user's account.
        window.nearConfig.contractName,
        // This is the app name. It can be anything.
        'Hello World',
        // We can also provide URLs to redirect on success and failure.
        // The current URL is used by default.
        );
    });
}

// Main function for the signed-in flow (already authorized by the wallet).
function signedInFlow() {
    // Displaying the signed in flow container.
    Array.from(document.querySelectorAll('.signed-in')).forEach(el => el.style.display = '');

    // Displaying current account name.
    document.getElementById('account-id').innerText = window.accountId;

    // Adding an event to a contract button.
    document.getElementById('contract').addEventListener('click', () => {
        callContract();
    });

    // Adding an event to a sing-out button.
    document.getElementById('sign-out').addEventListener('click', e => {
        e.preventDefault();
        walletAccount.signOut();
        // Forcing redirect.
        window.location.replace(window.location.origin + window.location.pathname);
    });
}

console.stdlog = console.log.bind(console);
console.logs = [];
console.log = function(){
    console.logs.push(Array.from(arguments));
    console.stdlog.apply(console, arguments);
}

// Function to update who said hi
async function callContract() {
    // JavaScript tip:
    // This is another example of how to use promises. Since this function is not async,
    // we can't await for `contract.whoSaidHi()`, instead we attaching a callback function
    // usin `.then()`.
    const givenName = document.getElementById('name').value;
    console.log(`givenName: ${givenName}`);

    // response is empty since it is a changeMethods
    const response = await contract.hello(
        {name: givenName}, // argument name and value - pass empty object if no args required
        300000000000000, // attached GAS (optional)
        0 // attached deposit in yoctoNEAR (optional)
    );
        // This is the callback function that is called when the promise is resolved.
        let fullText = "";
        console.logs.forEach(function (item, index) {
            fullText += item + "   ";
        });
        document.getElementById("result").innerHTML = `${fullText}`;

}

// Loads nearAPI and this contract into window scope.
window.nearInitPromise = initContract()
  .then(doWork)
  .catch(console.error);