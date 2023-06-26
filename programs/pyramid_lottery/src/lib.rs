use anchor_lang::prelude::*;

declare_id!("EFSsGtygxE3CoYqrxY9hAJ6nLuL2SNyLnrzLAsyWJo3P");

#[program]
pub mod pyramid_lottery {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
