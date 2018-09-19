import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { HttpClientModule } from "@angular/common/http";
import { TodoService} from './shared/services/todo.service';
import { UiModule } from './modules/ui/ui.module';
import { MaterialModule } from './modules/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    TodoTableComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    UiModule,
    MaterialModule
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
