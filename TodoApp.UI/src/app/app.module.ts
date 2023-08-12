import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent, ProtectedResourceScopes } from '@azure/msal-angular';
import { FailedComponent } from './failed/failed.component';
import { environment } from 'src/environments/environment';
import { DeletedTodoComponent } from './deleted-todo/deleted-todo.component';
import { TodosComponent } from './todos/todos.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/* export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
} */

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(environment.msalConfig);
}

/*export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(environment.apiConfig.uri, environment.apiConfig.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}*/

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string | ProtectedResourceScopes> | null>();
  protectedResourceMap.set(environment.apiConfig.uri, [
    {
      httpMethod: 'GET',
      scopes: [...environment.apiConfig.scopes]
    },
    {
      httpMethod: 'POST',
      scopes: [...environment.apiConfig.scopes]
    },
    {
      httpMethod: 'PUT',
      scopes: [...environment.apiConfig.scopes]
    },
    {
      httpMethod: 'DELETE',
      scopes: [...environment.apiConfig.scopes]
    }
  ]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...environment.apiConfig.scopes]
    },
    loginFailedRoute: '/login-failed'
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodosComponent,
    DeletedTodoComponent,
    FailedComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule, // Animations cause delay which interfere with E2E tests
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    MsalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
