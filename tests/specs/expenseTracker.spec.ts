import { test } from '@playwright/test';
import { ExpenseTracker } from '../pom/expenseTracker';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Should add and check expense within history list', async ({ page }) => {
  const expenseTracker = new ExpenseTracker(page);
  await expenseTracker.checkDefaultState();
  await expenseTracker.addExpenseAmount();
  await expenseTracker.addIncomeAmount();
  await expenseTracker.verifyBalanceValue()
});
