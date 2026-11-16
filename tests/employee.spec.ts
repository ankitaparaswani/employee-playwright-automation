
import { test, expect } from '@playwright/test';

test('employee management flow', async ({ page }) => {

    await page.goto("https://sandbox-app.brighthr.com");

    // Login
    await page.locator('#username').fill('qaAutomationTechTask@grr.la');
    await page.locator('#password').fill("A1234567890-");
    await page.locator('#login').click();

    //Verify login
    await expect(page).toHaveTitle('Dashboard - BrightHR');

    // 1.a Navigate to the employee tab on the left-hand side of the panel
    // 1.b add an employee by filling in all the fields, including optional ones.
    await page.getByTitle('Employees').click();
    await page.getByRole('button', { name: 'Add Employee' }).click();

    // mandatory fields
    await page.locator('#firstName').fill('TestUser1');
    await page.locator('#lastName').fill('TestPassword1');
    await page.locator('#email').fill('TestUser1@gmail.com');

    // verify registration email remains checked
    await expect(page.locator('#registrationEmail')).toBeChecked();

    // optional fields
    await page.locator('#phoneNumber').fill('1234567890');
    await page.locator('#startDate').fill('16/11/2026');
    await page.locator('#jobTitle').fill('Sr.QA Engg');

    //save employee
    await page.getByRole('button', { name: 'Save new employee' }).click();

    //verify employee was successfully created
    await expect(page.getByRole('heading', { name: 'Success! New employee added' })).toBeVisible();

    //----------

    // 2. Add another employee.
    //Add another employee from pop-up
    await page.getByRole('button', { name: 'Add another employee' }).click();
    //verify new employee form reopened
    await expect(page.locator('#firstName')).toBeVisible();

    // mandatory fields
    await page.locator('#firstName').fill('TestUser2');
    await page.locator('#lastName').fill('TestPassword2');
    await page.locator('#email').fill('TestUser2@gmail.com');

    // verify registration email remains checked
    await expect(page.locator('#registrationEmail')).toBeChecked();

    // optional fields
    await page.locator('#phoneNumber').fill('1234567890');
    await page.locator('#startDate').fill('18/11/2026');
    await page.locator('#jobTitle').fill('Staff QA Engg');

    //save employee
    await page.getByRole('button', { name: 'Save new employee' }).click();

    //verify employee 2 was successfully created
    await expect(page.getByRole('heading', { name: 'Success! New employee added' })).toBeVisible();

    //close modal
    await page.getByRole('button', { name: 'Close modal' }).click();


    // 3. Navigate to the employee tab and verify that both employees are displayed.
    await page.getByTitle('Employees').click();

    // search employee 1
    const searchInput = page.getByPlaceholder('Name or job title...');
    await searchInput.fill("TestUser1")

    // find specific employee card with name and job title
    const targetCard = page
    .locator('#main-content div.grid > div')
    .filter({
        has: page
            .locator('h1')
            .filter({hasText: 'TestUser1'})
            .filter({hasText: 'TestLastName'}),
    });

    // verify card is visible
    await expect(targetCard).toBeVisible();
    // verify job title
    await expect(targetCard.locator('h1+div')).toHaveText('tester');


    // 4. Integrate this build so tests can run in the CI setup of your choice.

});
