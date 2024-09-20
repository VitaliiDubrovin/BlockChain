use solana_program::{account_info::{next_account_info, AccountInfo}, entrypoint, entrypoint::ProgramResult, msg, program::invoke, program_error::ProgramError,pubkey::Pubkey,
                     system_instruction::*
};

entrypoint!(transfer_service_fee_lamports);  //smart contract entry point

fn transfer_service_fee_lamports(_program_id: &Pubkey, accounts: &[AccountInfo], instruction_data: &[u8] ) -> ProgramResult {
     msg!("done!, have fun !");
    Ok(())
}
