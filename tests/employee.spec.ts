
import { test, expect } from '@playwright/test';

test('employee management flow', async ({ page }) => {

    const uniqueId = Date.now();

    const employee1 = {
        firstName: `AP_TestUser1_${uniqueId}`,
        lastName: 'AP_LastName33',
        email: `AP_TestUser1.${uniqueId}@qa.com`,
        phone: '1234567890',
        startDate: '16/11/2026',
        jobTitle: 'SDET Engineer - III'
    };

    const employee2 = {
        firstName: `AP_TestUser2_${uniqueId}`,
        lastName: 'AP_LastName66',
        email: `AP_TestUser2${uniqueId}@qa.com`,
        phone: '0987654321',
        startDate: '18/11/2026',
        jobTitle: 'Software Engineer - III'
    };


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
    await page.locator('#firstName').fill(employee1.firstName);
    await page.locator('#lastName').fill(employee1.lastName);
    await page.locator('#email').fill(employee1.email);
    // verify registration email remains checked
    await expect(page.locator('#registrationEmail')).toBeChecked();
    // optional fields
    await page.locator('#phoneNumber').fill(employee1.phone);
    await page.locator('#startDate').fill(employee1.startDate);
    await page.locator('#jobTitle').fill(employee1.jobTitle);

    //save employee
    await page.getByRole('button', { name: 'Save new employee' }).click();
    //verify employee was successfully created
    await expect(page.getByRole('heading', { name: 'Success! New employee added' })).toBeVisible();

    //-----------------------------------------------
    // 2. Add another employee.
    //Add another employee from pop-up
    await page.getByRole('button', { name: 'Add another employee' }).click();
    //verify new employee form reopened
    await expect(page.locator('#firstName')).toBeVisible();

    // mandatory fields
    await page.locator('#firstName').fill(employee2.firstName);
    await page.locator('#lastName').fill(employee2.lastName);
    await page.locator('#email').fill(employee2.email);
    // verify registration email remains checked
    await expect(page.locator('#registrationEmail')).toBeChecked();
    // optional fields
    await page.locator('#phoneNumber').fill(employee2.phone);
    await page.locator('#startDate').fill(employee2.startDate);
    await page.locator('#jobTitle').fill(employee2.jobTitle);

    //save employee
    await page.getByRole('button', { name: 'Save new employee' }).click();
    //verify employee 2 was successfully created
    await expect(page.getByRole('heading', { name: 'Success! New employee added' })).toBeVisible();

    //close modal
    await page.getByRole('button', { name: 'Close modal' }).click();


    // 3. Navigate to the employee tab and verify that both employees are displayed.
    await page.getByTitle('Employees').click();

    for (const emp of [employee1, employee2]) {
        const searchInput = page.getByPlaceholder('Name or job title...');
        await searchInput.fill(emp.firstName)
        console.log('Searching for: ', emp.firstName);

        const targetCard = page
            .locator('#main-content div.grid > div')
            .filter({
                has: page
                    .locator('h1')
                    .filter({ hasText: emp.firstName })
                    .filter({ hasText: emp.lastName }),
            });

        // verify card is visible
        await expect(targetCard).toBeVisible();
        // verify job title
        await expect(targetCard.locator('h1 + div')).toHaveText(emp.jobTitle);
        //clear search field
        await searchInput.clear();
    }

    // 4. Integrate this build so tests can run in the CI setup of your choice.

});
