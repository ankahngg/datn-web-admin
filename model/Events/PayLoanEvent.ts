export type PayLoanEvent = {
    id: number;
    loanId: bigint;
    borrower : string;
    lender : string;
    amount : bigint;
    amountPaid : bigint;
    amountHaveToPay : bigint;
    timestamp : bigint;
};