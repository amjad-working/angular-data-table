# Angular Data Table

A feature-rich data table application built with Angular 20, TanStack Table, and a custom component library (Zard UI). Demonstrates a fully functional user management table with sorting, filtering, pagination, row actions, and dialogs — all using Angular's modern signal-based, zoneless architecture.

## Tech Stack

- **Angular 20** — Zoneless, standalone components, signals
- **TanStack Table** (`@tanstack/angular-table`) — headless table logic
- **Tailwind CSS v4** — utility-first styling
- **Angular CDK Overlay** — dialog/popover positioning
- **CVA** (`class-variance-authority`) — component variant system
- **Lucide Angular** — icons

## Getting Started

```bash
npm install
npm start        # http://localhost:4200
```

```bash
npm run build    # Production build → dist/
npm test         # Run tests with Karma
```

## Features

| Feature | Details |
|---|---|
| Global search | Filters all columns simultaneously |
| Column filters | Per-column `single-select` and `multi-select` filters |
| Sorting | Click column headers to sort ascending/descending |
| Pagination | Configurable page size (10 / 20 / 50 / 100) |
| Column visibility | Toggle individual columns on/off |
| Row actions | View / Edit / Delete via per-row dropdown menu |
| Add / Edit dialog | Modal form with pre-filled data for editing |
| Delete confirmation | Alert dialog before destructive actions |

## Using `DataTableComponent`

```ts
import { DataTableComponent } from '@/shared/components/data-table/data-table';
import { ColumnDef } from '@tanstack/angular-table';

columns: ColumnDef<IUser>[] = [
  { accessorKey: 'user', header: 'User' },
  {
    accessorKey: 'language',
    header: 'Language',
    meta: {
      type: 'single-select',
      placeholder: 'Filter by Language',
      icon: 'languages',
      filterOptions: [{ label: 'English', value: 'English' }],
    },
  },
  {
    id: 'actions',
    meta: {
      actions: (row): RowAction<IUser>[] => [
        { label: 'Edit', icon: Pencil, action: () => this.onEdit(row) },
        { label: 'Delete', icon: Trash, action: () => this.onDelete(row) },
      ],
    },
  },
];
```

```html
<app-data-table
  [data]="tableData()"
  [columns]="columns"
  [actions]="toolbarActions()"
  [enableRowSelection]="true"
  [enableColumnVisibility]="true"
  [pageSize]="10"
  [pageSizeOptions]="[10, 20, 50]"
/>
```

### Column Meta Options

| Property | Type | Description |
|---|---|---|
| `type` | `'single-select' \| 'multi-select'` | Renders a filter control in the toolbar |
| `filterOptions` | `{ label, value }[]` | Options for the filter dropdown |
| `placeholder` | `string` | Placeholder text for the filter |
| `icon` | `ZardIcon` | Lucide icon name shown on the filter button |
| `actions` | `(row) => RowAction[]` | Per-row action menu items |

### Toolbar Actions

```ts
toolbarActions: ToolbarAction[] = [
  {
    label: 'Add New',
    variant: 'default',
    icon: 'plus',
    onClick: () => this.openForm(),
  },
];
```

## Dialog Service

```ts
// Open a component inside a dialog
this.dialogService.create({
  zTitle: 'Edit User',
  zDescription: 'Make your changes and click save.',
  zContent: FormComponent,   // any standalone component
  zData: rowData,            // injected via Z_MODAL_DATA
  zOkText: 'Save changes',
  zOnOk: (instance) => { /* access instance.form.value */ },
  zWidth: '425px',
});

// Inside FormComponent
private data = inject(Z_MODAL_DATA); // typed to whatever zData was
```

```ts
// Confirmation dialog
this.alertDialogService.confirm({
  zTitle: 'Are you absolutely sure?',
  zDescription: 'This action cannot be undone.',
  zOkText: 'Continue',
  zCancelText: 'Cancel',
  zOnOk: () => { /* handle confirm */ },
});
```

## Zard UI Components

All components are under `src/app/shared/components/` and exported via `index.ts` barrels.

`badge` · `button` · `button-group` · `checkbox` · `combobox` · `command` · `dialog` · `alert-dialog` · `divider` · `dropdown` · `empty` · `form` · `icon` · `input` · `input-group` · `loader` · `menu` · `popover` · `select` · `table`

All components use `z`-prefixed inputs for variants (e.g. `zType`, `zSize`, `zShape`) and `mergeClasses()` for style composition.

## Event Modifier Syntax

Custom `EventManagerPlugin` enables declarative event modifiers in templates:

```html
<!-- Prevent default -->
<a (click.prevent)="handle()">Link</a>

<!-- Stop propagation -->
<div (click.stop)="handle()">...</div>

<!-- Multiple keys -->
<input (keydown.{enter,space}.prevent)="handle()" />

<!-- Debounced input (300ms) -->
<input (input.debounce-300)="onSearch($event)" />
```

## Project Structure

```
src/app/
├── shared/
│   ├── components/        # Zard UI component library
│   │   └── data-table/    # DataTableComponent + sub-components
│   ├── core/              # provideZard(), directives, event plugins
│   └── utils/             # mergeClasses(), helpers
└── user/
    ├── list/              # User table page
    └── form/              # Add/Edit user dialog form
```
