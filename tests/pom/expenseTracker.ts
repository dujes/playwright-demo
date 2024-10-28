import { expect, Locator, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

/**
 * ExpenseTracker class.
 * @param page - Page instance.
 */
export class ExpenseTracker {
  readonly page: Page;
  readonly yourBalanceValue: Locator;
  readonly title: Locator;
  readonly incomeBalanceValue: Locator;
  readonly expenseBalanceValue: Locator;
  readonly historyList: Locator;
  readonly expenseTextName: Locator;
  readonly expenseAmountValue: Locator;
  readonly expenseTextInput: Locator;
  readonly expenseAmountInput: Locator;
  readonly addTransactionButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.yourBalanceValue = page.locator('#balance');
    this.title = page.locator('h2:has-text("Expense Tracker")');
    this.incomeBalanceValue = page.locator('h4:has-text("Income") + p');
    this.expenseBalanceValue = page.locator('h4:has-text("Expense") + p');
    this.historyList = page.locator('ul[data-test-id="history-list"]');
    this.expenseTextName = this.historyList.locator('li');
    this.expenseAmountValue = this.historyList.locator('span');
    this.expenseTextInput = page.getByPlaceholder('Enter text...');
    this.expenseAmountInput = page.getByPlaceholder('Enter amount...');
    this.addTransactionButton = page.getByRole('button', {
      name: 'Add Transaction',
    });
  }

  /**
   * Check the default state of income and expense balances.
   */
  async checkDefaultState() {
    await expect(this.title).toHaveText('Expense Tracker');
    await expect(this.incomeBalanceValue).toHaveText('+$0');
    await expect(this.expenseBalanceValue).toHaveText('-$0');
  }

  /**
   * Add a new expense transaction.
   */
  async addExpenseAmount() {
    const amount = faker.number.int({ min: 1, max: 1000 });
    const text = faker.commerce.productName();
    return this.addTransaction(text, `-${amount}`);
  }

  /**
   * Add a new income transaction.
   */
  async addIncomeAmount() {
    const amount = faker.number.int({ min: 1, max: 1000 });
    const text = faker.commerce.productName();
    return this.addTransaction(text, amount.toString());
  }

  /**
   * Private method to add a transaction.
   * @param text - The description of the transaction.
   * @param amount - The amount of the transaction.
   */
  private async addTransaction(text: string, amount: string) {
    await this.expenseTextInput.fill(text);
    await this.expenseAmountInput.fill(amount);
    await this.addTransactionButton.click();

    const expectedAmount = `$${amount}`;
    await expect(this.historyList.locator('li').last()).toContainText(text);
    await expect(this.historyList.locator('span').last()).toContainText(
      expectedAmount
    );
  }

  /**
   * Verify that yourBalanceValue equals the income minus expense.
   */
  async verifyBalanceValue() {
    const incomeText = await this.incomeBalanceValue.textContent();
    const expenseText = await this.expenseBalanceValue.textContent();

    const income = parseFloat(incomeText?.replace(/[+$,]/g, '') || '0');
    const expense = parseFloat(expenseText?.replace(/[-$,]/g, '') || '0');

    const expectedBalance = income - expense;
    await expect(this.yourBalanceValue).toHaveText(`$${expectedBalance}`);
  }
}
