<template>
    <div class="w-screen h-screen overflow-y-scroll snap-mandatory snap-y">
        <section id="intro" class="relative w-full h-screen snap-start">
            <div class="absolute top-0 bottom-0 left-0 p-5 right-1/2">
                <img class="object-contain w-full h-full" src="https://crafatar.com/renders/body/14ef090bb818454c8883106e3623a998?overlay">
            </div>
            <p class="absolute bottom-0 right-1/2 left-0 overflow-hidden whitespace-nowrap text-center backdrop-blur-[2px] bg-gray bg-opacity-10 text-[min(5vw,20px)]">
                Tsuki#1580
            </p>
            <div class="absolute top-0 bottom-0 right-0 p-5 left-1/2">
                <img class="object-contain w-full h-full" src="https://crafatar.com/renders/body/a376f43c43714391b7d96cc7bc7b25ed?overlay">
            </div>
            <p class="absolute bottom-0 right-0 left-1/2 overflow-hidden whitespace-nowrap text-center backdrop-blur-[2px] bg-gray bg-opacity-10 text-[min(5vw,20px)]">
                Gameplayer G9#1042
            </p>
            <p class="centered py-1 px-8 backdrop-blur-[2px] bg-gray bg-opacity-10 rounded-lg text-[50px]">
                PXLpy
            </p>
        </section>
        <section id="main" class="min-h-screen snap-start">
            <NavMenu />
            <NavMenu :items="subLinks" />
            <div class="p-5 mx-auto max-w-[1000px] flex flex-col gap-5">
                <p>
                    PXLpy is a two man team
                </p>
                <div>
                    <span class="font-bold">Tsuki#1580</span>:
                    <ul class="list-disc">
                        <li>CEO</li>
                        <li>Server-Manager</li>
                    </ul>
                </div>
                <div>
                    <span class="font-bold">Gameplayer G9#1042</span>:
                    <ul class="list-disc">
                        <li>Bot-Developer</li>
                        <li>Designer</li>
                        <li>Web-Developer</li>
                        <li>…</li>
                    </ul>
                </div>
                <p>
                    PXLpy was founded in the horror year 2020, because the two idiots were bored
                </p>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        layout: "empty",
    });

    const subLinks = [
        { display: "Join the Discord-Server", link: "https://discord.gg/invite/j6ftdqz", external: true },
    ];
</script>
