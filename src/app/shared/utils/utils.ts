
/**
 *  Metodo ....
 * @param params
 */
export function CellRendererOCM(params: any) {
  if (params.value) {
    const valorFormateado: number = params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    if (params.node.footer) {
      switch (params.node.level) {
        case 3: // Total cuarto nivel.
        return `<p style="text-align: right; color: red; font-size: 12px; font-weight: bold">${valorFormateado}</p>`;
        case 2: // Total tercero nivel.
        return `<p style="text-align: right; color: red; font-size: 12px; font-weight: bold">${valorFormateado}</p>`;
        case 1: // Total segundo nivel.
          return `<p style="text-align: right; color: red; font-size: 12px; font-weight: bold">${valorFormateado}</p>`;
        case 0:  // Total primer nivel.
          return `<p style="text-align: right; color: red; font-size: 13px; font-weight: bold">${valorFormateado}</p>`;
        case -1: // Total general.
          return `<p style="text-align: right; color: red; font-size: 14px; font-weight: bold">${valorFormateado}</p>`;
        default:
          return 'SIN FORMATO';
      }
    } else {
      return `<p style="font-size: 12px; text-align: right">${valorFormateado}</p>`;
    }
  } else {
    return '';
  }
}



