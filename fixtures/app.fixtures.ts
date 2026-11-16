import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EmployeePage } from '../pages/EmployeePage';

type AppFixtures = {
    loginPage: LoginPage;
    employeePage: EmployeePage;
};

export const test = base.extend<AppFixtures>({

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await use(loginPage);
    },

        employeePage: async ({ page }, use) => {
            const employeePage = new EmployeePage(page);

            await use(employeePage);
        }
    });

export { expect };