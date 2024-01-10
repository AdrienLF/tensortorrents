<script lang="ts">
    import { AccordionItem, Accordion } from 'flowbite-svelte';
    import type { ModelData } from '$lib/types/ModelData.js';
    
    import type { Version } from '$lib/types/Versions';
    import { formatIsoDateString } from '$lib/utils/formatISOstrings';
    
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  export let model_data:ModelData
  export let versions :Version
  console.log(model_data)
  console.log(versions)
  </script>
  
  <Accordion>
    <AccordionItem open>
      <span slot="header">Details</span>
      <TableBody >
        <TableBodyRow>
          <TableBodyCell>Type</TableBodyCell>
          <TableBodyCell>{model_data.modeltypes.name} {model_data.category}</TableBodyCell>
          
        </TableBodyRow>
        <!-- <TableBodyRow>
          <TableBodyCell>Stats</TableBodyCell>
          <TableBodyCell>White</TableBodyCell>
          
        </TableBodyRow> -->
        <TableBodyRow>
          <TableBodyCell>Uploaded</TableBodyCell>
          <TableBodyCell>{formatIsoDateString(model_data.upload_date)}</TableBodyCell>
          
        </TableBodyRow>
        <TableBodyRow>
            <TableBodyCell>Base model</TableBodyCell>
            <TableBodyCell>{versions[0].basemodels.name}</TableBodyCell>
            
          </TableBodyRow>
      </TableBody>
    </AccordionItem>
  
  </Accordion>