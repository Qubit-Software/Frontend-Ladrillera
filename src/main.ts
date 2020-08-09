import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
declare var $: any;
declare var tooltip: any;
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
try {
  $('[data-toggle="tooltip"]').tooltip({
    sanitizeFn: function (content) { return content; }
  });
} catch (error) {

}