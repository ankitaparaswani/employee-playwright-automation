import { test } from '../fixtures/app.fixtures'
import { Employee } from '../pages/EmployeePage';


test.describe('Employee Management', () => {

    test.beforeEach(async ({ loginPage }) => {

        //Navigate to the application URL
        await loginPage.navigate("https://sandbox-app.brighthr.com");

        //Login and verify
        await loginPage.login(
            'qaAutomationTechTask@grr.la',
            'A1234567890-'
        );
        // verify title
        await loginPage.verifyLogin(/Dashboard - BrightHR/i);
    });


    test('create and verify employee1 and employee2', async ({ employeePage }) => {

        const uniqueId = Date.now().toString().slice(-6);

        const employee1: Employee = {
            firstName: `AP_TestUser1_${uniqueId}`,
            lastName: 'AP_LastName33',
            email: `AP_TestUser1.${uniqueId}@qa.com`,
            phone: '1234567890',
            startDate: '16/11/2026',
            jobTitle: 'SDET Engineer - III'
        };

        const employee2: Employee = {
            firstName: `AP_TestUser2_${uniqueId}`,
            lastName: 'AP_LastName66',
            email: `AP_TestUser2${uniqueId}@qa.com`,
            phone: '0987654321',
            startDate: '18/11/2026',
            jobTitle: 'Software Engineer - III'
        };

        // Add and verify employees added
        await employeePage.addEmployee(employee1);

        await employeePage.addAnotherEmployee();

        await employeePage.fillEmployeeForm(employee2);
        await employeePage.saveEmployee();

        await employeePage.closeSuccessModal();

        await employeePage.navigateToEmployees();

        await employeePage.verifyEmployees([employee1, employee2]);
    });
});