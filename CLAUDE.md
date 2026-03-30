# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:4200
npm run build      # Production build to dist/
npm test           # Run all tests with Karma/Jasmine
ng test --include="**/list.spec.ts"  # Run a single test file
ng generate component path/name      # Scaffold a component
```

## Architecture

This is a **zoneless Angular 20** app using signals for reactivity (`provideZonelessChangeDetection()`). All components are standalone.

### Path Alias

`@/*` maps to `src/app/*`. Use `@/shared/components/button` instead of relative paths.

### Component Library ("Zard")

`src/app/shared/components/` is a custom UI library. Each component follows this pattern:

- `*.component.ts` — the component/directive
- `*.variants.ts` — CVA (`class-variance-authority`) variant definitions
- `index.ts` — public barrel export

Styling uses **Tailwind CSS v4** + `mergeClasses()` (clsx + tailwind-merge) from `@/shared/utils/merge-classes`. Variant props are always prefixed with `z` (e.g., `zType`, `zSize`, `zShape`).

### Core Providers (`src/app/shared/core/`)

`provideZard()` must be registered in `app.config.ts`. It provides two custom `EventManagerPlugin`s:

- **`ZardEventManagerPlugin`** — template event modifiers: `(click.prevent)`, `(click.stop)`, `(keydown.{enter,space}.prevent)`, etc.
- **`ZardDebounceEventManagerPlugin`** — debounced events: `(input.debounce-300)="handler()"`.

`ZardStringTemplateOutletDirective` — renders either a string or a `TemplateRef` dynamically (similar to `NgTemplateOutlet` but also handles plain strings).

### Data Table (`src/app/shared/components/data-table/`)

Built on **TanStack Table (`@tanstack/angular-table`)**. The main `DataTableComponent` orchestrates:

- `NormalDataTable` — renders the HTML table using `FlexRenderDirective` for cell content
- `DataTableToolbar` — search input + toolbar action buttons + column visibility toggle + `DataTableFilters`
- `DataTablePagination` — page controls and page size selector
- `DataTableFilters` — per-column filters; filter type (`single-select` / `multi-select`) and options are declared in `column.meta`

All table state (sorting, pagination, globalFilter) is held as signals in `DataTableComponent` and passed down via inputs.

**`AppColumnMeta<TData>`** (in `data-table.types.ts`) extends TanStack's column meta to support:
- `actions?: (row: TData) => RowAction<TData>[]` — per-row context menu/dropdown actions
- `type` / `value` — for filter rendering

### Dialog System (`src/app/shared/components/dialog/`)

Uses Angular CDK Overlay. Open a dialog with:

```ts
dialogService.create({ zContent: MyComponent, zData: rowData });
```

Inside the dialog component, inject data with `inject(Z_MODAL_DATA)`. Returns a `ZardDialogRef` for close/result handling. `AlertDialog` follows the same pattern with a dedicated service.

### Feature Modules

`src/app/user/` is the only feature currently. It contains:
- `list/` — data table page consuming `DataTableComponent`
- `form/` — edit form opened as a dialog, uses `Z_MODAL_DATA` for pre-filling

### TypeScript Config

Strict mode is fully enabled including `strictTemplates`. The compiler uses `typeCheckHostBindings: true`.
