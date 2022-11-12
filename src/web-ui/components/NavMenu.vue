<template>
    <nav v-if="items" class="flex flex-wrap w-full gap-1 p-1 bg-opacity-50 bg-primary backdrop-blur-sm" :class="{'pt-0': props.items}">
        <NuxtLink v-for="l of items" :key="l.display" :href="l.link" :target="l.external ? '_blank' : '_self'" class="px-2 py-1 transition-colors rounded-md bg-secondary bg-opacity-10 hover:bg-opacity-100">
            {{ l.display }}
        </NuxtLink>
    </nav>
</template>

<script lang="ts" setup>
    interface LinkItem {
        display: string,
        link: string,
        external?: boolean,
    };

    const defaultItems: LinkItem[] = [
        { display: "PXLpy", link: "/" },
        { display: "Skyblock AI", link: "/skyblock-ai" },
    ];

    const props = defineProps<{
        items?: LinkItem[]
    }>();

    const items = props.items ?? defaultItems;
</script>
