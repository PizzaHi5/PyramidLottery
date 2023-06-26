use anchor_lang::prelude::*;
//use Lottery;

#[program]
mod pool {
    use super::*;



}

// Contexts
#[derive(Accounts)]
pub struct Pool<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

}

// Accounts
#[account]
//#[derive(Account)] I dont think we need this
pub struct Pool {
    pub admin: Pubkey,
    pub balance: u64,
    pub lotteries: Lottery,

}
