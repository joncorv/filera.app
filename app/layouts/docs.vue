<script setup lang="ts">
const { data: navigation } = await useAsyncData('docs-navigation', () =>
  queryCollectionNavigation('docs')
)

// nav tree: [{title:"Docs", children:[sections...]}]
const sections = computed(() => navigation.value?.[0]?.children ?? [])

const mobileNavOpen = ref(false)
const route = useRoute()

watch(() => route.path, () => {
  mobileNavOpen.value = false
})
</script>

<template>
  <div>
    <!-- Mobile nav bar (shows below header on small screens) -->
    <div class="lg:hidden sticky top-(--ui-header-height) z-40 border-b border-(--ui-border) bg-(--ui-bg)/80 backdrop-blur px-4 py-2 flex items-center gap-3">
      <UButton
        icon="i-lucide-menu"
        color="neutral"
        variant="ghost"
        size="sm"
        aria-label="Open navigation"
        @click="mobileNavOpen = true"
      />
      <span class="text-sm text-(--ui-text-muted) truncate">Navigation</span>
    </div>

    <!-- Mobile nav slideover -->
    <USlideover v-model:open="mobileNavOpen" side="left" :ui="{ width: 'max-w-72' }">
      <template #content>
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between p-4 border-b border-(--ui-border)">
            <span class="font-semibold text-(--ui-text-highlighted)">Docs</span>
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="mobileNavOpen = false"
            />
          </div>
          <div class="flex-1 overflow-y-auto p-4">
            <DocsNav :sections="sections" />
          </div>
        </div>
      </template>
    </USlideover>

    <!-- Main layout: UContainer matches UHeader's width automatically -->
    <UContainer class="flex gap-8 lg:gap-12 py-0">
      <!-- Left sidebar (desktop only) -->
      <aside class="hidden lg:block w-60 xl:w-64 shrink-0">
        <div class="sticky top-(--ui-header-height) h-[calc(100vh-var(--ui-header-height))] overflow-y-auto py-8 pe-4">
          <DocsNav :sections="sections" />
        </div>
      </aside>

      <!-- Page content (no extra horizontal padding — container handles it) -->
      <div class="flex-1 min-w-0">
        <slot />
      </div>
    </UContainer>
  </div>
</template>
