# Collaborators data (bilingual)

These CSVs drive the [Collaborators page](../../app/collaborators/page.tsx). Edit them and rebuild — no code changes needed.

## Files

| File                       | Used at              |
| -------------------------- | -------------------- |
| `collaborators.en.csv`     | `/collaborators`     |
| `collaborators.es.csv`     | `/es/collaborators`  |

The CSVs are **parallel**: one row per collaborator, in the same order across the two languages. Names, institutions and URLs typically stay the same; `project` and `title` may translate.

## Columns

| Column        | Required | Notes                                                                |
| ------------- | -------- | -------------------------------------------------------------------- |
| `title`       | no       | e.g. `Prof.`, `Dr.`, `MSc.`                                          |
| `name`        | yes      | Full name.                                                           |
| `institution` | yes      | Affiliation.                                                         |
| `project`     | no       | Short description of what we do together.                            |
| `status`      | yes      | `ongoing` or `past`. Anything else is treated as `ongoing`.          |
| `url`         | no       | Link to the collaborator's institution page or project URL.          |

## CSV quoting

Use double quotes around any field that contains a comma:

```csv
Prof.,Modesto Orozco,IRB Barcelona,"Force fields for B-DNA, ABC consortium",ongoing,https://mmb.irbbarcelona.org/
```

Headers must stay on the first line in this exact order.
