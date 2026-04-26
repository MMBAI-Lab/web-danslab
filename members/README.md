# Members data

These CSVs drive the [Members page](../app/members/page.tsx). Edit them and rebuild — no code changes needed.

## Files

- [members.csv](members.csv) — current lab members.
- [past_members.csv](past_members.csv) — alumni / past members.

## Columns

| Column        | Required | Notes                                                          |
| ------------- | -------- | -------------------------------------------------------------- |
| `title`       | no       | e.g. `Prof. Dr.`, `Dr.`, `MSc.` Leave blank if none.            |
| `name`        | yes      | Full name. Used to sort PI first, then alphabetical.           |
| `role1`       | yes      | Primary role. Quote if it contains commas.                     |
| `institution1`| yes      | Primary affiliation.                                           |
| `role2`       | no       | Secondary role.                                                |
| `institution2`| no       | Secondary affiliation.                                         |
| `email`       | no       | Public email.                                                  |
| `scholar`     | no       | Google Scholar URL.                                            |
| `photo`       | no       | Path under `public/`, e.g. `/members/pablo-dans.jpg`.          |
| `comment`     | no       | Short bio or note.                                             |

## Photos

Drop photos into [public/members/](../public/members/) and reference them in the `photo` column with a leading slash, e.g. `/members/germán-traglia.jpg`.

If a member has no photo, the page renders a placeholder.

## CSV quoting

Use double quotes around any field that contains a comma:

```csv
Prof. Dr.,Pablo D. Dans,"Head of the Molecular Modeling, Bioinformatics and AI lab",...
```

Headers must stay on the first line in this exact order.
