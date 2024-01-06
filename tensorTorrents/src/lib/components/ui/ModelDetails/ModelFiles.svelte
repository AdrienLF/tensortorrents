<script>
    import { AccordionItem, Accordion } from 'flowbite-svelte';
    
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
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