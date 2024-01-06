<script>
    import { AccordionItem, Accordion } from 'flowbite-svelte';
    
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  </script>
  
  <Accordion>
    <AccordionItem open>
      <span slot="header">Details</span>
      <TableBody class="divide-y">
        <TableBodyRow>
          <TableBodyCell>Type</TableBodyCell>
          <TableBodyCell>Checkpoint trained</TableBodyCell>
          
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Stats</TableBodyCell>
          <TableBodyCell>White</TableBodyCell>
          
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Uploaded</TableBodyCell>
          <TableBodyCell>Nov 27, 2023</TableBodyCell>
          
        </TableBodyRow>
        <TableBodyRow>
            <TableBodyCell>Base model</TableBodyCell>
            <TableBodyCell>SDXL 1.0</TableBodyCell>
            
          </TableBodyRow>
      </TableBody>
    </AccordionItem>
  
  </Accordion>