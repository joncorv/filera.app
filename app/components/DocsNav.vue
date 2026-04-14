<script setup lang="ts">
interface NavPage {
  title: string
  path: string
}

interface NavSection {
  title: string
  path: string
  children?: NavPage[]
}

defineProps<{
  sections: NavSection[]
}>()

const route = useRoute()

function isActive(path: string) {
  return route.path === path
}

const sectionMeta: Record<string, { icon: string }> = {
  'getting-started': { icon: 'i-lucide-rocket' },
  'interface': { icon: 'i-lucide-layout-dashboard' },
  'file-tasks': { icon: 'i-lucide-wand-2' },
  'filters': { icon: 'i-lucide-filter' },
  'output': { icon: 'i-lucide-folder-output' },
}

function getSectionMeta(path: string) {
  const key = path.split('/').pop() ?? ''
  return sectionMeta[key] ?? { icon: 'i-lucide-file-text' }
}
</script>

<template>
  <nav class="space-y-1">
    <div v-for="section in sections" :key="section.path" class="mb-5">
      <!-- Section header -->
      <div class="flex items-center gap-2 px-2 mb-2">
        <UIcon
          :name="getSectionMeta(section.path).icon"
          class="size-4 shrink-0 text-(--ui-text-highlighted)"
        />
        <span class="text-xs font-semibold uppercase tracking-widest text-(--ui-text-highlighted)">
          {{ section.title }}
        </span>
      </div>

      <!-- Section pages -->
      <ul class="ms-3 border-s border-(--ui-border) ps-1.5 space-y-0.5">
        <li v-for="page in section.children" :key="page.path">
          <NuxtLink
            :to="page.path"
            class="group relative flex items-center px-2.5 py-1.5 text-sm rounded-md transition-colors"
            :class="isActive(page.path)
              ? 'text-(--ui-primary) font-medium bg-(--ui-primary)/8'
              : 'text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:bg-(--ui-bg-elevated)'"
          >
            <!-- Active left rail -->
            <span
              v-if="isActive(page.path)"
              class="absolute -left-[0.4375rem] top-1/2 -translate-y-1/2 w-px h-4 bg-(--ui-primary) rounded-full"
            />
            {{ page.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
