import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { GetScreenSizeService } from '../../services/get-screen-size.service';

import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { SCREEN_SIZE } from 'src/app/screen-size.enum';
import { CellRendererOCM } from '../../shared/utils/utils';
import { GlobalConstants } from '../../shared/global-constants';

@Component({
  selector: 'app-ingresos-por-economico',
  templateUrl: './ingresos-por-economico.component.html',
  styleUrls: ['./ingresos-por-economico.component.css']
})
export class IngresosPorEconomicoComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  private gridApi;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public gridOptions: GridOptions;
  public localeText;
  public rowData: any;
  public groupHeaderHeight = 25;
  public headerHeight = 25;
  public isExpanded = false;
  public DesCapWidth?: number;
  public DesEcoWidth?: number;
  public CreditosWidth?: number;
  public screenSize?: any;

  constructor(private http: HttpClient, private getScreenSizeService: GetScreenSizeService) {
    this.screenSize = this.getScreenSizeService.getIsMobileResolution();

    switch (this.screenSize) {
      case (SCREEN_SIZE.XS1):
       // Xiaomi Redmi Note 6 Pro. Jose Luis Moreno 400
          this.DesCapWidth = 120;
          this.DesEcoWidth = 150;
          this.CreditosWidth = 100;
          break;
      case (SCREEN_SIZE.XS):
        // El Samsung Note 8 mio, dice que es una pantalla XS 427.
        this.DesCapWidth = 130;
        this.DesEcoWidth = 140;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.SM):
        this.DesCapWidth = 250;
        this.DesEcoWidth = 370;
        this.CreditosWidth = 100;
        break;
        case (SCREEN_SIZE.MD1):
            // Xiaomi Redmi Note 6 Pro apaisado. Jose Luis Moreno 700
          this.DesCapWidth = 300;
          this.DesEcoWidth = 270;
          this.CreditosWidth = 100;
          break;
      case (SCREEN_SIZE.MD):
        // El Samsung Note 8 mio, apaisado dice que es una pantalla MD 798.
        this.DesCapWidth = 300;
        this.DesEcoWidth = 270;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.LG):
        this.DesCapWidth = 250;
        this.DesEcoWidth = 350;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.XL):
        // En mi portatil a pantalla completa = XL1920
        this.DesCapWidth = 525;
        this.DesEcoWidth = 500;
        this.CreditosWidth = 220;
        break;
      default:
    }

    this.columnDefs = [
      {
        // headerName: 'Capitulo-Económico.',
        children: [
          {
            headerName: 'Capitulo',
            field: 'DesCap',
            width: this.DesCapWidth,
            rowGroup: true,
            filter: false,
            pinned: 'left',
            showRowGroup: 'DesCap',
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
                // console.log('params', params);
                if (params.node.group) {
                  return params.value;
                } else {
                  return '';
                }
              },
              footerValueGetter(params) {
                const val = params.value.split(' - ')[1];
                switch (params.node.level) {
                  case 0:  // Total capítulo.
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
              if (params.data) {
                return params.data.CodEco + ' - ' + params.data.DesEco;
              } else {
                return null;
              }
            },
          },
        ]
      },

      {
        headerName: 'Derechos reconocidos netos',
        field: 'DerechosReconocidosNetos',
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
    // Comieza a dar problemas en diciembre 2020.
    //     Request URL: https://mamjerez.fra1.digitaloceanspaces.com/2020PreIng-1.json
    // Request Method: GET
    // Status Code: 403 Forbidden
    // Remote Address: 5.101.109.44:443
    // Referrer Policy: strict-origin-when-cross-origin
    // this.rowData = this.http.get(GlobalConstants.jsonURLingresos);
    this.rowData = this.http.get(GlobalConstants.jsonIngresos);
    console.log( this.rowData );
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



