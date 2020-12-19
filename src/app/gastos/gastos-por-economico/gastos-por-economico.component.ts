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
  selector: 'app-gastos-por-economico',
  templateUrl: './gastos-por-economico.component.html',
  styleUrls: ['./gastos-por-economico.component.css']
})

export class GastosPorEconomicoComponent implements OnInit {
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
  public DesProWidth?: number;
  public DesEcoWidth?: number;
  public CreditosWidth?: number;
  public screenSize?: any;

  constructor(private http: HttpClient, private getScreenSizeService: GetScreenSizeService) {
    this.screenSize = this.getScreenSizeService.getIsMobileResolution();

    switch (this.screenSize) {
      case (SCREEN_SIZE.XS1):
        // Xiaomi Redmi Note 6 Pro. Jose Luis Moreno 400
        this.DesProWidth = 100;
        this.DesEcoWidth = 100;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.XS):
        // El Samsung Note 8 mio, dice que es una pantalla XS 427.
        this.DesProWidth = 100;
        this.DesEcoWidth = 100;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.SM):
        this.DesProWidth = 300;
        this.DesEcoWidth = 270;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.MD1):
        // Xiaomi Redmi Note 6 Pro apaisado. Jose Luis Moreno 700
        this.DesProWidth = 270;
        this.DesEcoWidth = 240;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.MD):
        // El Samsung Note 8 mio, apaisado dice que es una pantalla MD 798.
        this.DesProWidth = 300;
        this.DesEcoWidth = 270;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.LG):
        this.DesProWidth = 250;
        this.DesEcoWidth = 350;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.XL):
        // En mi portatil a pantalla completa = XL1920
        this.DesProWidth = 525;
        this.DesEcoWidth = 500;
        this.CreditosWidth = 220;
        break;
      default:
    }

    this.columnDefs = [
      {
        headerName: 'Económico',
        field: 'DesEco',
        rowGroup: true,
        showRowGroup: 'DesEco',
        filter: true,
        width: this.DesEcoWidth,
        pinned: 'left',
        cellRenderer: 'agGroupCellRenderer',
        valueGetter: params => {
          if (params.data) {
            return params.data.CodEco + ' - ' + params.data.DesEco;
          } else {
            return null;
          }
        },
        cellRendererParams: {
          suppressCount: true,
          innerRenderer: params => params.node.group ? `<span style="color: black; font-size: 12px; margin-left: 0px;">${params.value}</span>` : null,
          footerValueGetter(params) {
            switch (params.node.level) {
              case 0:  // Total economico.
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
        headerName: 'Programa',
        field: 'DesPro',
        cellClass: 'resaltado',
        width: this.DesProWidth,
        pinned: 'left',
        filter: false,
        rowGroup: true,
        showRowGroup: 'DesPro',
        valueGetter: params => {
          if (params.data) {
            return params.data.CodPro + ' - ' + params.data.DesPro;
          } else {
            return null;
          }
        },
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

    this.gridOptions = {} as GridOptions;
    this.localeText = localeTextESPes;
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
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



