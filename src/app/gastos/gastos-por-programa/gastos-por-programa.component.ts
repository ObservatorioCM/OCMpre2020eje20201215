import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { GetScreenSizeService } from '../../services/get-screen-size.service';

import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { SCREEN_SIZE } from 'src/app/screen-size.enum';
import { CellRendererOCM } from '../../shared/utils/utils';
import { GlobalConstants } from '../../shared/global-constants';

// En tsconfig.json hay que añadir:
// "resolveJsonModule": true,
// "allowSyntheticDefaultImports": true
@Component({
  selector: 'app-gastos-por-programa',
  templateUrl: './gastos-por-programa.component.html',
  styleUrls: ['./gastos-por-programa.component.css']
})
export class GastosPorProgramaComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  private gridApi;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public gridOptions: GridOptions;
  public localeText;
  public rowData: any;
  public sideBar;
  public groupHeaderHeight = 1;
  public headerHeight = 25;
  public isExpanded = false;
  public DesProWidth?: number;
  public DesCapWidth?: number;
  public DesEcoWidth?: number;
  public CreditosWidth?: number;
  public screenSize?: any;

  constructor(private http: HttpClient, private getScreenSizeService: GetScreenSizeService) {
    this.screenSize = this.getScreenSizeService.getIsMobileResolution();

    switch (this.screenSize) {
      case (SCREEN_SIZE.XS1):
        // Xiaomi Redmi Note 6 Pro. Jose Luis Moreno 400
        this.DesProWidth = 100;
        this.DesCapWidth = 65;
        this.DesEcoWidth = 90;
        this.CreditosWidth = 100;
        this.sideBar = {
          toolPanels: []
        };
        break;
      case (SCREEN_SIZE.XS):
        // El Samsung Note 8 mio, dice que es una pantalla XS 427.
        this.DesProWidth = 100;
        this.DesCapWidth = 75;
        this.DesEcoWidth = 100;
        this.CreditosWidth = 100;
        this.sideBar = {
          toolPanels: []
        };
        break;
      case (SCREEN_SIZE.SM):
        this.DesProWidth = 250;
        this.DesCapWidth = 150;
        this.DesEcoWidth = 200;
        this.CreditosWidth = 100;
        this.sideBar = {
          toolPanels: []
        };
        break;
      case (SCREEN_SIZE.MD):
        // El Samsung Note 8 mio, apaisado dice que es una pantalla MD 798.
        this.DesProWidth = 250;
        this.DesCapWidth = 150;
        this.DesEcoWidth = 240;
        this.CreditosWidth = 100;
        this.sideBar = {
          toolPanels: []
        };
        break;
      case (SCREEN_SIZE.LG):
        this.DesProWidth = 250;
        this.DesCapWidth = 150;
        this.DesEcoWidth = 350;
        this.CreditosWidth = 100;
        this.sideBar = {
          toolPanels: []
        };
        break;
      case (SCREEN_SIZE.XL):
        // En mi portatil a pantalla completa = XL1920
        this.DesProWidth = 525;
        this.DesCapWidth = 350;
        this.DesEcoWidth = 500;
        this.CreditosWidth = 220;
        this.sideBar = {
          toolPanels: ['filters', 'columns']
        };
        break;
      default:
    }
    // console.log(this.getScreenSizeService.getIsMobileResolution());

    this.columnDefs = [
      {
        // headerName: 'Programa-Capítulo-Económico.',
        children: [
          {
            headerName: 'Programa',
            field: 'DesPro',
            rowGroup: true,
            showRowGroup: 'DesPro',
            filter: true,
            width: this.DesProWidth,
            // minWidth: 300,
            // maxWidth: 520,
            pinned: 'left',
            cellRenderer: 'agGroupCellRenderer',
            cellRendererParams: {
              suppressCount: true,
              innerRenderer: params => params.node.group ? `<span style="color: black; font-size: 12px; margin-left: 0px;">${params.value}</span>` : null,
              footerValueGetter(params) {
                switch (params.node.level) {
                  case 0:  // Total programa.
                    return `<span style="color: red; font-size: 14px; font-weight: bold; margin-left: 0px;"> Total ${params.value}</span>`;
                  case -1: // Total general.
                    return '<span style="color: red; font-size: 18px; font-weight: bold; margin-right: 0px;"> Total general' + '</span>';
                  default:
                    return 'SIN FORMATO';
                }
              }
            }
          },

          {
            headerName: 'Capítulo',
            field: 'DesCap',
            rowGroup: true,
            showRowGroup: 'DesCap',
            filter: false,
            width: this.DesCapWidth,
            pinned: 'left',
            cellRenderer: 'agGroupCellRenderer',
            valueGetter: params => {
              if (params.data) {
                return params.data.CodCap + ' - ' + params.data.DesCap;
              } else {
                return null;
              }
            },
            cellRendererParams: {
              suppressCount: true,
              innerRenderer: params => {
                if (params.node.group) {
                  return params.value;
                } else {
                  return '';
                }
              },
              footerValueGetter(params) {
                const val = params.value.split(' - ')[1];
                switch (params.node.level) {
                  case 1:  // Total capítulo.
                    return `<span style="color: red; font-size: 12px;  font-weight: bold; margin-left: 0px;"> Total ${val}</span>`;
                  case -1: // Total general.
                    return '';
                  default:
                    return 'SIN FORMATO';
                }
              }
            }
          },

          {
            headerName: 'Económico',
            field: 'DesEco',
            cellClass: 'resaltado',
            width: this.DesEcoWidth,
            pinned: 'left',
            filter: false,
            valueGetter: params => {
              // console.log(this.screen);
              if (params.data) {
                switch (this.screenSize) {
                  case (SCREEN_SIZE.XS):
                    return params.data.DesEco;
                  case (SCREEN_SIZE.SM):
                    return params.data.DesEco;
                  case (SCREEN_SIZE.MD):
                    return params.data.DesEco;
                  case (SCREEN_SIZE.LG):
                    return params.data.CodEco + ' - ' + params.data.DesEco;
                  case (SCREEN_SIZE.XL):
                    return params.data.CodEco + ' - ' + params.data.DesEco;
                  default:
                }
                // switch (this.screen) {
                //   case (SCREEN_SIZE.XS):
                //     return '<span style="color: red; font-size: 8px;"> ' + params.data.CodEco + ' - ' + params.data.DesEco + '</span>';
                //   case (SCREEN_SIZE.SM):
                //     return '<span style="color: red; font-size: 8px;"> ' + params.data.CodEco + ' - ' + params.data.DesEco + '</span>';
                //   case (SCREEN_SIZE.MD):
                //     return '<span style="color: red; font-size: 8px;"> ' + params.data.CodEco + ' - ' + params.data.DesEco + '</span>';
                //   case (SCREEN_SIZE.LG):
                //     return '<span style="color: red; font-size: 8px;"> ' + params.data.CodEco + ' - ' + params.data.DesEco + '</span>';
                //   case (SCREEN_SIZE.XL):
                //     return '<span style="color: red; font-size: 12px;"> ' + params.data.DesEco + '</span>';
                //   default:
                // }
              } else {
                return null;
              }
            },
          },
        ]
      },

      {
        headerName: 'Obligaciones reconocidas',
        field: 'ObligacionesReconocidas',
        width: this.CreditosWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true
    };
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = {} as GridOptions;
    this.localeText = localeTextESPes;
  }

  ngOnInit() {
    // console.log('entro al componente');
  }

  onGridReady(params) {
    this.gridApi = params.api;
    // console.log( this.gridApi );
    this.gridColumnApi = params.columnApi;
    // this.rowData = this.http.get(GlobalConstants.jsonURLgastos);
    this.rowData = this.http.get(GlobalConstants.jsonGastos);

  }

  expandAll() {
    this.gridApi.expandAll();
    this.isExpanded = true;
  }

  collapseAll() {
    this.gridApi.collapseAll();
    this.isExpanded = false;
  }
}

