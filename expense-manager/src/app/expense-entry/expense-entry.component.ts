// import { Component, OnInit } from '@angular/core';
// import { ExpenseEntry } from '../expense-entry';
//
// @Component({
//   selector: 'app-expense-entry',
//   templateUrl: './expense-entry.component.html',
//   styleUrls: ['./expense-entry.component.css']
// })
// export class ExpenseEntryComponent implements OnInit {
//
//   title: string;
//   expenseEntry: ExpenseEntry;
//   constructor() { }
//
//   ngOnInit(): void {
//     this.title = 'Expense Entry';
//     this.expenseEntry = {
//
//       id: 1,
//       item: 'Pizza',
//       amount: 21,
//       category: 'Food',
//       location: 'Zomato',
//       spendOn: new Date(2020, 6, 1, 10, 10, 10),
//       createdOn: new Date(2020, 6, 1, 10, 10, 10),
//     };
//   }
//
// }
import { Component, OnInit } from '@angular/core'; import { ExpenseEntry } from '../expense-entry'; import { ExpenseEntryService } from '../expense-entry.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.css']
})
export class ExpenseEntryComponent implements OnInit {
  title: string;
  expenseEntry$: Observable<ExpenseEntry>;
  expenseEntry: ExpenseEntry = {} as ExpenseEntry;
  selectedId: number;

  constructor(private restService: ExpenseEntryService,
              private router: Router,
              private route: ActivatedRoute ) {

  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.title = 'Expense Entry';
    // @ts-ignore
    this.expenseEntry$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = Number(params.get('id'));
        return this.restService.getExpenseEntry(this.selectedId);
      }));
    this.expenseEntry$.subscribe( (data) => this.expenseEntry = data );
  }

  goToList(): void {
    this.router.navigate(['/expenses']);
  }

  goToEdit(): void {
    this.router.navigate(['/expenses/edit', this.selectedId]);
  }

}
