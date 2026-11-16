import { Page, expect } from '@playwright/test'

export class LoginPage {

    constructor(private page: Page) {
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async login(
        username: string,
        password: string
    ): Promise<void> {
        await this.page.locator('#username').fill(username);
        await this.page.locator('#password').fill(password);
        await this.page.locator('#login').click();
    }

    async verifyLogin(expectedTitle: RegExp): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

}