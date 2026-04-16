<script setup lang="ts">
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: 'en' }
})

useSeoMeta({
  title: 'Filera — Batch File Renamer',
  description: 'A fast, cross-platform batch file renaming tool with a live preview pipeline of tasks and filters.',
  twitterCard: 'summary_large_image'
})

const route = useRoute()
const isDocsPage = computed(() => route.path.startsWith('/docs'))

const { latestTag } = useRuntimeConfig().public
const version = (latestTag as string).replace('filera-v', '')
const releaseBase = `https://github.com/joncorv/filera/releases/download/${latestTag}`
const downloadItems = [[
  { label: 'macOS', icon: 'i-simple-icons-apple', to: `${releaseBase}/filera_${version}_universal.dmg`, target: '_blank' },
  { label: 'Windows', icon: 'i-simple-icons-windows', to: `${releaseBase}/filera_${version}_x64-setup.exe`, target: '_blank' },
  { label: 'Linux .deb', icon: 'i-simple-icons-debian', to: `${releaseBase}/filera_${version}_amd64.deb`, target: '_blank' },
  { label: 'Linux .rpm', icon: 'i-simple-icons-fedora', to: `${releaseBase}/filera-${version}-1.x86_64.rpm`, target: '_blank' }
]]
</script>

<template>
  <UApp>
    <UHeader :toggle="false">
      <template #left>
        <NuxtLink
          to="/"
          class="font-bold text-base tracking-tight text-(--ui-text-highlighted) flex items-center gap-2 me-4"
        >
          <UIcon
            name="i-lucide-file-pen-line"
            class="text-(--ui-primary) size-5"
          />
          Filera
        </NuxtLink>
      </template>

      <UButton
        to="/docs/getting-started/introduction"
        color="neutral"
        variant="ghost"
        size="md"
        icon="i-lucide-book-open"
        label="Documentation"
        :class="isDocsPage ? 'text-(--ui-primary)' : ''"
      />
      <UDropdownMenu :items="downloadItems">
        <UButton
          color="neutral"
          variant="ghost"
          size="md"
          icon="i-lucide-download"
          trailing-icon="i-lucide-chevron-down"
          label="Download"
        />
      </UDropdownMenu>

      <template #right>
        <UColorModeButton />
        <UButton
          to="https://github.com/joncorv/filera"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-sm text-(--ui-text-muted)">
          Filera — MIT License © {{ new Date().getFullYear() }}
        </p>
      </template>
      <template #right>
        <UButton
          to="https://github.com/joncorv/filera"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
