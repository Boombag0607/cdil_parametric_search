import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

// LicenseInfo.setLicenseKey('YOUR_LICENSE_KEY');

export default function SimpleHeaderFilteringDataGridPro() {
  const { data } = useDemoData({
    dataSet: 'Employee',
    rowLength: 100,
  });

  return (
    <div style={{ height: "100vh", width: '100%' }}>
      <DataGrid
        {...data}
        initialState={{
          ...data.initialState,
          columns: {
            columnVisibilityModel: {
              avatar: false,
              id: false,
            },
          },
        }}
        disableColumnFilter
        unstable_headerFilters
        slots={{
          headerFilterMenu: null,
        }}
      />
    </div>
  );
}