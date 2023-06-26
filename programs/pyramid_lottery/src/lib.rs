use anchor_lang::prelude::*;

declare_id!("EnNAUhQEdDNtNszfguvK5RSkSLDStPLtUqeLpbjayoNq");

const MAX_LOTTERY_COUNT: usize = 100;

#[program]
pub mod lottery {
    use super::*;       

    // Creates an account for the lottery
    pub fn initialise_lottery(ctx: Context<Create>, ticket_price: u64, oracle_pubkey: Pubkey) -> Result<()> {        
        let lottery: &mut Account<Lottery> = &mut ctx.accounts.lottery;        
        lottery.authority = ctx.accounts.admin.key();                
        lottery.count = 0;           
        lottery.ticket_price = ticket_price;
        lottery.oracle = oracle_pubkey;

        Ok(())
    }

    // Buy a lottery ticket
    pub fn buy_ticket(ctx: Context<Submit>) -> Result<()> {
        
        // Deserialise lottery account
        let lottery: &mut Account<Lottery> = &mut ctx.accounts.lottery;          
        let player: &mut Signer = &mut ctx.accounts.player;                 

        // Transfer lamports to the lottery account
        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &player.key(),
            &lottery.key(),
            lottery.ticket_price,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                player.to_account_info(),
                lottery.to_account_info(),
            ],
        )?;

        // Deserialise ticket account
        let ticket: &mut Account<Ticket> = &mut ctx.accounts.ticket;                

        // Set submitter field as the address pays for account creation
        ticket.submitter = ctx.accounts.player.key();

        // Set ticket index equal to the counter
        ticket.idx = lottery.count;        

        // Increment total submissions counter
        lottery.count += 1;                      

        Ok(())  
    }
    
    // Oracle picks winner index
    pub fn pick_winner(ctx: Context<Winner>, winner: u32) -> Result<()> {

        // Deserialise lottery account
        let lottery: &mut Account<Lottery> = &mut ctx.accounts.lottery;
        
        // Set winning index
        lottery.winner_index = winner;                

        Ok(())
    }    

    // Payout prize to the winner
    /*
        Modify program to send only 90% to recipient, leave 10% to admin
     */
    pub fn pay_out_winner(ctx: Context<Payout>) -> Result<()> {

        // Check if it matches the winner address
        let lottery: &mut Account<Lottery> = &mut ctx.accounts.lottery;
        let recipient: &mut AccountInfo =  &mut ctx.accounts.winner;        

        // Get total money stored under original lottery account
        let balance: u64 = lottery.to_account_info().lamports();

        // Payout 90% of balance to recipient
        let payout: u64 = (balance * 9) / 10;      
            
        **lottery.to_account_info().try_borrow_mut_lamports()? -= payout;
        **recipient.to_account_info().try_borrow_mut_lamports()? += payout; 
        
        Ok(())
    }

    /*
        Add admin payout function
     */
    pub fn admin_payout(ctx: Context<Payout>) -> Result<()> {
        let lottery = &ctx.accounts.lottery;
        let lottery_admin: Pubkey = lottery.authority;
        //check pubkey sender == authority
        //check winner index > 0, ensure a winner has been decided
        assert!(lottery.winner_index > 0);
        //perform transfer
        let payout: u64 = lottery.to_account_info().lamports();
        

        //payout to admin
        **lottery.to_account_info().try_borrow_mut_lamports()? -= payout;

        Ok(())
    }
}

pub mod restaking_pool {
    use super::*;

    pub fn initialize_pool(ctx: Context<Pool>) -> Result<()> {
        //set admin
        
        Ok(())
    }

    pub fn add_lottery(ctx: Context<Lottery>, cty: Context<Pool>) -> Result<()> {
        
        Ok(())
    }
}

// Contexts
////////////////////////////////////////////////////////////////

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = admin, space = 8 + 180)]
    pub lottery: Account<'info, Lottery>,
    #[account(mut)]
    pub admin: Signer<'info>,    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Submit<'info> {            
    #[account(init, 
        seeds = [
            &lottery.count.to_be_bytes(), 
            lottery.key().as_ref()
        ], 
        constraint = player.to_account_info().lamports() >= lottery.ticket_price,
        bump, 
        payer = player, 
        space=80
    )]
    pub ticket: Account<'info, Ticket>,        
    #[account(mut)]                                 
    pub player: Signer<'info>,                     // Payer for account creation    
    #[account(mut)]       
    pub lottery: Account<'info, Lottery>,          // To retrieve and increment counter        
    pub system_program: Program<'info, System>,    
}

#[derive(Accounts)]
pub struct Winner<'info> {    
    #[account(mut, constraint = lottery.oracle == *oracle.key)]
    pub lottery: Account<'info, Lottery>,        
    pub oracle: Signer<'info>,
}

#[derive(Accounts)]
pub struct Payout<'info> {             
    #[account(mut, 
        constraint = 
        ticket.submitter == *winner.key && 
        ticket.idx == lottery.winner_index        
    )]       
    pub lottery: Account<'info, Lottery>,          // To assert winner and withdraw lamports
    #[account(mut)]       
    /// CHECK: Not dangerous as it only receives lamports
    pub winner: AccountInfo<'info>,                // Winner account
    #[account(mut)]                  
    pub ticket: Account<'info, Ticket>,            // Winning PDA
}

#[derive(Accounts)]
pub struct AdminPayout<'info> {
    #[account(mut)]
    pub admin: Account<'info, Lottery>
}

#[derive(Accounts)]
pub struct CreatePool<'info> {
    #[account(init, payer = admin, space = 8 + 180)]
    pub pool: Account<'info, Pool>,
    #[account(mut)]
    pub admin: Signer<'info>,    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddLottery<'info> {
    #[account(mut)]
    pub pool: Account<'info, Pool>,
    #[account(mut)]
    pub lottery: Account<'info, Lottery>,
}

// Accounts
////////////////////////////////////////////////////////////////

// Lottery account 
#[account]
pub struct Lottery {    
    pub authority: Pubkey, 
    pub oracle: Pubkey, 
    pub winner: Pubkey,
    pub winner_index: u32, 
    pub count: u32,
    pub ticket_price: u64,
}

// Ticket PDA
#[account]
#[derive(Default)] 
pub struct Ticket {    
    pub submitter: Pubkey,    
    pub idx: u32,
}

#[account]
pub struct Pool {
    pub authority: Pubkey,
    pub balance: u64,
    pub lotteries: [Lottery; MAX_LOTTERY_COUNT],
    pub lottery_count: u32,
}

