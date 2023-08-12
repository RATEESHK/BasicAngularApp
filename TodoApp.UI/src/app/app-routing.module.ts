import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { HomeComponent } from './home/home.component';
import { FailedComponent } from './failed/failed.component';
import { DeletedTodoComponent } from './deleted-todo/deleted-todo.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodosComponent,
    canActivate: [MsalGuard]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'deleted-todos',
    component: DeletedTodoComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'login-failed',
    component: FailedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Don't perform initial navigation in iframes or popups
    initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled' // Set to enabledBlocking to use Angular Universal
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
