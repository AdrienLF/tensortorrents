<script lang="ts">
    import { AccordionItem, Accordion } from 'flowbite-svelte';
    import type { ModelData } from '$lib/types/ModelData.js';
    import type { VersionsArray } from '$lib/types/Versions';
    
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  export let model_data:ModelData
  export let versions:VersionsArray
  console.log(versions)
  </script>
  
  <Accordion>
    <AccordionItem >
      <span slot="header">Files</span>
      <TableBody class="divide-y">
        <TableBodyRow>
          <TableBodyCell>Model.safetensor</TableBodyCell>
          
          
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Preview.jpg</TableBodyCell>
          
          
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Workflow.json</TableBodyCell>
          
        </TableBodyRow>
       
      </TableBody>
    </AccordionItem>
  
  </Accordion>