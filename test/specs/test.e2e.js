import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

let usernames = ["standard_user","locked_out_user","problem_user","performance_glitch_user","error_user", "visual_user"];

for (let i = 0; i < usernames.length; i++) {
    describe('My Login application', () => {
        it('should login with valid credentials', async () => {
            await LoginPage.open();
            
            await LoginPage.login(usernames[i], 'secret_sauce')
            
            if (usernames[i] == "locked_out_user"){
                await expect(LoginPage.errorPage).toBeExisting()
            } else {
                
                await expect(SecurePage.shoppingPage).toBeExisting()
            }
        })
    })
}

for (let i = 0; i < usernames.length; i++) {
    describe('My Login application', () => {
        it('should not login with invalid credentials', async () => {
            await LoginPage.open();
            
            await LoginPage.login(usernames[i], 'secret_saauce')
            
            await expect(LoginPage.errorPage).toHaveText(expect.stringContaining("Epic sadface: Username and password do not match any user in this service"));
        })
    })
}


