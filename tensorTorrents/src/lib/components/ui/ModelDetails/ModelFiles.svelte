<script lang="ts">
    import { AccordionItem, Accordion } from 'flowbite-svelte';
    import type { ModelData } from '$lib/types/ModelData.js';
    import type { VersionsArray } from '$lib/types/Versions';
    
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  export let model_data:ModelData
  export let versions:VersionsArray
  console.log(versions)
  let torrent_files = JSON.parse(versions[0].torrent_files)
  console.log(torrent_files)
  
  </script>
  
  <Accordion>
    <AccordionItem >
      <span slot="header">Files</span>
      <TableBody >
        {#each torrent_files as files}
        <TableBodyRow>
          <TableBodyCell tdClass="text-ellipsis overflow-hidden ... max-w-[300px] text-gray-500 dark:text-gray-200 " title={files.path}><span class="text-gray-500 dark:text-gray-200 ">{files.path}</span></TableBodyCell>
          
          
        </TableBodyRow>
        {/each}
        
       
      </TableBody>
    </AccordionItem>
  
  </Accordion>