import { Page, expect } from '@playwright/test'

export interface Employee {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    startDate: string;
    jobTitle: string;
}

export class EmployeePage {
    constructor(private page: Page) { }

    // 1.a Navigate to the employee tab on the left-hand side of the panel
    // 1.b add an employee by filling in all the fields, including optional ones.
    async navigateToEmployees(): Promise<void> {
        await this.page.getByTitle('Employees').click();
    }

    async openAddEmployee(): Promise<void> {
        await this.page
            .getByRole('button', { name: 'Add Employee' })
            .click();
    }

    async fillEmployeeForm(employee: Employee): Promise<void> {
        await this.page.locator('#firstName').fill(employee.firstName);
        await this.page.locator('#lastName').fill(employee.lastName);
        await this.page.locator('#email').fill(employee.email);
        await this.page.locator('#phoneNumber').fill(employee.phone);
        await this.page.locator('#startDate').fill(employee.startDate);
        await this.page.locator('#jobTitle').fill(employee.jobTitle);

        await expect(this.page.locator('#registrationEmail')).toBeChecked();
    }

    async saveEmployee(): Promise<void> {
        await this.page
            .getByRole('button', { name: 'Save New Employee' })
            .click();

        await expect(
            this.page.getByRole('heading', {
                name: 'Success! New employee added',
            })
        ).toBeVisible();
    }

    async addEmployee(employee: Employee): Promise<void> {
        await this.openAddEmployee();
        await this.fillEmployeeForm(employee);
        await this.saveEmployee();
    }

    // 2. Add another employee.
    async addAnotherEmployee(): Promise<void> {
        await this.page
            .getByRole('button', { name: 'Add another employee' })
            .click();
    }

    async closeSuccessModal(): Promise<void> {
        await this.page
            .getByRole('button', { name: 'Close modal' })
            .click();
    }


    // 3. Navigate to the employee tab and verify that both employees are displayed.
    async verifyEmployees(employees: Employee[]): Promise<void> {
        const searchInput = this.page.getByPlaceholder('Name or job title...');
        for (const emp of employees) {
            await searchInput.fill(emp.firstName);

            const targetCard = this.page
                .locator('#main-content div.grid > div')
                .filter({
                    has: this.page
                        .locator('h1')
                        .filter({ hasText: emp.firstName })
                        .filter({ hasText: emp.lastName }),
                });

            await expect(targetCard).toBeVisible();

            await expect(
                targetCard.locator('h1 + div')
            ).toHaveText(emp.jobTitle);

            await searchInput.clear();
        }
    }
}