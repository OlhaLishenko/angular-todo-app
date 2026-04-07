import { bootstrapApplication } from '@angular/platform-browser'; // функція запуску Angular
import { appConfig } from './app/app.config'; // конфіг додатку
import { App } from './app/app'; // головний компонент (раніше AppComponent)

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
// запуск Angular і рендер компонента App
