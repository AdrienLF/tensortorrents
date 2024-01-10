    <script lang="ts">
        import { onMount } from 'svelte';
        import { Search, Input } from 'flowbite-svelte';
        import type { ModelData } from '$lib/types/ModelData';
        import { Rating } from 'flowbite-svelte';
        import { UserCircleOutline } from 'flowbite-svelte-icons';
        import { clickOutside } from '$lib/utils/clickOutside';

        let results: ModelData[];
        let query = '';

        async function search_model(event) {
            console.log(event);
            console.log(query);
            try {
                const response = await fetch(`/api/search_model_by_name?query=${query}`);

                console.log(response);
                if (response.ok) {
                    results = await response.json();
                } else {
                    console.error('Failed to load images:', response.status, response.statusText);
                }
            } catch (e) {
                console.error('Error fetching images:', e.message);
            }
            console.log(results);
        }
    </script>

    <Search
        bind:value={query}
        id="search-navbar"
        class="w-96 ps-10"
        placeholder="Search..."
        on:keyup={search_model}
    />

    {#if results}
        <div class="resultsPreview" use:clickOutside on:click_outside={() => results = null} >
            {#each results as result, index (result.model_id)}
                
                    <button class="profile-card items-center justify-center" on:click={() => {
                        window.location.href = `/models/${result.model_id}`;
                      }}>
                        <div class="modelPreview">
                            <img src={result.preview_img_url ? result.preview_img_url : ''} alt="Model Preview" />
                        </div>
                        <div class="modelInfo flew flex-row">
                            <div class="modelName">{result.name}</div>
                            <div class="ownerBadges flew-col flex items-center gap-2 py-2 align-middle">
                                {#if result.owner}
                                    <div class="OwnerInfo flex flex-grow flex-row items-center gap-1 align-middle">
                                        <img src={result.owner.avatar_url} alt="User Avatar" class="userAvatar" />

                                        <div>{result.owner.username}</div>
                                    </div>
                                {:else}
                                    <div class="OwnerInfo flex flex-grow flex-row items-center gap-1 align-middle">
                                        <UserCircleOutline />

                                        <div>Anonymous</div>
                                    </div>
                                {/if}

                                <!-- Include badges here -->
                                <div class="badges gap-2">
                                    <span class="tag">{result.modeltypes.name ? result.modeltypes.name : 'Default Model Type'}</span>
                                    <span class="tag">{result.checkpoint_type ? result.checkpoint_type : 'Default Checkpoint Type'}</span>
                                </div>
                            </div>
                            <!-- Stats like stars, likes, etc. -->
                            <div class="stats">
                                <Rating size="20" rating={result.rating} />
                            </div>
                        </div>
                    </button>
                
            {/each}
        </div>
    {/if}

    <style>
        .resultsPreview {
            background-color: #222;
            position: absolute;
            border: 1px solid #333;
            border-radius: 8px;
            margin-top: 0.5em;
            width: 100%;
            padding: 1em;
            z-index: 10;
        }

        .profile-card {
            font-family: var(--default-font);
            display: flex;
            flex-direction: row;
            border-radius: 4px;
            width:100%;
        }
        .resultsPreview :hover {
            background-color: #333;
        }

        .userAvatar {
            height: 20px;
            width: 20px;
            object-fit: contain;
        }

        .modelPreview {
            height: 80px;
            width: 80px;
            object-fit: contain;
            overflow: hidden;
            margin: 1em 1em;
        }

        .ownerBadges {
            font-size: 8px;
            font-weight: 500;
        }
        .modelName {
            font-weight: 700;
            font-size: 14px;
            text-align: left;
        }
        
        .tag {
            border:1px solid #444;
            border-radius: 1em;
            padding:0.5em;
        }
        .badges {
            /* Add styles for badges */
        }
        .stats {
            /* Add styles for stats */
        }
    </style>
