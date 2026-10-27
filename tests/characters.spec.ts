import { expect, test } from '@playwright/test';
import charactersData from './fixtures/characters.json' with { type: 'json' };
import charactersRickData from './fixtures/characters-rick.json' with { type: 'json' };

test.describe('Список персонажей', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/character**', async (route) => {
      const url = new URL(route.request().url());

      const name = url.searchParams.get('name');

      if (name === 'Rick') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(charactersRickData)
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(charactersData)
        });
      }
    });
  });

  test('отображает 5 персонажей', async ({ page }) => {
    // открываем страницу
    await page.goto('/');
    const cards = page.locator('.character-card');
    await expect(cards).toHaveCount(5);
  });

  test('отображает имена из фикстуры', async ({ page }) => {
    await page.goto('/');

    // Ждем появления карточек
    await expect(page.locator('.character-card').first()).toBeVisible();

    const names = await page.locator('.character-card__name').allTextContents();
    const expectedNames = charactersData.results.map(
      (character) => character.name
    );

    expect(names).toEqual(expectedNames);
  });

  test('фильтрует по имени', async ({ page }) => {
    await page.goto('/');
    await page.fill('#filter-name', 'Rick');

    // Ждём ответ от API
    await page.waitForResponse(
      (response) =>
        response.url().includes('/character') &&
        response.url().includes('name=Rick')
    );

    // Ждем появления карточек
    await expect(page.locator('.character-card').first()).toBeVisible();

    const names = await page.locator('.character-card__name').allTextContents();
    const expectedNames = charactersRickData.results.map(
      (character) => character.name
    );

    expect(names).toEqual(expectedNames);
  });
});
