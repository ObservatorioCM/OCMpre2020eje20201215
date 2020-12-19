import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { IndiceComponent } from './indice/indice.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { GastosPorEconomicoComponent } from './gastos/gastos-por-economico/gastos-por-economico.component';
import { GastosPorProgramaComponent } from './gastos/gastos-por-programa/gastos-por-programa.component';
import { IngresosPorEconomicoComponent } from './ingresos/ingresos-por-economico/ingresos-por-economico.component';
import { HttpClientModule } from '@angular/common/http';
import { GastosPorOrganicoComponent } from './gastos/gastos-por-organico/gastos-por-organico.component';
import { GastosPorCapituloComponent } from './gastos/gastos-por-capitulo/gastos-por-capitulo.component';
@NgModule({
  declarations: [
    AppComponent,
    IndiceComponent,
    HeaderComponent,
    FooterComponent,
    GastosPorEconomicoComponent,
    GastosPorProgramaComponent,
    IngresosPorEconomicoComponent,
    GastosPorOrganicoComponent,
    GastosPorCapituloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    AgGridModule.withComponents([
    ]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
