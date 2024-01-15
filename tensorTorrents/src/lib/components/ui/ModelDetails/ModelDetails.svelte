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
          <TableBodyCell ><span class="text-gray-500 dark:text-gray-200 ">Type</span></TableBodyCell>
          <TableBodyCell ><span class="text-gray-500 dark:text-gray-200 ">{model_data.modeltypes.name} {model_data.category}</span></TableBodyCell>
          
        </TableBodyRow>
        <!-- <TableBodyRow>
          <TableBodyCell>Stats</TableBodyCell>
          <TableBodyCell>White</TableBodyCell>
          
        </TableBodyRow> -->
        <TableBodyRow>
          <TableBodyCell><span class="text-gray-500 dark:text-gray-200 ">Uploaded</span></TableBodyCell>
          <TableBodyCell><span class="text-gray-500 dark:text-gray-200 ">{formatIsoDateString(model_data.upload_date)}</span></TableBodyCell>
          
        </TableBodyRow>
        <TableBodyRow>
            <TableBodyCell><span class="text-gray-500 dark:text-gray-200 ">Base model</span></TableBodyCell>
            <TableBodyCell><span class="text-gray-500 dark:text-gray-200 ">{versions[0].basemodels.name}</span></TableBodyCell>
            
          </TableBodyRow>
      </TableBody>
    </AccordionItem>
  
  </Accordion>