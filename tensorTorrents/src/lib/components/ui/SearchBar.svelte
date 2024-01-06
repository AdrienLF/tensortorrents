<script>
    import { Search, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
    import { SearchOutline, ChevronDownSolid } from 'flowbite-svelte-icons';
  
    const items = [
      {
        label: 'All categories'
      },
      {
        label: 'Mockups'
      },
      {
        label: 'Templates'
      },
      {
        label: 'Design'
      },
      {
        label: 'Logos'
      }
    ]
  
    let selectCategory = 'All categories'
  
  </script>
  
  <form class="flex">
    <div class="relative">
      <Button class="rounded-e-none whitespace-nowrap border border-e-0 border-primary-700">
        {selectCategory}
        <ChevronDownSolid class="w-2.5 h-2.5 ms-2.5" />
      </Button>
      <Dropdown classContainer="w-40">
        {#each items as { label }}
          <DropdownItem
            on:click={() => {
              selectCategory = label;
            }}
            class={selectCategory === label ? 'underline' : ''}
          >
            {label}
          </DropdownItem>
        {/each}
      </Dropdown>
    </div>
    <Search size="md" class="rounded-none py-2.5" placeholder="Search Mockups, Logos, Design Templates..." />
    <Button class="!p-2.5 rounded-s-none">
      <SearchOutline class="w-5 h-5" />
    </Button>
  </form>