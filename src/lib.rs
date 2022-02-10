use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;
use near_sdk::env;

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct HelloWorldContract {
    // SETUP CONTRACT STATE
}

#[near_bindgen]
impl HelloWorldContract {
    // ADD CONTRACT METHODS HERE
    pub fn hello(&mut self, name: String) {
        if name == "" {
            env::log_str("Hello World!")
        } else {
            env::log_str(
                // NOTE: convert String to &str at runtime with .to_owned()
                &format!("Hello {}!", name).to_owned()
            )
        }
    }
}

/*
 * the rest of this file sets up unit tests
 * to run these, the command will be:
 * cargo test --package rust-template -- --nocapture
 * Note: 'rust-template' comes from Cargo.toml's 'name' key
 */

// use the attribute below for unit tests
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::{get_logs, VMContextBuilder};
    use near_sdk::{testing_env, AccountId};
    use std::convert::TryFrom; // convert from string to account_id

    // simple helper function to take a string literal and return 
    // an AccountId
    fn str_to_account(user: &str) -> AccountId {
        AccountId::try_from(user.to_string()).unwrap()
    }

    // part of writing unit tests is setting up a mock context
    // provide a `predecessor` here, it'll modify the default context
    fn get_context(predecessor: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor);
        builder
    }

    // TESTS HERE
    #[test]
    fn empty_name() {
        // create test context
        let context = get_context(str_to_account("alice"));
        testing_env!(context.build());
        // instantiate a contract variable
        let mut contract = HelloWorldContract::default();
        // call the contract method
        contract.hello("".to_string());
        // check the logs
        let logs = get_logs();
        assert_eq!(logs[0], "Hello World!");
    }
}
