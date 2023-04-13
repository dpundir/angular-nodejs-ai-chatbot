import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './components/chat/chat.component';
import { AIProviderComponent } from './components/ai-provider/aiprovider.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'chat' },
  { path: 'chat', component: ChatComponent },
  { path: 'providers', component: AIProviderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
