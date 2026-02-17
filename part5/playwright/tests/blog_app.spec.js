const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'testguy',
                name: 'John Tester',
                password: 'secretpasswordis45'
            }
        })

        await page.goto('http://localhost:5173')
    })
  
    test('Login form is shown', async ({ page }) => {
      const locator = page.getByText('Log in to bloglist')
      await expect(locator).toBeVisible()
      await expect(page.getByLabel('username')).toBeVisible()
      await expect(page.getByLabel('password')).toBeVisible()
    })
    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByLabel('username').fill('testguy')
            await page.getByLabel('password').fill('secretpasswordis45')
            await page.getByText('login').click()
            await expect(page.getByText('Logged in as John Tester')).toBeVisible()
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await page.getByLabel('username').fill('testguy')
            await page.getByLabel('password').fill('wrongpassword')
            await page.getByText('login').click()
            await expect(page.getByText('Invalid username or password.')).toBeVisible()
        })
    })
  })
