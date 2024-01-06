<script>
    import { Button, Dropdown, DropdownItem, Checkbox } from 'flowbite-svelte';
    import { ChevronDownSolid } from 'flowbite-svelte-icons';
  </script>
  
  <Button>Dropdown checkbox<ChevronDownSolid class="w-3 h-3 ms-2 text-white dark:text-white" /></Button>
  <Dropdown class="w-48 p-3 space-y-1 text-sm">
    <li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
      <Checkbox>Newest</Checkbox>
    </li>
    <li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
      <Checkbox checked>Most Downloaded</Checkbox>
    </li>
   
  </Dropdown>