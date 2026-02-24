-- ============================================================================
-- FIX CONTENT CATEGORIES
-- Consolidate orphaned character categories so they match the 6 UI filters:
--   Patriarchs, Kings, Prophets, New Testament, Women of the Bible, Judges
-- ============================================================================

-- Adam: 'Creation' → 'Patriarchs' (first patriarch of humanity)
update public.bible_characters
set category = 'Patriarchs'
where name = 'Adam' and category = 'Creation';

-- Eve: 'Creation' → 'Women of the Bible' (first woman)
update public.bible_characters
set category = 'Women of the Bible'
where name = 'Eve' and category = 'Creation';

-- Caleb: 'Old Testament' → 'Judges' (leader during the conquest alongside Joshua)
update public.bible_characters
set category = 'Judges'
where name = 'Caleb' and category = 'Old Testament';

-- Note: Absalom is already 'Kings' in seed data — no change needed.
