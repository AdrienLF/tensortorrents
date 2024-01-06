<script>
    import SortFilter from "./filters/SortFilter.svelte"
    import { ButtonGroup, Button } from 'flowbite-svelte';
    import { UserCircleSolid, AdjustmentsVerticalOutline, DownloadSolid } from 'flowbite-svelte-icons';
</script>

<div class="container mx-auto flex justify-between py-4">
      
      <ButtonGroup>
        <Button outline color="dark">
          <UserCircleSolid class="w-3 h-3 me-2" />
          Models
        </Button>
        <Button outline color="dark">
          <AdjustmentsVerticalOutline class="w-3 h-3 me-2" />
          Workflows
        </Button>

      </ButtonGroup>
    
<SortFilter />


</div>