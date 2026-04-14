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
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="font-bold text-base tracking-tight text-(--ui-text-highlighted) flex items-center gap-2 me-4">
          <UIcon name="i-lucide-file-pen-line" class="text-(--ui-primary) size-5" />
          Filera
        </NuxtLink>
        <!-- Desktop nav links -->
        <nav class="hidden lg:flex items-center gap-0.5">
          <UButton
            to="/docs/getting-started/introduction"
            color="neutral"
            variant="ghost"
            size="sm"
            label="Docs"
            :class="isDocsPage ? 'text-(--ui-text-highlighted) font-medium' : ''"
          />
          <UButton
            to="https://github.com/joncorv/filera/releases"
            target="_blank"
            color="neutral"
            variant="ghost"
            size="sm"
            label="Download"
          />
        </nav>
      </template>

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

    <UFooter v-if="!isDocsPage">
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
