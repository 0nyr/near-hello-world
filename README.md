# Near Hello World

This is a simple Hello World smart contract. As explained by the [exercice instruction](https://nearvember.near.org/challenge-2-hello-world) : "When we call the contract, it should take a {name} parameter and return "Hello {name}!"

> This project was kickstarted using [this official NEAR template](https://github.com/near-examples/rust-template).

### Useful links

[Building a Smart Contract in Rust](https://docs.near.org/docs/develop/contracts/rust/intro)


## Notes and commands

Use the following commands to build, deploy and call the contract.

1. The smart contract is in `src/lib.rs`
2. Test the contract

   `cargo test -- --nocapture` or run `./test.sh`
3. Build the contract

   `RUSTFLAGS='-C link-arg=-s' cargo build --target wasm32-unknown-unknown --release` or `cargo build --target wasm32-unknown-unknown --release`
4. Log in to testnet account `near login`
5. `ID=your.id` > `echo $ID`
6. Create a sub-account to deploy the new smart contract. This is because one account can only have one contract. Use `near deploy --wasmFile target/wasm32-unknown-unknown/release/near_hello_world.wasm --accountId helloworld.$ID` to deploy the contact to the network on the sub-account.
7. Call the method of the contact `near call helloworld.$ID hello '{"name": "Bob"}' --accountId helloworld.$ID`.

```shell
(base)  ❮ onyr ★  kenzae❯ ❮ near-hello-world❯❯ near deploy --wasmFile target/wasm32-unknown-unknown/release/near_hello_world.wasm --accountId helloworld.$ID
Starting deployment. Account id: helloworld.onyr.testnet, node: https://rpc.testnet.near.org, helper: https://helper.testnet.near.org, file: target/wasm32-unknown-unknown/release/near_hello_world.wasm
Transaction Id 26Ma9ckZLf1k1YkGc2TgLtXdS1pFnwk75ngVM5e5eN4i
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/26Ma9ckZLf1k1YkGc2TgLtXdS1pFnwk75ngVM5e5eN4i
Done deploying to helloworld.onyr.testnet

(base)  ❮ onyr ★  kenzae❯ ❮ near-hello-world❯❯ near call helloworld.$ID hello '{"name": "Bob"}' --accountId helloworld.$ID
Scheduling a call: helloworld.onyr.testnet.hello({"name": "Bob"})
Doing account.functionCall()
Receipt: E7cBffRLKtzDmjCkTBSaBdUKyKPtwXiuKsbyXC8NLpe8
        Log [helloworld.onyr.testnet]: Hello Bob!
Transaction Id EgJdNSgoynvfKTY1QbFKJQFTveZjofWGiXiVY1ufomfk
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/EgJdNSgoynvfKTY1QbFKJQFTveZjofWGiXiVY1ufomfk
''
```

**Get more info at:**

* [Rust Smart Contract Quick Start](https://docs.near.org/docs/develop/contracts/rust/intro)
* [Rust SDK Book](https://www.near-sdk.io/)
