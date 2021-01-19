import { Component, OnInit } from '@angular/core';
import { ExpenseEntry } from '../expense-entry';
import {DebugService} from '../debug.service';
import {ExpenseEntryService} from '../expense-entry.service';

@Component({
  selector: 'app-expense-entry-list',
  templateUrl: './expense-entry-list.component.html',
  styleUrls: ['./expense-entry-list.component.css'],
  providers: [DebugService]
})
export class ExpenseEntryListComponent implements OnInit {
  title: string;
  expenseEntries: ExpenseEntry[];

  constructor(private debugService: DebugService, private restService :
    ExpenseEntryService) { }

  ngOnInit(): void {
    this.debugService.info('Expense Entry List component initialized');
    this.title = 'Expense Entry List';
    // this.expenseEntries = this.getExpenseEntries();
    this.getExpenseItems();
  }

  getExpenseItems(): void {
    this.restService.getExpenseEntries()
      .subscribe( data => this.expenseEntries = data );
  }

  // tslint:disable-next-line:typedef
  deleteExpenseEntry(evt, id) {
    evt.preventDefault();
    if (confirm('Are you sure to delete the entry?')) {
      this.restService.deleteExpenseEntry(id)
        .subscribe( data => console.log(data) );

      this.getExpenseItems();
    }
  }

  // getExpenseEntries(): ExpenseEntry[] {
  //   const mockExpenseEntries: ExpenseEntry[] = [
  //     { id: 1,
  //       item: 'Pizza',
  //       amount: Math.floor((Math.random() * 10) + 1),
  //       category: 'Food',
  //       location: 'Mcdonald',
  //       spendOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10),
  //       createdOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10) },
  //     { id: 1,
  //       item: 'Pizza',
  //       amount: Math.floor((Math.random() * 10) + 1),
  //       category: 'Food',
  //       location: 'KFC',
  //       spendOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10),
  //       createdOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10) },
  //     { id: 1,
  //       item: 'Pizza',
  //       amount: Math.floor((Math.random() * 10) + 1),
  //       category: 'Food',
  //       location: 'Mcdonald',
  //       spendOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10),
  //       createdOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10) },
  //     { id: 1,
  //       item: 'Pizza',
  //       amount: Math.floor((Math.random() * 10) + 1),
  //       category: 'Food',
  //       location: 'KFC',
  //       spendOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10),
  //       createdOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10) },
  //     { id: 1,
  //       item: 'Pizza',
  //       amount: Math.floor((Math.random() * 10) + 1),
  //       category: 'Food',
  //       location: 'KFC',
  //       spendOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10),
  //       createdOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10)
  //     },
  //   ];
  //   return mockExpenseEntries;
  // }

}
