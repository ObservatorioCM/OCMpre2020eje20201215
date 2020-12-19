import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { IndiceComponent } from './indice/indice.component';
import { IngresosPorEconomicoComponent } from './ingresos/ingresos-por-economico/ingresos-por-economico.component';
import { GastosPorOrganicoComponent } from './gastos/gastos-por-organico/gastos-por-organico.component';
import { GastosPorProgramaComponent } from './gastos/gastos-por-programa/gastos-por-programa.component';
import { GastosPorEconomicoComponent } from './gastos/gastos-por-economico/gastos-por-economico.component';
import { GastosPorCapituloComponent } from './gastos/gastos-por-capitulo/gastos-por-capitulo.component';

const routes: Routes = [
    { path: 'home', component: IndiceComponent },
    { path: 'IngresosPorEconomico', component: IngresosPorEconomicoComponent },
    { path: 'GastosPorOrganico', component: GastosPorOrganicoComponent },
    { path: 'GastosPorPrograma', component: GastosPorProgramaComponent },
    { path: 'GastosPorEconomico', component: GastosPorEconomicoComponent },
    { path: 'GastosPorCapitulo', component: GastosPorCapituloComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
@NgModule({
    imports: [
        RouterModule.forRoot( routes, { useHash: true, relativeLinkResolution: 'legacy' } )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
