import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColumnDef } from '@tanstack/angular-table';
import { DataTableComponent } from './shared/components/data-table/data-table';
import { RowAction, ToolbarAction } from './shared/components/data-table/data-table.types';
import { Eye, Pencil, Trash } from 'lucide-angular';

interface User {
  id: number;
  user: string;
  language: string;
  gameOfChoice: string;
  totalRevenue: number;
  added: string;
  trend: string;
  lastUpdate: string;
}

@Component({
  selector: 'app-root',
  imports: [DataTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected readonly title = signal('angular-table-app');

  // Sample Data
  tableData = signal<User[]>([
    {
      id: 1,
      user: 'Jane Cooper',
      language: 'English',
      gameOfChoice: 'Chess',
      totalRevenue: 23392,
      added: '21 Apr 2024',
      trend: '+90.01%',
      lastUpdate: '21 Apr 2024'
    },
    {
      id: 2,
      user: 'Arlene McCoy',
      language: 'German',
      gameOfChoice: 'Rithmomachy',
      totalRevenue: 31112,
      added: '20 Apr 2024',
      trend: '-3.01%',
      lastUpdate: '17 Apr 2024'
    },
    {
      id: 3,
      user: 'Darrell Steward',
      language: 'Dutch',
      gameOfChoice: 'Hare and Hounds',
      totalRevenue: 313492,
      added: '17 Apr 2024',
      trend: '+12.01%',
      lastUpdate: '28 Mar 2024'
    },
    {
      id: 4,
      user: 'Savannah Nguyen',
      language: 'French',
      gameOfChoice: 'Go',
      totalRevenue: 128900,
      added: '15 Apr 2024',
      trend: '+18.45%',
      lastUpdate: '19 Apr 2024'
    },
    {
      id: 5,
      user: 'Cameron Williamson',
      language: 'Spanish',
      gameOfChoice: 'Checkers',
      totalRevenue: 84500,
      added: '12 Apr 2024',
      trend: '-6.72%',
      lastUpdate: '16 Apr 2024'
    },
    {
      id: 6,
      user: 'Brooklyn Simmons',
      language: 'Italian',
      gameOfChoice: 'Backgammon',
      totalRevenue: 56780,
      added: '10 Apr 2024',
      trend: '+4.89%',
      lastUpdate: '14 Apr 2024'
    },
    {
      id: 7,
      user: 'Leslie Alexander',
      language: 'Portuguese',
      gameOfChoice: 'Shogi',
      totalRevenue: 214000,
      added: '08 Apr 2024',
      trend: '+22.34%',
      lastUpdate: '18 Apr 2024'
    },
    {
      id: 8,
      user: 'Ronald Richards',
      language: 'Japanese',
      gameOfChoice: 'Mahjong',
      totalRevenue: 97650,
      added: '05 Apr 2024',
      trend: '-1.12%',
      lastUpdate: '13 Apr 2024'
    },
    {
      id: 9,
      user: 'Kristin Watson',
      language: 'Korean',
      gameOfChoice: 'Baduk',
      totalRevenue: 153400,
      added: '02 Apr 2024',
      trend: '+9.67%',
      lastUpdate: '11 Apr 2024'
    },
    {
      id: 10,
      user: 'Eleanor Pena',
      language: 'Hindi',
      gameOfChoice: 'Pachisi',
      totalRevenue: 43210,
      added: '30 Mar 2024',
      trend: '+1.98%',
      lastUpdate: '09 Apr 2024'
    },
    {
      id: 11,
      user: 'Devon Lane',
      language: 'English',
      gameOfChoice: 'Scrabble',
      totalRevenue: 72150,
      added: '28 Mar 2024',
      trend: '+6.34%',
      lastUpdate: '08 Apr 2024'
    },
    {
      id: 12,
      user: 'Wade Warren',
      language: 'Swedish',
      gameOfChoice: 'Nine Men’s Morris',
      totalRevenue: 189300,
      added: '26 Mar 2024',
      trend: '-2.45%',
      lastUpdate: '07 Apr 2024'
    },
    {
      id: 13,
      user: 'Courtney Henry',
      language: 'Russian',
      gameOfChoice: 'Tetris',
      totalRevenue: 254600,
      added: '25 Mar 2024',
      trend: '+14.78%',
      lastUpdate: '06 Apr 2024'
    },
    {
      id: 14,
      user: 'Jerome Bell',
      language: 'Arabic',
      gameOfChoice: 'Mancala',
      totalRevenue: 66740,
      added: '23 Mar 2024',
      trend: '+3.12%',
      lastUpdate: '05 Apr 2024'
    },
    {
      id: 15,
      user: 'Floyd Miles',
      language: 'Turkish',
      gameOfChoice: 'Okey',
      totalRevenue: 99820,
      added: '21 Mar 2024',
      trend: '-5.88%',
      lastUpdate: '04 Apr 2024'
    },
    {
      id: 16,
      user: 'Bessie Cooper',
      language: 'Thai',
      gameOfChoice: 'Makruk',
      totalRevenue: 141900,
      added: '19 Mar 2024',
      trend: '+11.05%',
      lastUpdate: '03 Apr 2024'
    },
    {
      id: 17,
      user: 'Marvin McKinney',
      language: 'Polish',
      gameOfChoice: 'Szachy',
      totalRevenue: 58230,
      added: '18 Mar 2024',
      trend: '+0.89%',
      lastUpdate: '02 Apr 2024'
    },
    {
      id: 18,
      user: 'Annette Black',
      language: 'Indonesian',
      gameOfChoice: 'Congklak',
      totalRevenue: 73460,
      added: '16 Mar 2024',
      trend: '-7.14%',
      lastUpdate: '01 Apr 2024'
    },
    {
      id: 19,
      user: 'Dianne Russell',
      language: 'Vietnamese',
      gameOfChoice: 'Ô ăn quan',
      totalRevenue: 49210,
      added: '14 Mar 2024',
      trend: '+2.67%',
      lastUpdate: '31 Mar 2024'
    },
    {
      id: 20,
      user: 'Cody Fisher',
      language: 'Chinese',
      gameOfChoice: 'Xiangqi',
      totalRevenue: 205880,
      added: '12 Mar 2024',
      trend: '+19.92%',
      lastUpdate: '30 Mar 2024'
    }
  ]);

  // Column Definitions
  columns: ColumnDef<User>[] = [
    {
      accessorKey: 'user',
      header: 'User',
      enableHiding: false
    },
    {
      accessorKey: 'language',
      header: 'Language',
      meta: {
        label: "Language",
        type: "single-select",
        placeholder: "Filter by Language",
        icon: "languages",
        filterOptions: [
          { label: 'English', value: 'English' },
          { label: 'German', value: 'German' },
          { label: 'Dutch', value: 'Dutch' },
          { label: 'French', value: 'French' },
          { label: 'Spanish', value: 'Spanish' },
          { label: 'Italian', value: 'Italian' },
          { label: 'Portuguese', value: 'Portuguese' },
          { label: 'Japanese', value: 'Japanese' },
          { label: 'Korean', value: 'Korean' },
          { label: 'Hindi', value: 'Hindi' },
          { label: 'Swedish', value: 'Swedish' },
          { label: 'Russian', value: 'Russian' },
          { label: 'Arabic', value: 'Arabic' },
          { label: 'Turkish', value: 'Turkish' },
          { label: 'Thai', value: 'Thai' },
          { label: 'Polish', value: 'Polish' },
          { label: 'Indonesian', value: 'Indonesian' },
          { label: 'Vietnamese', value: 'Vietnamese' },
          { label: 'Chinese', value: 'Chinese' },
        ]
      },
    },
    {
      accessorKey: 'gameOfChoice',
      header: 'Game of Choice',
      meta: {
        label: "Game",
        type: "multi-select",
        placeholder: "Filter by Game",
        icon: "gamepad-2",
        filterOptions: [
          { label: 'Chess', value: 'Chess' },
          { label: 'Rithmomachy', value: 'Rithmomachy' },
          { label: 'Hare and Hounds', value: 'Hare and Hounds' },
          { label: 'Go', value: 'Go' },
          { label: 'Checkers', value: 'Checkers' },
          { label: 'Backgammon', value: 'Backgammon' },
          { label: 'Shogi', value: 'Shogi' },
          { label: 'Mahjong', value: 'Mahjong' },
          { label: 'Baduk', value: 'Baduk' },
          { label: 'Pachisi', value: 'Pachisi' },
          { label: 'Scrabble', value: 'Scrabble' },
          { label: 'Nine Men’s Morris', value: 'Nine Men’s Morris' },
          { label: 'Tetris', value: 'Tetris' },
          { label: 'Mancala', value: 'Mancala' },
          { label: 'Okey', value: 'Okey' },
          { label: 'Makruk', value: 'Makruk' },
          { label: 'Szachy', value: 'Szachy' },
          { label: 'Congklak', value: 'Congklak' },
          { label: 'Ô ăn quan', value: 'Ô ăn quan' },
          { label: 'Xiangqi', value: 'Xiangqi' },
        ],
      },
      filterFn: (row, columnId, filterValue: string[]) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row?.getValue<string>(columnId);
        // return filterValue.includes(cellValue);
        return filterValue.some(value => cellValue === value);
      },
    },
    {
      accessorKey: 'totalRevenue',
      header: 'Total Revenue',
      cell: row => `$${row.getValue()}`
    },
    {
      accessorKey: 'added',
      header: 'Added',
    },
    {
      accessorKey: 'trend',
      header: 'Trend',
    },
    {
      accessorKey: 'lastUpdate',
      header: 'Last Update',
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      enableHiding: false,
      meta: {
        actions: (row: any): RowAction<any>[] => [
          {
            label: 'View',
            icon: Eye,
            action: () => this.onView(row),
          },
          {
            label: 'Edit',
            icon: Pencil,
            action: () => this.onEdit(row),
          },
          {
            label: 'Delete',
            icon: Trash,
            disabled: row.status === 'deleted',
            action: () => this.onDelete(row),
          },
        ],
      },
    },
  ];

  // Toolbar Actions
  toolbarActions = signal<ToolbarAction[]>([
    {
      label: 'Add New',
      variant: 'default',
      icon: 'plus',
      onClick: () => this.addNewUser(),
    },
    {
      label: '',
      variant: 'outline',
      icon: 'download',
      onClick: () => this.exportData(),
    }
  ]);

  addNewUser() {
    console.log('Add new user clicked');
    const newUser: User = {
      id: this.tableData().length + 1,
      user: 'New User',
      language: 'English',
      gameOfChoice: 'Chess',
      totalRevenue: 0,
      added: new Date().toLocaleDateString(),
      trend: '+0.00%',
      lastUpdate: new Date().toLocaleDateString()
    };
    this.tableData.update(data => [...data, newUser]);
  }

  onView(row: any) {
    console.log('View action clicked for row:', row);
    // Implement view logic here
  }

  onEdit(row: any) {
    console.log('Edit action clicked for row:', row);
    // Implement edit logic here
  }

  onDelete(row: any) {
    console.log('Delete action clicked for row:', row);
    const res = confirm(`Are you sure you want to delete user: ${row.user}?`);
    if (res) {
      this.tableData.update(data => data.filter(user => user.id !== row.id));
    }
  }

  exportData() {
    console.log('Export data clicked');
    const data = this.tableData();
    const json = JSON.stringify(data, null, 2);
    console.log('Exported data:', json);
    // You can implement actual export logic here
  }
}

// title: 'User Table',
// description: 'A table displaying user information and their game preferences.',