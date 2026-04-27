# Members data (bilingual)

These CSVs drive the [Members page](../../app/members/page.tsx) and the *Current staff* preview on the home page. Edit them and rebuild — no code changes needed.

## Files

| File                  | Used at         |
| --------------------- | --------------- |
| `members.en.csv`      | `/members`      |
| `members.es.csv`      | `/es/members`   |
| `past_members.en.csv` | `/members`      |
| `past_members.es.csv` | `/es/members`   |

The CSVs are **parallel**: one row per person, in the same order across the two languages of a given list. Names, emails, scholar URLs and photo paths stay identical; `role1`, `institution1`, `role2`, `institution2`, `comment` get translated.

## Columns

| Column        | Required | Notes                                                          |
| ------------- | -------- | -------------------------------------------------------------- |
| `title`       | no       | e.g. `Prof. Dr.`, `Dr.`, `MSc.`, `Lic.`, `Lic (candidate).`     |
| `name`        | yes      | Full name. Used to look up the person in `CURRENT_ORDER`.      |
| `role1`       | yes      | Primary role. Quote if it contains commas.                     |
| `institution1`| yes      | Primary affiliation.                                           |
| `role2`       | no       | Secondary role.                                                |
| `institution2`| no       | Secondary affiliation.                                         |
| `email`       | no       | Public email.                                                  |
| `scholar`     | no       | Google Scholar URL.                                            |
| `photo`       | no       | Path served at `/figures/...` (file lives under `data/figures/`). |
| `comment`     | no       | Short bio or note (translated per language).                   |

## Display order

Edit `CURRENT_ORDER` in [`lib/members.ts`](../../lib/members.ts) — that list controls the rendering order of current members. Names not in the list fall to the end (alphabetical by last name).

## Photos

Drop photos into [`data/figures/`](../figures/) and reference them in the `photo` column with a leading slash, e.g. `/figures/germán-traglia.jpg`. The `scripts/sync-figures.mjs` prebuild step copies and optimizes them into `public/figures/`.

## CSV quoting

Use double quotes around any field that contains a comma:

```csv
Prof. Dr.,Pablo D. Dans,"Head of MMBAI, the Molecular Modeling lab",...
```

Headers must stay on the first line in this exact order.
