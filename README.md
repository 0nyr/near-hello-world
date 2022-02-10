# Near Hello World

This is a simple Hello World smart contract. As explained by the [exercice instruction](https://nearvember.near.org/challenge-2-hello-world) : "When we call the contract, it should take a {name} parameter and return "Hello {name}!"

> This project was kickstarted using [this official NEAR template](https://github.com/near-examples/rust-template).

### Useful links

[Building a Smart Contract in Rust](https://docs.near.org/docs/develop/contracts/rust/intro)


## Notes

1. The smart contract is in `src/lib.rs`
2. Test the contract

   `cargo test -- --nocapture` or run `./test.sh`
3. Build the contract

   `RUSTFLAGS='-C link-arg=-s' cargo build --target wasm32-unknown-unknown --release` or `cargo build --target wasm32-unknown-unknown --release`
4. Log in to testnet account `near login`
5. `ID=your.id` > `echo $ID` to check, > `near deploy --wasmFile target/wasm32-unknown-unknown/release/near_hello_world.wasm --accountId $ID`

**Get more info at:**

* [Rust Smart Contract Quick Start](https://docs.near.org/docs/develop/contracts/rust/intro)
* [Rust SDK Book](https://www.near-sdk.io/)
