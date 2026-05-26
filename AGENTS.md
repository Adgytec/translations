# AGENTS.md

## Purpose

This repository contains translation files only.

All changes should focus exclusively on maintaining and updating localized content consistently across all supported languages.

---

# Translation Rules

## Synchronize All Languages

- Any translation change made in one language must also be reflected in all other supported languages.
- Keep translation keys synchronized across every locale file.
- Never leave locale files structurally inconsistent.

## Preserve Structure

- Maintain identical nesting, grouping, and key structure between languages.
- Preserve existing formatting and indentation style.
- Keep key ordering consistent where possible.

## Do Not Introduce Drift

- Do not add keys to only one locale.
- Do not remove translation keys unless explicitly requested.
- Do not rename translation keys without updating every locale consistently.

---

# i18n Requirements

Translations are resolved using the i18next library:

- https://www.i18next.com/

All translations must use valid i18next-compatible syntax and conventions.

## Supported i18next Features

### Interpolation

```json
{
  "welcome": "Hello {{name}}"
}
```

### Pluralization

```json
{
  "item_one": "{{count}} item",
  "item_other": "{{count}} items"
}
```

### Nested Keys

```json
{
  "dialog": {
    "title": "Settings"
  }
}
```

---

# Custom Formatters

Custom i18n formatters are available here:

- https://cdn.jsdelivr.net/gh/Adgytec/React-SPA-Template@main/src/i18n/formatters.ts

## Formatter Guidelines

- Reuse existing formatters whenever applicable.
- Preserve existing formatter syntax and conventions.
- Avoid duplicating formatting behavior already handled by shared formatters.

---

# Translation Quality Guidelines

## Always

- Keep terminology consistent across languages.
- Preserve placeholders, variables, and formatting tokens.
- Preserve HTML, markdown, and special syntax where present.
- Preserve interpolation variables exactly as written.
- Preserve pluralization keys and structures.
- Match the tone and intent of the source translation.

## Never

- Translate interpolation variables.
- Modify formatter names or syntax.
- Hardcode locale-specific structure differences unless required.
- Leave placeholder text in production translations.
- Introduce malformed JSON or invalid translation syntax.

---

# Version Control Restrictions

Do not perform any version control operations unless explicitly requested.

This includes:

- `git commit`
- `git push`
- `git pull`
- `git rebase`
- `git reset`
- `git stash`
- branch operations
- tag operations
- force operations

Never assume permission for destructive or history-altering operations.

---

# Agent Expectations

Agents working in this repository should:

- prioritize translation consistency
- keep all locales synchronized
- preserve existing translation patterns
- maintain valid i18next syntax
- avoid unnecessary formatting churn
- avoid version control operations unless explicitly instructed
