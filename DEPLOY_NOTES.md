# MTVZ deploy notes

## Production category metadata fix

Причина:
Production menu order не работеше, защото в production DB липсваше `metadata` за top-level категориите (`menu_order`, `menu_label`, `show_in_menu`).

Симптом:
Desktop menu layout беше правилен, но редът на top-level категориите в production беше стар/неподреден.

Проверка:
`/store/product-categories` връщаше `metadata: null` за top-level категориите в production.

Използван SQL fix:
```sql
UPDATE product_category SET metadata = '{"menu_label":"Спининг","menu_order":1,"show_in_menu":true}'::jsonb WHERE handle = 'spinning' AND parent_category_id IS NULL;
UPDATE product_category SET metadata = '{"menu_label":"Метод фидер","menu_order":2,"show_in_menu":true}'::jsonb WHERE handle = 'method-feeder' AND parent_category_id IS NULL;
UPDATE product_category SET metadata = '{"menu_label":"Влакна и лидери","menu_order":3,"show_in_menu":true}'::jsonb WHERE handle = 'lines-leaders' AND parent_category_id IS NULL;
UPDATE product_category SET metadata = '{"menu_label":"Терминални такъми","menu_order":4,"show_in_menu":true}'::jsonb WHERE handle = 'terminal-tackle' AND parent_category_id IS NULL;
UPDATE product_category SET metadata = '{"menu_label":"Аксесоари","menu_order":5,"show_in_menu":true}'::jsonb WHERE handle = 'fishing-accessories' AND parent_category_id IS NULL;
UPDATE product_category SET metadata = '{"menu_label":"Морски риболов","menu_order":6,"show_in_menu":true}'::jsonb WHERE handle = 'sea' AND parent_category_id IS NULL;
