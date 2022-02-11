//import * as nearAPI from "../node_modules/near-api-js/dist/near-api-js.js";
import "regenerator-runtime/runtime";
import * as nearAPI from "near-api-js";

//// connect to NEAR wallet
// creates keyStore using private key in local storage
// *** REQUIRES SignIn using walletConnection.requestSignIn() ***
const { connect, keyStores, WalletConnection } = nearAPI;
const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

const config = {
  networkId: "testnet",
  keyStore,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

async function callHelloWorldContract() {
    // connect to NEAR
    const near = await connect(config);
    // create wallet connection
    const wallet = new WalletConnection(near);

    if(wallet.isSignedIn()) {
        // wallet connected, call contract
        console.log("Calling hello world contract");
        document.getElementById("result").innerHTML = ">>> Calling hello world contract";
        
        // load contract
        const account = wallet.account(); // get account from wallet
        const contract = new nearAPI.Contract(
            account, // the account object that is connecting
            "helloworld.onyr.testnet", // the name of the contract
            {
            // name of contract you're connecting to
            viewMethods: ["hello"], // view methods do not change state but usually return a value
            changeMethods: [], // change methods modify state
            sender: account, // account object to initialize and sign transactions.
            }
        );

        // call contract hello method
        await contract.hello(
            {
              name: document.getElementById("name"), // argument name and value - pass empty object if no args required
            },
            30000000000, // attached GAS (optional)
            0 // attached deposit in yoctoNEAR (optional)
          );
    } else {
        const notConnectedMessge = "You are not connected to the NEAR network. Please sign in to the NEAR network.";
        console.log(notConnectedMessge);
        document.getElementById("log").innerHTML = notConnectedMessge;
    }
}


document.querySelector('#callContract').addEventListener('click', () => {
    callHelloWorldContract();
});